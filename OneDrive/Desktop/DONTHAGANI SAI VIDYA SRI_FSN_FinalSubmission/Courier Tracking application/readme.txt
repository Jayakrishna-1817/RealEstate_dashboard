CourierTrack Web Application
============================

Description:
------------
CourierTrack is a simple shipment tracking web application with role-based access for Admin and Users. 
Users can register, login, and track their shipments. 
The Admin has a separate login to manage shipments — add, edit, and delete — which will be reflected in the user interface.

Project Structure:
------------------
1. index.html             --> Landing page (with Login/Register buttons)
2. login.html             --> Login page (for both Admin and Users)
3. signup.html            --> User Registration page
4. userinterface.html     --> User dashboard to search & view shipment details( in user interface the data of shipments are appeared only if the name of user is added by the admin as reciever in any of the shipments)
5. dashboard.html         --> Admin dashboard to view shipment details 
6. shipmentform.html      --> Admin's Add/Edit shipment form
7. styles.css             --> Common styling file
8. script.js              --> Handles login, registration, and common JS
9. adminscript.js         --> Handles admin login page's script
10. userinterfacescript.js--> User functionality (view/search shipments)
11. profile.html           --> User profile page
12. interface.html        --> to choose between admin and user
13. adminlogin.html       --> Admin login page(no authentication any credentials can be used)
14. shipment.html         --> to manage shipments(add shipments, edit shipments, delete shipments)
15. README.txt            --> This file

How the Application Works:
--------------------------
🔸 Landing Page:
    - Users click on "Login" or "Register"
    - They are prompted to select: [User] or [Admin]

🔸 Admin Flow:
    - Only one admin account is allowed 
    - Admin logs in and is redirected to `dashboard.html`
    - Admin can:
        ✔ Add new shipments
        ✔ Edit existing shipments
        ✔ Delete shipments
    - Shipments are stored in `localStorage` and shared with the user interface

🔸 User Flow:
    - New users can register via `signup.html`
    - Registered users login via `login.html`
    - After login, users are redirected to `userinterface.html`
    - Users can:
        ✔ Search shipments by tracking number, sender, or recipient
        ✔ View shipment status, location, and estimated delivery date

Data Storage:
-------------
- `localStorage` is used to:
    • Store user credentials (email/password) — basic demo purpose (no encryption)
    • Store shipments array
    • Store the current logged-in user/admin session (optional)

Notes:
------
- This is a front-end-only project using HTML, CSS, and JavaScript (no backend).
- All changes (shipments, logins) are stored locally and will persist in the browser until cache is cleared.


Developed By:
-------------
SAI VIDYA SRI DONTHAGANI
