import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/pagination.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlshowRecibe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.pagination());
    bookmarkView.update(model.state.bookmarks);
    await model.loadRecibe(id);

    //render data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSeach = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.pagination());
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPaginationBtn = function (goToPage) {
  resultsView.render(model.pagination(goToPage));
  PaginationView.render(model.state.search);
};

const controlServings = function (goTO) {
  model.updateServings(goTO);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deletBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};
const controlRenderBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const addRecipeController = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRenderBookmarks(controlRenderBookmarks);
  recipeView.addHandlerRender(controlshowRecibe);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSeach);
  PaginationView.addHandlerClick(controlPaginationBtn);
  recipeView.addHandlerServings(controlServings);
  addRecipeView.addHandlerUpload(addRecipeController);
  // addRecipeView.addHandlerShowModal();
};
init();
