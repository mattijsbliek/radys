import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style';

class Instructions extends Component {
  state = {
    activeStep: null,
  };

  setActive = i => e => {
    this.setState({
      activeStep: i,
    });
  };

  render() {
    const { recipeInstructions } = this.props;

    return (
      <div class={style.instructions}>
        <h2>Instructions</h2>
        {recipeInstructions.length === 1 &&
          recipeInstructions[0].split('\n').map(str => <p>{str}</p>)}
        {recipeInstructions.length > 1 && (
          <ol>
            {recipeInstructions.map((step, i) => (
              <li>
                <button
                  dangerouslySetInnerHTML={{
                    __html: step,
                  }}
                  onClick={this.setActive(i)}
                  class={`${style.button} ${this.state.activeStep === i
                    ? style.isActive
                    : ''}`}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

Instructions.propTypes = {
  recipeInstructions: PropTypes.array.isRequired,
};

export default Instructions;
