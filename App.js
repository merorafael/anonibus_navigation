import React from 'react';
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer"

import SignIn from './components/sign-in';
import CreateAccount from './components/create-account';
import Home from './components/home';
import HomeDetails from './components/home/details';
import Profile from './components/profile';
import Chat from './components/chat';

import { FontAwesome5 } from '@expo/vector-icons';
import { isSignedIn } from './services/authentication'
import { AuthContext } from './context';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="HomeDetails" component={HomeDetails} />
  </HomeStack.Navigator>

)

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'facebook-f' : 'facebook-f';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'android' : 'android';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'apple' : 'apple';
        } else if (route.name === 'Upload') {
          iconName = focused ? 'adobe' : 'adobe';
        }
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })} tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray', }}>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
    <Tabs.Screen name="Chat" component={Chat} />
  </Tabs.Navigator>
)

export default () => {
  const [signedIn, setSignedIn] = React.useState(false);

  React.useEffect(() => {
    isSignedIn().then((signedIn) => {
      setSignedIn(signedIn)
    })
  }, []);

  const authContext = React.useMemo(() => {
    return {
      refreshSignInStatus: () => { 
        isSignedIn().then((signedIn) => {
          setSignedIn(signedIn)
        })
      }
    }
  })

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {signedIn ?
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabsScreen} />
            <Drawer.Screen name="Profile" component={ProfileStackScreen} />
          </Drawer.Navigator>
          
          :
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: "Acessar" }}
            />
            <AuthStack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ title: "Criar Conta" }}
            />
          </AuthStack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}