setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

function initSummary() {
    setAmount();
    checkLastPage();
    showWelcomeMsg();
}

async function setAmount() {
    document.getElementById('taskAmount').innerHTML = await getTaskAmount();
    document.getElementById('urgentAmount').innerHTML = await getUrgentAmount();;
    document.getElementById('progressAmount').innerHTML = await getCategoryAmount("inProgress");
    document.getElementById('feedbackAmount').innerHTML = await getCategoryAmount("awaitingFeedback");
    document.getElementById('todoAmount').innerHTML = await getCategoryAmount("todo");
    document.getElementById('doneAmount').innerHTML = await getCategoryAmount("done");
    document.getElementById('deadline').innerHTML = await getUrgentDueDate();
}

async function getAllTasks() {
    database = JSON.parse(await loadJSONFromServer());
    let tasks = JSON.parse(database.tasks);
    return tasks;
}


/**
 * Get and return the amount of all Tasks on Board
 * @returns length of all Tasks
 */
async function getTaskAmount() {
    let allTasks = [];
    let tasks = await getAllTasks();
    tasks.forEach((e) => {
        allTasks.push(e.category);
    })
    return allTasks.length;
}

/**
 * Get and return the amount of all urgent Tasks on Board
 * @returns length of all Tasks
 */
async function getUrgentAmount() {
    let allTasks = [];
    let tasks = await getAllTasks();
    tasks.forEach((e) => {
        if (e.priority === "urgent") {
            allTasks.push(e.priority);
        }
    })
    return allTasks.length;
}

/**
 * Get all Tasks with urgent priority
 * @returns formated Date 'March 2, 2023'
 */
async function getUrgentDueDate() {
    let allDates = [];
    let tasks = await getAllTasks();
    tasks.forEach((e) => {
        if (e.priority === "urgent") {
            allDates.push(e.dueDate);
        }
    })
    return formatDate(findNearestDate(allDates));
}

/**
 * Reads all Dates and return nearest Date to current
 * @param {string} dates 
 * @returns 
 */
function findNearestDate(dates) {
    const currentDate = new Date();
    let nearestDate;
    let minDiff = Infinity;

    for (const date of dates) {
        const diff = Math.abs(new Date(date) - currentDate);
        if (diff < minDiff) {
            minDiff = diff;
            nearestDate = date;
        }
    }
    return nearestDate;
}

/**
 * 
 * @param {string} dateString 
 * @returns formated Date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}




/**
 * Return the amount of specific Catagory on Board
 * @param {string} category - name of catagory
 * @returns - length of same catagory
 */
async function getCategoryAmount(category) {
    let allTasks = [];
    let tasks = await getAllTasks();
    tasks.forEach((e) => {
        if (e.status === category) {
            allTasks.push(e.category);
        }
    })
    return allTasks.length;
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
    greetingWithNameDesk();
    greetingWithNameMobile();
}

/**
 * Check if last Page URL ends with 'index.html'.
 * If true remove display:none
 */
function checkLastPage() {
    let lastPageWasIndex = document.referrer.endsWith("index.html");
    if (lastPageWasIndex) {
        let mobileAnim = document.getElementById("mobile-anim");
        mobileAnim.classList.remove('d-none');
    }
}
/**
 * This function is used for greeting the User with his name
 * 
 */
function greetingWithNameDesk() {
    document.getElementById('userNameDesk').innerHTML = localStorage.getItem('loggedUser');
}

function greetingWithNameMobile() {
    document.getElementById('userNameMobile').innerHTML = localStorage.getItem('loggedUser');
}