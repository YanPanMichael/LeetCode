import React, { Component } from "react";

export default class AAA extends Component {
  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

AAA.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    surname: React.PropTypes.string,
    age: (props, propName) => {
      if (!(props[propName] > 0 && props[propName] < 100)) {
        return new Error(`${propName} must be between 1 and 99`);
      }
      return null;
    }
  })
};

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.node
  ])
};
