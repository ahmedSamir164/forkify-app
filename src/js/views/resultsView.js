import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generatorMarkup() {
    return this._data.map(this.generatorSearchResult).join('');
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
}

export default new ResultsView();
