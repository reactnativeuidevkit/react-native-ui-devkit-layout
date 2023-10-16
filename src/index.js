/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useEffect } from 'react';
import { Linking, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NavigationBar from 'react-native-navbar-color';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import SplashScreen from 'react-native-splash-screen';

// React Native UI DevKit
import { List, Button, Divider, DescriptionFontSize, useColors } from 'react-native-ui-devkit';

import { GlobalContext } from '../libs/globalContext';
import { rgbToHex } from '../libs/helper';
import Header from '../libs/header';

const Home = (props) => {
  const { navigation } = props;
  const { global, setGlobal } = useContext(GlobalContext);
  const colors = useColors();

  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(global.dark ? '#000000' : colors.background, true);
      StatusBar.setBarStyle(global.dark ? 'light-content' : 'dark-content', true);

      let soft = ExtraDimensions.getIsSoftMenuBar();
      let color = soft ? colors.background : rgbToHex('rgb(0, 0, 0)');
      NavigationBar.setColor(color);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 10)
  }, [global.dark]);

  return (
    <ScrollView
      contentOffset={{ x: 0, y: -1 }}
      contentInsetAdjustmentBehavior={"automatic"}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps="handled">
      <Header type={'home'} />

      <Button blue data={{ title: Platform.OS == 'android' ? 'Documentation' : 'Visit', onPress: () => { Linking.openURL('https://reactnativeuidevkit.com/docs') } }} header={'Documentation'} footer={'Complete documentation by accessing the website:\nhttps://reactnativeuidevkit.com/docs'} footerOnAndroid />

      <List
        data={[
          { icon: { name: 'login', type: 'material-community', size: 20, color: '#fff', backgroundColor: colors.primary }, title: 'Login', ...Platform.OS == 'android' && { description: 'src/login' }, ...Platform.OS == 'ios' && { subdescription: 'src/login' }, onPress: async () => { navigation.navigate('Login'); } },
          { icon: { name: 'password', type: 'material', size: 18, color: '#fff', backgroundColor: colors.primary }, title: 'Forgot password', ...Platform.OS == 'android' && { description: 'src/forgotPassword' }, ...Platform.OS == 'ios' && { subdescription: 'src/forgotPassword' }, onPress: async () => { navigation.navigate('ForgotPassword'); } }
        ]}
        header={'Login and forgot password'}
        headerOnAndroid
      />

      <List
        data={[
          { icon: { name: 'add', type: 'material', size: 20, color: '#fff', backgroundColor: colors.notification }, title: 'Create', ...Platform.OS == 'android' && { description: 'src/user/create' }, ...Platform.OS == 'ios' && { subdescription: 'src/user/create' }, onPress: async () => { navigation.navigate('UserCreate'); } },
          { icon: { name: 'list', type: 'feather', size: 18, color: '#fff', backgroundColor: colors.notification }, title: 'List', ...Platform.OS == 'android' && { description: 'src/user/list' }, ...Platform.OS == 'ios' && { subdescription: 'src/user/list' }, onPress: async () => { navigation.navigate('UserList'); } },
          { icon: { name: 'card-account-details-outline', type: 'material-community', size: 17, color: '#fff', backgroundColor: colors.notification }, title: 'View', ...Platform.OS == 'android' && { description: 'src/user/view' }, ...Platform.OS == 'ios' && { subdescription: 'src/user/view' }, onPress: async () => { navigation.navigate('UserView'); } }
        ]}
        header={'User'}
        headerOnAndroid
      />

      <List
        data={[
          { icon: { name: 'contacts', type: 'antdesign', size: 19, color: '#fff', backgroundColor: '#ff9900' }, title: 'List', ...Platform.OS == 'android' && { description: 'src/contact/list' }, ...Platform.OS == 'ios' && { subdescription: 'src/contact/list' }, onPress: async () => { navigation.navigate('ContactList'); } },
          { icon: { name: 'card-account-details-outline', type: 'material-community', size: 17, color: '#fff', backgroundColor: '#ff9900' }, title: 'View', ...Platform.OS == 'android' && { description: 'src/contact/view' }, ...Platform.OS == 'ios' && { subdescription: 'src/contact/view' }, onPress: async () => { navigation.navigate('ContactView'); } }
        ]}
        header={'Contact'}
        headerOnAndroid
      />

      <List
        data={[
          { icon: { name: 'add', type: 'material', size: 20, color: '#fff', backgroundColor: '#39CA61' }, title: 'Create', ...Platform.OS == 'android' && { description: 'src/product/create' }, ...Platform.OS == 'ios' && { subdescription: 'src/product/create' }, onPress: async () => { navigation.navigate('ProductCreate'); } },
          { icon: { name: 'list', type: 'feather', size: 19, color: '#fff', backgroundColor: '#39CA61' }, title: 'List', ...Platform.OS == 'android' && { description: 'src/product/list' }, ...Platform.OS == 'ios' && { subdescription: 'src/product/list' }, onPress: async () => { navigation.navigate('ProductList'); } },
          { icon: { name: 'request-page', type: 'material', size: 18, color: '#fff', backgroundColor: '#39CA61' }, title: 'View', ...Platform.OS == 'android' && { description: 'src/product/view' }, ...Platform.OS == 'ios' && { subdescription: 'src/product/view' }, onPress: async () => { navigation.navigate('ProductView'); } }
        ]}
        header={'Product'}
        headerOnAndroid
      />

      <List
        data={[
          { icon: { name: 'cog', type: 'ionicons', size: 24, color: '#fff', backgroundColor: colors.secondary }, title: 'Settings', ...Platform.OS == 'android' && { description: 'src/miscellaneous/settings' }, ...Platform.OS == 'ios' && { subdescription: 'src/miscellaneous/settings' }, onPress: async () => { navigation.navigate('Settings'); } },
          { icon: { name: 'privacy-tip', type: 'material', size: 19, color: '#fff', backgroundColor: colors.secondary }, title: 'Privacy', ...Platform.OS == 'android' && { description: 'src/miscellaneous/privacy' }, ...Platform.OS == 'ios' && { subdescription: 'src/miscellaneous/privacy' }, onPress: async () => { navigation.navigate('Privacy'); } },
          { icon: { name: 'language', type: 'ionicons', size: 19, color: '#fff', backgroundColor: colors.secondary }, title: 'Language', ...Platform.OS == 'android' && { description: 'src/miscellaneous/language' }, ...Platform.OS == 'ios' && { subdescription: 'src/miscellaneous/language' }, onPress: async () => { navigation.navigate('Language'); } },
          { icon: { name: 'help', type: 'material', size: 20, color: '#fff', backgroundColor: colors.secondary }, title: 'Help', ...Platform.OS == 'android' && { description: 'src/miscellaneous/help' }, ...Platform.OS == 'ios' && { subdescription: 'src/miscellaneous/help' }, onPress: async () => { navigation.navigate('Help'); } }
        ]}
        header={'Miscellaneous'}
        headerOnAndroid
      />

      <Divider />

      <View style={{ alignItems: "center" }}>
        <Text style={[{ color: colors.secondary, textAlign: 'center' }, DescriptionFontSize()]}>MIT License</Text>
        <Text style={[{ color: colors.secondary, textAlign: 'center' }, DescriptionFontSize()]}>React Native UI DevKit © Copyright {new Date().getFullYear()}</Text>
        <Text style={[{ color: colors.secondary, textAlign: 'center' }, DescriptionFontSize()]}>React Native UI DevKit Layout © Copyright {new Date().getFullYear()}</Text>
        <Text style={[{ color: colors.secondary }, DescriptionFontSize()]}>v{DeviceInfo.getVersion()}</Text>
      </View>

      <Divider />
    </ScrollView>
  );
}

export default Home;
