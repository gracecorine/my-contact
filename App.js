import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/stores'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FormAddContact } from './src/pages/FormAddContact.js'
import { HomeScreen } from './src/pages/HomeScreen.js'
import { DetailContact } from './src/pages/DetailContact.js'
import { FormUpdateContact } from './src/pages/FormUpdateContact.js'

const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store = {store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component= {HomeScreen}
            options= {{ headerShown: false }}
          />
          <Stack.Screen
            name= "FormAddContact"
            component= {FormAddContact}
            options= {{
              title: 'Add New Contact',
              headerStyle: {
                backgroundColor: '#5A5E6C'
              },
              headerTintColor: 'white'
            }}
          />
          <Stack.Screen
            name= "FormUpdateContact"
            component= {FormUpdateContact}
            options= {{
              title: 'Edit Contact',
              headerStyle: {
                backgroundColor: '#5A5E6C'
              },
              headerTintColor: 'white'
            }}
          />
          <Stack.Screen
            name= "DetailContact"
            component= {DetailContact}
            options= {{
              title: 'Detail Contact',
              headerStyle: {
                backgroundColor: '#5A5E6C'
              },
              headerTintColor: 'white'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
