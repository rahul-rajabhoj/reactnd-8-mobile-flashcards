import React from 'react';
import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import reducers from './reducers'
import middlewares from './middlewares'
import Decks from './components/Decks';
import AddDeck from './components/AddDeck'

function DecksScreen() {
  return (
    <View>
      <Decks />
    </View>
  );
}

function AddDeckScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AddDeck />
    </View>
  );
}

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <NavigationContainer>
          <CustomStatusBar backgroundColor="black" barStyle="light-content" />
          <Tab.Navigator>
            <Tab.Screen name="Decks" component={DecksScreen} />
            <Tab.Screen name="Add New Deck" component={AddDeckScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  } 
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  }
});

export default App
