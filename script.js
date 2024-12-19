document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const signUpButton = document.querySelector(".submit-btn");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const fullNameField = document.getElementById("fullName");
    const emailField = document.getElementById("email");

    // Toggle password visibility for "Password" field
    togglePassword.addEventListener("click", () => {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        togglePassword.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Toggle password visibility for "Confirm Password" field
    toggleConfirmPassword.addEventListener("click", () => {
        const type = confirmPasswordField.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordField.setAttribute("type", type);
        toggleConfirmPassword.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Form submission handler
    signUpButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const fullName = fullNameField.value.trim();
        const email = emailField.value.trim();
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        // Validate inputs
        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            // Send data to backend (Replace URL with your backend endpoint)
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, email, password }),
            });

            // Parse response
            const result = await response.json();

            if (response.ok) {
                alert("Sign up successful!");
                // Clear form fields after successful registration
                fullNameField.value = "";
                emailField.value = "";
                passwordField.value = "";   
                confirmPasswordField.value = "";

                // Optionally, redirect to the login page
                window.location.href = "login.html";
            } else {
                alert(result.message || "An error occurred during sign up.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Unable to connect to the server. Please try again later.");
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
