// ===== Common JavaScript for all pages =====

// 1. Highlight the current page in the navbar
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// 2. Show current year in footer
document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
});

// 3. Back to top button
const backToTop = document.getElementById("backToTop");
if (backToTop) {
    window.addEventListener("scroll", function () {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 4. Home page: greeting based on time
const greeting = document.getElementById("greeting");
if (greeting) {
    const hour = new Date().getHours();
    let text;
    if (hour < 12) {
        text = "Good Morning!";
    } else if (hour < 17) {
        text = "Good Afternoon!";
    } else {
        text = "Good Evening!";
    }
    greeting.textContent = text + " Welcome to Marwadi University.";
}

// 5. Home page: animated counters
document.querySelectorAll(".counter").forEach(function (counter) {
    const target = parseInt(counter.getAttribute("data-target"));
    const step = Math.ceil(target / 60);
    let count = 0;

    const timer = setInterval(function () {
        count += step;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        counter.textContent = count;
    }, 25);
});

// 6. Courses page: create course cards from an array and filter them
const courses = [
    { name: "BCA", level: "ug", duration: "3 Years", desc: "Bachelor of Computer Applications with focus on programming and web development." },
    { name: "BCA - Online", level: "ug", duration: "3 Years", desc: "Flexible online BCA program with live and recorded lectures." },
    { name: "B.Sc. IT", level: "ug", duration: "3 Years", desc: "Information Technology program covering networking, databases and cloud." },
    { name: "MCA", level: "pg", duration: "2 Years", desc: "Master of Computer Applications with advanced software engineering." },
    { name: "M.Sc. Data Science", level: "pg", duration: "2 Years", desc: "Machine learning, statistics and big data analytics." },
    { name: "Ph.D.", level: "pg", duration: "3-5 Years", desc: "Research program in Computer Applications." }
];

const courseList = document.getElementById("courseList");

function showCourses(filter) {
    courseList.innerHTML = "";

    const filtered = courses.filter(function (c) {
        return filter === "all" || c.level === filter;
    });

    filtered.forEach(function (c) {
        const badge = c.level === "ug" ? "bg-success" : "bg-danger";
        const label = c.level === "ug" ? "Undergraduate" : "Postgraduate";

        courseList.innerHTML +=
            '<div class="col-12 col-sm-6 col-lg-4">' +
            '  <div class="card h-100 shadow-sm">' +
            '    <div class="card-body">' +
            '      <span class="badge ' + badge + ' mb-2">' + label + '</span>' +
            '      <h5 class="card-title">' + c.name + '</h5>' +
            '      <p class="card-text">' + c.desc + '</p>' +
            '      <p class="mb-0 small text-muted">Duration: ' + c.duration + '</p>' +
            '    </div>' +
            '  </div>' +
            '</div>';
    });
}

if (courseList) {
    showCourses("all");

    document.querySelectorAll("#courseFilters button").forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.querySelectorAll("#courseFilters button").forEach(function (b) {
                b.classList.remove("btn-primary");
                b.classList.add("btn-outline-primary");
            });
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-primary");
            showCourses(btn.getAttribute("data-filter"));
        });
    });
}

// 7. Gallery page: open clicked image in a Bootstrap modal
const modalEl = document.getElementById("imageModal");
if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    document.querySelectorAll(".gallery-img").forEach(function (img) {
        img.addEventListener("click", function () {
            document.getElementById("modalImage").src = img.src;
            document.getElementById("modalImage").alt = img.alt;
            document.getElementById("imageModalTitle").textContent = img.alt;
            modal.show();
        });
    });
}

// 8. Contact page: form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    function check(id, isValid) {
        const field = document.getElementById(id);
        field.classList.toggle("is-invalid", !isValid);
        field.classList.toggle("is-valid", isValid);
        return isValid;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("cname").value.trim();
        const email = document.getElementById("cemail").value.trim();
        const phone = document.getElementById("cphone").value.trim();
        const course = document.getElementById("ccourse").value;
        const message = document.getElementById("cmessage").value.trim();

        const results = [
            check("cname", /^[A-Za-z ]{3,}$/.test(name)),
            check("cemail", /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)),
            check("cphone", /^[6-9][0-9]{9}$/.test(phone)),
            check("ccourse", course !== ""),
            check("cmessage", message.length >= 10)
        ];

        if (results.every(Boolean)) {
            const box = document.getElementById("formSuccess");
            box.textContent = "Thank you, " + name + "! We will contact you soon about " + course + ".";
            box.classList.remove("d-none");
            contactForm.reset();
            contactForm.querySelectorAll(".is-valid").forEach(function (el) {
                el.classList.remove("is-valid");
            });
        }
    });
}
