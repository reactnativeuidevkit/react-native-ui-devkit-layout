/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { GlobalContext } from '../../libs/globalContext';

// React Native UI DevKit
import { List, Divider, Button, TitleFontSize, useColors } from 'react-native-ui-devkit';

const Login = (props) => {
  const { navigation } = props;
  const { global } = useContext(GlobalContext);
  const colors = useColors();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Login',
      headerRight: () => <Button link right data={{ title: Platform.OS == 'android' ? 'Create An Account' : 'Create', onPress: () => { } }} />
    });
  }, [navigation, colors])

  const [data, setData] = useState({ username: '', password: '', hidePassword: true, firstName: '', lastName: '', phone: '', email: '', disabledEmail: 'support@reactnativeuidevkit.com', loadingUsername: 'reactnativeuidevkit' });
  const [timestamp, setTimestamp] = useState();

  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
    >
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null} >
        <List data={[
          {
            icon: { name: 'email', type: 'entypo', size: 20, color: colors.secondary, backgroundColor: 'transparent' },
            component:
              <TextInput
                ref={usernameRef}
                placeholder='Username'
                placeholderTextColor={colors.secondary}
                keyboardType='ascii-capable'
                keyboardAppearance={global.dark ? 'dark' : 'default'}
                returnKeyType='next'
                value={data?.username}
                onSubmitEditing={() => { passwordRef?.current?.focus && passwordRef.current.focus(); }}
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.visible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.visible parameter
                onChangeText={(text) => {
                  setData((prevState) => ({ ...prevState, username: text }));
                }}
                style={[{ color: colors.text }, TitleFontSize()]} />,
            ...usernameRef?.current?.isFocused && usernameRef?.current?.isFocused() && {
              cleaner: {
                visible: (data?.username?.length >= 1),
                onPress: () => {
                  setData((prevState) => ({ ...prevState, username: '' }));
                  usernameRef?.current?.focus && usernameRef.current.focus();
                }
              }
            }
          },
          {
            icon: { name: 'lock', type: 'entypo', size: 20, color: colors.secondary, backgroundColor: 'transparent' },
            component:
              <TextInput
                ref={passwordRef}
                placeholder='Password'
                placeholderTextColor={colors.secondary}
                keyboardType='ascii-capable'
                keyboardAppearance={global.dark ? 'dark' : 'default'}
                returnKeyType='done'
                value={data?.password}
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.visible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.visible parameter
                onChangeText={(text) => {
                  setData((prevState) => ({ ...prevState, password: text }));
                }}
                secureTextEntry={data.hidePassword}
                style={[{ color: colors.text }, TitleFontSize()]} />,
            ...passwordRef?.current?.isFocused && passwordRef?.current?.isFocused() && {
              cleaner: {
                visible: (data?.password?.length >= 1),
                onPress: () => {
                  setData((prevState) => ({ ...prevState, password: '' }));
                  passwordRef?.current?.focus && passwordRef.current.focus();
                }
              }
            },
            action: {
              force: true,
              icon: { name: data.hidePassword ? 'eye' : 'eye-off', type: 'material-community', size: 25, color: colors.secondary },
              onPress: async () => { setData((prevState) => ({ ...prevState, hidePassword: !prevState.hidePassword })); }
            }
          }
        ]}
          footer={'Enter your username and password to access'}
          footerOnAndroid
        />

        <Button blue data={{ title: 'Login', onPress: () => { } }} />
        <Button transparent data={{ title: 'Forgot Password', onPress: () => { navigation.navigate('ForgotPassword') } }} marginTop={false} />

        <Divider />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Login;
