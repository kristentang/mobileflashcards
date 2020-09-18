import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants'
import { purple, white } from './utils/colors'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import QuizView from './components/QuizView'
import { deleteAllDecks, getDecks } from './utils/api'
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  )
}

const Tabs = createAppContainer(createBottomTabNavigator({
  DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'All Decks'
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck'
      }
    }
  },{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple: white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
));

export default class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <Text>MOBILE FLASHCARDS APP</Text>
          <Tabs />
        </View>
      </Provider>
    );
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
