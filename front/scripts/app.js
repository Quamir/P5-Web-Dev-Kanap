// GET Request for homepage to display products
function getProducts(){

    fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) =>{
        
        // creates products for the homepage using the data for the GET Request
        data.forEach(function(product){

            // creates new html elements 
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
        });
    })
}

getProducts();
