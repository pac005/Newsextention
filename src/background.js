console.log("loaded...");
chrome.browserAction.onClicked.addListener(buttonClicked)

// when top button is clicked
function buttonClicked(tab){
    console.log(tab);
}
