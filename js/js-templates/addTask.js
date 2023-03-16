function renderPrioBtnClicked(prio) {
    return /*html*/`
 <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
 <img src="../src/img/${prio}-white.svg" width="18px"/>
 `;
}

function renderPrioBtnUnclicked(prio) {
    return /*html*/`
 <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
 <img src="../src/img/${prio}.svg" width="18px"/>
 `;
}

function renderPrioBtns() {
    return /*html*/`
     <div onclick="choosePriority('urgent')" id="urgentBtn" class="prioBtn">
             <span>Urgent</span>
             <img src="../src/img/urgent.svg" />
     </div>
     <div onclick="choosePriority('medium')" id="mediumBtn" class="prioBtn">
         <span>Medium</span>
         <img src="../src/img/medium.svg" />
     </div>
     <div onclick="choosePriority('low')" id="lowBtn" class="prioBtn">
         <span>Low</span>
         <img src="../src/img/low.svg" />
     </div>
 `;
}


function renderSubtaskCheckbox(index) {
    return /*html*/`
 <div  class="subtask">
     <span>${subtasks[index].title}</span>
 </div>
 `;
}

function renderAddDeleteBtns() {
    return /*html*/`
 <div class="addDeleteBtns">
     <img onclick="deleteSubtaskInput()" src="../src/img/x.svg" />
     <div class="line"></div>
     <img onclick="addSubtaskInput()" src="../src/img/hook.svg" style="filter: invert(1)">
 </div>`;
}

function renderAddBtn() {
    return /*html*/`
 <div class="addDeleteBtns">
     <img onclick="addNewSubtask()" src="../src/img/plus.svg" alt="" />
 </div>
 `;
}


function renderCategoryInputFull() {
    return /*html*/`
    
    <div id="category-selection">               
        <div onclick="createNewCategory()" style="margin-top: 15px" value="newCategory">New Category</div>
            <div class="contactsToAssign d-none" id="task-input-category"></div>
        </div>
    </div>
 `;
}

function createNewCategoryTemp() {
    return /*html*/`
    <div id="category-selection">
    <div class="task-input-assignedTo" onclick="showOrHideCategoryTask(event)">
                <div id="selectedCategory">Select or create a Category</div>
            <div class="contactsToAssign z-1 d-none" id="task-input-category"></div>
            <img height="10px" src="../src/img/dropDownArrow2.ico" />
        </div>
    </div>
    <p id="chooseCategory"></p>
 `
}

function renderCategoryInputOptionsExtra(category) {
    return /*html*/`
                   <div onclick="selectCategory(event)" class="categoryHover" value="${category.name}">
                   ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                   <div class="color-dot color-${category.colorNumber}"></div>
                </div>
 `;
}


function renderCategoryInput() {
    return /*html*/`
 <div class="addSubTask">
         <input id="new-category-input" type="text" />
         <div class="addSubTaskBtn">
             <div class="addDeleteBtnsCat">
                 <img onclick="deleteCategoryInput()" src="../src/img/x.svg" />
                 <div class="line"></div>
                 <img onclick="addNewCategory()" style="filter: invert(1)" src="../src/img/hook.svg" alt="" />
             </div>
         </div>
     </div>
     <div class="chooseColor">
     <span onclick="addColor(1, this)" class="color-1 colorOption"></span>
     <span onclick="addColor(2, this)" class="color-2 colorOption"></span>
     <span onclick="addColor(3, this)" class="color-3 colorOption"></span>
     <span onclick="addColor(4, this)" class="color-4 colorOption"></span>
     <span onclick="addColor(5, this)" class="color-5 colorOption"></span>
     <span onclick="addColor(6, this)" class="color-6 colorOption"></span>
     <span onclick="addColor(7, this)" class="color-7 colorOption"></span>
 </div>
 `;
}

function renderContactsTemp(contacts) {
    return /*html*/`
    <div onclick="dontClose(event)" class="contactToAssign">
        <div>${contacts.name}</div>
        <input id="${contacts.id}" type="checkbox">
    </div>
    `;
}

function renderAssignInput() {
    return /*html*/`
    <div
                  class="task-input-assignedTo"
                  onclick="showOrHideContactsTask(event)"
                >
                  <span>Select contacts to assign</span>
                  <div
                    class="contactsToAssign d-none"
                    id="assignmentContainer"
                  ></div>
                  <img height="10px" src="../src/img/dropDownArrow2.ico" />
                </div>
    `;
}

function renderInviteContactTemp() {
    return /*html*/`
        <div class="inviteBtn" onclick="toggleAssignmentInput()">
            <span>Invite new contact</span>
            <img src="../src/img/contacts-black.svg">
        </div>
    `;
}

function renderInviteContactInput() {
    return /*html*/`
    <div class="addSubTask">
            <input id="new-contact-input" type="email" placeholder="Contact eMail" />
            <div class="addSubTaskBtn">
                <div class="addDeleteBtnsCat">
                    <img onclick="showAssignInput()" src="../src/img/x.svg" />
                    <div class="line"></div>
                    <img onclick="validateEmail(event);" style="filter: invert(1)" src="../src/img/hook.svg" alt="" />
                </div>
            </div>
     </div>
 `;
}