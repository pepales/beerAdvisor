import { renderBeersDOM } from './beers.js';
import renderBeerDetail from './beerdetail.js';
import {renderBeerComments, removeCommentsList} from './beercomments.js';

page('/', () => { // eslint-disable-line
    console.log('Home page');
    renderBeersDOM();
    removeCommentsList();
  });
page('/detail/:id', ctx => {
  console.log('Detail');
  const { params: { id } } = ctx;
  renderBeerDetail(id);
  renderBeerComments(id);
});
page();