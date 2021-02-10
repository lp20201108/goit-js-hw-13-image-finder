
import style from './css/style.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import refs from './js/refs.js';
import imgService from './js/imgService.js';


let page = 1;
let input = '';

refs.form.addEventListener('submit', searchImgHandler);
refs.loadBtn.addEventListener('click', loadMore);

function searchImgHandler(event) {
  event.preventDefault();
  refs.gallery.innerHTML = "";
  input = event.target[0].value;
  imgService.fetchAPI(input);
 }

function loadMore(event) {
      imgService.fetchAPI(input, ++page)
  }

  









