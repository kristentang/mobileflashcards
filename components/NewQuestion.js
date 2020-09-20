import React from 'react'
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { addCardToDeck } from '../utils/api'
import { addCardEntry } from '../actions'


class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  submitNewQuestion = () => {
    addCardToDeck(this.props.deck.id, this.props.deck.title, { question: this.state.question, answer: this.state.answer} )
    this.props.addCardEntry(this.props.deck.id, this.props.deck, { question: this.state.question, answer: this.state.answer});
    this.setState({ question: '', answer: '' });
    this.props.navigation.navigate('Deck', { id: this.props.deck.id } );
  }

  onChangeTextQuestion = ((question) => {
    this.setState(() => ({ question }))
  })

  onChangeTextAnswer = ((answer) => {
    this.setState(() => ({ answer }))
  })

  render () {
    const { deck } = this.props

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
           style={styles.container}
           behavior={(Platform.OS === 'ios') ? "padding" : null} enabled>
          <Text style={styles.header}>{deck.title}</Text>
          <Text style={styles.subHeader}>Enter Question:</Text>
          <TextInput style={styles.textInput} maxLength={50} onChangeText={this.onChangeTextQuestion} value={this.state.question}/>
          <Text style={styles.subHeader}>Enter Answer:</Text>
          <TextInput style={styles.textInput} maxLength={50} onChangeText={this.onChangeTextAnswer} value={this.state.answer}/>
          <TouchableOpacity style={styles.button} onPress={this.submitNewQuestion} disabled={(this.state.question == '' || this.state.answer == '')}>
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
  }
})

function mapStateToProps (state, { navigation }) {
  const { id } = navigation.state.params

  return {
    deck: state[id]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCardEntry: (id, deck, card) => dispatch(addCardEntry(id, deck, card))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(NewQuestion);
