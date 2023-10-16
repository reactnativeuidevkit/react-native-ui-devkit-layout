/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useLayoutEffect } from 'react';
import { Appearance, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import KeepAwake from 'react-native-keep-awake';

// React Native UI DevKit
import { RNUIDevKitProvider, useColors } from 'react-native-ui-devkit';

import { GlobalContext, GlobalContextProvider } from './libs/globalContext';

import Home from './src';

import Login from './src/login';
import ForgotPassword from './src/forgotPassword';
import UserCreate from './src/user/create';
import UserList from './src/user/list';
import UserView from './src/user/view';
import ContactList from './src/contact/list';
import ContactView from './src/contact/view';
import ProductCreate from './src/product/create';
import ProductList from './src/product/list';
import ProductView from './src/product/view';
import MiscellaneousSettings from './src/miscellaneous/settings';
import MiscellaneousPrivacy from './src/miscellaneous/privacy';
import MiscellaneousLanguage from './src/miscellaneous/language';
import MiscellaneousHelp from './src/miscellaneous/help';
import MiscellaneousHelpDetail from './src/miscellaneous/help/detail';
import { isTablet } from 'react-native-device-info';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { global } = useContext(GlobalContext);
  const colors = useColors();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ ...Platform.OS == 'android' && { animation: 'fade_from_bottom' }, ...Platform.OS == 'ios' && { statusBarStyle: global.dark ? 'light' : 'dark' } }}>
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Layout',
          headerStyle: { backgroundColor: colors.background },
          headerLargeTitle: !(isTablet() || Platform.isPad),
          headerShadowVisible: !(isTablet() || Platform.isPad) && Platform.OS == 'ios',
          headerLargeTitleShadowVisible: false,
          headerStyle: {
            backgroundColor: (!(isTablet() || Platform.isPad) ? Platform.OS == 'ios' ? colors.ios.headerBackground : colors.android.headerBackground : colors.background)
          },
          headerLargeStyle: {
            backgroundColor: colors.background
          }
        }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="UserCreate" component={UserCreate} options={{ title: 'User Create', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="UserList" component={UserList} options={{ title: 'User List', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="UserView" component={UserView} options={{ title: 'User View', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="ContactList" component={ContactList} options={{ title: 'Contact List', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="ContactView" component={ContactView} options={{ title: 'Contact View', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="ProductCreate" component={ProductCreate} options={{ title: 'Product Create', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Product List', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="ProductView" component={ProductView} options={{ title: 'Product View', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="Settings" component={MiscellaneousSettings} options={{ title: 'Settings', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="Privacy" component={MiscellaneousPrivacy} options={{ title: 'Privacy', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="Language" component={MiscellaneousLanguage} options={{ title: 'Language', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="Help" component={MiscellaneousHelp} options={{ title: 'Help', headerStyle: { backgroundColor: colors.background } }} />
        <Stack.Screen name="HelpDetail" component={MiscellaneousHelpDetail} options={{ title: 'Help Message', headerStyle: { backgroundColor: colors.background } }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Init = () => {
  const { global, setGlobal } = useContext(GlobalContext);

  useLayoutEffect(() => {
    if (Appearance.getColorScheme() == 'dark') {
      setGlobal(prevState => ({ ...prevState, dark: true }));
    }
  }, [])

  return (
    <RNUIDevKitProvider theme={global.dark ? 'dark' : 'light'} backgroundColor={'both'}>
      <Routes />
    </RNUIDevKitProvider>
  )
}

function App() {
  KeepAwake.activate();

  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
        <Init />
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
