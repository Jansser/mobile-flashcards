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
    const { deck } = this.props;
    
    if(question === '' && answer === '') {
      return;
    }

    let card = { question, answer };

    addCardToDeck(deck.title, card);
    
    this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}));

    //this.toHome();
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}))
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
          icon={{name: 'cached'}}
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

export default connect(mapStateToProps,)(QuestionForm);

/* 
  {
          question --- '' &&
          <FormValidationMessage>Question is required!</FormValidationMessage>
        }

  {
          answer --- '' &&
          <FormValidationMessage>Answer is required!</FormValidationMessage>
        }
         */