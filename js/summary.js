function initSummary() {
    checkLastPage();
    showWelcomeMsg();
}

function getCurrentHour() {
    let currentHour = new Date().getHours();
    return currentHour;
}

function setCurrentTimeMsg() {
    let timeMsg = '';
    let currentHour = getCurrentHour();
    if (currentHour < 12) timeMsg = 'Good morning, ';
    if (currentHour >= 12 && currentHour <= 17) timeMsg = 'Good afternoon, ';
    if (currentHour > 17) timeMsg = 'Good evening, ';
    return timeMsg;
}

function showWelcomeMsg() {
    let timeMsgDesk = document.getElementById('timeMsgDesk');
    let timeMsgMobile = document.getElementById('timeMsgMobile');
    let timeMsg = setCurrentTimeMsg();
    timeMsgDesk.innerHTML = timeMsg;
    timeMsgMobile.innerHTML = timeMsg;
}

function checkLastPage() {
    let lastPageWasIndex = document.referrer.endsWith("index.html");
    if (lastPageWasIndex) {
        let mobileAnim = document.getElementById("mobile-anim");
        mobileAnim.classList.remove('d-none');
    }
}