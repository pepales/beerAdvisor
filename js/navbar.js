import { toggle, toggleClass } from './ui.js';
import { renderBeersDOM } from './beers.js';
import storage from './storage.js';


const { setItem, getItem } = storage();

const navbar = document.querySelector('.filter-container');
const openSearch = document.querySelector('#navbar-search');
const closeSearch = document.querySelector('#navbar-close');
const darkScreen = document.querySelector('#modal-container');
const searchForm = document.getElementById('search-form');
const filter = document.getElementById('filter');
const year = document.getElementById('year');

filter.value = getItem('filter-text');
  year.value = getItem('filter-year');

const handleNavBar = toggle(navbar)
const beerIcon = toggle(openSearch)
const crossIcon = toggle(closeSearch)

openSearch.addEventListener('click', () => {
  handleNavBar('hide','show')
  beerIcon('show','hide')
  crossIcon('hide','show')
});

closeSearch.addEventListener('click', () => {
  handleNavBar('show','hide')
  beerIcon('hide','show')
  crossIcon('show','hide')
});

searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log(filter.value);
  console.log(year.value);
    // render shows
    // setItem('navbar-input', searchInput.value);
    renderBeersDOM(year.value,filter.value);
    setItem('filter-text', filter.value);
    setItem('filter-year', year.value);
});