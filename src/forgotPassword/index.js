/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { GlobalContext } from '../../libs/globalContext';

// React Native UI DevKit
import { Item, Divider, Button, TitleFontSize, useColors } from 'react-native-ui-devkit';

const ForgotPassword = (props) => {
  const { navigation } = props;
  const { global } = useContext(GlobalContext);
  const colors = useColors();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Forgot Password',
    });
  }, [navigation, colors])

  const [data, setData] = useState({ username: '', password: '', hidePassword: true, firstName: '', lastName: '', phone: '', email: '', disabledEmail: 'support@reactnativeuidevkit.com', loadingUsername: 'reactnativeuidevkit' });
  const [timestamp, setTimestamp] = useState();

  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null} >
        <Item
          data={{
            icon: { name: 'mail', type: 'feather', size: 20, color: colors.secondary, backgroundColor: 'transparent' },
            component:
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  ref={usernameRef}
                  placeholder='your@email.com'
                  placeholderTextColor={colors.secondary}
                  keyboardType='ascii-capable'
                  keyboardAppearance={global.dark ? 'dark' : 'default'}
                  returnKeyType='next'
                  value={data?.username}
                  autoFocus
                  onSubmitEditing={() => { passwordRef?.current?.focus && passwordRef.current.focus(); }}
                  onFocus={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.visible parameter
                  onBlur={() => { setTimestamp(new Date()) }} // todo: It is necessary to use it together with the cleaner.visible parameter
                  onChangeText={(text) => {
                    setData((prevState) => ({ ...prevState, username: text }));
                  }}
                  style={[{ flex: 1, color: colors.text }, TitleFontSize()]} />

                <Button link data={{ title: 'Send Code', onPress: () => { } }} marginTop={false} />
              </View>,
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
          header={'Enter your e-mail'}
          footer={'You will receive an email containing a 6-digit code that should be provided later. \n\nDo not send, show, or disclose this code to anyone who requests it.'}
          footerOnAndroid
        />

        <Divider />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default ForgotPassword;
