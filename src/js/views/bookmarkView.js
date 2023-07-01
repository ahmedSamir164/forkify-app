import View from './View.js';
import icons from 'url:../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _generatorMarkup() {
    return this._data.map(this.generatorSearchResult).join('');
    // return this.generatorSearchResult(this._data);
  }

  generatorSearchResult(i) {
    const Id = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${
              Id === i.id ? 'preview__link--active' : ''
            }" href="#${i.id}">
              <figure class="preview__fig">
                <img src=${i.image} alt=${i.title}/>
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${i.title}</h4>
                <p class="preview__publisher">${i.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href=${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
  }

  addHandlerRenderBookmarks(handler) {
    window.addEventListener('load', handler);
  }
}

export default new bookmarkView();
