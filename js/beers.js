import { renderLoader } from './ui.js';
import api from './api.js';

const templateBeer = ({ beerId, name, image, firstBrewed, likes }) => `    
    <a href="/detail/${beerId}">
        <div class="card">
            <div class="content-title">
                <h2>● ${name} ●</h2>
            </div>
            <img src="${image}" />
            <div class="content-text">
                <p>${firstBrewed}</p>
                <p>Likes: ${likes}</p>
            </div>
        </div>
    </a>
`;

const renderBeers = (element, beers) => {
    const htmlBeers = beers.map(templateBeer).join('');
    element.innerHTML = `${htmlBeers}`;
};

const { getBeers } = api();

const renderBeersDOM = async text => {
    try {
      renderLoader('hide', 'show');
      const mainSection = document.querySelector('main');
      const items = await getBeers(text);
      renderBeers(mainSection, items);
    } catch (err) {
      console.error(err);
    } finally {
      renderLoader('show', 'hide');
    }
  };
  
  export { renderBeersDOM };