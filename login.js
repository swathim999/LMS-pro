document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const loginButton = document.querySelector(".submit-btn");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginMessage = document.getElementById("login-message");

    // Toggle password visibility
    togglePassword.addEventListener("click", () => {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        togglePassword.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Login button click handler
    loginButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        // Validate inputs
        if (!email || !password) {
            loginMessage.textContent = "Please fill in both email and password.";
            loginMessage.style.color = "red";
            return;
        }

        try {
            // Send data to backend
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                // Login successful
                loginMessage.textContent = "Login successful! Redirecting...";
                loginMessage.style.color = "green";

                // Redirect to index.html
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500); // Delay for user feedback
            } else {
                // Login failed
                loginMessage.textContent = result.message || "Invalid credentials. Please try again.";
                loginMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            loginMessage.textContent = "Unable to connect to the server. Please try again later.";
            loginMessage.style.color = "red";
        }
    });
});
