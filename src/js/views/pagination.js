import icons from 'url:../../img/icons.svg';
import View from './view.js';
import { RESULT_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generatorMarkup() {
    const pagesNum = Math.ceil(this._data.results.length / RESULT_PER_PAGE);
    const currPage = this._data.page;

    //  page 1 and no others pages
    if (currPage === 1 && pagesNum === 1) return '';

    // page 1 and  other pages
    if (currPage === 1 && pagesNum > 1)
      return `
    <button data-goto ="${
      currPage + 1
    }"class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
    // last page
    if (currPage === pagesNum && pagesNum > 1)
      return `
    <button data-goto ="${
      currPage - 1
    }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
    `;

    // other page
    if (currPage < pagesNum && currPage > 1)
      return `
    <button data-goto ="${
      currPage - 1
    }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto ="${
            currPage + 1
          }"class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }
}

export default new PaginationView();
