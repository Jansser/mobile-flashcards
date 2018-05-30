import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
} from 'react-native';
import { 
  Button, 
  Text,
  Card,
  Badge
} from 'react-native-elements';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notifications';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from '../styles';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: 'QUIZ'
    }
  }

  state = {
    index: 0,
    showAnswer: false,
    corrects: 0,
  }

  resetNotification = () => {
    clearLocalNotification().then(setLocalNotification)
  }

  nextQuestion = (correct) => {
    this.setState((prevState, props) => ({
      index: prevState.index + 1,
      showAnswer: false,
      corrects: correct === true ? prevState.corrects + 1 : prevState.corrects
    }));
    
  }

  restartQuiz = () => {
    this.setState({
      index: 0,
      showAnswer: false,
      corrects: 0
    });
  }

  goToDeck = () => {
    const { navigation } = this.props;
    const { title } = navigation.state.params;

    navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckDetail', 
      params: { title: title } 
    }));
  }

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { index, showAnswer, corrects } = this.state;
    const total = questions.length;
    
    //Score
    if(index === total) {
      this.resetNotification();
      
      return(
        <View style={styles.centeredContainer}>
          <View>
            <Text h3>
              {100 / total * corrects}%
            </Text>

            <Text>
              You Got {corrects}/{total}.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button 
              buttonStyle={styles.button}
              onPress={this.restartQuiz}
              title='Restart Quiz'/>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              onPress={this.goToDeck}
              title='Back to Deck'/>
          </View>
        </View>
      )
    }

    //FlashCard
    let card = questions[index];
    
    return (
      <View>
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 20 }}>
            {index + 1}/{total}
          </Text>
        </View>
        
        <Card>
          <View>
            <Text h4>
              {showAnswer ? card.answer : card.question}
            </Text>
          </View>
        </Card>

        {showAnswer ? 
          <View>
            <View style={styles.buttonContainer}>
              <Button 
                onPress={() => this.nextQuestion(true)}
                backgroundColor='green'
                title='Correct'
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button 
                backgroundColor='red'
                onPress={() => this.nextQuestion(false)}
                title='Incorrect'
              />
            </View>
          </View>
          
          : 

          <View style={styles.buttonContainer}>
            <Button 
              buttonStyle={styles.button}
              onPress={() => this.setState({ showAnswer: true })}
              title='Answer'/>
          </View>
        }
      </View>
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

export default connect(mapStateToProps,)(Quiz);