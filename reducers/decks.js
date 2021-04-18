import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, DELETE_DECK, addCard } from '../actions/decks'
import { deleteDeck, saveDeck, updateDeck } from '../utils/api'
import { generateUID } from '../utils/helpers'

export default function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS: {
            const { decks } = action
            return {
                ...state,
                ...decks
            }
        }

        case ADD_DECK: {
            const { title } = action
            const id = generateUID()
            const newDeck = {
                id,
                title,
                cards: [],
            }

            saveDeck(id, newDeck)

            return {
                ...state,
                [id]: newDeck
            }
        }

        case ADD_CARD: {
            const { id, question, answer } = action
            const updatedState = {
                ...state,
                [id]: {
                    ...state[id],
                    cards: [
                        ...state[id].cards,
                        {
                            question,
                            answer,
                        }
                    ]
                }
            }

            updateDeck(id, updatedState[id])

            return updatedState

        }

        case DELETE_DECK: {
            const { id } = action

            delete state[id]

            deleteDeck(id)
            
            return state
        }

        default: 
            return state
    }
}