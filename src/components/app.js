import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import shortId from 'shortid';

//import Header from './header';
//import Home from '../routes/home';
import Home from 'async!../routes/home';
import Recipe from 'async!../routes/recipe';

export default class App extends Component {
  state = {
    recipe: null,
  };

  /*
   * Gets fired when the route changes.
   * @param {Object} event - "change" event from [preact-router](http://git.io/preact-router)
   * @param {string} event.url - The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  setRecipe = recipe => {
    const id = shortId.generate();
    localStorage.setItem(id, JSON.stringify(recipe));

    route(`/recipe/${id}`);
  };

  render() {
    return (
      <div id="app">
        {/*<Header />*/}
        <Router onChange={this.handleRoute}>
          <Home path="/" setRecipe={this.setRecipe} />
          <Recipe path="/recipe/:id" />
        </Router>
      </div>
    );
  }
}
