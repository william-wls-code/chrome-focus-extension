document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("optionsForm").addEventListener("submit", saveOptions);

function saveOptions(e) {
  e.preventDefault();
  const blockedUrls = document
    .getElementById("blockedUrls")
    .value.split("\n")
    .filter((url) => url.trim() !== "");
  const customMessage = document.getElementById("customMessage").value;
  const popupInterval =
    parseInt(document.getElementById("popupInterval").value, 10) || 120;
  const meditationTime =
    parseInt(document.getElementById("meditationTime").value, 10) || 60;

  chrome.storage.sync.set(
    {
      blockedUrls,
      customMessage,
      popupInterval,
      meditationTime,
    },
    () => {
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get(
    ["blockedUrls", "customMessage", "popupInterval", "meditationTime"],
    (items) => {
      document.getElementById("blockedUrls").value = (
        items.blockedUrls || []
      ).join("\n");
      document.getElementById("customMessage").value =
        items.customMessage || "";
      document.getElementById("popupInterval").value =
        items.popupInterval || 120;
      document.getElementById("meditationTime").value =
        items.meditationTime || 60;
    }
  );
}
