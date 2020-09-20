import React from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

import { saveDeckTitle } from '../utils/api'
import { addDeckEntry } from '../actions'

class NewDeck extends React.Component {
  state = {
    title: ''
  }

  submitNewDeck = () => {
    saveDeckTitle(this.state.title)
    var id = 0
    if (this.props.decks !== undefined && this.props.decks !== null) {
      id = Object.keys(this.props.decks).length
    }
    const newDeck = {
      [id]: {
        id: id,
        title: this.state.title,
        questions: []
      }
    };
    this.props.addDeckEntry(newDeck);
    this.setState(() => ({ title: '' }))
    this.props.navigation.navigate('DeckList')
  }

  onChangeTextTitle = ((title) => {
    this.setState(() => ({ title }))
  })

  render () {
    const { title } = this.props
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null} enabled>
          <Text style={styles.subHeader}>Enter Deck Title:</Text>
          <TextInput style={styles.textInput} onChangeText={this.onChangeTextTitle} value={this.state.title} maxLength={50}/>
          <TouchableOpacity style={styles.button} onPress={this.submitNewDeck}>
            <Ionicons name="md-send" size={24} color="purple" />
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}


const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 45,
    margin: 10
  },
  subHeader: {
    fontSize: 30,
    margin: 10,
    color: 'grey'
  },
  textInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderRadius: 7,
    shadowColor: 'rgba(0,0,0,.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  button: {
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 20,
    shadowColor: 'rgba(0,0,0,.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    flexDirection: 'row'
  },
  buttonText: {
    color: 'purple',
    fontSize: 22,
    textAlign: 'center',
    marginLeft: 5
  },
  twoColumns: {
    flexDirection: 'row'
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}


function mapDispatchToProps (dispatch) {
  return {
    addDeckEntry: (newDeck) => dispatch(addDeckEntry(newDeck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
