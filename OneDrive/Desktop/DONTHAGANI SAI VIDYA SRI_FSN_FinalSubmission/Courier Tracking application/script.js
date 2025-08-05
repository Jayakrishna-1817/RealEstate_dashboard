document.getElementById("loginForm").addEventListener("submit", function(e) {
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
    return errorDiv.classList.remove("hidden");
  }

  if (password.length < 6) {
    errorDiv.textContent = "Password must be at least 6 characters.";
    return errorDiv.classList.remove("hidden");
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    u => u.email === email && u.password === password
  );
  if (!user) {
    errorDiv.textContent = "Invalid email or password.";
    return errorDiv.classList.remove("hidden");
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password
    })
  );

  successDiv.textContent = "Login successful! Redirecting...";
  successDiv.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "userinterface.html";
  }, 1000);
});

function closeForm() {
  window.location.href = "index.html";
}
