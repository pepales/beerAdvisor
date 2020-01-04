const loader = document.querySelector('#loader');

export const toggle = elemento => (removeClass, addClass) => {
    elemento.classList.remove(removeClass);
    elemento.classList.add(addClass);
};
  
export const toggleClass = (elemento, toggleClass) => {
    elemento.classList.toggle(toggleClass);
};

export const renderLoader = toggle(loader);