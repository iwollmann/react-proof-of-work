import React from 'react';
import { Box, Text } from 'grommet';

const generatedTime = (time) => time ? `${time} milliseconds` : ''

const Stats = ({ data: { timespent, version, nonce, str, date } }) => {
    return <Box align="stretch" justify="center" flex="shrink" basis="medium" direction="column" round="medium" fill="vertical" background={{ "dark": false, "color": "brand", "opacity": "medium" }} overflow="visible" pad="xsmall">
        <Text><strong>Current version:</strong> {version} </Text>
        <Text><strong>Generated time:</strong> {generatedTime(timespent)}</Text>
        <Text truncate={true}><strong>String:</strong> {str} </Text>
        <Text><strong>Nonce:</strong> {nonce} </Text>
        <Text truncate={true}><strong>Generated at:</strong> {date ? new Intl.DateTimeFormat('en', {
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZoneName: 'short'
        }).format(date) : ''}</Text>
    </Box>
}

export default Stats;