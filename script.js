const button = document.querySelector(".add-to-cart");
const message = document.getElementById("cart-message");
button.addEventListener("click", function () {
  message.style.display = "block";

  // Show "Added to cart" popup, then hide it after 2 seconds
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
});
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailInput = document.querySelector(".email-input");
const subscribeButton = document.querySelector(".sub-email");

const newsletterMessage = document.getElementById("newsletter-message");

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

// mobile screen drop down

const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-bar");

hamburger.addEventListener("click", function () {
  navBar.classList.toggle("nav-open");
});
