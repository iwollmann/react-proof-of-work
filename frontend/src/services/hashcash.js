import crypto from 'crypto';
import publicIp from 'public-ip';

/*
X-Hashcash: 1:20:YYMMDD[hhmm[ss]]:IPADDRESS::McMybZIhxKXu57jd:ckvi
ver:bits:date:resource:ext:rand:counter
The header contains:

ver: Hashcash format version, 1 (which supersedes version 0).
bits: Number of "partial pre-image" (zero) bits in the hashed code. here we are using 20 bits wich is equivalent to 5 HEX
date: The time that the message was sent, in the format YYMMDD[hhmm[ss]].
resource: Resource data string being transmitted, e.g., an IP address or email address.
ext: Extension (optional; ignored in version 1).
rand: String of random characters, encoded in base-64 format.
nounce: Binary counter, encoded in base-64 format.
*/

function generateRandomString(size) {
    let longString = '';
    for (let i = 0; i < size; i += 1) {
        longString += Math.random().toString(36).substr(2, 1);
    }
    return longString;
}

export const parse = (decoded) => {
    const [version, bits, date, ip, opts, str, nonce] = decoded.split(':');
    return { version, bits, date, ip, opts, str, nonce }
}

// bits = version * 4 to simplify - this logic should be the same at the backend or the hash will be invalid.
export const generate = async (version = 0, bits = version * 4, complexity = 100) => {
    const ip = await publicIp.v4();
    let decodedhash = `${version}:${bits}::${ip}:::`;
    if (version === 0) return { decodedhash };
    const rand = generateRandomString(complexity);
    let nonce = 0;
    const prefix = Array(bits / 4).fill(0).join('');
    const startDate = Date.now();
    let hash = '';
    do {
        decodedhash = `${version}:${bits}:${startDate}:${ip}::${rand}:${nonce}`;
        hash = crypto.createHash('sha1').update(decodedhash).digest('hex');
        nonce += 1;
    } while (hash.substr(0, bits / 4) !== prefix)

    const endDate = Date.now();

    return { decodedhash, timespent: (endDate - startDate) / 1000 };
}
