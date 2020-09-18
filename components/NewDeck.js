import React from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import { saveDeckTitle } from '../utils/api'



export default class NewDeck extends React.Component {
  state = {
    title: '',
    test: ''
  }

  submitNewDeck = () => {
    console.log("SUBMIT", this.state.title)
    saveDeckTitle(this.state.title)
    this.props.navigation.navigate('DeckList')
  }

  onChangeTextTitle = ((title) => {
    this.setState(() => ({ title }))
  })

  render () {
    return (
      <View>
        <KeyboardAvoidingView>
          <Text>NEW DECK</Text>
          <Text>Enter Deck Title:</Text>
          <TextInput onChangeText={this.onChangeTextTitle} style={{borderWidth: 1}}/>
          <TouchableOpacity
            onPress={this.submitNewDeck}
            >
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'black'
  }
})
