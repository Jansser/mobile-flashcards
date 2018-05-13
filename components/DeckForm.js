import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { submitDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';

class DeckForm extends Component {
  state = {
    title: ''
  };

  submit = () => {
    const { addDeck } = this.props;
    const { title } = this.state;
    
    let deck = {
      [title] : {
        title: title, 
        questions: []
      } 
    };

    addDeck(deck);
    this.toHome();
    submitDeck(deck);
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}));
  }

  render() {
    return (
      <View>
        <Text> What is the title of your new deck? </Text>
        <TextInput 
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Deck Title'
          onChangeText={(title) => this.setState({title})}
          />
        <Button title='Submit' onPress={this.submit} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  addDeck: (title) => { dispatch(addDeck(title)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm); 
