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
   console.log(cart);
   console.log('cart is empty');
}else{
    cart = JSON.parse(cartData);
    console.log("cart has items in it");
}


class Products{

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

        data.forEach(function(data){

            if(getProductId === data._id){
                
                priceEl.innerText =  data.price;
                descriptionEl.innerText = data.description;
                titleEl.innerText = data.name;
                pageTitle.innerText = data.name;

                // createImgEl(data,productImage);
                imgTag.src = data.imageUrl;
                imgTag.alt = data.altTxt;
                imgTag.className = "new__img";

                productImage.appendChild(imgTag);

                
                data.colors.forEach(function(color){
                    const option = document.createElement('option');
                    option.innerText = color;
                    selectColor.appendChild(option);
                });
    
            }
            
        });

    }
    
    addToCart(){

        addToCartBtn.addEventListener('click',(event)=>{
            
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

                console.log(findIdex);
                //  quantity logic 
                const newQuantity = parseInt(cart[findIdex].quantity) + parseInt(item.quantity);
                cart[findIdex].quantity = String(newQuantity);

                console.log(cart);
            }  

            LocalStorage.saveCart();
        });
        
    }
    
}


// local storage 

class LocalStorage{

    static saveProducts(data){
        localStorage.setItem("data", JSON.stringify(data));
    }


    static saveCart(){
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

document.addEventListener("DOMContentLoaded", () =>{
    const ui = new UI();
    const products = new Products();

    // get all products 
    products.fetchProducts().then(data =>{
    ui.renderProducts(data);
    LocalStorage.saveProducts(data);
    }).then(() =>{
        ui.addToCart();
    });
});

