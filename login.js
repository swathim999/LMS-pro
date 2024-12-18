// Open Modal
const openLoginModal = document.getElementById("openLoginModal");
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.getElementById("closeLoginModal");

openLoginModal.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Close Modal
closeLoginModal.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Toggle Password Visibility
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
});
