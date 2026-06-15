const year = document.querySelector("#year");
const verificationDate = document.querySelector("#verificationDate");
const toggleButton = document.querySelector("#toggleCard");
const cardImage = document.querySelector("#cardImage");

year.textContent = new Date().getFullYear();

verificationDate.textContent = new Intl.DateTimeFormat("en-PH", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(new Date());

let showingBack = false;

toggleButton.addEventListener("click", () => {
  showingBack = !showingBack;

  cardImage.style.opacity = "0";
  cardImage.style.transform = "scale(0.985)";

  setTimeout(() => {
    cardImage.src = showingBack
      ? "reward-card-back.png"
      : "reward-card-front.png";

    cardImage.alt = showingBack
      ? "KAKING BARATO Reward Card back preview"
      : "KAKING BARATO Reward Card front preview";

    toggleButton.textContent = showingBack ? "Show Front" : "Show Back";
    cardImage.style.opacity = "1";
    cardImage.style.transform = "scale(1)";
  }, 160);
});
