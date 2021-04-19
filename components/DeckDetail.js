import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/decks'

class DeckDetail extends React.Component {

    state = {
        bounceValue: new Animated.Value(1),
    }

    addCard = () => {
        const { deck, navigation } = this.props
        navigation.navigate('Add Card', { deckId: deck.id });
    }

    startQuiz = () => {
        const { deck, navigation } = this.props
        navigation.navigate('Deck Quiz', { deckId: deck.id });
    }

    deleteDeck = () => {
        const { goBack, remove } = this.props
        goBack()
        remove()
    }

    componentDidMount() {
        const { bounceValue } = this.state
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04, useNativeDriver: false}),
            Animated.spring(bounceValue, { toValue: 1, friction: 4, useNativeDriver: false})
        ]).start()
    }

    render() {
        const { bounceValue } = this.state
        const { deck, navigation } = this.props

        navigation.setOptions({ title: deck?.title }); 

        return (
            <Animated.View style={[styles.container, {transform: [{scale: bounceValue}]}]}>
                <Text style={styles.deckTitle}>{deck?.title}</Text>

                <Text style={styles.cardInfo}>{deck?.cards?.length} Cards</Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={this.addCard}
                >
                    <Text style={styles.addButtonText}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.quizButton}
                    onPress={this.startQuiz}
                >
                    <Text style={styles.quizButtonText}>Start Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteDeckButton}
                    onPress={this.deleteDeck}
                >
                    <Text style={styles.deleteDeckButtonText}>Delete Deck</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    deckTitle: {
        fontSize: 50,
        fontWeight: '900',
        marginBottom: 10,
        textAlign: 'center'
    },
    cardInfo: {
        color: 'grey',
        fontSize: 20,
        marginBottom: 100,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
        width: 200,
    },
    addButtonText: {
        color: 'black',
    },
    quizButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'black',
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
        width: 200,
    },
    quizButtonText: {
        color: 'white',
    },
    deleteDeckButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
        width: 200,
    },
    deleteDeckButtonText: {
        color: 'red',
    },
})

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