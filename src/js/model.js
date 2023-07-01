import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config.js';
import { getJson } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: '',
  },
  bookmarks: [],
};

export const loadRecibe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    // Promise.race([getJson(`${API_URL}/${id}`), timeout(0.5)]);
    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.page = 1;
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const pagination = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(i => {
    i.quantity = i.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};

const presistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmarks();
};

export const deletBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);

  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  presistBookmarks();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const uploadRecipe = async function (newREcipe) {
  try {
    const data = Object.entries(newREcipe)
      .filter(e => e[0].startsWith('ingredient') && e[1] !== '')
      .map(e => {
        const ingArr = e[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('wrong ingredients fromat');
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    console.log(data);
  } catch (err) {
    throw err;
  }
};
