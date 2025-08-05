document.addEventListener("DOMContentLoaded", function () {
    loadShipments();
    document.getElementById("searchInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchShipment();
        }
    });
});

function getStoredShipments() {
    return JSON.parse(localStorage.getItem("shipments")) || [];
}

function loadShipments() {
  const shipments = getStoredShipments();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.name) {
    alert("User not logged in.");
    window.location.href = "login.html";
    return;
  }
  const filtered = shipments.filter(s =>
    s.recipient.toLowerCase() === currentUser.name.toLowerCase()
  );
  displayShipments(filtered);
}


function searchShipment() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const shipments = getStoredShipments();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userShipments = shipments.filter(
    s => s.recipient.toLowerCase() === currentUser?.name.toLowerCase()
  );

  if (searchTerm === "") {
    displayShipments(userShipments);
    if (userShipments.length === 0) {
      alert("No shipments found for your account.");
    }
    return;
  }

  const filtered = userShipments.filter(shipment =>
    shipment.trackingNumber.toLowerCase().includes(searchTerm) ||
    shipment.sender.toLowerCase().includes(searchTerm)
  );

  displayShipments(filtered);

  if (filtered.length === 0) {
    alert(`No shipments matched "${searchTerm}".`);
  }
}

function displayShipments(shipments) {
    const container = document.querySelector(".shipment-content");

    if (!shipments || shipments.length === 0) {
        container.innerHTML = `
            <div class="icon"><i class="fa-solid fa-box"></i></div>
            <div class="line1">No shipments found</div>
            <div class="line2">No packages are currently being tracked</div>
        `;
        return;
    }

    let html = `
        <table class="shipment-table">
            <thead>
                <tr>
                    <th>Tracking Number</th>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Status</th>
                    <th>Current Location</th>
                    <th>Est. Delivery</th>
                </tr>
            </thead>
            <tbody>
    `;

    html += shipments.map(shipment => `
        <tr>
            <td><strong>${shipment.trackingNumber}</strong></td>
            <td>${shipment.sender}</td>
            <td>${shipment.recipient}</td>
            <td>
                <span class="status-badge status-${shipment.status.toLowerCase().replace(/\s+/g, "-")}">
                    ${shipment.status}
                </span>
            </td>
            <td>${shipment.currentLocation}</td>
            <td>${shipment.estimatedDelivery}</td>
        </tr>
    `).join("");

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

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
