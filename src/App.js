import React, { Component } from 'react';
import ListInputControl from './components/ListInputControl';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <ListInputControl
          label="Awesome Title"
          placeholder="Enter text here"
          required
          max={5}
          className="list-items"
        />
      </Container>
    );
  }
}

export default App;
