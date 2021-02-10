import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import refs from './refs.js';
import appendMarkup from './markup.js';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';


const KEY = '20207250-3e42ced94c2caff6bd60b0b02';
const baseUrl = "https://pixabay.com/api/";

export default {

  fetchAPI(searchQuery, page = 1) {
    const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${KEY}`;
   
    fetch(url)
      .then(response => (response.status === 200) ? response.json() : '')
      .then(data => {
        console.log(data.hits.length);
        // console.log(data);
        if (data.hits.length) {
         refs.loadBtn.classList.remove('is-hidden');
        } else {
          refs.loadBtn.classList.add('is-hidden');
          error({
            text: 'Please, try again!',
            delay: 1000,
          });
        }
        appendMarkup(data);

     refs.loadBtn.classList.remove('is-hidden');
       
           
        window.scrollTo({
          top: window.scrollY + window.innerHeight,
          // top: document.documentElement.offsetHeight,
          behavior: "smooth",
        });

    
       
         
      })
      .catch(err => console.log(err));
  },

};

 