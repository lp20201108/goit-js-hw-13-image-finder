import imageCard from '../templates/imageCard.hbs';
import refs from './refs.js';

function appendMarkup(data) {
    let image= imageCard(data.hits); 
    refs.gallery.insertAdjacentHTML('beforeend', image); 
};

export default appendMarkup;