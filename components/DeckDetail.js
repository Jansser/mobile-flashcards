import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated,
  Easing
} from 'react-native';
import DeckHeader from './DeckHeader';
import { connect } from 'react-redux';
import { getDeck } from '../utils/api';
import Loader from './Loader';
import { 
  Button, 
  Card
} from 'react-native-elements';
import styles from '../styles';

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
        
        <View style={styles.buttonContainer}>
          <Button 
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('QuestionForm', { deck: deck })} 
            title='Add Card'/>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('Quiz', { title: deck.title })} 
            title='Start Quiz' />
        </View>
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