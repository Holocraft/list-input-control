import React, { Component } from 'react';
import ListInputControl from './components/ListInputControl';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

class App extends Component {
  onDragEnd(result) {
    // couldn't persist order state with dynamic inputs
  }

  render() {
    return (
      <div className="app">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <ListInputControl
            label="Title"
            placeholder="Enter text here"
            required
            max={5}
            className="list-items"
          />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
