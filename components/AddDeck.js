import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class AddDeck extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    AddDeck
                </Text>
            </View>
        )
    }
}

export default connect()(AddDeck)