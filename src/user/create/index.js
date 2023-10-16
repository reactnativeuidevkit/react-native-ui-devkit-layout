/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, TextInput, Image, Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { GlobalContext } from '../../../libs/globalContext';

// React Native UI DevKit
import { List, Item, Divider, Button, TitleFontSize, useColors } from 'react-native-ui-devkit';

const UserCreate = (props) => {
  const { navigation } = props;
  const { global } = useContext(GlobalContext);
  const colors = useColors();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create a new user',
    });
  }, [navigation, colors])

  const [data, setData] = useState({ image: { uri: '' }, name: '', email: '', username: '', password: '', confirmPassword: '', hidePassword: true, hideConfirmPassword: true });
  const [timestamp, setTimestamp] = useState();

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const avatarSize = Platform.OS == 'ios' ? 85 : 100;

  const handleImageSelection = async () => {
    const { assets, didCancel, errorCode } = await launchImageLibrary({ mediaType: 'photo', includeExtra: true })
    if (errorCode == 'permission') {
      Alert.alert(
        'No permission to access photos',
        'To select photos, you must allow access to the Photos app in the system settings',
        [{ text: 'No', style: 'cancel', onPress: async () => { } }, { text: 'Access settings', style: 'default', onPress: async () => { Linking.openSettings() } }],
        { cancelable: false },
      );
      return
    }

    if (didCancel) return

    if (!assets) {
      Alert.alert("Error", 'Image selection error')
    } else {
      setData(prevState => ({ ...prevState, image: { uri: assets[0].uri } }))
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
    >
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null} >
        <Button
          transparent
          data={{
            component:
              <View style={{ overflow: 'hidden', width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}>
                {data?.image.uri && <Image
                  source={{ uri: data?.image.uri }}
                  style={{ width: avatarSize, height: avatarSize }}
                />}
                {!data?.image.uri && <View
                  style={{ width: avatarSize, height: avatarSize, backgroundColor: 'gray' }}
                />}
                {Platform.OS == 'ios' && <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', padding: 4, backgroundColor: '#000000' }}>
                  <Text style={{ color: '#eee', fontSize: 11, fontWeight: '200' }}>EDIT</Text>
                </View>}
              </View>,
            padding: false,
            delay: false,
            style: { marginLeft: 0, marginRight: 0 },
            onPress: async () => {
              await handleImageSelection()
            }
          }}
        />

        <List data={[
          {
            icon: { name: 'drive-file-rename-outline', type: 'material', size: 20, color: colors.secondary, backgroundColor: 'transparent' },
            component:
              <TextInput
                ref={nameRef}
                placeholder='Name'
                placeholderTextColor={colors.secondary}
                keyboardType='ascii-capable'
                keyboardAppearance={global.dark ? 'dark' : 'default'}
                returnKeyType='next'
                value={data?.name}
                onSubmitEditing={() => { passwordRef?.current?.focus && passwordRef.current.focus(); }}
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onChangeText={(text) => { setData((prevState) => ({ ...prevState, name: text })); }}
                style={[{ color: colors.text }, TitleFontSize()]} />,
            ...nameRef?.current?.isFocused && nameRef?.current?.isFocused() && {
              cleaner: {
                visible: data?.name?.length >= 1,
                onPress: () => {
                  setData((prevState) => ({ ...prevState, name: '' }));
                  nameRef?.current?.focus && nameRef.current.focus();
                }
              }
            }
          },
          {
            icon: { name: 'mail', type: 'feather', size: 20, color: colors.secondary, backgroundColor: 'transparent' },
            component:
              <TextInput
                ref={emailRef}
                placeholder='Email'
                placeholderTextColor={colors.secondary}
                keyboardType='ascii-capable'
                keyboardAppearance={global.dark ? 'dark' : 'default'}
                returnKeyType='done'
                value={data?.email}
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onChangeText={(text) => { setData((prevState) => ({ ...prevState, email: text })); }}
                style={[{ color: colors.text }, TitleFontSize()]} />,
            ...emailRef?.current?.isFocused && emailRef?.current?.isFocused() && {
              cleaner: {
                visible: (data?.email?.length >= 1),
                onPress: () => {
                  setData((prevState) => ({ ...prevState, email: '' }));
                  emailRef?.current?.focus && emailRef.current.focus();
                }
              }
            },

          }
        ]} />

        <List data={[
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
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onChangeText={(text) => { setData((prevState) => ({ ...prevState, password: text })); }}
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
          },
          {
            icon: { name: 'lock', type: 'entypo', size: 20, color: colors.secondary, backgroundColor: 'transparent' },
            component:
              <TextInput
                ref={confirmPasswordRef}
                placeholder='Confirm Password'
                placeholderTextColor={colors.secondary}
                keyboardType='ascii-capable'
                keyboardAppearance={global.dark ? 'dark' : 'default'}
                returnKeyType='done'
                value={data?.confirmPassword}
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onChangeText={(text) => { setData((prevState) => ({ ...prevState, confirmPassword: text })); }}
                secureTextEntry={data.hideConfirmPassword}
                style={[{ color: colors.text }, TitleFontSize()]} />,
            ...confirmPasswordRef?.current?.isFocused && confirmPasswordRef?.current?.isFocused() && {
              cleaner: {
                visible: (data?.confirmPassword?.length >= 1),
                onPress: () => {
                  setData((prevState) => ({ ...prevState, confirmPassword: '' }));
                  confirmPasswordRef?.current?.focus && confirmPasswordRef.current.focus();
                }
              }
            },
            action: {
              force: true,
              icon: { name: data.hideConfirmPassword ? 'eye' : 'eye-off', type: 'material-community', size: 25, color: colors.secondary },
              onPress: async () => { setData((prevState) => ({ ...prevState, hideConfirmPassword: !prevState.hideConfirmPassword })); }
            }
          }
        ]}
          footer={'Enter your username and password to access'}
          footerOnAndroid />


        <Item
          data={{
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
                onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.isVisible parameter
                onChangeText={(text) => { setData((prevState) => ({ ...prevState, username: text })); }}
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
          }}
        />

        <Button blue data={{ title: 'Create Account', onPress: () => { }, }} />

        <Divider />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default UserCreate;
