  
  
import imageCard from "../templates/imageCard.hbs";
import refs from './refs.js';

const KEY = '20207250-3e42ced94c2caff6bd60b0b02';
const baseUrl = "https://pixabay.com/api/";

let page = 1;
let input = '';

export default function fetchAPI(searchQuery) {
      const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${KEY}`;
   
    fetch(url)
        .then(response => (response.status === 200)? response.json(): '')
        .then(data => {
        // console.log(data);
            appendMarkup(data);
               window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: "smooth",
        });
       
           refs.loadBtn.classList.remove('is-hidden');
    })
    .catch(err => console.log(err));
}



function appendMarkup(data) {
    let image= imageCard(data.hits); 
    refs.gallery.insertAdjacentHTML('beforeend',image); 
};


refs.form.addEventListener('submit', searchImgHandler);

function searchImgHandler(event) {
    event.preventDefault();
  refs.gallery.innerHTML = "";
 input = event.target[0].value;
    // console.log(input);
    fetchAPI(input);
  
}


refs.loadBtn.addEventListener('click', loadMore);
function loadMore(event) {
        page+= 1;
    fetchAPI(input)
  
}