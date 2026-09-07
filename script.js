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

// Add to cart
const addToCartButton = document.querySelector(".add-to-cart");
const cartMessage = document.getElementById("cart-message");

if (addToCartButton && cartMessage) {
  addToCartButton.addEventListener("click", function () {
    const newCount = getCartCount() + 1;

    localStorage.setItem("cartCount", newCount);
    updateCartDisplay();

    cartMessage.style.display = "block";

    setTimeout(function () {
      cartMessage.style.display = "none";
    }, 2000);
  });
}

// Cart count
const cartCountEl = document.querySelector(".cart-count");

function getCartCount() {
  return parseInt(localStorage.getItem("cartCount")) || 0;
}

function updateCartDisplay() {
  if (cartCountEl) {
    cartCountEl.textContent = getCartCount();
  }
}

updateCartDisplay();

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
