document.addEventListener("DOMContentLoaded", function() {
    const profileForm = document.getElementById("profileForm");
    const passwordResetForm = document.getElementById("passwordResetForm");
    const showPasswordResetBtn = document.getElementById("showPasswordResetBtn");
    const cancelPasswordResetBtn = document.getElementById("cancelPasswordResetBtn");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    const profilePictureInput = document.getElementById("profilePictureInput");
    const profilePicture = document.getElementById("profilePicture");


function loadProfileData() {
  const data = JSON.parse(localStorage.getItem("profileData") || "{}");
  const current = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (current.name) fullName.value = current.name;
  if (current.email) email.value = current.email;

  if (data.phone) phone.value = data.phone;
  if (data.location) location.value = data.location;
  if (data.profilePicture) profilePicture.src = data.profilePicture;
}


    profileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(profileForm);
        const data = {};
        const fields = ["fullName", "email", "phone", "location"];
        fields.forEach(field => {
            if (formData.has(field)) {
                data[field] = formData.get(field);
            }
        });
        data.profilePicture = profilePicture.src; 

        localStorage.setItem("profileData", JSON.stringify(data));
        alert("Profile saved successfully!");
    });


    showPasswordResetBtn.addEventListener("click", function() {
        passwordResetForm.classList.remove("hidden");
        showPasswordResetBtn.classList.add("hidden");
    });

    cancelPasswordResetBtn.addEventListener("click", function() {
        passwordResetForm.classList.add("hidden");
        showPasswordResetBtn.classList.remove("hidden");
        passwordResetForm.reset(); 
    });

passwordResetForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const currentInput = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmNew = document.getElementById("confirmNewPassword").value;

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (currentInput !== currentUser.password) {
    alert("Current password is incorrect.");
    return;
  }

  if (newPassword !== confirmNew) {
    alert("New password and confirmation do not match.");
    return;
  }

  currentUser.password = newPassword;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex(u => u.email === currentUser.email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
  }

  alert("Password changed successfully!");
  passwordResetForm.reset();
  passwordResetForm.classList.add("hidden");
  showPasswordResetBtn.classList.remove("hidden");
});


    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(button.dataset.tab).classList.add("active");
        });
    });

    profilePictureInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicture.src = e.target.result;
                let profileData = JSON.parse(localStorage.getItem("profileData")) || {};
                profileData.profilePicture = e.target.result;
                localStorage.setItem("profileData", JSON.stringify(profileData));
            };
            reader.readAsDataURL(file);
        }
    });

    loadProfileData();
    const hash = window.location.hash; 
    if (hash) {
    const tabButton = document.querySelector(`.tab-button[data-tab="${hash.slice(1)}"]`);
    if (tabButton) {
        tabButton.click(); 
    }
    }

});

document.getElementById("profilePicture").addEventListener("click", () => {
  document.getElementById("profilePictureInput").click();
});

document.getElementById("profilePictureInput").addEventListener("change", function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById("profilePicture");
    img.src = e.target.result;

    const pd = JSON.parse(localStorage.getItem("profileData") || "{}");
    pd.profilePicture = e.target.result;
    localStorage.setItem("profileData", JSON.stringify(pd));
  };
  reader.readAsDataURL(file);
});

function toggleProfile() {
  document.getElementById("profileDropdown").classList.toggle("show");
}

window.addEventListener("click", function (e) {
  const dropdown = document.getElementById("profileDropdown");
  const btn = document.querySelector(".dropbtn");
  if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
const editBtn = document.getElementById('editProfileBtn');
const saveBtn = document.getElementById('saveProfileBtn');
const fields = ['fullName', 'email', 'phone', 'location'];

function setReadOnly(flag) {
  fields.forEach(id => {
    const inp = document.getElementById(id);
    inp.readOnly = flag;
  });
}

setReadOnly(true);  

editBtn.addEventListener('click', () => {
  setReadOnly(false);
  saveBtn.disabled = false;
  editBtn.disabled = true;
});

profileForm.addEventListener('submit', e => {
  e.preventDefault();
  setReadOnly(true);
  saveBtn.disabled = true;
  editBtn.disabled = false;
  alert('Profile updated successfully!');
});
