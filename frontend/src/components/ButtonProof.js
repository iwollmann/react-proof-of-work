import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
import { Button, Text, Box } from 'grommet'

function ButtonProof(props) {
    const [enabled, setEnabled] = useState(true);
    const [counter, setCounter] = useState(0);

    const handleClickButton = async () => {
        setEnabled(false);
        const success = await props.onSubmit();
        if (success) {
            setCounter(counter + 1);
        }
        setEnabled(true);
    }

    return (
        <div>
            <Button label="Click Me" disabled={!enabled} onClick={handleClickButton} />
            <Box pad="xsmall" fill>
                <Text size="large">{counter}</Text>
            </Box>
        </div >);
}

export default ButtonProof;