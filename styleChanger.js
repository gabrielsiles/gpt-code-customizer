// When the content script loads, check for a saved theme and apply it
chrome.storage.sync.get('selectedTheme', function(data) {
  if (data.selectedTheme) {
      switchTheme(data.selectedTheme);
  }
});

chrome.storage.sync.get('selectedBackground', function(data) {
  if (data.selectedBackground) {
      changeBackground(data.selectedBackground);
  }
});
// This will mark the content script as available for messaging
window.isContentScriptAvailable = true;

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "CHANGE_THEME") {
      switchTheme(request.theme);
  } 
  if (request.type === "CHANGE_BACKGROUND") {
      changeBackground(request.background);
  }
  return true; // Return true for asynchronous response
});

function switchTheme(themeName) {
  console.log("Attempting to switch to theme:", themeName); // Debugging line

  // Remove any existing theme
  var existingStyles = document.querySelectorAll('.custom-theme-style');
  existingStyles.forEach(function(style) {
      style.remove();
  });

  // Determine if it's a theme change or a reset to default
  if(themeName !== "none"){
      // Load the new theme
      var link = document.createElement('link');
      link.href = chrome.runtime.getURL(themeName + 'mode.css');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.classList.add('custom-theme-style'); // Helps identify our custom theme style
      document.head.appendChild(link);
      console.log("Theme switched to:", themeName); // Confirm theme switch
  }
}

function changeBackground(backgroundName) {
  console.log("Attempting to change background to:", backgroundName);

  // Remove any existing background style
  var existingBackground = document.querySelectorAll('.custom-background-style');
  existingBackground.forEach(function(style) {
      style.remove();
  });

  if (backgroundName !== "default") {
      // Load the new background
      var link = document.createElement('link');
      link.href = chrome.runtime.getURL(backgroundName + '.css');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.classList.add('custom-background-style');
      document.head.appendChild(link);
      console.log("Background changed to:", backgroundName);
  }
}
