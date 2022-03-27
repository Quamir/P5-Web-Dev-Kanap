const orderId = document.getElementById('orderId');
const getProductId = location.search.substring(4);  
orderId.innerHTML = getProductId;