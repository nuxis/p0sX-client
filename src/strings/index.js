import english from './en.json'
import bokmal from './nb.json'

const getStrings = (language) => {
    switch (language) {
    case 'en':
        return english
    case 'nb':
        return {
            ...english,
            ...bokmal
        }
    default:
        return english
    }
}

export default getStrings
