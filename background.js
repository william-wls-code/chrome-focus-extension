let lastAccessTimes = {};
let bypassUrls = new Set();

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.sync.get(
    ["blockedUrls", "customMessage", "popupInterval", "meditationTime"],
    (result) => {
      const blockedUrls = result.blockedUrls || [];
      const customMessage = result.customMessage || "";
      const popupInterval = result.popupInterval || 120;
      const meditationTime = result.meditationTime || 60;

      const matchedUrl = blockedUrls.find((url) => details.url.includes(url));
      if (matchedUrl && !bypassUrls.has(details.url)) {
        const currentTime = Date.now();
        const lastAccessTime = lastAccessTimes[matchedUrl] || 0;

        if (currentTime - lastAccessTime > popupInterval * 60 * 1000) {
          lastAccessTimes[matchedUrl] = currentTime;
          chrome.tabs.update(details.tabId, {
            url:
              chrome.runtime.getURL("countdown.html") +
              `?customMessage=${encodeURIComponent(
                customMessage
              )}&url=${encodeURIComponent(details.url)}`,
          });
        }
      }
    }
  );
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "bypassUrl") {
    bypassUrls.add(message.url);
    setTimeout(() => {
      bypassUrls.delete(message.url);
    }, 5000);
  }
});
