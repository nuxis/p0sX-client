// Find object based on object.id by taking list and id
export function findObjectById (list, id) {
    return list.find(function (element) {
        return id === element.id
    })
}

// Remove object based on id
export function removeObjectById (list, id) {
    return list.filter(function (element) {
        return id !== element.id
    })
}

// Remove item from list
export function findItemInList (list, item) {
    return list.find(function (element) {
        return element === item
    })
}

// Remove item from list
export function removeItemInList (list, item) {
    return list.filter(function (element) {
        return element !== item
    })
}
