import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import reducer from './reducers';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import QuestionForm from './components/QuestionForm';
//import { setLocalNotification } from './utils/notifications';

import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import DeckForm from './components/DeckForm';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Quiz from './components/Quiz';
import styles from './styles';

console.disableYellowBox = true;

const createTabNavigator = Platform.OS === 'ios' ?  createBottomTabNavigator : createMaterialTopTabNavigator;

const Tabs = createTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintcolor }) => <FontAwesome name='clone' size={30} color={tintcolor} />
    }
  },

  NewDeck: {
    screen: DeckForm,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintcolor }) => <FontAwesome name='plus-square' size={30} color={tintcolor} />
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: 'black',    
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs, 
    navigationOptions: {
      header: null
    }   
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  QuestionForm: {
    screen: QuestionForm
  },
  Quiz: {
    screen: Quiz
  }
}, 
{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black',
    }
  }
});


export default class App extends Component {
  componentDidMount() {
    //setLocalNotification()
  }

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