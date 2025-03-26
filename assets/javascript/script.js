function openMenubar() {
  const menubar = document.getElementById("menubar");
  const navbar = document.getElementById("navbar");
  const menuIcon = menubar.querySelector("ion-icon");

  navbar.classList.toggle("open");

  if (navbar.classList.contains("open")) {
    menuIcon.setAttribute("name", "close");
  } else {
    menuIcon.setAttribute("name", "menu");
  }
}

function closeMenubar() {
  const menubar = document.getElementById("menubar");
  const navbar = document.getElementById("navbar");
  const menuIcon = menubar.querySelector("ion-icon");

  navbar.classList.remove("open");
  menuIcon.setAttribute("name", "menu");
}

document.querySelectorAll("#navbar a").forEach((link) => {
  link.addEventListener("click", closeMenubar);
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navbar = header.querySelector("nav");
  const heroSection = document.querySelector("section#hero");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          header.classList.add("hscroll");
          navbar.classList.add("hscroll");
        } else {
          header.classList.remove("hscroll");
          navbar.classList.remove("hscroll");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(heroSection);
});

// TYPPEWRITTER EFFECT
const texts = ["Tech-Savvy", "Green-Minded", "Impact-Driven"];
let speed = 100;
const textElement = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
  if (charcterIndex < texts[textIndex].length) {
    const currentText = texts[textIndex].substring(0, charcterIndex + 1);
    textElement.innerHTML = currentText;
    textElement.setAttribute("data-text", currentText);
    charcterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 1200);
  }
}

function eraseText() {
  if (textElement.innerHTML.length > 0) {
    const currentText = textElement.innerHTML.slice(0, -1);
    textElement.innerHTML = currentText;
    textElement.setAttribute("data-text", currentText);
    setTimeout(eraseText, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    charcterIndex = 0;
    setTimeout(typeWriter, 500);
  }
}

window.onload = typeWriter;

// NAV A ACTIVE
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main > section[id]");
  const navLinks = document.querySelectorAll("#navbar a");

  function setActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(`#${currentSection}`)) {
        link.classList.add("active");
      }
    });
  }
  
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});

// SCROLL REVEAL
document.addEventListener("DOMContentLoaded", function () {
  ScrollReveal().reveal(".popup", {
    scale: 0.85,
    opacity: 0,
    duration: 500,
    delay: 250,
    easing: "ease-in-out",
    reset: true,
  });
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
      window.location.href = "thanks.html";
    })
    .catch((error) => {
      console.error("Error!", error.message);
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitle = entry.target.getAttribute("data-title");
          document.title = `D B I CIPTA | ${sectionTitle}`;
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });
});
