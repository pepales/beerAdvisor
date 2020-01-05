import { renderBeersDOM } from './beers.js';
import renderBeerDetail from './beerdetail.js';

page('/', () => { // eslint-disable-line
    console.log('Home page');
    renderBeersDOM();
  });
page('/detail/:id', ctx => {
  console.log('Detail');
  const { params: { id } } = ctx;
  renderBeerDetail(id);
});
page();