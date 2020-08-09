import React, { Component } from 'react';
import styled from 'styled-components';

import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

// using styled components for the container because they play nice with react-beautiful-dnd
const Container = styled.div``;

class ListItems extends Component {
  render() {
    return (
      <Droppable droppableId={'id'}>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {this.props.items.map((item, index) => (
              <Item key={index} index={index} items={item} />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );
  }
}

export default ListItems;
