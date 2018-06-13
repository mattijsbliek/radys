import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import Helmet from 'preact-helmet';

import Instructions from '~/components/Instructions';
import { IMAGE_PROXY_URL } from '~/helpers/domains';
import IconClock from '~/icons/Clock';
import IconPlate from '~/icons/Plate';

import style from './style';

const BREAKPOINT = 700;

class Recipe extends Component {
  state = {
    imageIsHidden: false,
    ingredientsCanBeHidden: window.innerWidth < BREAKPOINT,
    mobileView: window.innerWidth < BREAKPOINT,
    ingredientsAreVisible: false,
  };

  handleResize = () => {
    const { ingredientsAreVisible } = this.props;
    const { ingredientsCanBeHidden } = this.state;

    if (ingredientsCanBeHidden && window.innerWidth >= BREAKPOINT) {
      this.setState({
        ingredientsCanBeHidden: false,
        mobileView: false,
      });
    } else if (!ingredientsCanBeHidden && window.innerWidth < BREAKPOINT) {
      this.setState({
        ingredientsCanBeHidden: true,
        mobileView: true,
      });
    }

    if (ingredientsAreVisible && window.innerWidth < BREAKPOINT) {
      this.toggleIngredients();
    }
  };

  toggleIngredients = () => {
    this.setState({
      ingredientsAreVisible: !this.state.ingredientsAreVisible,
    });
  };

  hideImage = () => {
    this.setState({
      imageIsHidden: true,
    });
  };

  componentWillMount() {
    const storedRecipe = localStorage.getItem(this.props.id);

    if (!storedRecipe) {
      route('/');
      return;
    }

    this.setState({
      recipe: JSON.parse(storedRecipe),
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  renderImage() {
    const { imageIsHidden, recipe } = this.state;

    if (imageIsHidden) {
      return null;
    }

    return (
      <figure class={style.image}>
        <img
          src={`${IMAGE_PROXY_URL}/${recipe.image}`}
          alt=""
          onError={this.hideImage}
        />
      </figure>
    );
  }

  render() {
    if (!this.state.recipe) {
      return null;
    }

    const { recipe, ingredientsCanBeHidden, mobileView } = this.state;

    const {
      author,
      hostname,
      name,
      image,
      recipeIngredients,
      recipeInstructions,
      description,
      prepTime,
      cookTime,
      totalTime,
      url,
      recipeYield,
    } = recipe;

    return (
      <article class={style.recipe}>
        <Helmet title={`${name} | Radys`} />
        <div class={style.pane}>
          <div class={style.innerPane}>
            <nav class={style.controls}>
              <Link href="/">
                Back
              </Link>
              {ingredientsCanBeHidden && (
                <button type="button" onClick={this.toggleIngredients}>
                  Ingredients
                </button>
              )}
            </nav>
            <header class={`${style.header} ${image ? style.hasImage : ''}`}>
              {image && mobileView && this.renderImage()}
              <h1>{name}</h1>
              <div class={style.subheading}>
                {author && <cite class={style.author}>by {author}</cite>}
                <p class={style.source}>
                  <a href={url} target="_blank" rel="noreferrer noopener">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${hostname}`}
                      alt=""
                    />{' '}
                    {hostname}
                  </a>
                </p>
              </div>
              {description && (
                <div
                  class={style.description}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )}
              <ul class={style.metaData}>
                {prepTime && (
                  <li>
                    <IconClock /> Preperation time: {prepTime}
                  </li>
                )}
                {cookTime && (
                  <li>
                    <IconClock /> Cooking time: {cookTime}
                  </li>
                )}
                {totalTime && (
                  <li>
                    <IconClock /> Total time: {totalTime}
                  </li>
                )}
                {recipeYield && (
                  <li>
                    <IconPlate /> {recipeYield}
                  </li>
                )}
              </ul>
            </header>
            {recipeInstructions && (
              <Instructions recipeInstructions={recipeInstructions} />
            )}
          </div>
        </div>
        <div class={style.pane} aria-hidden={!this.state.ingredientsAreVisible}>
          {image && !mobileView && this.renderImage()}
          <div class={style.ingredients}>
            <h2>Ingredients</h2>
            <ul>
              {recipeIngredients.map(ingredient => <li>{ingredient}</li>)}
            </ul>
          </div>
        </div>
      </article>
    );
  }
}

export default Recipe;
