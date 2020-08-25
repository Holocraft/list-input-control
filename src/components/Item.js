import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled, { keyframes } from 'styled-components';

// using styled components for the container because they play nice with react-beautiful-dnd
const scale = keyframes`
  from {
    transform: scale(1.05);
  }

  to {
    transform: scale(1);
  }
`;
const Container = styled.div`
  border: 1px solid lightgrey;
  margin-botom: 8px;
  padding: 8px;
  border-radius: 3px;
  margin: 0.5rem;
  animation: ${scale} 0.1s linear;
  background-color: white;
`;

const ListItem = styled.li`
  list-style: none;
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
            <ListItem>{this.props.items}</ListItem>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Item;
