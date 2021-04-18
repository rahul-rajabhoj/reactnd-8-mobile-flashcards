import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    AddCard
                </Text>
            </View>
        )
    }
}

export default connect()(AddCard)