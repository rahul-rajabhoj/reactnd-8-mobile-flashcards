import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers'
import middlewares from './middlewares'
import Decks from './components/Decks';

class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Decks />
        </View>
      </Provider>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
