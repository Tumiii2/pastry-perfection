const whatsappNumber = "2347034136697";

// Newsletter subscription
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailInput = document.querySelector(".email-input");
const subscribeButton = document.querySelector(".sub-email");
const newsletterMessage = document.getElementById("newsletter-message");

if (subscribeButton) {
  subscribeButton.addEventListener("click", function () {
    const emailValue = emailInput.value;

    if (emailPattern.test(emailValue)) {
      newsletterMessage.textContent = "Subscribed successfully!";
      newsletterMessage.style.color = "green";
    } else {
      newsletterMessage.textContent = "Please enter a valid email";
      newsletterMessage.style.color = "red";
    }

    newsletterMessage.style.display = "block";

    setTimeout(function () {
      newsletterMessage.style.display = "none";
    }, 2000);
  });
}

// ---------------------------------------------
// CART CORE (shared across every page)
// ---------------------------------------------

// Turns "₦ 2,500" into 2500
function parsePrice(priceStr) {
  return Number(String(priceStr).replace(/[^0-9.]/g, ""));
}

// Formats 2500 back into "₦2,500"
function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// item = { id, name, price (number), image }
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find((cartItem) => cartItem.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  renderCart();
}

function updateQuantity(id, newQuantity) {
  const cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) return;

  if (newQuantity < 1) {
    removeFromCart(id);
    return;
  }

  item.quantity = newQuantity;
  saveCart(cart);
  renderCart();
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

function updateCartDisplay() {
  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = getCartCount();
  }
}

updateCartDisplay();

// Add to cart (product page button)
const addToCartButton = document.querySelector(".add-to-cart");
const cartMessage = document.getElementById("cart-message");

if (addToCartButton && cartMessage) {
  addToCartButton.addEventListener("click", function () {
    // `data` and `productId` are defined further down in this file,
    // once the product-page block below has run.
    if (typeof data !== "undefined" && data) {
      addToCart({
        id: productId,
        name: data.name,
        price: parsePrice(data.price),
        image: data.image,
      });
    }

    cartMessage.style.display = "block";

    setTimeout(function () {
      cartMessage.style.display = "none";
    }, 2000);
  });
}

// ---------------------------------------------
// CART PAGE RENDERING (only runs on cart.html)
// ---------------------------------------------

function renderCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (!cartItemsContainer) return; // not on cart.html, skip

  const cart = getCart();
  const cartEmptyMessage = document.querySelector(".cart-empty");
  const cartSummary = document.querySelector(".cart-summary");
  const cartTotalEl = document.querySelector(".cart-total-amount");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    if (cartEmptyMessage) cartEmptyMessage.style.display = "block";
    if (cartSummary) cartSummary.style.display = "none";
    return;
  }

  if (cartEmptyMessage) cartEmptyMessage.style.display = "none";
  if (cartSummary) cartSummary.style.display = "flex";

  cart.forEach((item) => {
    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.dataset.id = item.id;

    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-decrease" aria-label="Decrease quantity">-</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-increase" aria-label="Increase quantity">+</button>
      </div>
      <p class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</p>
      <button class="remove-item" aria-label="Remove item">
        <i class="ph ph-trash"></i>
      </button>
    `;

    cartItemsContainer.appendChild(cartItemEl);
  });

  const cartSubtotalEl = document.querySelector(".cart-subtotal-amount");
  const cartDeliveryEl = document.querySelector(".cart-delivery-amount");

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(getCartTotal());
  if (cartDeliveryEl) cartDeliveryEl.textContent = formatPrice(DELIVERY_FEE);
  if (cartTotalEl) {
    cartTotalEl.textContent = formatPrice(getCartTotal() + DELIVERY_FEE);
  }

  // Wire up buttons for each rendered item
  cartItemsContainer.querySelectorAll(".cart-item").forEach((cartItemEl) => {
    const id = cartItemEl.dataset.id;
    const item = cart.find((cartItem) => cartItem.id === id);

    cartItemEl.querySelector(".qty-increase").addEventListener("click", () => {
      updateQuantity(id, item.quantity + 1);
    });

    cartItemEl.querySelector(".qty-decrease").addEventListener("click", () => {
      updateQuantity(id, item.quantity - 1);
    });

    cartItemEl.querySelector(".remove-item").addEventListener("click", () => {
      removeFromCart(id);
    });
  });
}

// ---------------------------------------------
// CHECKOUT (cart page "Checkout" / "Order on WhatsApp")
// ---------------------------------------------

const DELIVERY_FEE = 1000; // adjust to whatever you charge

function buildOrderMessage(cart) {
  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;

  let message = `Hello Pastry Perfection!%0A%0AI would like to order:%0A%0A`;

  cart.forEach((item) => {
    message += `${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}%0A`;
  });

  message += `%0ASubtotal: ${formatPrice(subtotal)}`;
  message += `%0ADelivery Fee: ${formatPrice(DELIVERY_FEE)}`;
  message += `%0ATotal: ${formatPrice(total)}`;

  return message;
}

function goToWhatsAppWithCart() {
  const cart = getCart();
  if (cart.length === 0) return;

  const message = buildOrderMessage(cart);
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

  localStorage.removeItem("cart");
  window.location.href = "order-confirmation.html";
}

const checkoutButton = document.querySelector(".checkout-btn");
const whatsappCartButton = document.querySelector(".whatsapp-order-cart");

if (checkoutButton) {
  checkoutButton.addEventListener("click", goToWhatsAppWithCart);
}

if (whatsappCartButton) {
  whatsappCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    goToWhatsAppWithCart();
  });
}

renderCart();

// Mobile screen drop down
const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-bar");

if (hamburger && navBar) {
  hamburger.addEventListener("click", function () {
    navBar.classList.toggle("nav-open");
  });
}

// Hero background image rotation
const heroImages = [
  "assets/hero-img-1.jpg",
  "assets/hero-img-2.jpg",
  "assets/hero-img-3.jpg",
  "assets/hero-img-4.jpg",
];

const heroSection = document.getElementById("hero-bg");
let heroIndex = 0;

if (heroSection) {
  function setHeroBg(index) {
    heroSection.style.backgroundImage = `url('${heroImages[index]}')`;
  }

  setHeroBg(heroIndex);

  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    setHeroBg(heroIndex);
  }, 5000);
}

// Scroll reveal animations
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));
}

// Product thumbnails
const mainImage = document.querySelector(".donut");
const thumbnails = document.querySelectorAll(".thumbnails img");

if (mainImage && thumbnails.length > 0) {
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src;

      thumbnails.forEach((t) => t.classList.remove("active-thumb"));
      thumb.classList.add("active-thumb");
    });
  });
}

// Product page
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const products = {
  "milky-doughnuts": {
    name: "Milky Doughnuts",
    price: "₦ 2,500",
    image: "assets/donuts.jpg",
    thumbnails: [
      "assets/donuts.jpg",
      "assets/sugar-donut.jpg",
      "assets/donut-3.jpg",
      "assets/donuts-4.jpg",
    ],
    description:
      "Soft, fluffy doughnuts dipped in a creamy milk glaze and finished with a light dusting of sugar. Made fresh daily for that perfect balance of soft and sweet, best enjoyed warm, straight from the tray.",
  },

  chops: {
    name: "Chops",
    price: "₦ 1,800",
    image: "assets/chops.jpg",
    thumbnails: [
      "assets/chops.jpg",
      "assets/smallchops.jpg",
      "assets/smallchops-2.jpg",
      "assets/samosa.jpg",
    ],
    description:
      "A savory assortment of crispy small chops, golden-fried to perfection and packed with bold, well-seasoned flavor. Perfect for parties, get-togethers, or whenever you're craving something crunchy and satisfying.",
  },

  "choc-chip-cookies": {
    name: "Chocolate Chip Cookies",
    price: "₦ 2,000",
    image: "assets/cookies.jpg",
    thumbnails: [
      "assets/cookies.jpg",
      "assets/cookies 2.jpg",
      "assets/cookies-3.jpg",
      "assets/cookies-4.jpg",
    ],
    description:
      "Classic chocolate chip cookies baked until the edges turn golden while the centers stay soft and chewy. Loaded generously with rich chocolate chips in every bite, they're the ultimate comfort treat with a glass of milk or tea.",
  },

  cupcakes: {
    name: "Cupcakes",
    price: "₦ 2,500",
    image: "assets/cupcake.jpg",
    thumbnails: [
      "assets/cupcake.jpg",
      "assets/cupcake-2.jpg",
      "assets/cupcake-3.jpg",
      "assets/cupcake-4.jpg",
    ],
    description:
      "Moist, fluffy cupcakes baked from scratch and topped with rich, velvety buttercream frosting. Light, sweet, and beautifully finished, they're perfect for birthdays, celebrations, or simply treating yourself.",
  },

  "meat-pie": {
    name: "Meat Pie",
    price: "₦ 1,800",
    image: "assets/meatpie.jpg",
    thumbnails: [
      "assets/meatpie.jpg",
      "assets/meatpie-2.jpg",
      "assets/meatpie-3.jpg",
      "assets/meatpie-4.jpg",
    ],
    description:
      "Flaky, golden pastry generously filled with seasoned minced meat, potatoes, and vegetables. Baked until crisp on the outside and hearty on the inside, it's a satisfying snack any time of day.",
  },

  springrolls: {
    name: "Springrolls",
    price: "₦ 5,000",
    image: "assets/springroll.jpg",
    thumbnails: [
      "assets/springroll.jpg",
      "assets/springroll-3.jpg",
      "assets/springroll-4.jpg",
      "assets/springrolls-2.jpg",
    ],
    description:
      "Crispy, golden-fried springrolls wrapped tightly around a savory vegetable filling seasoned to perfection. Light, crunchy, and packed with flavor, they make the perfect appetizer or party snack.",
  },

  "chicken-pie": {
    name: "Chicken Pie",
    price: "₦ 3,500",
    image: "assets/chicken-pie.jpg",
    thumbnails: [
      "assets/chicken-pie.jpg",
      "assets/chickenpie-1.jpg",
      "assets/chickenpie-3.jpg",
      "assets/chickenpie-4.jpg",
    ],
    description:
      "Buttery, flaky pastry filled with tender, well-seasoned chicken and a rich, savory sauce. Baked to a golden finish, it's a comforting classic that's just as good fresh out of the oven or on the go.",
  },

  "banana-bread": {
    name: "Banana Bread",
    price: "₦ 5,500",
    image: "assets/banana-bread.jpg",
    thumbnails: [
      "assets/banana-bread.jpg",
      "assets/banana-bread-2.jpg",
      "assets/banana-bread-3.jpg",
      "assets/banana-bread-4.jpg",
    ],
    description:
      "Moist, tender banana bread baked with ripe, naturally sweet bananas for rich flavor in every slice. Simple, wholesome, and comforting, it's perfect with your morning coffee or as an anytime treat.",
  },

  cake: {
    name: "Cakes",
    price: "₦ 25,000",
    image: "assets/cake.jpg",
    thumbnails: [
      "assets/cake.jpg",
      "assets/cake-1.jpg",
      "assets/cake-2.jpg",
      "assets/cake-3.jpg",
    ],
    description:
      "A soft, rich sponge cake baked fresh and finished with a light, delicate glaze. Balanced in sweetness with a tender crumb, it's a versatile treat perfect for everyday indulgence or small celebrations.",
  },

  "choc-chip-banana-bread": {
    name: "Chocolate-chip Banana Bread",
    price: "₦ 7,300",
    image: "assets/banana-bread.jpg",
    thumbnails: [
      "assets/banana-bread.jpg",
      "assets/chocolate-bread.jpg",
      "assets/chocolate-chip-bread.jpg",
      "assets/banana-bread-2.jpg",
    ],
    description:
      "Our classic banana bread taken up a notch, loaded generously with melty chocolate chips throughout. Moist, rich, and irresistibly sweet, every slice delivers the perfect combo of banana and chocolate.",
  },

  "whole-loaf-bread": {
    name: "Whole Loaf Bread",
    price: "₦ 2,000",
    image: "assets/bread.jpg",
    thumbnails: [
      "assets/bread.jpg",
      "assets/bread-2.jpg",
      "assets/bread-3.jpg",
      "assets/bread-4.jpg",
    ],
    description:
      "Freshly baked whole loaf bread with a soft, pillowy interior and a golden, crisp crust. Baked daily using quality ingredients, it's a household staple perfect for sandwiches, toast, or simply on its own.",
  },

  "butter-cake": {
    name: "Butter Cake",
    price: "₦ 10,000",
    image: "assets/buttercake.jpg",
    thumbnails: [
      "assets/buttercake.jpg",
      "assets/cake-1.jpg",
      "assets/cake-2.jpg",
      "assets/cake-4.jpg",
    ],
    description:
      "A rich, buttery cake baked with premium ingredients for a dense yet tender crumb and deep, satisfying flavor. Elegant and indulgent, it's the perfect centerpiece for celebrations, gifting, or special occasions.",
  },
};

const data = products[productId];

if (data) {
  document.querySelector(".donut").src = data.image;
  document.querySelector("h1").textContent = data.name;
  document.querySelector(".product-text h2").textContent = data.price;
  document.querySelector(".product-detail").textContent = data.description;

  // Rebuild thumbnails for this product
  const thumbnailContainer = document.querySelector(".thumbnails");

  if (thumbnailContainer && data.thumbnails) {
    thumbnailContainer.innerHTML = "";

    data.thumbnails.forEach((thumbSrc, index) => {
      const img = document.createElement("img");

      img.src = thumbSrc;
      img.alt = data.name;

      if (index === 0) {
        img.classList.add("active-thumb");
      }

      img.addEventListener("click", () => {
        document.querySelector(".donut").src = img.src;

        document
          .querySelectorAll(".thumbnails img")
          .forEach((t) => t.classList.remove("active-thumb"));

        img.classList.add("active-thumb");
      });

      thumbnailContainer.appendChild(img);
    });
  }

  // WhatsApp order
  const whatsappOrder = document.querySelector(".whatsapp-order");

  if (whatsappOrder) {
    const message = `Hello Pastry Perfection!%0A%0AI would like to order:%0A${data.name}%0APrice: ${data.price}`;

    whatsappOrder.href = `https://wa.me/${2347034136697}?text=${message}`;
    whatsappOrder.target = "_blank";
  }
}
