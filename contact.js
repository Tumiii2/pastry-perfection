const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  contactMessage.style.display = "block";
  contactForm.reset();

  setTimeout(function () {
    contactMessage.style.display = "none";
  }, 3000);
});
