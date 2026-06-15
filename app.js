(() => {
  "use strict";

  const cards = {
    front: {
      src: "reward-card-front.png",
      title: "Front ID Preview",
      alt: "KAKING BARATO Reward Card front ID preview",
      button: "Show Back ID Preview"
    },
    back: {
      src: "reward-card-back.png",
      title: "Back ID Preview",
      alt: "KAKING BARATO Reward Card back ID preview",
      button: "Show Front ID Preview"
    }
  };

  let currentSide = "front";

  const preview = document.getElementById("cardPreview");
  const title = document.getElementById("previewTitle");
  const showBackBtn = document.getElementById("showBackBtn");
  const downloadCurrent = document.getElementById("downloadCurrent");
  const switchButtons = Array.from(document.querySelectorAll("[data-card-side]"));
  const stepButtons = Array.from(document.querySelectorAll("[data-step]"));
  const verifiedDate = document.getElementById("verifiedDate");
  const year = document.getElementById("year");

  const dateFormatter = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (verifiedDate) verifiedDate.textContent = dateFormatter.format(new Date());
  if (year) year.textContent = new Date().getFullYear();

  Object.values(cards).forEach((card) => {
    const img = new Image();
    img.src = card.src;
  });

  function setSide(side) {
    if (!cards[side]) return;

    currentSide = side;
    const card = cards[side];

    if (preview) {
      preview.classList.add("is-changing");

      requestAnimationFrame(() => {
        preview.src = card.src;
        preview.alt = card.alt;
        preview.onload = () => preview.classList.remove("is-changing");
        setTimeout(() => preview.classList.remove("is-changing"), 120);
      });
    }

    if (title) title.textContent = card.title;
    if (showBackBtn) showBackBtn.textContent = card.button;
    if (downloadCurrent) {
      downloadCurrent.href = card.src;
      downloadCurrent.setAttribute("download", card.src);
    }

    switchButtons.forEach((btn) => {
      const active = btn.dataset.cardSide === side;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  }

  switchButtons.forEach((btn) => btn.addEventListener("click", () => setSide(btn.dataset.cardSide)));

  if (showBackBtn) {
    showBackBtn.addEventListener("click", () => {
      setSide(currentSide === "front" ? "back" : "front");
    });
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setSide(currentSide === "front" ? "back" : "front");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setSide(currentSide === "front" ? "back" : "front");
    }
  });
})();
