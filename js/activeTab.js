/**
 * Get current Page name and return its path
 * @returns path name without .html ending
 */

function getPageName() {
    let path = window.location.pathname;
    path = path.split('/').pop();
    path = path.split('.').shift();
    return path;
}


/**
 * Highlightes the menu tab for the current page
 */
function setCurrentTab() {
    const path = getPageName();
    console.log(path);
    let menuToActivate = document.getElementById(path);
    menuToActivate.classList.add('active');
}

function currTabInit() {
    setTimeout(setCurrentTab, 40);
}