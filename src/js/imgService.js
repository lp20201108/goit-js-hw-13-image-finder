import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';
import {notice, success, error, defaultModules, Notice, ModuleEntry} from '@pnotify/core';
import refs from './refs.js';
import appendMarkup from './markup.js';

import * as basicLightbox from 'basiclightbox';
import  '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
// import infiniteScroll from '../../node_modules/infinite-scroll/dist/infinite-scroll.pkgd.js';
// // import InfiniteScroll from 'infinite-scroll';
// console.log(infiniteScroll);

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

        if (searchQuery.length === 0) {
            notice({
  title: 'NICE TRY!',
  text: ' But we still need you to enter a word. In English, please :)',
  delay: 2000
});
            return
        }
        else if (!data.hits.length) {
          return error({
            text: 'Wrong query!Please, try again!',
            delay: 2000,
          });
        } else if (data.hits.length < 12 && data.hits.length > 0) {
          success({
          title: 'Awesome!',
          text: 'These are all the images we have found! Enter next query.',
         delay: Infinity
          });

            refs.loadBtn.classList.add('is-hidden');
        } else {

            refs.loadBtn.classList.remove('is-hidden');
        }
      
       
        appendMarkup(data);

           

        window.scrollTo({
          top: window.scrollY + window.innerHeight,
          // top: document.documentElement.offsetHeight,
          behavior: "smooth",
        });

        refs.gallery.addEventListener('click', openModal);       
         
      })
      .catch(err => console.log(err));
  },
  
};

 
function openModal(event) {


    if (event.target.nodeName !== 'IMG') {
    return;
  } else {
    let imgUrl = event.target.getAttribute('data-largeImg');
      // console.log(imgUrl);
     const instance = basicLightbox.create(
      `<img  src="${imgUrl}" width="1200" height="900">`);
    //  console.log(event.target);
    instance.show();   
  }  
}