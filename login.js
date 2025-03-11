// Track whether the user has signed up
let hasSignedUp = false;

// Toggle button functionality for the dropdown menu
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function () {
    // Toggle the menu visibility
    dropDownMenu.classList.toggle('open');

    // Change the icon to 'x' or 'bars' based on the state of the menu
    const isOpen = dropDownMenu.classList.contains('open');
    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};

// Form transition animation
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
    // Switch to signup form
    x.style.left = "-380px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login() {
    // Switch to login form
    x.style.left = "50px";
    y.style.left = "430px";
    z.style.left = "0";  
}

// Register form submission handling
const registerForm = document.getElementById("register");

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const agreeCheckbox = document.getElementById('agree'); // Add the checkbox ID here

    // Check if the "I agree" checkbox is checked
    if (!agreeCheckbox.checked) {
        alert('You must agree to the terms and conditions to register.');
        return;
    }

    // Check if the username already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already taken!');
        return;
    }

    // Store the new user
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('User successfully registered!');
    hasSignedUp = true; // Mark as signed up
    login(); // Switch to login form after registration
});

// Login form submission handling
const loginForm = document.getElementById("login");

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Save the logged-in user in local storage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = "homepage.html"; // Redirect to homepage after login
    } else {
        alert('Invalid username or password!');
    }
});
