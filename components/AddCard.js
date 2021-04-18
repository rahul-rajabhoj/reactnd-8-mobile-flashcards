import React from 'react'
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/decks'

class AddCard extends React.Component {
    state = {
        question: '',
        answer: '',
        showError: false,
    }

    onChangeInput = (key, value) => {
        this.setState({
            [key]: value
        })
        this.toggleShowError(false)
    }

    onSubmit = () => {
        const { question, answer } = this.state
        const { dispatch, deckId, navigation } = this.props
        if(question.length !== 0 && answer.length !== 0) {
            dispatch(addCard(deckId, question, answer))
            navigation.goBack()
        } else {
            this.toggleShowError(true)
        }
    }

    toggleShowError(flag) {
        this.setState({
            showError: flag
        })
    }

    render() {
        const { question, answer, showError } = this.state

        return (
            <SafeAreaView>
                <View>
                    <Text style={styles.heading}>
                        Enter Question & Answer
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.onChangeInput('question', text)}
                        value={question}
                        placeholder="Question"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.onChangeInput('answer', text)}
                        value={answer}
                        placeholder="Answer"
                    />
                    {showError === true && <Text style={styles.errorMsg}>
                        Please enter question and answer
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

function mapStateToProps({ decks }, {route}) {
    const { deckId } = route.params
    return {
        deckId,
        deck: decks[deckId]
    }
}
    
export default connect(mapStateToProps)(AddCard)