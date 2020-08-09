import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

// using styled components for the container because they play nice with react-beautiful-dnd
const Container = styled.div`
  border: 1px solid lightgrey;
  margin-botom: 8px;
  padding: 8px;
`;

class Item extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.index.toString()}
        index={this.props.index}
      >
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <li>{this.props.items}</li>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Item;
