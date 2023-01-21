"use strict"

let today = new Date();

      let dd = today.getDate();
      let mm = today.getMonth()+1; //January is 0!
      let yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 

      // today = yyyy + '/' + mm + '/' + dd;
       today = yyyy + '-' + mm + '-' + dd;

      console.log(today);
      document.getElementById('task-input-dueDate').value = today;

function renderAddTask() {
    getContactsToAssign();
    console.log('reder');
}

function getContactsToAssign() {
    let contactNames;
    contacts.forEach(element => {
        
    });
}