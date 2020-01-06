import api from './api.js';
import { renderLoader } from "./ui.js";

const { getBeerComments } = api();
const { createBeerComment } = api();

const commentBeerTemplate = (comment) => `
    <p class="comment-date">
        ${new Date(comment.dateComment).toLocaleString('es-ES', { year: "2-digit", month: "2-digit", day: "2-digit"})}
        -
        ${new Date(comment.dateComment).toLocaleString('es-ES', {hour12:true, hour: "numeric", minute: "numeric", seconds:"numeric"})}
    </p>
    <p class="comment-text">
        ${comment.comment}
    </p>
`;

const commentContainerTemplate = (comment) => `
    <div class="container">
        <div class="card-detail">
            <div id="container-detail" class="container-detail">
                <div class="detail-text">
                    <h3>Users Comments</h3>
                    <hr class="separador">
                    <div id="comments-list">
                        ${comment}
                    </div>
                    <p></p>
                    <p></p>
                </div>
                
                <div class="detail-comments">
                    <div class="detail-text">
                        <h3>Añadir comentario</h3>
                        <hr class="separador">
                    </div>  
                    <form id="comment-form" class="comment-form" novalidate>
                        <div class="comment-input">
                            <textarea id="comment-value">Texto comentarios</textarea>
                        </div>
                        <button type="submit" class="button-comment">Add comment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
`;

const commentsRender = (element, comment) => {

    if (comment) {
        const commentsHTML = comment.map(comment => commentBeerTemplate(comment)).join('');
       
        element.innerHTML = commentContainerTemplate(commentsHTML);
        return
    } 

        element.innerHTML = `
        <div class="container">
            <div class="card-detail">
                <div id="container-detail" class="container-detail">
                    <div class="detail-text">
                        <h3>Users Comments</h3>
                        <hr class="separador">
                        <p></p>
                        <p></p>
                        <p class="warning">No hay comentarios</p>
                        <p></p>
                        <p></p>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="detail-comments">
                        <div class="detail-text">
                            <h3>Añadir comentario</h3>
                            <hr class="separador">
                        </div>  
                        <form id="comment-form" class="comment-form" novalidate>
                            <div class="comment-input">
                                <textarea id="comment-value">Texto comentarios</textarea>
                            </div>
                            <button type="submit" class="button-comment">Add comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;    
};

// cada vez que accedas a una entrada, sino hay comentario se crea

const createDefaultComment = async id => {
    const checkComment = await getBeerComments(id);
    if (!checkComment.comment) {
        await createBeerComment(id, "placeholder");
        console.log("COMENTARIO PLACEHOLDER")
    }
}

const removeCommentsList = () => {
    const commentList = document.querySelector('comments');
    commentList.innerHTML = '';
}

const renderBeerComments = async id => {
    try {

        // No sabia otra manera de solucionar el error, el campo comment no existe por defecto,
        // se crea al añadir un comentario, pero si añades el primer comentario, este no queda reflejado
        // hasta que se recarga la pagina de nuevo, asi que he añadido un comentario placeholder
        // cada vez que accedas a una entrada, sino hay comentario se crea

        createDefaultComment(id);

        const commentList = document.querySelector('comments');
        const comments = await getBeerComments(id);
    
        commentsRender(commentList, comments.comment);
    
        // AÑADIR COMENTARIOS
    
        const commentForm = document.querySelector('#comment-form');
        const commentInput = document.querySelector('#comment-value');
        const commentsList = document.querySelector('#comments-list');
        
        commentForm.addEventListener('submit', async evt => {
        evt.preventDefault();
        try {
            renderLoader("hide", "show");
            await createBeerComment(id, commentInput.value);
            const fixBeer = await getBeerComments(id);
            const indexBeer = fixBeer.comment.length-1;
            commentsList.innerHTML += commentBeerTemplate(fixBeer.comment[indexBeer]);
        } catch (err) {
            console.error(err);
        } finally {
            renderLoader("show", "hide");
        }
        });

        // ---- FIN AÑADIR COMENTARIOS

    } catch (err) {
        console.error(err);
    }
};


export {renderBeerComments, removeCommentsList};