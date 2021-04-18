import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions/decks'

class Decks extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getAllDecks())
    }

    render() {
        return (
            <View>
                <Text>
                    Decks
                </Text>
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)