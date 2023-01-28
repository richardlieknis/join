function renderPrioBtnClicked(prio) {
    return `
 <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
 <img src="../src/img/${prio}-white.svg" width="18px"/>
 `;
}

function renderPrioBtnUnclicked(prio) {
    return `
 <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
 <img src="../src/img/${prio}.svg" width="18px"/>
 `;
}

function renderPrioBtns() {
    return `
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
    return `
 <div  class="subtask">
     <input id="subtask${index}" type="checkbox" />
     <span>${subtasks[index]}</span>
 </div>
 `;
}

function renderAddDeleteBtns() {
    return `
 <div class="addDeleteBtns">
     <img onclick="deleteSubtaskInput()" src="../src/img/x.svg" />
     <div class="line"></div>
     <img onclick="addSubtaskInput()" src="../src/img/hook.svg" style="filter: invert(1)">
 </div>`;
}

function renderAddBtn() {
    return `
 <div class="addDeleteBtns">
     <img onclick="addNewSubtask()" src="../src/img/plus.svg" alt="" />
 </div>
 `;
}

function renderContactsToAssign(element) {
    return `
   <option value="${element.id}">
     ${element.name}
     <input type="checkbox"></input>
   </option>
   
 `;
}

function renderCategoryInputFull() {
    return `
 <select style="width: 100%" required id="task-input-category" onchange="handleCategoryChange()">
                   <option disabled selected>
                     Select or create a Category!
                   </option>
                   <option value="newCategory">New Category</option>
                 </select>
 `;
}

function renderCategoryInputOptionsExtra(category) {
    return `
                   <option value="${category.name}" class="color-${category.colorNumber}">
                   ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                   </option>
 `;
}


function renderCategoryInput() {
    return `
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