import * as React from 'react';
import {useEffect} from 'react';
// import { Router, Scene } from 'react-native-router-flux'
import Home from './pages/Home.js';
import SignIn from './pages/SignIn.js';
import MenuBar from './pages/MenuBar.js';
import NewHome from './pages/NewHome.js';
import SelectBrand from './pages/SelectBrand.js';
// import Login from './pages/Login.js';
// import { Text, StyleSheet, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createNativeStackNavigator();
// let user = undefined;


// getData().then(us => {
//   user = us.split('@')[0]
  
// })
// console.log('user = ', user);

const Routes = ({navigation}) =>{ 
  const [userdetails, setUserdetails] = React.useState('');
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      // console.log('jsonValue = ',jsonValue)
      const userdata = JSON.parse(jsonValue)
      setUserdetails(userdata)
      if(userdata.access_token != null && userdata.access_token != '' &&  userdata.access_token != undefined){
        navigation.navigate('home') 
      }
      
      return jsonValue != null ? jsonValue : null;
    } catch(e) {
      console.log(e)
      console.log("There was an error")
    }
  }
  useEffect(() => {
    getData().then(user => {
      const username = user
      setUserdetails(username)
      
    })  
  },[])
  return (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userdetails == '' || userdetails == null ? (
          <>
            <Stack.Screen name="login" component={SignIn} />
            <Stack.Screen name="home" component={NewHome} />
            <Stack.Screen name="selectbrand" component={SelectBrand} />
          </>
        ) : (
          <>
            <Stack.Screen name="home" component={NewHome} />
            <Stack.Screen name="login" component={SignIn} />
            <Stack.Screen name="selectbrand" component={SelectBrand} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
)};
export default Routes;
