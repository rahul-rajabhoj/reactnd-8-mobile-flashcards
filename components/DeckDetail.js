import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends React.Component {
    render() {
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
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps)(DeckDetail)