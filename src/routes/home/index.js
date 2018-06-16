import { h, Component } from 'preact';
import isUrl from 'is-url';
import Helmet from 'preact-helmet';

import { API_URL } from '~/config';
import Spinner from '~/icons/Spinner';
import Logo from '~/icons/Logo';
import style from './style';

export default class Home extends Component {
  state = {
    url: '',
    error: null,
    loading: false,
  };

  constructor(props) {
    super(props);

    this.state.url = this.props.url;
  }

  componentDidMount() {
    if (this.state.url) {
      this.handleSubmit();
    }
  }

  handleChange = e => {
    this.setState({
      url: e.target.value,
      error: null,
    });
  };

  handleError = response => {
    if (response.status === 404) {
      this.setState({
        loading: false,
        error:
          'We couldn’t find any recipes on this page. Let us know and we’ll try to do better next time :)',
      });
      return;
    }

    this.setState({
      loading: false,
      error: 'Whoops, something went wrong while trying to get the recipe.',
    });
  };

  handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    if (!isUrl(this.state.url)) {
      this.setState({
        error: 'It looks like you didn’t enter a valid url.',
      });
      return;
    }

    this.setState({
      error: null,
      loading: true,
    });

    const requestHeaders = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    fetch(API_URL, {
      headers: requestHeaders,
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        url: this.state.url,
      }),
    })
      .then(response => {
        if (!response.ok) {
          this.handleError(response);
          return;
        }

        this.setState({
          loading: false,
        });

        return response.json().then(this.props.setRecipe);
      })
      .catch(this.handleError);
  };

  render() {
    const { url, error } = this.state;

    return (
      <div>
        <div class={style.layout}>
          <Helmet title="Radys, makes your recipes kitchen friendly." />
          <div class={style.inner}>
            <h1 class={style.heading}>
              <Logo width={180} />
            </h1>
            <p class={style.subheading}>
              Create a kitchen-friendly view of your recipes.{/*
              <a href="#">Read more</a>.*/}
            </p>
            <form onSubmit={this.handleSubmit} novalidate>
              <label class={style.label} for="recipe-url">
                Paste the url of the website that contains the recipe.
              </label>
              <input
                id="recipe-url"
                type="url"
                value={url}
                onKeyUp={this.handleChange}
                onBlur={this.handleChange}
                class={style.input}
                placeholder="Paste in the url of a recipe..."
                autofill
                autofocus
              />
              <button
                class={`${style.button} ${this.state.loading
                  ? style.isLoading
                  : ''}`}
              >
                {this.state.loading && <Spinner />}
                <span>Start cooking</span>
              </button>
              {error && <p class={style.error}>{error}</p>}
            </form>
          </div>
        </div>
        <div class={style.background} aria-hidden />
      </div>
    );
  }
}
