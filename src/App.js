import React, { Component } from 'react';
import ListInputControl from './components/ListInputControl';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  onDragEnd(result) {
    // couldn't persist order state with dynamic inputs
  }

  render() {
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <ListInputControl
            label="Awesome Title"
            placeholder="Enter text here"
            required
            max={5}
            className="list-items"
          />
        </DragDropContext>
      </Container>
    );
  }
}

export default App;
