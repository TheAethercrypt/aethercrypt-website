
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuButton.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "☰";
  });
});

const filters = document.querySelectorAll(".filter");
const universeCards = document.querySelectorAll(".universe-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });

    universeCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = category !== "all" && !categories.includes(category);
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const status = document.querySelector("#form-status");
  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "";
    status.classList.remove("error");
    submitButton.disabled = true;
    submitButton.textContent = "Sending your message...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      contactForm.reset();
      status.textContent =
        "Your message has entered the vault! Thank you for reaching out.";
    } catch (error) {
      status.textContent =
        "The message could not be sent. Please check your connection or try again later.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send your message ✦";
    }
  });
}
