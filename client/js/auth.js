// ============================================
//  AUTH MODULE — Client-Side Authentication
// ============================================

const AUTH_BASE =
    window.location.port === "5000" || (!window.location.origin.includes("localhost")
        && !window.location.origin.includes("127.0.0.1")
        && window.location.protocol !== "file:")
        ? "/api/auth"
        : "http://localhost:5000/api/auth";

// ---- Storage Helpers ----

function saveAuth(data) {
    localStorage.setItem("stm_token", data.token);
    localStorage.setItem("stm_user", JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email
    }));
}

function getToken() {
    return localStorage.getItem("stm_token");
}

function getUser() {
    try {
        return JSON.parse(localStorage.getItem("stm_user"));
    } catch {
        return null;
    }
}

function isAuthenticated() {
    return !!getToken();
}

function logout() {
    localStorage.removeItem("stm_token");
    localStorage.removeItem("stm_user");
    window.location.href = "login.html";
}

function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// ---- API Calls ----

async function authLogin(email, password) {
    const response = await fetch(`${AUTH_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return await response.json();
}

async function authRegister(name, email, password) {
    const response = await fetch(`${AUTH_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    return await response.json();
}

// ---- Password Strength Calculator ----

function getPasswordStrength(password) {
    let score = 0;

    if (!password) return { level: "", score: 0 };

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: "weak", text: "Weak password", score };
    if (score <= 3) return { level: "medium", text: "Medium strength", score };
    return { level: "strong", text: "Strong password", score };
}

// ---- Form Helpers ----

function showAuthError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.classList.add("show");
    }
}

function hideAuthError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = "";
        el.classList.remove("show");
    }
}

function showAuthSuccess(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.classList.add("show");
    }
}

function setLoading(btn, loading) {
    if (loading) {
        btn.classList.add("loading");
        btn.disabled = true;
    } else {
        btn.classList.remove("loading");
        btn.disabled = false;
    }
}

function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
