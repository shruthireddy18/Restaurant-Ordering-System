let isLogin=true;
let subTotal=0;

function toggleAuth(){
 isLogin=!isLogin;
 document.getElementById('authTitle').innerText=isLogin?'Login':'Register';
}

function handleAuth(){
 const u=username.value,p=password.value;
 if(!u||!p){alert('Enter credentials');return;}
 if(isLogin){
  const user=JSON.parse(localStorage.getItem(u));
  if(!user||user.password!==p){alert('Invalid login');return;}
 } else {
  localStorage.setItem(u,JSON.stringify({password:p}));
  alert('Registered successfully');
  toggleAuth();return;
 }
 authSection.style.display='none';
 restaurantSection.style.display='block';
}

function logout(){location.reload();}

function addToCart(item,price){
 const li=document.createElement('li');
 li.innerHTML=`${item} - ₹${price} <button onclick="removeItem(this,${price})">X</button>`;
 cartItems.appendChild(li);
 subTotal+=price;updateTotals();
}

function removeItem(btn,price){
 btn.parentElement.remove();
 subTotal-=price;updateTotals();
}

function updateTotals(){
 const gst=subTotal*0.05;
 const discount=subTotal*0.10;
 const total=subTotal+gst-discount;
 subTotalElem.innerText='₹'+subTotal;
 gstElem.innerText='₹'+gst.toFixed(2);
 discountElem.innerText='-₹'+discount.toFixed(2);
 finalTotal.innerText='₹'+total.toFixed(2);
}

function checkout(){
 if(subTotal===0){alert('Cart empty');return;}
 alert('🎉 Order placed successfully!');
 cartItems.innerHTML='';
 subTotal=0;updateTotals();
}
