
function load(key) {
    const json = localStorage.getItem(key);
    const value = JSON.parse(json)
    return value;
}

function store(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json)
}

export const storageService = {
    load,
    store
}