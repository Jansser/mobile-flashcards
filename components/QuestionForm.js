import React, { Component } from 'react';
import { 
  View,
  Text
} from 'react-native';

import { 
  FormLabel, 
  FormInput, 
  FormValidationMessage,
  Button 
} from 'react-native-elements';
import { connect } from 'react-redux';
import { addCardToDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { addCard } from '../actions';

class QuestionForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add card'
    }
  }

  state = {
    question: '',
    answer: '',
    submited: false
  }

  submit = () => {
    this.setState({ submited: true });
    const { question, answer } = this.state;
    const { deck, navigation, addCard } = this.props;
    
    if(question === '' || answer === '') {
      return;
    }

    let card = { question, answer };

    addCardToDeck(deck.title, card);
    addCard(deck.title, card);
    
    navigation.dispatch(NavigationActions.navigate({routeName: 'DeckDetail', params: { title: deck.title } }));
  }

  renderErrorMessage = (field) => {
    let value = this.state[field.toLowerCase()];
    const { submited } = this.state;

    if(value=== '' && submited) {
      return <FormValidationMessage>{field} is required!</FormValidationMessage>
    }
  }

  render() {
    let { question, answer } = this.state;

    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput 
          onChangeText={(question) => this.setState({question})}
          value={question}
        />

        {this.renderErrorMessage('Question')}
        
        <FormLabel>Answer</FormLabel>
        <FormInput 
          onChangeText={(answer) => this.setState({answer})}
          value={answer}
        />
        {this.renderErrorMessage('Answer')}

        <Button
          backgroundColor='black'
          onPress={this.submit}
          raised
          title='SUBMIT' />
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

const mapDispatchToProps = dispatch => ({
  addCard: (title, card) => { dispatch(addCard(title, card)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);

