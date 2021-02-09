const KEY = '20207250-3e42ced94c2caff6bd60b0b02';
const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=${KEY}`;

const baseUrl = "https://pixabay.com/api/";
const options = {
    headers: {
        Authorization: KEY,
    },
};

fetch(url,options)
    .then(response => response.json())
    .then(({ images }) => console.log(images))
    

.catch (error=> console.log(error));