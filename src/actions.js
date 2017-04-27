function action (type, payload = {}) {
    return { type, ...payload }
}

export const LOAD_STRINGS = 'LOAD_STRINGS'
export const loadStrings = (language) => action(LOAD_STRINGS, {language})
