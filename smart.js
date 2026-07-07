const products=[
{id:1,name:"Laptop",category:"Electronics",price:50000},
{id:2,name:"Mouse",category:"Electronics",price:700},
{id:3,name:"Keyboard",category:"Electronics",price:1200},
{id:4,name:"Notebook",category:"Stationery",price:80},
{id:5,name:"Pen",category:"Stationery",price:20},
{id:6,name:"Pencil",category:"Stationery",price:10},
{id:7,name:"Water Bottle",category:"Accessories",price:350},
{id:8,name:"Bag",category:"Accessories",price:900},
{id:9,name:"Headphones",category:"Electronics",price:2500},
{id:10,name:"Calculator",category:"Stationery",price:600}
];

let cart=[];
let discount=0;

function displayProducts(list){

const container=document.getElementById("products");

container.innerHTML="";

list.forEach(product=>{

container.innerHTML+=`

<div class="card">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p>₹${product.price}</p>

<button onclick="addCart(${product.id})">Add To Cart</button>

</div>

`;

});

}

displayProducts(products);

document.getElementById("search").addEventListener("keyup",filterProducts);

document.getElementById("category").addEventListener("change",filterProducts);

function filterProducts(){

let search=document.getElementById("search").value.toLowerCase();

let category=document.getElementById("category").value;

let filtered=products.filter(p=>{

let matchName=p.name.toLowerCase().includes(search);

let matchCategory=(category=="All"||p.category==category);

return matchName && matchCategory;

});

displayProducts(filtered);

}

function addCart(id){

let item=cart.find(x=>x.id==id);

if(item){

item.qty++;

}

else{

let product=products.find(x=>x.id==id);

cart.push({...product,qty:1});

}

showCart();

}

function showCart(){

let body=document.getElementById("cartBody");

body.innerHTML="";

let total=0;

let items=0;

cart.forEach(item=>{

let sub=item.price*item.qty;

total+=sub;

items+=item.qty;

body.innerHTML+=`

<tr>

<td>${item.name}</td>

<td>${item.price}</td>

<td>

<button onclick="changeQty(${item.id},-1)">-</button>

${item.qty}

<button onclick="changeQty(${item.id},1)">+</button>

</td>

<td>${sub}</td>

<td>

<button onclick="removeItem(${item.id})">Remove</button>

</td>

</tr>

`;

});

document.getElementById("items").innerHTML="Items : "+items;

document.getElementById("price").innerHTML="Total : ₹"+total;

}

function changeQty(id,value){

let item=cart.find(x=>x.id==id);

item.qty+=value;

if(item.qty<=0){

cart=cart.filter(x=>x.id!=id);

}

showCart();

}

function removeItem(id){

cart=cart.filter(x=>x.id!=id);

showCart();

}

function applyCoupon(){

let code=document.getElementById("coupon").value;

if(code=="SAVE10"){

discount=10;

document.getElementById("couponMsg").innerHTML="10% Discount Applied";

}

else if(code=="SAVE20"){

discount=20;

document.getElementById("couponMsg").innerHTML="20% Discount Applied";

}

else{

discount=0;

document.getElementById("couponMsg").innerHTML="Invalid Coupon";

}

}

function checkout(){

if(cart.length==0){

alert("Cart Empty");

return;

}

let name=document.getElementById("customerName").value;

if(name==""){

alert("Enter Customer Name");

return;

}

let subtotal=0;

let invoice="";

cart.forEach(item=>{

subtotal+=item.price*item.qty;

invoice+=`${item.name} (${item.qty}) = ₹${item.price*item.qty}<br>`;

});

let discountAmount=subtotal*discount/100;

let afterDiscount=subtotal-discountAmount;

let gst=afterDiscount*0.18;

let grand=afterDiscount+gst;

let invoiceNo=Math.floor(Math.random()*100000);

let date=new Date().toLocaleDateString();

document.getElementById("invoice").innerHTML=`

<h3>Invoice</h3>

<p><b>Name:</b> ${name}</p>

<p><b>Invoice No:</b> ${invoiceNo}</p>

<p><b>Date:</b> ${date}</p>

<hr>

${invoice}

<hr>

<p>Subtotal : ₹${subtotal}</p>

<p>Discount : ₹${discountAmount}</p>

<p>GST (18%) : ₹${gst.toFixed(2)}</p>

<h3>Grand Total : ₹${grand.toFixed(2)}</h3>

`;

alert("Checkout Successful");

cart=[];

discount=0;

document.getElementById("coupon").value="";

document.getElementById("couponMsg").innerHTML="";

showCart();

}