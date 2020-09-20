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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';import { Provider as PaperProvider } from "react-native-paper";
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { deleteAllDecks, getDecks } from './utils/api'
import reducer from './reducers'

import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import QuizView from './components/QuizView'


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
        tabBarLabel: 'All Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={36} color={tintColor} />
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Create Deck',
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="add-box" size={36} color={tintColor} />
      }
    }
  },{
  tabBarOptions: {
    activeTintColor: 'purple',
    style: {
      height: 56,
      backgroundColor: 'white',
      shadowColor: 'rgba(0,0,0,.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      padding: 5
    },
    labelStyle: {
      fontSize: 12
    }
  }
}
));

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions:  {
      headerShown: false
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: 'My Deck',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      }
    })
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: 'All Decks',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      }
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Question',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      }
    })
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple'
      }
    })
  }
}))

export default class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={'purple'} barStyle='light-content' />
          <MainNavigator />
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
