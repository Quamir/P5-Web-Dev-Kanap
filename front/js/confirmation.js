const orderId = document.getElementById('orderId');
const getProductId = location.search.substring(4);  
orderId.innerHTML = getProductId;

let cartData = localStorage.getItem('cart');
let cart;
cart = []
console.log(cart);
localStorage.setItem('cart', JSON.stringify(cart));

