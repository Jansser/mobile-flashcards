import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { submitDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { 
  Button, 
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
  Text ,
  Card
} from 'react-native-elements';

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
    submitDeck(deck);
    this.toDeckDetail(title);
  }

  toDeckDetail = (deckTitle) => {
    this.props.navigation.dispatch(NavigationActions.navigate({ 
      routeName: 'DeckDetail', 
      params: {
        title: deckTitle
      } 
    }));
  }

  render() {
    return (
      <View>
        <Card>
          <Text h3 style={{textAlign: 'center'}}> What is the title of your new deck? </Text>
          <FormInput
            placeholder='Deck Title'
            onChangeText={(title) => this.setState({title})}
          />

          <Button title='Submit' onPress={this.submit} backgroundColor='black' />
        </Card>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm); 
