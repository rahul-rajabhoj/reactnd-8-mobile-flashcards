import AsyncStorage from '@react-native-async-storage/async-storage';
const DECKS_STORAGE_KEY = 'MobileFlashCards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        return results !== null
          ? JSON.parse(results)
          : {}
    })
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const data = JSON.parse(results);
        return data[id]
    })
}

export function saveDeck (id, value) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [id]: value
    }))
}

export function updateDeck (id, value) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[id] = value
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
    
export function deleteDeck (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })
}
