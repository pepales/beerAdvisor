import { toggle, toggleClass } from './ui.js';

const navbar = document.querySelector('.filter-container');
const openSearch = document.querySelector('#navbar-search');
const closeSearch = document.querySelector('#navbar-close');
const darkScreen = document.querySelector('#modal-container')

const handleNavBar = toggle(navbar)
const beerIcon = toggle(openSearch)
const crossIcon = toggle(closeSearch)

openSearch.addEventListener('click', () => {
  handleNavBar('hide','show')
  beerIcon('show','hide')
  crossIcon('hide','show')
  toggleClass(darkScreen, 'dark-screen')
});

closeSearch.addEventListener('click', () => {
  handleNavBar('show','hide')
  beerIcon('hide','show')
  crossIcon('show','hide')
  toggleClass(darkScreen, 'dark-screen')
});
