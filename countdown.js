const urlParams = new URLSearchParams(window.location.search);
const customMessage = urlParams.get("customMessage");
const originalUrl = urlParams.get("url");

const messageElement = document.getElementById("message");
const countdownElement = document.getElementById("countdown");
const continueButton = document.getElementById("continueButton");

continueButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "bypassUrl", url: originalUrl }, () => {
    window.location.href = originalUrl;
  });
});

chrome.storage.sync.get(["customMessage", "meditationTime"], (result) => {
  const meditationTime = result.meditationTime || 60;

  if (customMessage) {
    messageElement.textContent = customMessage;
    continueButton.style.display = "block";
  } else {
    messageElement.textContent =
      "Take a deep breath and meditate for a moment.";

    let timeLeft = meditationTime;

    function updateCountdown() {
      countdownElement.textContent = `${timeLeft} seconds remaining`;
      if (timeLeft === 0) {
        countdownElement.textContent = "Time's up! You may proceed.";
        continueButton.style.display = "block";
      } else {
        timeLeft--;
        setTimeout(updateCountdown, 1000);
      }
    }

    updateCountdown();
  }
});
