
"use strict";

// Mobile navigation menu
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );

  navLinks.classList.toggle("open", !isOpen);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeMenu();

    navItems.forEach((link) => {
      link.classList.remove("active");
    });

    item.classList.add("active");
  });
});

// Close the menu when the visitor presses Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle.focus();
  }
});

// Also close the menu if the browser becomes wider.
window.addEventListener("resize", () => {
  if (window.innerWidth > 620) {
    closeMenu();
  }
});

// Project category filters
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterEmpty = document.querySelector("#filter-empty");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;

      filterButton.classList.toggle("active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const matches =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    filterEmpty.hidden = visibleCount !== 0;
  });
});

// Interactive counter demo
const demoCount = document.querySelector("#demo-count");
const counterButton = document.querySelector("#counter-button");
const resetCounterButton = document.querySelector("#reset-counter");

let count = 0;

function renderCounter() {
  demoCount.textContent = String(count);
}

counterButton.addEventListener("click", () => {
  count += 1;
  renderCounter();
});

resetCounterButton.addEventListener("click", () => {
  count = 0;
  renderCounter();
});

// Automatically update the footer year.
document.querySelector("#current-year").textContent =
  String(new Date().getFullYear());

// Highlight the current section in the navigation as you scroll.
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navItems.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isCurrent);
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
