import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import reducer from './reducers';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import { TabNavigator, createStackNavigator } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList, 
    navigationOptions: {
      header: null
    }   
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  }
}, {
});

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View style={{ backgroundColor: '#000', height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={'#000'} barStyle="light-content"/>
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e4dd',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
