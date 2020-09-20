import React from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons';
import { connect } from 'react-redux'

class QuizView extends React.Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    showQuestion: true,
    percent: 0,
    displayQuestion: null
  }

  flipCard = () => {
    this.setState(() => ({ showQuestion: !this.state.showQuestion }))
  }

  correctAnswer = () => {
    const percent = this.getPercentage((this.state.correctAnswers + 1), (this.state.questionIndex + 1))

    this.setState(() => ({
      questionIndex: (this.state.questionIndex + 1),
      correctAnswers: (this.state.correctAnswers + 1),
      showQuestion: true,
      percent: percent,
      displayQuestion: this.props.deck.questions[(this.state.questionIndex + 1)]
    }))
  }

  incorrectAnswer = () => {
    const percent = this.getPercentage((this.state.correctAnswers), (this.state.questionIndex + 1))

    this.setState(() => ({
      questionIndex: (this.state.questionIndex + 1),
      showQuestion: true,
      percent: percent,
      displayQuestion: this.props.deck.questions[(this.state.questionIndex + 1)]
    }))
  }

  getPercentage = (numerator, denominator) => {
    return ((numerator/denominator) * 100).toFixed(2)
  }

  backToDeck = () => {
    this.props.navigation.navigate('Deck', { id: this.props.deck.id } );
  }

  restartQuiz= () => {
    this.setState(() => ({
      questionIndex: 0,
      correctAnswers: 0,
      showQuestion: true,
      percent: 0,
      displayQuestion: this.props.deck.questions[0]
    }))
  }

  componentDidMount() {
    this.setState(() => ({ displayQuestion:  this.props.deck.questions[0]}))
  }

  render () {
    const { deck } = this.props
    const { questionIndex, correctAnswers, showQuestion, percent, displayQuestion } = this.state

    if ((deck.questions.length > 0) && (questionIndex < deck.questions.length) && displayQuestion !== null && displayQuestion !== undefined) {
      const { question } = deck.questions[questionIndex]
      return (
        <View style={styles.container}>
          {
            showQuestion
            ?
            <Text style={styles.card}>{displayQuestion.question}</Text>
            :
            <Text style={styles.card}>{displayQuestion.answer}</Text>
          }
          <TouchableOpacity onPress={this.flipCard} style={[styles.button, {marginBottom: 80}]}>
            {
              showQuestion
              ?
              <MaterialCommunityIcons name="toggle-switch" size={24} color="purple" />
              :
              <MaterialCommunityIcons name="toggle-switch-off" size={24} color="purple" />
            }
            <Text style={[styles.buttonText]}>Flip</Text>
          </TouchableOpacity>
          <View style={styles.twoColumns}>
            <TouchableOpacity onPress={this.incorrectAnswer} style={[styles.button, {backgroundColor: 'red'}]}>
              <Feather name="x-circle" size={24} color="white" />
              <Text style={[styles.buttonText, {color: "white"}]}>Incorrect</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.correctAnswer} style={[styles.button, {backgroundColor: 'green'}]}>
              <Ionicons name="md-checkmark-circle-outline" size={24} color="white" />
              <Text style={[styles.buttonText, {color: "white"}]}>Correct</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subHeader}>{questionIndex}/{deck.questions.length} Questions</Text>
        </View>
      )
    } else if ((deck.questions.length > 0) && (questionIndex == deck.questions.length)) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Quiz: {deck.title}</Text>
          <Text style={styles.subHeader}>Your score: {correctAnswers}/{deck.questions.length} Questions</Text>
          <Text style={styles.subHeader}>{percent} %</Text>
          <View style={styles.twoColumns}>
            <TouchableOpacity onPress={this.restartQuiz} style={styles.button}>
            <MaterialIcons name="question-answer" size={24} color="purple" />
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.backToDeck} style={styles.button}>
              <AntDesign name="back" size={24} color="purple" />
              <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Quiz: {deck.title}</Text>
          <Text style={styles.subHeader}>No Questions in this Deck</Text>
        </View>

      )
    }
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
  card: {
    borderWidth: 1,
    fontSize: 30,
    padding: 40,
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

function mapStateToProps (state, { navigation }) {
  const { id } = navigation.state.params

  return {
    deck: state[id]
  }
}

export default connect( mapStateToProps )(QuizView);
