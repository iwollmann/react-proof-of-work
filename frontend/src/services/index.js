import axios from 'axios';

import { generate } from './hashcash';

export default async function Submit(version) {
    const { decodedhash, timespent } = await generate(version);
    try {
        const response = await axios.post('https://proof-of-work-be.herokuapp.com/counter', null, {
            headers: {
                'x-hashcash': decodedhash,
            }
        })

        version = response.headers['x-hashcash-version'];
        return { version, success: response.status === 200, timespent, decodedhash };
    } catch (e) {
        const { error } = e.response.data;
        console.log(error);
        return { version, success: false, timespent }
    }
};