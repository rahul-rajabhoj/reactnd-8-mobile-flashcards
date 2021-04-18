import { getDecks } from "../utils/api"

const RECEIVE_DECKS = 'RECEIVE_DECKS'
const ADD_DECK = 'ADD_DECK'
const ADD_CARD = 'ADD_CARD'
const DELETE_DECK = 'DELETE_DECK'

export function getAllDecks() {
    return (dispatch) => {
        getDecks().then((decks) => {
            dispatch(receiveDecks(decks))
        }).catch( error => {
            console.error('Error in getInitialData', error)
        })
    }
}

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function addCard(id, question, answer) {
    return {
        type: ADD_CARD,
        id,
        question,
        answer
    }
}

export function ddeleteDeck(id) {
    return {
        type: DELETE_DECK,
        id
    }
}