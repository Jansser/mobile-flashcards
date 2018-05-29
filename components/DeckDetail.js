import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DeckHeader from './DeckHeader';
import { connect } from 'react-redux';
import { getDeck } from '../utils/api';
import Loader from './Loader';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    }
  }

  state = {
    deck: {},
    loading: true,
  }

  componentDidMount() {
    const { title } = this.props;

    getDeck(title).then(deck => this.setState({ deck , loading:false }));
  }

  render() {
    const { deck, loading } = this.state;
    const { navigation } = this.props;

    if(loading) {
      return <Loader/>;
    }

    return (
      <View>
        <DeckHeader key={deck.title} deck={deck} />
        <Button onPress={() => navigation.navigate('QuestionForm', { deck: deck })} title='Add Card' />
        <Button onPress={() => console.log('Start Quiz') } title='Start Quiz' />
      </View>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { title } = navigation.state.params;
  
  return {
    title
  }
}

export default connect(mapStateToProps,)(DeckDetail);