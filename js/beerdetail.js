import api from './api.js';
import { renderLoader } from "./ui.js";
import { addLikeListener } from "./beercomments.js";

const { getBeerID } = api();


const detailBeerTemplate = ({beerId, name, image, firstBrewed, likes, contributedBy , description, brewersTips }) => `
<div class="container-beerdetail">
    <div class="card-detail">
        <div id="container-detail" class="container-detail">
            <div class="detail-title">
                <h2>● ${name} ●</h2>
            </div>
            <img src="${image}" />
            
            <div class="date-text">
                <h3>First Brewed: ${firstBrewed}</h3>
                <h3>
                    <button class="add-like">
                        Like 
                        <i class="fas fa-heart"></i>
                        <span id="like-counter">${likes}</span>
                    </button>
                </h3>  
                

            </div>
            <div class="detail-text">
                <h3>Contributed by:</h3>
                <hr class="separador">
                <p>${contributedBy}</p>
                <h3>Description</h3>
                <hr class="separador">
                <p>
                    ${description}
                </p>
                <h3>Brewers Tips</h3>
                <hr class="separador">
                <p>
                    ${brewersTips}
                </p>
                
            </div>  
        </div>
    </div>
</div>`;

const renderBeerDetail = async id => {
    try {
        renderLoader("hide", "show");
        const selector = document.querySelector('main');
        const beer = await getBeerID(id);
        selector.innerHTML = detailBeerTemplate(beer);
        addLikeListener(id);
    } catch (err) {
        console.error(err);
    } finally {
        renderLoader("show", "hide");
    }
};

export default renderBeerDetail;