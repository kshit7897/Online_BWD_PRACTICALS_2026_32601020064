// ===== Student Registration Form Validation =====

const form = document.getElementById("regForm");

// Helper function: show error message
function setError(inputId, msgId, message) {
    const msg = document.getElementById(msgId);
    msg.textContent = message;
    msg.className = "msg error";
    if (inputId) {
        document.getElementById(inputId).classList.remove("valid");
        document.getElementById(inputId).classList.add("invalid");
    }
    return false;
}

// Helper function: show success message
function setSuccess(inputId, msgId, message) {
    const msg = document.getElementById(msgId);
    msg.textContent = message || "";
    msg.className = "msg ok";
    if (inputId) {
        document.getElementById(inputId).classList.remove("invalid");
        document.getElementById(inputId).classList.add("valid");
    }
    return true;
}

// ---------- Individual validation functions ----------

function validateName() {
    const name = document.getElementById("name").value.trim();
    const pattern = /^[A-Za-z ]+$/;

    if (name === "") {
        return setError("name", "nameMsg", "Name is required.");
    } else if (name.length < 3) {
        return setError("name", "nameMsg", "Name must have at least 3 characters.");
    } else if (!pattern.test(name)) {
        return setError("name", "nameMsg", "Name can contain only letters and spaces.");
    }
    return setSuccess("name", "nameMsg", "Looks good!");
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
        return setError("email", "emailMsg", "Email is required.");
    } else if (!pattern.test(email)) {
        return setError("email", "emailMsg", "Please enter a valid email address.");
    }
    return setSuccess("email", "emailMsg", "Valid email.");
}

function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    const pattern = /^[6-9][0-9]{9}$/;

    if (phone === "") {
        return setError("phone", "phoneMsg", "Mobile number is required.");
    } else if (!pattern.test(phone)) {
        return setError("phone", "phoneMsg", "Enter a valid 10 digit number starting with 6-9.");
    }
    return setSuccess("phone", "phoneMsg", "Valid number.");
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const bar = document.getElementById("strengthBar");

    // Count how many rules are satisfied
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const colors = ["#d32f2f", "#d32f2f", "#f57c00", "#fbc02d", "#7cb342", "#2e7d32"];
    bar.style.width = (score * 20) + "%";
    bar.style.backgroundColor = colors[score];

    if (password === "") {
        return setError("password", "passwordMsg", "Password is required.");
    } else if (score < 5) {
        return setError("password", "passwordMsg",
            "Password needs 8+ characters, uppercase, lowercase, number and symbol.");
    }
    return setSuccess("password", "passwordMsg", "Strong password.");
}

function validateConfirm() {
    const password = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirm").value;

    if (confirmPass === "") {
        return setError("confirm", "confirmMsg", "Please confirm your password.");
    } else if (confirmPass !== password) {
        return setError("confirm", "confirmMsg", "Passwords do not match.");
    }
    return setSuccess("confirm", "confirmMsg", "Passwords match.");
}

function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
        return setError(null, "genderMsg", "Please select your gender.");
    }
    return setSuccess(null, "genderMsg", "");
}

function validateDob() {
    const value = document.getElementById("dob").value;
    if (value === "") {
        return setError("dob", "dobMsg", "Date of birth is required.");
    }

    // Built-in Date object to calculate age
    const dob = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (dob > today) {
        return setError("dob", "dobMsg", "Date of birth cannot be in the future.");
    } else if (age < 16) {
        return setError("dob", "dobMsg", "You must be at least 16 years old. Your age: " + age);
    }
    return setSuccess("dob", "dobMsg", "Age: " + age + " years");
}

function validateCourse() {
    const course = document.getElementById("course").value;
    if (course === "") {
        return setError("course", "courseMsg", "Please select a course.");
    }
    return setSuccess("course", "courseMsg", "");
}

function validateHobbies() {
    const checked = document.querySelectorAll('input[name="hobby"]:checked');
    if (checked.length === 0) {
        return setError(null, "hobbyMsg", "Select at least one hobby.");
    }
    return setSuccess(null, "hobbyMsg", checked.length + " selected");
}

function validateTerms() {
    if (!document.getElementById("terms").checked) {
        return setError(null, "termsMsg", "You must accept the terms.");
    }
    return setSuccess(null, "termsMsg", "");
}

// ---------- Events: validate while the user types / changes ----------

document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("input", validatePhone);
document.getElementById("password").addEventListener("input", function () {
    validatePassword();
    if (document.getElementById("confirm").value !== "") {
        validateConfirm();
    }
});
document.getElementById("confirm").addEventListener("input", validateConfirm);
document.getElementById("dob").addEventListener("change", validateDob);
document.getElementById("course").addEventListener("change", validateCourse);
document.getElementById("terms").addEventListener("change", validateTerms);

document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
    radio.addEventListener("change", validateGender);
});
document.querySelectorAll('input[name="hobby"]').forEach(function (box) {
    box.addEventListener("change", validateHobbies);
});

// ---------- Submit event ----------

form.addEventListener("submit", function (event) {
    event.preventDefault();   // stop the page from reloading

    // Run every validation (array of functions) so all messages are shown
    const checks = [
        validateName, validateEmail, validatePhone, validatePassword, validateConfirm,
        validateGender, validateDob, validateCourse, validateHobbies, validateTerms
    ];

    let allValid = true;
    for (let i = 0; i < checks.length; i++) {
        if (!checks[i]()) {
            allValid = false;
        }
    }

    const successBox = document.getElementById("successBox");

    if (allValid) {
        const name = document.getElementById("name").value.trim();
        const course = document.getElementById("course").value;
        successBox.innerHTML = "<b>Registration successful!</b><br>Welcome, " + name +
                               ". You have registered for " + course + ".";
        successBox.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        successBox.style.display = "none";
        alert("Please correct the errors shown in red.");
    }
});

// ---------- Reset event: clear all messages ----------

form.addEventListener("reset", function () {
    document.querySelectorAll(".msg").forEach(function (m) {
        m.textContent = "";
    });
    document.querySelectorAll(".valid, .invalid").forEach(function (el) {
        el.classList.remove("valid", "invalid");
    });
    document.getElementById("strengthBar").style.width = "0";
    document.getElementById("successBox").style.display = "none";
});
