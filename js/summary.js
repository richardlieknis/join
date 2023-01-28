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


// Nur zu Testzwecken

const dummyData = [{
        id: 0,
        label: "design",
        title: "task a",
        description: "Modify the contents of the main website...",
        dueDate: "05-08-2022",
        subtasks: [],
        assignedTo: [{
                name: "Sandra Müller",
                email: "sandra.mueller@gmx.de",
                phone: "+4994937394",
                color: "blue",
                initials: "SM",
            },
            {
                name: "Manuel Vogel",
                email: "manu.vogel@gmail.com",
                phone: "+49934798347",
                color: "pink",
                initials: "MV",
            },
        ],
        priority: "low",
        category: "todo",
    },
    {
        id: 1,
        label: "sales",
        title: "task b",
        description: "Make the product presentation to prospective buyers",
        dueDate: "05-08-2022",
        subtasks: [],
        assignedTo: [{
                name: "Anton Sommer",
                email: "anton.so@gmx.net",
                phone: "+4998747394",
                color: "dark-blue",
                initials: "AS",
            },
            {
                name: "Denise Eibold",
                email: "denise.e@gmail.com",
                phone: "+494556657",
                color: "red",
                initials: "DE",
            },
            {
                name: "Sandra Müller",
                email: "sandra.mueller@gmx.de",
                phone: "+4994937394",
                color: "blue",
                initials: "SM",
            },
            {
                name: "Manuel Vogel",
                email: "manu.vogel@gmail.com",
                phone: "+49934798347",
                color: "pink",
                initials: "MV",
            },
        ],
        priority: "medium",
        category: "todo",
    },
    {
        id: 2,
        label: "backoffice",
        title: "task c",
        description: "Modify the contents of the main website...",
        dueDate: "05-08-2022",
        subtasks: [
            { title: "subtask 1", done: true },
            { title: "subtask 2", done: false },
        ],
        assignedTo: [{
                name: "Sandra Müller",
                email: "sandra.mueller@gmx.de",
                phone: "+4994937394",
                color: "blue",
                initials: "SM",
            },
            {
                name: "Manuel Vogel",
                email: "manu.vogel@gmail.com",
                phone: "+49934798347",
                color: "pink",
                initials: "MV",
            },
        ],
        priority: "low",
        category: "awaitingFeedback",
    },
    {
        id: 3,
        label: "media",
        title: "task d",
        description: "Make the product presentation to prospective buyers",
        dueDate: "05-08-2022",
        subtasks: [],
        assignedTo: [{
                name: "Anton Sommer",
                email: "anton.so@gmx.net",
                phone: "+4998747394",
                color: "dark-blue",
                initials: "AS",
            },
            {
                name: "Denise Eibold",
                email: "denise.e@gmail.com",
                phone: "+494556657",
                color: "red",
                initials: "DE",
            },
        ],
        priority: "urgent",
        category: "inProgress",
    },
    {
        id: 4,
        label: "marketing",
        title: "task e",
        description: "Modify the contents of the main website...",
        dueDate: "05-08-2022",
        subtasks: [
            { title: "subtask 1", done: false },
            { title: "subtask 2", done: false },
        ],
        assignedTo: [{
                name: "Sandra Müller",
                email: "sandra.mueller@gmx.de",
                phone: "+4994937394",
                color: "blue",
                initials: "SM",
            },
            {
                name: "Manuel Vogel",
                email: "manu.vogel@gmail.com",
                phone: "+49934798347",
                color: "pink",
                initials: "MV",
            },
        ],
        priority: "low",
        category: "awaitingFeedback",
    },
    {
        id: 5,
        label: "backoffice",
        title: "task f",
        description: "Make the product presentation to prospective buyers",
        dueDate: "05-08-2022",
        subtasks: [],
        assignedTo: [{
                name: "Anton Sommer",
                email: "anton.so@gmx.net",
                phone: "+4998747394",
                color: "dark-blue",
                initials: "AS",
            },
            {
                name: "Denise Eibold",
                email: "denise.e@gmail.com",
                phone: "+494556657",
                color: "red",
                initials: "DE",
            },
        ],
        priority: "urgent",
        category: "awaitingFeedback",
    },
    {
        id: 6,
        label: "marketing",
        title: "task g",
        description: "Modify the contents of the main website...",
        dueDate: "05-08-2022",
        subtasks: [
            { title: "subtask 1", done: true },
            { title: "subtask 2", done: true },
            { title: "subtask 1", done: true },
            { title: "subtask 2", done: true },
            { title: "subtask 1", done: true },
            { title: "subtask 2", done: true },
            { title: "subtask 1", done: true },
            { title: "subtask 2", done: true },
        ],
        assignedTo: [{
                name: "Sandra Müller",
                email: "sandra.mueller@gmx.de",
                phone: "+4994937394",
                color: "blue",
                initials: "SM",
            },
            {
                name: "Manuel Vogel",
                email: "manu.vogel@gmail.com",
                phone: "+49934798347",
                color: "pink",
                initials: "SM",
            },
            {
                name: "Anton Sommer",
                email: "anton.so@gmx.net",
                phone: "+4998747394",
                color: "dark-blue",
                initials: "AS",
            },
            {
                name: "Denise Eibold",
                email: "denise.e@gmail.com",
                phone: "+494556657",
                color: "red",
                initials: "DE",
            },
        ],
        priority: "low",
        category: "done",
    },
    {
        id: 7,
        label: "media",
        title: "task h",
        description: "Make the product presentation to prospective buyers",
        dueDate: "05-08-2022",
        subtasks: [],
        assignedTo: [{
                name: "Anton Sommer",
                email: "anton.so@gmx.net",
                phone: "+4998747394",
                color: "dark-blue",
                initials: "AS",
            },
            {
                name: "Denise Eibold",
                email: "denise.e@gmail.com",
                phone: "+494556657",
                color: "red",
                initials: "DE",
            },
        ],
        priority: "urgent",
        category: "done",
    },
];