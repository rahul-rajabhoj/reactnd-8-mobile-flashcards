import React from 'react'
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'
import { addDeck } from '../actions/decks'

class AddDeck extends React.Component {

    state = {
        title: '',
        showError: false,
        isSubmitted: false,
    }

    onChangeText = (inputText) => {
        this.setState({
            title: inputText
        })
        this.toggleShowError(false)
    }

    onSubmit = () => {
        const { title } = this.state
        const { dispatch } = this.props
        if(title.length !== 0) {
            dispatch(addDeck(title))

            this.setState({
                isSubmitted: true
            })
        } else {
            this.toggleShowError(true)
        }
    }

    toggleShowError(flag) {
        this.setState({
            showError: flag
        })
    }

    showDeckDetail = (deckId) => {
        const { navigation } = this.props
        navigation.navigate('DeckDetail', { deckId: deckId });
        this.setState({
            title: '',
            isSubmitted: false,
        })
    }

    render() {
        const { title, showError, isSubmitted } = this.state

        if(isSubmitted === true) {
            const { decks } = this.props
            const newDeck = Object.values(decks).filter((deck) => deck.title === title)

            this.showDeckDetail(newDeck[0].id)
        }

        return (
            <SafeAreaView>
                <View>
                    <Text style={styles.heading}>
                        What is the title of your new Deck?
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onChangeText}
                        value={title}
                        placeholder="Deck Title..."
                    />
                    {showError === true && <Text style={styles.errorMsg}>
                        Please enter deck title
                    </Text>}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onSubmit}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        marginTop: 200,
        fontSize: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        margin: 12,
        fontSize: 20,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 10,
        borderColor: 'purple',
    },
    button: {
        alignSelf: 'center',
        alignItems: "center",
        backgroundColor: 'purple',
        borderRadius: 10,
        padding: 10,
        margin: 20,
        height: 40,
        width: 150,
    },
    buttonText: {
        color: 'white',
    },
    errorMsg: {
        color: 'red',
        textAlign: "center",
    }
})

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck)