import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DeckHeader = props => {
  const { deck } = props;

  return (
    <View style={ styles.container } onPress={ () => { console.log('PRessed') } }>
      <Text style={ styles.title }>{ deck.title }</Text>
      <Text style={ styles.subtitle }>{ deck.questions.length } cards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#757575'
  }
});



export default DeckHeader;