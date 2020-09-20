import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import { connect } from 'react-redux'


class Deck extends React.Component {

  startQuiz = () => {
    this.props.navigation.navigate('QuizView', { id: this.props.deck.id } );
  }

  addCard = () => {
    this.props.navigation.navigate('NewQuestion', { id: this.props.deck.id } );
  }

  render () {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.subHeader}>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
        <View style={styles.twoColumns}>
          <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
            <MaterialIcons name="question-answer" size={24} color="purple" />
            <Text style={styles.buttonText}>Start a Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.addCard}>
            <MaterialIcons name="add-box" size={24} color="purple" />
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        </View>

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
  header: {
    fontSize: 45,
    margin: 10
  },
  subHeader: {
    fontSize: 30,
    margin: 10,
    color: 'grey'
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

function mapStateToProps (state, { navigation }) {
  const { id } = navigation.state.params

  return {
    deck: state[id]
  }
}

export default connect( mapStateToProps )(Deck);
