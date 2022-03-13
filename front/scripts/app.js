
const items = document.getElementById('items');


// Getting information from the api with a GET Request

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/products');

// pre configured JSON parse into JS arrays 
xhr.responseType = 'json';

xhr.onload = function(){
    const listOfProducts = xhr.response;
    console.log(listOfProducts);


    for(const product of listOfProducts){

        // creating dynamic element base off the templete in index.html
        const anchorTag = document.createElement('a');
        const articleTag = document.createElement('article');
        const imgTag = document.createElement('img');
        const headingTag = document.createElement('h3');
        const pTag = document.createElement('p');

        // adds clasess
        headingTag.classList.add("productName");
        pTag.classList.add("productDescription");

        // assigning values to elements 
        imgTag.src = product.imageUrl;
        imgTag.alt = product.altTxt;
        anchorTag.href = `./product.html?id=${product._id}`;
        headingTag.textContent = product.name;
        pTag.textContent = product.description;

        // nesting elements withend each other 
        anchorTag.appendChild(articleTag);
        articleTag.appendChild(imgTag);
        articleTag.appendChild(headingTag);
        articleTag.appendChild(pTag);

        items.appendChild(anchorTag);
    }
   
};



xhr.send();



