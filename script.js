"use strict";

let users = [];
let tasks = [];
let contacts = [];
let categories = [
    {
        'name': 'design',
        'colorNumber': 1
    },
    {
        'name': 'sales',
        'colorNumber': 2
    },
    {
        'name': 'backoffice',
        'colorNumber': 3
    },
    {
        'name': 'media',
        'colorNumber': 4
    },
    {
        'name': 'marketing',
        'colorNumber': 5
    },
];

function getIndexOfArray(array, id) {
    let index;
    for (let i = 0; i < array.length; i++) {

        if (id == array[i].id) index = i;
    
    }
    return index;
}