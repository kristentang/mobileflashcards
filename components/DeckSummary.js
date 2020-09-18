import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class DeckSummary extends React.Component {
  goToDeck = () => {
    console.log("GO TO DECK");
  }
  render () {
    const { deck } = this.props
    console.log(deck)
    return (
      <View>
        <TouchableOpacity style={{borderWidth: 1}} onPress={this.goToDeck}>
          <Text>DECK SUMMARY</Text>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
