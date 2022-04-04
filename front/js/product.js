const productImage = document.querySelector('.item__img');
const selectColor = document.getElementById('colors');
const priceEl = document.getElementById('price');
const descriptionEl = document.getElementById('description');
const titleEl = document.getElementById('title');
const pageTitle = document.querySelector('title');
const quantityInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('addToCart');
const imgTag = document.createElement('img');

const getProductId = location.search.substring(4);  
let cartData = localStorage.getItem('cart');
let cart;

if(cartData === null){
   cart = [];
}else{
    cart = JSON.parse(cartData);
}

class Products{
    // gets data From api with a GET Request 
    async fetchProducts(){
        
        try{
            let result = await fetch('http://localhost:3000/api/products');
            let data = await result.json();

            return data;
            
        }catch(error){
            console.log(error);
        }
    }    
}

// display
class UI{

  
    renderProducts(data){
        // Uses data from get request to render product image and information
        data.forEach(function(data){

            if(getProductId === data._id){
                
                priceEl.innerText =  data.price;
                descriptionEl.innerText = data.description;
                titleEl.innerText = data.name;
                pageTitle.innerText = data.name;

                imgTag.src = data.imageUrl;
                imgTag.alt = data.altTxt;
                imgTag.className = "new__img";

                productImage.appendChild(imgTag);
                // searches the array for the color array the values
                // The values in the color array are added as options in the dropdown menu
                data.colors.forEach(function(color){
                    const option = document.createElement('option');
                    option.innerText = color;
                    selectColor.appendChild(option);
                });
            }
        });
    }
    
    addToCart(){

        // creates an object out of user selected values
        addToCartBtn.addEventListener('click', ()=>{
            
            const item = {
                id : getProductId,
                name: titleEl.innerText,
                price : priceEl.innerText,
                img: imgTag.src,
                description: descriptionEl.innerText,
                altTxt: imgTag.alt,
                color : selectColor.value,
                quantity  : quantityInput.value
            }
            // checks if the item is already in the cart 
            const findIdex = cart.findIndex((cartItems) =>{
                return cartItems.id === item.id && cartItems.color === item.color;
           });

           console.log(findIdex);

           if(cart === []){
                console.log("first item in cart");
                cart.push(item);
            }else if(findIdex === -1){
                cart.push(item);
                console.log(cart);
            }else{
                // if the cart is not empty and the item is already in the cart 
                // the quantity of the item is increased 
                console.log(findIdex);
                const newQuantity = parseInt(cart[findIdex].quantity) + parseInt(item.quantity);
                cart[findIdex].quantity = String(newQuantity);

                console.log(cart);
            }  
            LocalStorage.saveCart(cart);
        });
    }
}

class LocalStorage{
    // puts the array of products into localStorage 
    static saveCart(){
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// initializes classes and start the http request 
// begins rendering products 
// and set the EventListener on the add to cart button
document.addEventListener("DOMContentLoaded", () =>{

    const ui = new UI();
    const products = new Products();

    products.fetchProducts().then(data =>{
    ui.renderProducts(data);
    }).then(() =>{
        ui.addToCart();
    });
});

