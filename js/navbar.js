import { toggle } from './ui.js';

const navbar = document.querySelector('.filter-container');
const openSearch = document.querySelector('#navbar-search');
const closeSearch = document.querySelector('#navbar-close');

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
