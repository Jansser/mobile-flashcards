import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { getDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import DeckHeader from './DeckHeader';

class DeckList extends Component {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(getDecks(fetchDecks()))
  }

  render() {
    const { decks, navigation } = this.props;

    return (
      <View>
        {Object.values(decks).map(deck => 
          <TouchableOpacity key={deck.title} 
            style={styles.listItem}
            onPress={() => navigation.navigate('DeckDetail', { deck: deck })}>
          <DeckHeader deck={deck}/>
        </TouchableOpacity >)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#757575',
    borderBottomWidth: 1
  },
});


const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps, )(DeckList);