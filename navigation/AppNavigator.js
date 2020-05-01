import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DecksListComponent from '../components/DecksListComponent';
import AddDeckComponent from '../components/AddDeckComponent';
import DeckCardComponent from '../components/DeckCardComponent';
import AddQuestionComponent from '../components/AddQuestionComponent';
import StartQuizComponent from '../components/StartQuizComponent';
import { green, grey } from '../utils/colors';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DecksListStackScreen() {
  return (
    <Stack.Navigator initialRouteName="DecksList">
      <Stack.Screen name="DecksList" component={DecksListComponent} options={{ title: 'Decks' }}/>
      <Stack.Screen name="DeckCard" component={DeckCardComponent} options={{ title: 'Deck Details' }}/>
      <Stack.Screen name="AddQuestion" component={AddQuestionComponent} options={{ title: 'Add Question' }}/>
      <Stack.Screen name="StartQuiz" component={StartQuizComponent} 
                    options={({ route }) => ({ title: route.params.title + " Quiz" })}/>
    </Stack.Navigator>
   );
}

function AddDeckListStackScreen() {
  return (
    <Stack.Navigator initialRouteName="AddDeck">
      <Stack.Screen name="AddDeck" component={AddDeckComponent} options={{ title: 'Add Deck' }}/>
    </Stack.Navigator>
   );
}

const tabNavOptions = (route, focused, color, size) => {
  let iconName;
  if (route.name === 'DecksListStackScreen') {
    iconName = focused ? 'ios-list-box' : 'ios-list'
  } else if (route.name === 'AddDeckListStackScreen') {
    iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
  }
  return <Ionicons name={iconName} size={size} color={color}/>;
}

function FlashCardsTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="DecksListStackScreen"
                   screenOptions={({ route }) => ({
                   tabBarIcon: ({focused, color, size}) => {
                    return tabNavOptions(route, focused, color, size)
                   }})}
                  tabBarOptions={{
                  activeTintColor: green,
                  inactiveTintColor: grey,
                  }}>
      <Tab.Screen name="DecksListStackScreen" component={DecksListStackScreen} options={{ title: 'Decks' }}/>
      <Tab.Screen name="AddDeckListStackScreen" component={AddDeckListStackScreen} options={{ title: 'Add Deck' }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default FlashCardsTabs;