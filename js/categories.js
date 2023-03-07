"use strict";

async function saveCategoriesToBackend() {
    await backend.setItem('categories', JSON.stringify(categories));
}

async function loadCategoriesFromBackend() {
    await downloadFromServer();
    categories = JSON.parse(backend.getItem('categories')) || [];
}