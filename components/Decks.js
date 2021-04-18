import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions/decks'

class Decks extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getAllDecks())
    }

    render() {
        const { decks } = this.props
        const deckIdsArray = Object.keys(decks)
        return (
            deckIdsArray.length === 0
                ? <View style={styles.noDataText}>
                    <Text style={styles.noDataText}>
                        No deck added yet..
                    </Text>
                </View>
                : <ScrollView>
                    <Text></Text>
                    {deckIdsArray.map(id => {
                        return <View style={styles.item} key={id}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('DeckDetail', { deckId: id })}>
                                <Text style={DeckTitleStyle}>{ decks[id].title }</Text>
                                <Text style={styles.cardInfo}>{ decks[id].cards.length } Cards</Text>
                            </TouchableOpacity>
                        </View>
                    })}
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        borderWidth: 0.5,
        borderColor: "grey",
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 18,
        paddingTop: 150,
        paddingBottom: 20,
        color: 'black',
        textAlign: "center",
    },
    deckTitleIOS: {
        fontSize: 25,
        textAlign: "center",
        color: "black",
    },
    deckTitleAndroid: {
        fontSize: 25,
        textAlign: "center",
        color: "black",
        fontWeight: "900"
    },
    cardInfo: {
        textAlign: "center",
        color: "grey"
    }
})

const DeckTitleStyle = Platform.OS === "ios" ? styles.deckTitleIOS : styles.deckTitleAndroid

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)