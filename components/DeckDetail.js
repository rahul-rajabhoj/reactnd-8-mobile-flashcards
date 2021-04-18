import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/decks'

class DeckDetail extends React.Component {
    render() {
        const { deckId, deck, goBack, remove } = this.props
        return (
            <View>
                <Text>
                    DeckDetail
                </Text>
            </View>
        )
    }
}

function mapStateToProps({ decks }, {route}) {
    const { deckId } = route.params
    return {
        deckId,
        deck: decks[deckId]
    }
}

function mapDispatchToProps (dispatch, { route, navigation }) {
    const { deckId } = route.params
  
    return {
      remove: () => dispatch(deleteDeck(deckId)),
      goBack: () => navigation.goBack(),
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)