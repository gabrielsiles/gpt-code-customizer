// This function updates the select element to reflect the current theme
function setCurrentThemeSelection(currentTheme) {
    var basicThemeSelector = document.getElementById('basicThemeSelector');
    var advancedThemeSelector = document.getElementById('advancedThemeSelector');
    
    basicThemeSelector.value = currentTheme === 'default' ? 'default' : 'default';
    advancedThemeSelector.value = currentTheme === 'dracula' || 
                               currentTheme === 'halloween' || 
                               currentTheme === 'christmas' ||
                               currentTheme === 'monkai' ||
                               currentTheme === 'github' ||
                               currentTheme === 'solarized' ||
                               currentTheme === 'baribie' 
                               ? currentTheme 
                               : 'default';

}

// Get the currently selected theme from storage and update the select element
chrome.storage.sync.get('selectedTheme', function(data) {
    if (data.selectedTheme) {
        setCurrentThemeSelection(data.selectedTheme);
    } else {
        // If there's no theme saved, set it to the default value
        setCurrentThemeSelection('default');
    }
});

// When the basic theme button is clicked
document.getElementById('applyBasicTheme').addEventListener('click', function() {
    var selectedTheme = document.getElementById('basicThemeSelector').value;
    applyTheme(selectedTheme);
});

// When the advanced theme button is clicked
document.getElementById('applyAdvancedTheme').addEventListener('click', function() {
    var selectedTheme = document.getElementById('advancedThemeSelector').value;
    applyTheme(selectedTheme);
});

function applyTheme(themeName) {
    console.log('Applying theme: ', themeName);
    
    // Save the selected theme using Chrome Storage API
    chrome.storage.sync.set({'selectedTheme': themeName}, function() {
        console.log('Theme is set to ' + themeName);
    });

    // Send a message to the active tab to change the theme
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "CHANGE_THEME", theme: themeName});
        }
    });
}

// When the custom background color button is clicked
document.getElementById('applyCustomColor').addEventListener('click', function() {
    var selectedBackground = document.getElementById('customColorPicker').value;
    applyBackground(selectedBackground);
});

function applyBackground(backgroundName) {
    console.log('Applying background: ', backgroundName);

    // Save the selected background using Chrome Storage API
    chrome.storage.sync.set({'selectedBackground': backgroundName}, function() {
        console.log('Background is set to ' + backgroundName);
    });

    // Send a message to the active tab to change the background
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "CHANGE_BACKGROUND", background: backgroundName});
        }
    });
}




