import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DeckHeader from './DeckHeader';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: deck.title
    }
  }

  render() {
    const { deck } = this.props;

    return (
      <View>
        <DeckHeader key={deck.title} deck={deck} />
        <Button onPress={() => console.log('Add Card') } title='Add Card' />
        <Button onPress={() => console.log('Start Quiz') } title='Start Quiz' />
      </View>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { deck } = navigation.state.params;

  return {
    deck
  }
}

export default connect(mapStateToProps,)(DeckDetail);