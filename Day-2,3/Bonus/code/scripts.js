// Mobile Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger-icon");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
