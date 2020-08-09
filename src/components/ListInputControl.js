import React, { Component } from 'react';

import ListItems from './ListItems';

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
      <div className="ctn">
        <div className="form-ctn">
          <form onSubmit={this.handleSubmit}>
            <div className="label">{this.props.label}</div>
            <input
              type="text"
              placeholder={this.props.placeholder}
              disabled={this.props.disabled}
              onChange={this.handleChange}
              value={this.state.value}
            />
          </form>
        </div>
        <div className="error-ctn">{this.state.error}</div>
        <div className="ctn">
          <ListItems items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default ListInputControl;
