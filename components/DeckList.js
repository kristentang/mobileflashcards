import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Animated
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux'

import { receiveDecks } from '../actions'
import { getDecks, deleteAllDecks } from '../utils/api'

class DeckList extends React.Component {

  state =  {
    ready: false,
    bounceValue: new Animated.Value(1)
  }

  componentDidMount() {
    getDecks()
      .then(decks => {
        this.props.receiveDecks(decks)
      })
      .then(() => {
        this.setState({ ready: true });
      });
  }

  goToDeck = (id) => {
    const { bounceValue } = this.state

      Animated.sequence([
        Animated.timing(bounceValue, {duration: 200, toValue: 1.04}),
        Animated.spring(bounceValue, { toValue: 1, friction: 4})
      ]).start(
        () => this.props.navigation.navigate('Deck', { id } )
      )
  }

  render () {
    const { decks, navigation } = this.props
    const { ready, bounceValue } = this.state

    if (ready) {
      if (Object.values(decks).length > 0) {
        return (
          <View style={styles.container}>
            <FlatList
              data={Object.values(decks)}
              renderItem={({ item }) => (
                <Animated.View style={{transform: [{scale: bounceValue}]}}>
                  <TouchableOpacity style={styles.summaryCard} onPress={() => this.goToDeck(item.id)}>
                    <Animated.Text style={[styles.header, {transform: [{scale: bounceValue}]}]}>
                      {item.title}
                    </Animated.Text>
                    <View style={ styles.cardSubHeader}>
                      <Animated.Text style={[styles.subHeader, {transform: [{scale: bounceValue}]}]}>
                        {item.questions.length} {item.questions.length === 1 ? 'card' : 'cards'}
                      </Animated.Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )}
              keyExtractor={(item, index) => (item.id).toString()}
            />
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.header}>No Decks Yet</Text>
          </View>
        )
      }
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>LOADING</Text>
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
  summaryCard: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveDecks: decks => dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
