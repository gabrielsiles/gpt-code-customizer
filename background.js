chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url && tab.url.includes('chat.openai.com') && changeInfo.status === 'complete') {
      // Retrieve the saved background and send a message to the content script
      chrome.storage.sync.get('selectedBackground', function(data) {
          if (data.selectedBackground) {
              chrome.tabs.sendMessage(tabId, {type: "CHANGE_BACKGROUND", background: data.selectedBackground});
          }
      });

      // Retrieve the saved theme and send a message to the content script
      chrome.storage.sync.get('selectedTheme', function(data) {
          if (data.selectedTheme) {
              chrome.tabs.sendMessage(tabId, {type: "CHANGE_THEME", theme: data.selectedTheme});
          }
      });
  }
});
