import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Animated,
  Easing
} from 'react-native';
import DeckHeader from './DeckHeader';
import { connect } from 'react-redux';
import { getDeck } from '../utils/api';
import Loader from './Loader';

class DeckDetail extends Component {
  componentDidMount() {
    Animated.timing(new Animated.Value(0), {
      toValue: 800,
      easing: Easing.back(),
      duration: 5000,
    }).start();
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    }
  }

  render() {
    const { navigation, deck } = this.props;

    return (
      <Animated.View>
        <DeckHeader key={deck.title} deck={deck} />
        <Button onPress={() => navigation.navigate('QuestionForm', { deck: deck })} title='Add Card' />
        <Button onPress={() => navigation.navigate('Quiz', { title: deck.title }) } title='Start Quiz' />
      </Animated.View>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { title } = navigation.state.params;
  const deck = decks[title];

  return {
    title,
    deck
  }
}

export default connect(mapStateToProps,)(DeckDetail);