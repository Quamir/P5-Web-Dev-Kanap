const totalPrice = document.getElementById('totalPrice');

let cartData = localStorage.getItem('cart');
let cart;
let contact ={}
cart = JSON.parse(cartData);

console.log(cart);


class CartItem{

    constructor(){
        this.section = document.getElementById('cart__items');
    }

    renderCartItems(){

        const totalQuantity = document.getElementById('totalQuantity');
    
        cart.forEach(item =>{

            let itemElement = `
            <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
              <img src="${item.img}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>€${item.price * item.quantity}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>${item.quantity} : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Delete</p>
                </div>
              </div>
            </div>
            </article> 
            
            `;
            const listItem = document.createElement('div');
            listItem.innerHTML = itemElement;
            this.section.appendChild(listItem);
            totalCartItems();
            totalCartPrice();
            
        });


        function totalCartItems(){
            let items = 0;
            cart.forEach(item =>{
                items +=1;
            });

           totalQuantity.innerHTML = items;
        }
  
    } 

   
    userChanges(){

        let quantityBtn = document.querySelectorAll('.itemQuantity');

        function chnageQuantity(){
            quantityBtn.forEach((btn) =>{

                btn.addEventListener('click', () =>{
              
                const btnItemId = btn.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
                const getItemPrice = btn.parentNode.parentNode.previousElementSibling;
                const price = getItemPrice.children[2];
                const btnColor = btn.parentNode.parentNode.previousElementSibling;
                const btnItemColor = btnColor.children[1].textContent;
                const btnItemquantity = btn.previousElementSibling;

                console.log(price.innerText.slice(1));
                // const newPrice = price.innerText.slice(1);
                    
                const findIndex = cart.findIndex((cartItems) =>{
                    return cartItems.id === btnItemId && cartItems.color === btnItemColor;
               });

    
               console.log(findIndex);
               cart[findIndex].quantity = btn.value;
           
                btnItemquantity.innerHTML = `${cart[findIndex].quantity}`;
                price.innerHTML = `€${ cart[findIndex].price * btn.value}`;

                totalCartPrice();
                LocalStorage.saveCart();
                });
            });
        }



        function deleteItem(){
            let deleteBtn = document.querySelectorAll('.deleteItem');
            
            deleteBtn.forEach((btn) =>{
                btn.addEventListener('click', () => {

                    const articleNode = btn.parentNode.parentNode.parentNode.parentNode;
                    const btnId = articleNode.getAttribute('data-id');

                    const findIndex = cart.findIndex((cartItems) =>{
                        return cartItems.id === btnId;
                   });
                 
                    cart.splice(findIndex,1);                   
                    articleNode.remove();
                    totalCartPrice();
                    LocalStorage.saveCart();
                });
            });
        }
       
        chnageQuantity();
        deleteItem();
    }

    
}

class UserInputForm{

    confrimOrder(){

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const email = document.getElementById('email');
        const confrimOrderBtn = document.getElementById('order');

        // ERRORS
        const firstNameErr = document.getElementById('firstNameErrorMsg');
        const lastNameErr = document.getElementById('lastNameErrorMsg');
        const addressErr = document.getElementById('addressErrorMsg');
        const cityErr = document.getElementById('cityErrorMsg');
        const emailErr = document.getElementById('emailErrorMsg');


        confrimOrderBtn.addEventListener('click', (event) =>{

            event.preventDefault();

            firstNameErr.innerText = ' ';
            lastNameErr.innerText = ' ';
            addressErr.innerText = ' ';
            cityErr.innerText = ' ';
            emailErr.innerText = ' ';

            const regxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const regxNames = /^[a-z ,.'-]+$/i;
            console.log(firstName);
            
            if(regxNames.test(firstName.value) === false){  
                firstNameErr.innerText = 'please enter a vaild first name';
                firstNameErr.style.color = 'red';
            }
            console.log(firstName.value);
            if(regxNames.test(lastName.value) === false){
                lastNameErr.innerHTML = 'please enter a vaild last name';
                lastNameErr.style.color = 'red';
            }
            if(address.value === ''){
                addressErr.innerText = 'please enter a vaild address';
                addressErr.style.color = 'red';
            }
            if(city.value === ''){
                cityErr.innerHTML = 'please enter a vaild city';
                cityErr.style.color = 'red';
            }
            if(regxEmail.test(email.value) === false){
        
                emailErr.innerHTML = 'please enter a vaild email address';
                emailErr.style.color = 'red';
            }

            const newArray = [];

            cart.forEach(item =>{
                newArray.push(item.id);
            });

           const postaData = {
            contact: {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                address: address.value.trim(),
                city: city.value.trim(),
                email: email.value.trim()
            },

            products: newArray
           } 

            console.log(newArray);
            console.log((postaData));

            Post.SendData(postaData);
           
        });

    }
}

class Post{

    static async SendData(bodyData){
       fetch(' http://localhost:3000/api/products/order',{
         method: 'post',
         body: JSON.stringify(bodyData),
         headers:{
            'Content-Type':'application/json'
         }
       }).then(function (response){
           return response.text();
       }).then(function (text){
           const parseText = JSON.parse(text)
           console.log(parseText);
           console.log(parseText.orderId);
           window.location.replace(`./confirmation.html?id=${parseText.orderId}`);
       }).catch(function (error){
           console.log(error);
       })
    }

}


class LocalStorage{

    static saveCart(){
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}


function totalCartPrice(){
    const cartItemContentDescription = document.querySelectorAll('.cart__item__content__description');
    let totalItems = 0;
    
    cartItemContentDescription.forEach(item =>{
        totalItems += parseInt(item.children[2].innerText.slice(1));
        console.log(totalItems);
    });
    totalPrice.innerHTML = totalItems;
}


document.addEventListener("DOMContentLoaded", () =>{
    const cartItem = new CartItem();
    const order = new UserInputForm();
    const post = new Post();

    cartItem.renderCartItems();
    cartItem.userChanges();
    order.confrimOrder();
});
 


