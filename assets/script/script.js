function updatePadding() {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section:not(#hero)");

  if (header && sections.length > 0) {
    const headerHeight = header.offsetHeight;

    sections.forEach((section) => {
      section.style.paddingTop = `${headerHeight}px`;
    });
  }
}

window.addEventListener("load", updatePadding);
window.addEventListener("resize", updatePadding);

// OPEN AND CLOSE MENU
function openMenu() {
  const navbar = document.getElementById("navbar");
  const menuIcon = document.querySelector(".menu-bar ion-icon");
  const overlay = document.getElementById("overlay");
  const navLinks = document.querySelectorAll("header nav a");

  navbar.classList.toggle("active");

  if (navbar.classList.contains("active")) {
    menuIcon.setAttribute("name", "close-outline");
    updateMenuPosition(); // Atur posisi navbar & overlay
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
  } else {
    closeMenu();
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function closeMenu() {
  const navbar = document.getElementById("navbar");
  const menuIcon = document.querySelector(".menu-bar ion-icon");
  const overlay = document.getElementById("overlay");

  navbar.classList.remove("active");
  menuIcon.setAttribute("name", "menu-outline");

  overlay.style.visibility = "hidden";
  overlay.style.opacity = "0";

  navbar.style.removeProperty("top"); // Reset navbar ke CSS default
  overlay.style.removeProperty("top"); // Reset overlay ke CSS default
}

function updateMenuPosition() {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const overlay = document.getElementById("overlay");

  const headerHeight = header.offsetHeight;

  // Atur posisi navbar di bawah header
  navbar.style.top = `${headerHeight}px`;

  // Cek apakah header memiliki class "scroll"
  if (header.classList.contains("scroll")) {
    overlay.style.top = `${headerHeight}px`; // Di bawah header
  } else {
    overlay.style.top = "0"; // Menutupi header
  }
}

// 🔹 Fungsi untuk menambahkan kelas "scroll" pada header
function checkScroll() {
  const header = document.getElementById("header");
  const heroSection = document.getElementById("hero");

  const triggerPoint = heroSection.offsetTop + heroSection.offsetHeight * 0.5;

  if (window.scrollY >= triggerPoint) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }

  // Perbarui posisi overlay ketika scroll berubah
  if (document.getElementById("navbar").classList.contains("active")) {
    updateMenuPosition();
  }
}

// 🔹 Fungsi untuk mengecek ukuran layar saat diresize
function checkResize() {
  checkScroll(); // Pastikan kelas "scroll" tetap ada saat resize
}

// 🔹 Event Listener
window.addEventListener("resize", checkResize);
window.addEventListener("scroll", checkScroll);

// SCREEN ADJUSTMENT FOR OVERLAY
function checkScreenSize() {
  const overlay = document.getElementById("overlay");
  const navbar = document.getElementById("navbar");

  if (window.matchMedia("(min-width: 1025px)").matches) {
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
  } else {
    if (!navbar.classList.contains("active")) {
      overlay.style.visibility = "hidden";
      overlay.style.opacity = "0";
    } else {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
    }
  }
}
window.addEventListener("resize", checkScreenSize);
document.addEventListener("DOMContentLoaded", checkScreenSize);

// SCROLL CLASS FOR HEADER
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll(
    "section#about, section ~ section"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add("scroll");
        } else {
          header.classList.remove("scroll");
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
});

// CURRENT NAVIGATION ITEM
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("header nav a");

  function updateCurrentLink() {
    let fromTop = window.scrollY + 100;

    navLinks.forEach((link) => {
      let sectionId = link.getAttribute("href").split("#")[1];
      let section = document.getElementById(sectionId);

      if (section) {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          navLinks.forEach((nav) => nav.classList.remove("current"));
          link.classList.add("current");
        }
      }
    });
  }

  window.addEventListener("scroll", updateCurrentLink);
});

// SCROLL REVEAL
document.addEventListener("DOMContentLoaded", function () {
  const popups = document.querySelectorAll(".popup");

  const parents = [...new Set([...popups].map((el) => el.parentElement))];

  parents.forEach((parent) => {
    const elements = parent.querySelectorAll(".popup");

    elements.forEach((el, index) => {
      ScrollReveal().reveal(el, {
        scale: 0.9,
        opacity: 0,
        duration: 1200,
        delay: 100 + index * 50,
        reset: true,
      });
    });
  });
});

// DARK MODE
document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("darkModeToggle");
  const body = document.body;
  const icon = document.querySelector(".slider ion-icon");

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleSwitch.checked = true;
    icon.setAttribute("name", "moon");
  }

  toggleSwitch.addEventListener("change", function () {
    if (toggleSwitch.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
      icon.setAttribute("name", "moon");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
      icon.setAttribute("name", "sunny");
    }
  });
});

// DYNAMIC TITLE
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("main > section");
  const mainTitle = "D B I CIPTA";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitle = entry.target.getAttribute("data-title");
          document.title = `${mainTitle} | ${sectionTitle}`;
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// TYPEWRITER TEXT
document.addEventListener("DOMContentLoaded", function () {
  const texts = ["Tech-Savvy", "Green-Minded", "Impact-Driven"];
  const speed = 100;
  const eraseSpeed = 50;
  const delayBeforeErase = 1200;
  const textElement = document.querySelector(".typewriter-text");

  let textIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < texts[textIndex].length) {
      textElement.innerHTML = texts[textIndex].substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, delayBeforeErase);
    }
  }

  function eraseText() {
    if (charIndex > 0) {
      textElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseText, eraseSpeed);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});

// FORM HANDLER
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const actionURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeSokqRoSC_3ohmiSDAoJR60k6gHRli2WwI9EHfF3gyAJ_51A/formResponse";

  fetch(actionURL, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  })
    .then(() => {
      form.reset();
      showPopup();
    })
    .catch((error) => {
      console.error("Error!", error.message);
    });
});

function showPopup() {
  document.getElementById("popup-message").classList.add("show");
}

function closePopup() {
  document.getElementById("popup-message").classList.remove("show");
}
