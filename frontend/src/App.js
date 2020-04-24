import React, { useState } from 'react';

import ButtonProof from './components/ButtonProof';
import Stats from './components/Stats'
import { Grommet, Box, Grid } from 'grommet'
import { grommet } from "grommet/themes";

import Submit from './services';
import { parse } from './services/hashcash'

function App() {
  const [stats, setStats] = useState({});

  const onSubmit = async () => {
    const { version: nextVersion, success, timespent, decodedhash } = await Submit(stats?.nextVersion ?? 0);
    if (success) {
      setStats({ nextVersion, timespent, ...parse(decodedhash) });
    }

    return success;
  }

  return (<Grommet theme={grommet} themeMode="light">
    <Grid fill
      rows={["auto", "flex"]}
      columns={["auto", "flex"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "sidebar", start: [1, 0], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] }
      ]}
      gap='small'>
      <Box gridArea="header">
        <h1>React Proof of Work Sample</h1>
      </Box>
      <Box gridArea="main">
        <ButtonProof onSubmit={onSubmit} />
      </Box>
      <Box gridArea="sidebar">
        <Stats data={stats} />
      </Box>
    </Grid>
  </Grommet>
  );
}

export default App;
