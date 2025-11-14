const DB = {
  get: (k, f) => JSON.parse(localStorage.getItem(k) || JSON.stringify(f)),
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};
const PRODUCTS = [
  {id:"p1", title:"Wireless Headphones", price:1499, desc:"Bass-boosted wireless headset.", img:"https://cdn.pixabay.com/photo/2016/11/19/16/33/audio-1840195_1280.jpg" },
  {id:"p2", title:"Smart Watch Pro", price:2799, desc:"Fitness tracking smartwatch.", img:"https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_640.jpg" },
  {id:"p3", title:"RGB Keyboard", price:2499, desc:"Mechanical RGB keyboard.", img:"https://cdn.pixabay.com/photo/2024/10/30/10/53/ai-generated-9161446_640.jpg" },
  {id:"p4", title:"Gaming Mouse", price:899, desc:"High-precision gaming mouse.", img:"https://cdn.pixabay.com/photo/2025/02/25/15/41/ai-generated-9430816_640.png" },
  {id:"p5", title:"Bluetooth Speaker", price:1599, desc:"Portable, loud wireless speaker.", img:"https://cdn.pixabay.com/photo/2019/07/02/07/39/bluetooth-4311748_640.jpg" },
  {id:"p6", title:"Laptop Cooling Pad", price:999, desc:"Dual-fan laptop cooling pad.", img:"https://cdn.pixabay.com/photo/2021/06/13/08/15/laptop-6332543_640.jpg" },
  {id:"p7", title:"USB-C Fast Charger", price:749, desc:"25W fast charging adapter.", img:"https://cdn.pixabay.com/photo/2019/09/23/14/33/cable-4498745_640.jpg" },
  {id:"p8", title:"Fitness Band Lite", price:1299, desc:"Tracks steps and sleep cycles.", img:"https://cdn.pixabay.com/photo/2017/07/31/11/39/green-2557523_640.jpg" },
  {id:"p9", title:"Wireless Earbuds", price:1799, desc:"Noise-reduction stereo earbuds.", img:"https://cdn.pixabay.com/photo/2021/06/26/10/44/airpods-6365870_1280.jpg" },
  {id:"p10", title:"Tripod Stand", price:499, desc:"Adjustable tripod for smartphone.", img:"https://cdn.pixabay.com/photo/2017/10/05/08/26/manfrotto-tripod-2818673_640.jpg" },
  {id:"p11", title:"LED Desk Lamp", price:699, desc:"Touch control foldable desk lamp.", img:"https://cdn.pixabay.com/photo/2022/02/07/14/15/lamp-6999488_640.jpg" },
  {id:"p12", title:"Power Bank 10,000mAh", price:1199, desc:"Compact fast-charging power bank.", img:"https://cdn.pixabay.com/photo/2017/01/31/18/47/bank-2026358_1280.png" },
  {id:"p13", title:"4K HDMI Cable", price:349, desc:"High-speed HDMI cable with 4K.", img:"https://cdn.pixabay.com/photo/2021/03/03/14/26/hdmi-6065421_640.jpg" },
  {id:"p14", title:"USB Desk Fan", price:499, desc:"Silent USB-powered mini fan.", img:"https://cdn.pixabay.com/photo/2014/05/21/15/48/fan-349932_640.jpg" },
  {id:"p15", title:"Wireless Charging Pad", price:799, desc:"10W fast wireless charger.", img:"https://cdn.pixabay.com/photo/2020/09/03/15/31/wireless-charger-5541654_1280.png" },
  {id:"p16", title:"USB Microphone", price:1499, desc:"Clear audio USB microphone.", img:"https://cdn.pixabay.com/photo/2023/02/27/17/47/microphone-7819091_640.png" },
  {id:"p17", title:"Laptop Sleeve", price:899, desc:"Soft padded sleeve for laptops.", img:"https://cdn.pixabay.com/photo/2017/08/10/01/15/macbook-2616768_640.jpg" },
  {id:"p18", title:"Smart WiFi Plug", price:999, desc:"Control appliances via WiFi.", img:"https://cdn.pixabay.com/photo/2013/07/12/14/15/plug-148091_640.png" },
  {id:"p19", title:"VR Headset", price:2199, desc:"Basic VR headset for phones.", img:"https://cdn.pixabay.com/photo/2024/11/21/16/18/ai-generated-9214144_640.jpg" },
  {id:"p20", title:"Mechanical Pencil Set", price:249, desc:"Set of 0.7mm mechanical pencils.", img:"https://cdn.pixabay.com/photo/2018/02/12/18/55/paper-3148907_640.jpg" },
];
DB.set("products", PRODUCTS);
function $(id){ return document.getElementById(id); }
function addProductCard(p, parent) {
  const d = document.createElement("div");
  d.className = "card item-row";
  d.innerHTML = `
    <div class="thumb" style="background-image:url('${p.img}')"></div>
    <div>
      <strong>${p.title}</strong>
      <div class="price">₹${p.price}</div>
      <p class="small">${p.desc}</p>
      <button class="btn">View</button>
    </div>`;
  d.querySelector("button").onclick = () => {
    DB.set("selectedProduct", p.id);
    window.location.href = "/pages/product.html";
  };
  parent.appendChild(d);
}
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  updateHeader();
  if (page === "home") showHome();
  if (page === "products") showProducts();
  if (page === "product") showProductDetail();
  if (page === "cart") showCart();
  if (page === "payment") showPayment();
  if (page === "wishlist") showWishlist();
  if (page === "orders") showOrders();
  if (page === "auth") showAuth();
});
function updateHeader() {
  if ($("wishlist-count")) $("wishlist-count").textContent = DB.get("wishlist", []).length;
  if ($("cart-count")) $("cart-count").textContent = DB.get("cart", []).reduce((a,b)=>a+b.qty,0);
  if ($("orders-count")) $("orders-count").textContent = DB.get("orders", []).length;
}
function showHome() {
  const list = $("home-products");
  const all = DB.get("products");
  const trending = [...all].sort(() => Math.random() - 0.5).slice(0, 5);
  trending.forEach(p => addProductCard(p, list));
}
function showProducts() {
  const list = $("products-list");
  DB.get("products").forEach(p => addProductCard(p, list));
}
function showProductDetail() {
  const id = DB.get("selectedProduct");
  const p = DB.get("products").find(x => x.id === id);
  $("pd-img").style.backgroundImage = `url('${p.img}')`;
  $("pd-title").textContent = p.title;
  $("pd-price").textContent = "₹" + p.price;
  $("pd-desc").textContent = p.desc;
  $("pd-add-cart").onclick = () => addToCart(p.id);
  $("pd-add-wl").onclick = () => addToWishlist(p.id);
}
function addToCart(id) {
  const c = DB.get("cart", []);
  const f = c.find(x => x.id === id);
  if (f) f.qty++;
  else c.push({ id, qty: 1 });
  DB.set("cart", c);
  updateHeader();
}
function addToWishlist(id) {
  const w = DB.get("wishlist", []);
  if (!w.includes(id)) w.push(id);
  DB.set("wishlist", w);
  updateHeader();
}
function showCart() {
  const list = $("cart-list");
  const c = DB.get("cart", []);
  const p = DB.get("products", []);
  let total = 0;
  if (!c.length) {
    list.textContent = "Your cart is empty";
    return;
  }
  c.forEach(i => {
    const pr = p.find(x => x.id === i.id);
    total += pr.price * i.qty;
    const el = document.createElement("div");
    el.className = "item-row";
    el.innerHTML = `
      <div class="thumb" style="background-image:url('${pr.img}')"></div>
      <div><strong>${pr.title}</strong><br>₹${pr.price} x ${i.qty}</div>`;
    list.appendChild(el);
  });
  $("cart-total").textContent = "Total: ₹" + total;
}
function showPayment() {
  $("payment-form").onsubmit = e => {
    e.preventDefault();
    finishOrder();
  };
}
function finishOrder() {
  const c = DB.get("cart", []);
  if (!c.length) return;
  const p = DB.get("products");
  let total = 0;
  let items = [];
  c.forEach(i => {
    const pr = p.find(x => x.id === i.id);
    total += pr.price * i.qty;
    for (let k = 0; k < i.qty; k++) items.push(i.id);
  });
  const o = DB.get("orders", []);
  const id = "ORD" + Math.floor(Math.random() * 900000 + 100000);
  o.push({ id, items, total, date: new Date().toISOString() });
  DB.set("orders", o);
  DB.set("cart", []);
  window.location.href = "/pages/orders.html";
}
function showWishlist() {
  const w = DB.get("wishlist", []);
  const p = DB.get("products");
  const list = $("wishlist-list");
  if (!w.length) {
    list.textContent = "Your wishlist is empty";
    return;
  }
  w.forEach(id => {
    const pr = p.find(x => x.id === id);
    const el = document.createElement("div");
    el.className = "item-row";
    el.innerHTML = `
      <div class="thumb" style="background-image:url('${pr.img}')"></div>
      <div><strong>${pr.title}</strong><br>₹${pr.price}</div>`;
    list.appendChild(el);
  });
}
function showOrders() {
  const o = DB.get("orders", []);
  const list = $("orders-list");
  if (!o.length) {
    list.textContent = "No orders yet";
    return;
  }
  o.slice().reverse().forEach(x => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <strong>Order ${x.id}</strong><br>
      ₹${x.total}<br>
      <span class="small">${new Date(x.date).toLocaleString()}</span>`;
    list.appendChild(el);
  });
}
function showAuth() {
  const user = DB.get("authUser");
  if (user) {
    $("auth-box").innerHTML = `
      <h2>Account</h2>
      <p class="small"><strong>${user.name}</strong><br>${user.email}</p>
      <button class="btn" id="logout-btn">Logout</button>`;
    $("logout-btn").onclick = () => {
      DB.set("authUser", null);
      window.location.reload();
    };
    return;
  }
  $("btn-login").onclick = doLogin;
  $("btn-sign").onclick = doSign;
  $("go-sign").onclick = () => toggleAuth(true);
  $("go-login").onclick = () => toggleAuth(false);
}
function toggleAuth(sign) {
  $("auth-login").style.display = sign ? "none" : "block";
  $("auth-sign").style.display = sign ? "block" : "none";
}
function doLogin() {
  const email = $("login-email").value;
  const pass = $("login-pass").value;
  const users = DB.get("users", []);
  const u = users.find(x => x.email === email && x.pass === pass);
  if (!u) return alert("Wrong email or password");
  DB.set("authUser", u);
  window.location.reload();
}
function doSign() {
  const name = $("sign-name").value;
  const email = $("sign-email").value;
  const pass = $("sign-pass").value;
  const users = DB.get("users", []);
  if (users.find(x => x.email === email)) return alert("Email already exists");
  users.push({ name, email, pass });
  DB.set("users", users);
  DB.set("authUser", { name, email, pass });
  window.location.reload();
}

