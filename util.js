export function fetchJson(url) {
    return fetch(url).then(it => it.json())
}

export function includes(searchIn, searchFor) {
    return searchIn.toLowerCase().includes(searchFor.toLowerCase())
}
