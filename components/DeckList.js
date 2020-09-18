import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, deleteAllDecks } from '../utils/api'

import Deck from './Deck'
import DeckSummary from './DeckSummary'

class DeckList extends React.Component {

  state =  {
    ready: false
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


  render () {
    const { decks, navigation } = this.props
    // console.log("DECK LIST (Render Navigation): ", navigation)

    console.log("DECK LIST (Render): ", decks)
    const { ready } = this.state

    if (ready) {
      console.log(Object.values(decks))

      if (Object.values(decks).length > 0) {
        return (
          <View>
            <Text>DECK LIST</Text>
            <FlatList
              data={Object.values(decks)}
              renderItem={({ item }) => (
                <DeckSummary deck={item}/>
              )}
              keyExtractor={(item, index) => item.title}
            />
          </View>
        )
      } else {
        return (<View><Text>NO DECKS YET</Text></View>)
      }

    } else {
      return (
        <View>
          <Text>LOADING</Text>
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
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'black'
  }
})

const mapStateToProps = decks => ({
  decks
});

const mapDispatchToProps = dispatch => ({
  receiveDecks: decks => dispatch(receiveDecks(decks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
