import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar } from 'react-native';
import { getDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import DeckHeader from './DeckHeader';

class DeckList extends Component {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(getDecks(fetchDecks()))
  }

  render() {
    const { decks } = this.props;

    return (
      <View>
        { Object.values(decks).map(deck => <DeckHeader key={deck.title} deck={deck} />) }
      </View>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps, )(DeckList);