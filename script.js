// --- AUTH MODAL & TAB LOGIC ---
const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const closeAuthModalBtn = document.querySelector("#authModal .close-auth-modal"); 
const showLoginBtn = document.getElementById("showLogin");
const showRegisterBtn = document.getElementById("showRegister");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const modalContent = document.querySelector("#authModal .modal-content");

// --- UTILITIES MODAL LOGIC ---
// Dustbins 
const productsModal = document.getElementById("productsModal");
const shopDustbinsBtn = document.getElementById("shopDustbinsBtn");
const closeProductsModalBtn = document.querySelector(".close-products-modal");

// Compost Kits 
const kitsModal = document.getElementById("kitsModal");
const orderKitsBtn = document.getElementById("orderKitsBtn");
const closeKitsModalBtn = document.querySelector(".close-kits-modal");

// Resources (Guides/Centers) 
const resourcesModal = document.getElementById("resourcesModal");
const viewGuidesBtn = document.getElementById("viewGuidesBtn");
const findCentersBtn = document.getElementById("findCentersBtn");
const closeResourcesModalBtn = document.querySelector(".close-resources-modal");
const resourcesModalTitle = document.getElementById("resourcesModalTitle");
const resourcesModalContent = document.getElementById("resourcesModalContent");


// 1. Show/Hide Auth Modal
loginBtn.onclick = () => {
    authModal.style.display = "flex";
    showAuthTab('login'); 
};
closeAuthModalBtn.onclick = () => authModal.style.display = "none";

// 2. Attach Click Handlers for all Utility Buttons
if (shopDustbinsBtn) {
    shopDustbinsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        productsModal.style.display = "flex";
    });
}

if (orderKitsBtn) {
    orderKitsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        kitsModal.style.display = "flex";
    });
}

if (viewGuidesBtn) {
    viewGuidesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResourcesModal('Guides');
    });
}

if (findCentersBtn) {
    findCentersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResourcesModal('Centers');
    });
}

// 3. Close Modal Handlers
if (closeProductsModalBtn) {
    closeProductsModalBtn.onclick = () => productsModal.style.display = "none";
}
if (closeKitsModalBtn) {
    closeKitsModalBtn.onclick = () => kitsModal.style.display = "none";
}
if (closeResourcesModalBtn) {
    closeResourcesModalBtn.onclick = () => resourcesModal.style.display = "none";
}


// 4. Global Click Handler (Updated to close all modals)
window.onclick = (e) => {
    if (e.target === authModal) authModal.style.display = "none";
    if (e.target === productsModal) productsModal.style.display = "none";
    if (e.target === kitsModal) kitsModal.style.display = "none";
    if (e.target === resourcesModal) resourcesModal.style.display = "none";
};


// 5. Reusable Resource Modal Function
function openResourcesModal(type) {
    resourcesModalTitle.textContent = (type === 'Guides') 
        ? "DIY Waste Reduction Guides 📘" 
        : "Find Local Recycling Centers 📍";
    
    // Placeholder content based on the button clicked
    if (type === 'Guides') {
        resourcesModalContent.innerHTML = `
            <ul class="resource-list">
                <li><a href="#" target="_blank">Beginner's Guide to Composting (PDF)</a></li>
                <li><a href="#" target="_blank">Top 10 Upcycling Projects for Home</a></li>
                <li><a href="#" target="_blank">How to Reduce Single-Use Plastic at Home</a></li>
                <li><a href="#" target="_blank">E-Waste Disposal Guidelines</a></li>
            </ul>
        `;
    } else { // Centers
        resourcesModalContent.innerHTML = `
            <p>Enter your pincode to find the nearest certified recycling and drop-off centers:</p>
            <input type="text" placeholder="Enter Pincode (e.g., 424001)" class="pincode-input">
            <button class="submit-button" style="width: auto; padding: 10px 20px;">Search Map</button>
            <p style="margin-top: 25px;">Or use the centralized city map:</p>
            <a href="https://maps.google.com" target="_blank" class="util-btn" style="width: auto; margin: 0 auto; display: block;">Open City Recycling Map</a>
        `;
    }

    resourcesModal.style.display = "flex";
}


// 6. Tab Switching Function (for Auth Modal)
function showAuthTab(tabName) {
    showLoginBtn.classList.remove("active");
    showRegisterBtn.classList.remove("active");

    loginForm.style.display = "none";
    registerForm.style.display = "none";
    
    displayAuthMessage('', false); 

    if (tabName === 'login') {
        showLoginBtn.classList.add("active");
        loginForm.style.display = "block";
        modalContent.querySelector('h2').textContent = 'Login';
    } else if (tabName === 'register') {
        showRegisterBtn.classList.add("active");
        registerForm.style.display = "block";
        modalContent.querySelector('h2').textContent = 'Register';
    }
}

// 7. Attach Auth Tab Button Listeners
showLoginBtn.onclick = () => showAuthTab('login');
showRegisterBtn.onclick = () => showAuthTab('register');


// 8. Helper function to display messages within the modal
function displayAuthMessage(text, isSuccess) {
    let messageArea = document.querySelector('.auth-message');
    if (!messageArea) {
        messageArea = document.createElement('div');
        messageArea.className = 'auth-message';
        modalContent.appendChild(messageArea);
    }
    
    messageArea.textContent = text;
    messageArea.style.display = text ? 'block' : 'none';
    messageArea.classList.remove('success', 'error');

    if (text) {
        messageArea.classList.add(isSuccess ? 'success' : 'error');
    }
}


// 9. Handle Registration Form Submission
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const pass1 = document.getElementById('regPassword').value;
    const pass2 = document.getElementById('confirmPassword').value;

    if (pass1 !== pass2) {
        displayAuthMessage('Error: Passwords do not match.', false);
        return;
    }
    
    const username = document.getElementById('regUsername').value;
    
    displayAuthMessage(`Success! Account created for ${username}. Switching to login...`, true);

    setTimeout(() => {
        showAuthTab('login');
        registerForm.reset(); 
    }, 2000);
});


// 10. Handle Login Form Submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Placeholder: Successful login if 'admin'/'admin123'
    if (username === 'admin' && password === 'admin123') {
        displayAuthMessage('Login successful! Welcome back.', true);
        
        setTimeout(() => {
            authModal.style.display = "none";
            loginForm.reset();
        }, 1500);

    } else {
        displayAuthMessage('Login failed. Invalid username or password.', false);
    }
});


// 11. Section Navigation Logic
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

// Function to switch visible sections
function switchSection(targetId) {
    sections.forEach(sec => sec.classList.remove("active"));
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("href").substring(1);
    
    // Ignore the Login/Register link
    if (target === 'loginBtn' || !target) return; 

    switchSection(target);
  });
});

// Activate Home by default
document.getElementById("home").classList.add("active");


// 12. EXPLORE MORE BUTTON FUNCTIONALITY
const exploreBtn = document.querySelector('#home .btn');

if (exploreBtn) {
    exploreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        switchSection('about'); 
    });
}


// 13. EXISTING CHART LOGIC
const segregationCtx = document.getElementById("segregationChart").getContext("2d");
const reportCtx = document.getElementById("reportChart").getContext("2d");

new Chart(segregationCtx, {
  type: "pie",
  data: {
    labels: ["Segregated", "Mixed", "Uncollected"],
    datasets: [{ data: [70, 20, 10], backgroundColor: ["#4caf50", "#ff9800", "#f44336"] }]
  }
});

new Chart(reportCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ label: "Reports", data: [12, 19, 14, 22, 30, 25], borderColor: "#ff9800", borderWidth: 2, fill: false, tension: 0.3 }]
  }
});