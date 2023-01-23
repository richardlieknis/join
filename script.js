"use strict";

let users = [];
let tasks = [];
let contacts = [];

function getIndexOfArray(array, id) {
    let index;
    for (let i = 0; i < array.length; i++) {

        if (id == array[i].id) index = i;
    
    }
    return index;
}