import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import ListItems from './ListItems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 5rem 1rem 5rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 1rem 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  width: 100px;
  font-weight: 600;
  padding: 7px;
  color: white;
  background-color: #00ccfd;
  box-shadow: 0px 8px 15px rgba(0, 204, 253, 0.1);
  text-transform: uppercase;
  font-size: 0.7rem;
  border: none;
  border-radius: 20px;
  :focus {
    outline: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  :focus {
    outline-width: 0;
  }
  margin: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 12px;
`;

const Label = styled.div`
  font-size: 1.5rem;
  color: white;
  margin: 10px 390px 10px 10px;
`;

const ErrorContainer = styled.div`
  color: red;
  margin-left: 10px;
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class ListInputControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      items: [],
      error: '',
      max: this.props.max,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAllItems = this.clearAllItems.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  decrementMax() {
    // we need to decrement max to validate max submissions
    this.setState((prevState) => {
      if (prevState.max > 0) {
        return { max: prevState.max - 1 };
      }
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  clearAllItems() {
    this.setState({ items: [], max: this.props.max });
  }

  handleSubmit(e) {
    // validations
    if (this.props.required && !this.state.value) {
      this.setState({ error: 'No empty submissions!' });
    }
    if (this.state.value && this.state.max <= 0) {
      this.setState({ error: 'Max entries reached!' });
    }
    if (this.state.value && this.state.max > 0) {
      this.decrementMax();
      this.setState({
        value: '',
        items: [...this.state.items, this.state.value],
        error: '',
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Label>{this.props.label}</Label>
              <Input
                type="text"
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                onChange={this.handleChange}
                value={this.state.value}
              />
            </Form>
          </div>
          {this.state.items.length > 0 && (
            <ButtonContainer>
              <Button onClick={this.clearAllItems}>Clear List</Button>
            </ButtonContainer>
          )}

          <ErrorContainer>{this.state.error}</ErrorContainer>
          <ListContainer>
            <ListItems items={this.state.items} />
          </ListContainer>
        </DragDropContext>
      </Container>
    );
  }
}

export default ListInputControl;
