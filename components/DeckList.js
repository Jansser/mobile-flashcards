import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { getDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import DeckHeader from './DeckHeader';

class DeckList extends Component {
  componentDidMount () {
    const { getDecks } = this.props;

    fetchDecks().then((decks) => {
      getDecks(decks);
    });
  }

  render() {
    const { decks, navigation } = this.props;

    if(Object.values(decks).length === 0) {
      return (
        //Centralize this.
        <View>
          <Text>Create a new Deck.</Text>
        </View>
      )
    }

    return (
      <ScrollView>
        {Object.values(decks).map(deck => 
          <TouchableOpacity key={deck.title} 
            style={styles.listItem}
            onPress={() => navigation.navigate('DeckDetail', { deck: deck })}>
          <DeckHeader deck={deck}/>
        </TouchableOpacity >)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#757575',
    borderBottomWidth: 1
  },
});

const mapDispatchToProps = dispatch => ({
  getDecks: (decks) => { dispatch(getDecks(decks)) }
});

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);