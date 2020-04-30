const crypto = require('crypto');
const requestIp = require('request-ip');

//version:bits:timestamp:IPADDRESS:options:randomstring:nonce
const parse = (decoded) => {
    const [version, bits, date, ip, opts, str, nonce] = decoded.split(':');
    return { version, bits, date, ip, opts, str, nonce }
}

const generate = (decoded) => {
    const { version, bits, date, ip, opts, str, nonce } = parse(decoded);
    return crypto.createHash('sha1')
        .update(`${version}:${bits}:${date}:${ip}:${opts}:${str}:${nonce}`)
        .digest('hex');
}

const isValid = (decoded) => {
    const generatedHash = generate(decoded);
    const { bits } = parse(decoded);
    const prefix = Array(bits / 4).fill(0).join('');

    return generatedHash.substr(0, bits / 4) === prefix;
}

/*
This is just a sample with simple a business logic
Requests structure
{
    ip:
    version:
    last: now
    hashes: []
}
*/
const clientRequests = [];

const validateMiddleware = (request, response, next) => {
    const hashcash = request.headers['x-hashcash'];
    const { version, ip: haship } = parse(hashcash);

    const ip = requestIp.getClientIp(request);

    if (ip !== haship)
        return response.status(400).json({ 'error': 'Invalid hashset' });

    let clientIndex = clientRequests.findIndex(x => x.ip === ip);
    if (clientIndex < 0) {
        clientIndex = clientRequests.push({
            ip, version, last: Date.now()
        }) - 1;
    }

    const client = clientRequests[clientIndex];

    if (version > 0) { // Check if it's valid and if it is on the same version
        if (client.version !== Number.parseInt(version) || !isValid(hashcash)) {
            return response.status(400).json({ 'error': 'Invalid hashset' });
        }
    }

    // FOR THIS SAMPLE WE WILL LIMIT THE VERSION TO 5 TO AVOID CLIENT CRASH
    client.version = client.version > 5 ? 0 : Number.parseInt(client.version) + 1;

    clientRequests[clientIndex] = client;

    response.set('x-hashcash-version', client.version);
    response.set('Access-Control-Expose-Headers', ['x-hashcash-version']);

    next();
}

module.exports = {
    generate,
    parse,
    isValid,
    validateMiddleware
}