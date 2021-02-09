import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import imageCard from "../templates/imageCard.hbs";
import refs from './refs.js';
import appendMarkup from './markup.js';

const KEY = '20207250-3e42ced94c2caff6bd60b0b02';
const baseUrl = "https://pixabay.com/api/";

let page = 1;
let input = '';

export default function fetchAPI(searchQuery, page=1) {
      const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${KEY}`;
   
    fetch(url)
        .then(response => (response.status === 200)? response.json(): '')
        .then(data => {
        // console.log(data);
              if (data.hits.length) {
          // console.log(data.hits.length);
          refs.loadBtn.classList.remove('is-hidden');
        } else {
          refs.loadBtn.classList.add('is-hidden');
          error({
            text: 'Please, try again!',
            delay: 1000,
          });
        }
            appendMarkup(data);           
               window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: "smooth",
        });
       
           refs.loadBtn.classList.remove('is-hidden');
    })
    .catch(err => console.log(err));
}



refs.form.addEventListener('submit', searchImgHandler);

function searchImgHandler(event) {
    event.preventDefault();
  refs.gallery.innerHTML = "";
 input = event.target[0].value;
  fetchAPI(input);
  
}


refs.loadBtn.addEventListener('click', loadMore);
function loadMore(event) {
        page+= 1;
    fetchAPI(input, ++page)
  
}