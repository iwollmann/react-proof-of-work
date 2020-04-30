import React, { useState, useCallback } from 'react';
import { Button, Text, Box } from 'grommet'

function ButtonProof(props) {
    const [enabled, setEnabled] = useState(true);
    const [counter, setCounter] = useState(0);

    const handleClickButton = useCallback(async () => {
        setEnabled(false);
        const success = await props.onSubmit();
        if (success) {
            setCounter(counter + 1);
        }
        setEnabled(true);
    }, [enabled, counter]);

    return (
        <Box align="center" justify="center" pad="xlarge">
            <Button label="Click Me" disabled={!enabled} onClick={handleClickButton} />
            <Text>
                {counter}
            </Text>
        </Box>
    );
}

export default ButtonProof;