document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorDiv = document.getElementById("errorMessage");
  const successDiv = document.getElementById("successMessage");

  errorDiv.classList.add("hidden");
  successDiv.classList.add("hidden");

  if (name.length < 3) {
    errorDiv.textContent = "Full name must be at least 3 characters.";
    return errorDiv.classList.remove("hidden");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDiv.textContent = "Enter a valid email address.";
    return errorDiv.classList.remove("hidden");
  }
  if (password.length < 6) {
    errorDiv.textContent = "Password must be at least 6 characters.";
    return errorDiv.classList.remove("hidden");
  }
  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match.";
    return errorDiv.classList.remove("hidden");
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some(u => u.email === email)) {
    errorDiv.textContent = "An account with this email already exists.";
    return errorDiv.classList.remove("hidden");
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  successDiv.textContent = "Registration successful! Redirecting to login...";
  successDiv.classList.remove("hidden");

  setTimeout(() => { window.location.href = "login.html"; }, 1500);
});

function closeForm() {
  window.location.href = "index.html";
}
