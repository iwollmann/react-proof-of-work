import React from 'react';
import { Box } from 'grommet';

const Stats = ({ data: { timespent, version, nonce, str, date } }) => {
    return <Box
        width="medium"
        height="medium"
        round="small"
        align="start"
        justify="start"
        background="brand"
        direction='column'
    >
        <h2>Statistics</h2>
        <ul>
            <li>Current version: {version}</li>
            <li>Generated time: {timespent ?? 0} milliseconds</li>
            <li>String: {str}</li>
            <li>Nonce: {nonce}</li>
            <li>Generated at: {new Intl.DateTimeFormat('en', {
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                timeZoneName: 'short'
            }).format(date)}</li>
        </ul>
    </Box>
}

export default Stats;