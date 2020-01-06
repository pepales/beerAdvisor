import { renderLoader } from "./ui.js";
import api from "./api.js";
import {removeCommentsList} from './beercomments.js';


const templateBeer = ({ beerId, name, image, firstBrewed, likes }) => `    
    <a id="beer" href="/detail/${beerId}">
        <div class="card">
            <div class="content-title">
                <h2>● ${name} ●</h2>
            </div>
            <img src="${image}" />
            <div class="content-text">
                <p>${firstBrewed}</p>
                <p>
                  <i class="fas fa-heart"></i>
                  ${likes}
              </p>
            </div>
        </div>
    </a>
`;

const renderBeers = (element, beers) => {
  const htmlBeers = beers.map(templateBeer).join("");
  element.innerHTML = `
      <div class="container">
    ${htmlBeers}
      </div>`;
};

const renderNoResult = element => {
  element.innerHTML = `
      <div class="container">
        <p class="warning">No hay resultados con esos criterios de búsqueda</p>
      </div>`;
};

const { getBeers } = api();

const renderBeersDOM = async (date, text) => {
  try {
    renderLoader("hide", "show");
    removeCommentsList();
    const mainSection = document.querySelector("main");
    const beers = await getBeers(text);
    renderBeers(mainSection, beers);
    if (date) {
      const filterBeers = beers.filter(
        beer => beer.firstBrewed.split("/")[1] === date
      );
      if (filterBeers.length === 0) {
        return renderNoResult(mainSection);
      } else {
        return renderBeers(mainSection, filterBeers);
      }
    }
    if (beers.length === 0) {
      return renderNoResult(mainSection);
    }
  } catch (err) {
    console.error(err);
  } finally {
    renderLoader("show", "hide");
  }
};

export {renderBeersDOM};
