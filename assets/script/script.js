// OPEN AND CLOSE MENU
function openMenu() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");

  navbar.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function closeMenu() {
  document.getElementById("navbar").classList.remove("active");
  document.querySelector(".hamburger").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#navbar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
});

// SCROLL CLASS FOR HEADER
document.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
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

// DROPDOWN FOR DARK MODE
function toggleDropdown() {
  const dropdown = document.getElementById("themeDropdown");
  const icon = document.getElementById("dropdownIcon");

  dropdown.classList.toggle("show");
  icon.classList.toggle("show");
}

document.addEventListener("click", function (e) {
  const dropdown = document.getElementById("themeDropdown");
  const trigger = document.querySelector(".logo");
  const icon = document.getElementById("dropdownIcon");

  if (!trigger.contains(e.target)) {
    dropdown.classList.remove("show");
    icon.classList.remove("show");
  }
});

// THEME SELECTION
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyTheme();
}

function applyTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  } else if (theme === "light") {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  } else {
    // Mengikuti preferensi sistem
    const prefersDark = window.matchMedia(
      
    
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }
}

document.addEventListener("DOMContentLoaded", applyTheme);

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

// SWIPER
new Swiper(".skill-container", {
  loop: true,
  speed: 1500,
  grabCursor: false,

  // PAGINATION
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // NAVIGATION
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // AUTOHEIGHT
  autoHeight: true,

  // BREAKPOINTS
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  // AUTOPLAY
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
});
