import english from './en.json'
import norwegian from './no.json'

const getStrings = (language) => {
    switch (language) {
    case 'en':
        return english
    case 'no':
        return {
            ...english,
            ...norwegian
        }
    default:
        return english
    }
}

export default getStrings
