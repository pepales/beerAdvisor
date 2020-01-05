import { renderBeersDOM } from './beers.js';

page('/', () => { // eslint-disable-line
    console.log('Home page');
    renderBeersDOM();
  });

page();