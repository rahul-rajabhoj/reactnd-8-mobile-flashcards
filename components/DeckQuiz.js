import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckQuiz extends React.Component {

    state = {
        questionAnswered: 0,
        score: 0,
        showQuestion: true
    }

    toggleShowQuestion = () => {
        this.setState((currentState) => ({
            showQuestion: !currentState.showQuestion
        }))
    }

    answeredIncorrect = () => {
        this.setState((currentState) => ({
            questionAnswered: currentState.questionAnswered + 1,
            showQuestion: true
        }))
    }

    answeredCorrect = () => {
        this.setState((currentState) => ({
            questionAnswered: currentState.questionAnswered + 1,
            score: currentState.score + 1,
            showQuestion: true
        }))
    }

    goBack = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    reset = () => {
        this.setState({
            questionAnswered: 0,
            score: 0,
            showQuestion: true
        })
    }

    render() {
        const { questionAnswered, score, showQuestion } = this.state
        const { cards } = this.props

        if(cards.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.noCardsText}>
                        Sorry, you cannot take a quiz because there are no cards in the deck
                    </Text>
                </View>
            )
        }
        return (
            <SafeAreaView style={styles.maincontainer}>
                { cards.map( (card, index) => (
                    questionAnswered === index && (
                        <View key={index}>
                            <Text style={styles.pager}>
                                {index + 1}/{cards.length}
                            </Text>
                            <View style={styles.body}>
                                { showQuestion === true && <Text style={styles.mainText}>{card.question}?</Text>}
                                { showQuestion === false && <Text style={styles.mainText}>{card.answer}</Text>}
                                <TouchableOpacity
                                    style={styles.toggleShowQuestionButton}
                                    onPress={this.toggleShowQuestion}
                                >
                                    <Text style={styles.buttonText}>
                                        { showQuestion === true ? 'Show Answer' : 'Show Question'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.correctButton}
                                    onPress={this.answeredCorrect}
                                >
                                    <Text style={styles.buttonText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.incorrectButton}
                                    onPress={this.answeredIncorrect}
                                >
                                    <Text style={styles.buttonText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                ))}
                {   questionAnswered === cards.length && (
                    <View style={styles.body}>
                        <Text style={styles.mainText}>
                            You Scored {Math.ceil(score/cards.length * 100)}%
                        </Text>
                        <TouchableOpacity
                            style={styles.correctButton}
                            onPress={this.reset}
                        >
                            <Text style={styles.buttonText}>
                                Take Quiz Again
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.toggleShowQuestionButton}
                            onPress={this.goBack}
                        >
                            <Text style={styles.buttonText}>
                                Go Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    maincontainer: {
        flex: 1,
        margin: 20,
    },
    body: {
        marginTop: 100,
        alignItems: 'center',
    },
    noCardsText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'grey'
    },
    pager: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold'
    },
    mainText: {
        textAlign: 'center',
        fontSize: 40,
    },
    toggleShowQuestionButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'orange',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        width: 200,
    },
    correctButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 20,
        height: 50,
        width: 200,
    },
    incorrectButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'red',
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
        width: 200,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
})

function mapStateToProps({ decks }, {route}) {
    const { deckId } = route.params
    const cards = decks[deckId].cards
    return {
        cards
    }
}

export default connect(mapStateToProps)(DeckQuiz)