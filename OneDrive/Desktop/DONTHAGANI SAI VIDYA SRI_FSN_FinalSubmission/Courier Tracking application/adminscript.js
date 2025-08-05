    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault(); 

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorDiv = document.getElementById("errorMessage");
        const successDiv = document.getElementById("successMessage");

        errorDiv.classList.add("hidden");
        successDiv.classList.add("hidden");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errorDiv.textContent = "Please enter a valid email address.";
            errorDiv.classList.remove("hidden");
            return;
        }

        if (password.length < 6) {
            errorDiv.textContent = "Password must be at least 6 characters.";
            errorDiv.classList.remove("hidden");
            return;
        }

        alert("Login Successful!");
        window.location.href = "dashboard.html";
    });
function closeForm (){
    window.location.href = "index.html";
}

    