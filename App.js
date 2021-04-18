import React from 'react';
import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducers from './reducers'
import middlewares from './middlewares'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import DeckQuiz from './components/DeckQuiz'

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()
    
const TabNav = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon
        if (route.name === 'Add New Deck') {
          icon = (
            <FontAwesome name="plus-square" size={size} color={color} />
          )
        } else if (route.name === 'Decks') {
          icon = (
            <Ionicons name="ios-bookmarks" size={size} color={color} />
          )
        } 
        return icon
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
      style: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
      },
      indicatorStyle: {
        backgroundColor: 'yellow',
      },
    }}
  >
    <Tab.Screen name="Decks" component={Decks} />
    <Tab.Screen name="Add New Deck" component={AddDeck} />
  </Tab.Navigator>
)

const Stack = createStackNavigator()

const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
)

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <NavigationContainer>
          <CustomStatusBar backgroundColor="purple" barStyle="light-content" />
          <Stack.Navigator headerMode="screen">
            <Stack.Screen
              name="Home"
              component={TabNav}
              options={{headerShown: false}}/>
            <Stack.Screen 
              name="DeckDetail" 
              component={DeckDetail} 
              options={{
                headerTintColor: 'white', 
                headerStyle: {
                  backgroundColor: 'purple',
                }
              }}
            />
            <Stack.Screen 
              name="Add Card" 
              component={AddCard} 
              options={{
                headerTintColor: 'white', 
                headerStyle: {
                  backgroundColor: 'purple',
                }
              }}
            />
            <Stack.Screen 
              name="Deck Quiz" 
              component={DeckQuiz} 
              options={{
                headerTintColor: 'white', 
                headerStyle: {
                  backgroundColor: 'purple',
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  } 
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  }
})

export default App
