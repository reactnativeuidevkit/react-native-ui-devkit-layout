/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useLayoutEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { isTablet } from 'react-native-device-info';

// React Native UI DevKit
import { List, Item, Divider, TitleFontSize, useColors } from 'react-native-ui-devkit';

const ContactView = (props) => {
  const { navigation } = props;
  const colors = useColors();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Contact View',
    });
  }, [navigation, colors])

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
    >
      <Item
        style={{ backgroundColor: 'transparent' }}
        data={{
          component:
            <View style={{ flex: 1, margin: 15, alignItems: 'center' }}>
              <Image
                source={{ uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri }}
                style={[{ width: 100, height: 100, marginBottom: 10, borderRadius: 50 }]}
              />
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[{ flex: 1, color: colors.text, fontWeight: '500' }, TitleFontSize(1.5)]} numberOfLines={1}>Ivor Fugler</Text>
              </View>
            </View>
        }} />

      <List data={[
        {
          icon: { name: 'plus', type: 'feather', size: 23, color: '#fff', backgroundColor: 'transparent', color: colors.primary },
          title: 'Create a new Contact',
          color: colors.primary,
          chevron: false,
          delay: false,
          onPress: () => { }
        },
        {
          icon: { name: 'user-plus', type: 'feather', size: 20, color: '#fff', backgroundColor: 'transparent', color: colors.primary },
          title: 'Add to existing contact',
          color: colors.primary,
          delay: false,
          chevron: false,
          onPress: () => { },
        }
      ]}
      />

      <List data={[
        {
          icon: { name: 'phone', type: 'font-awesome', size: 17, color: '#fff', backgroundColor: '#34C759' },
          title: `+55 (11) 97070-6060`,
          color: colors.primary,
          chevron: false,
          delay: false,
          onPress: () => { }
        },
        {
          icon: { name: 'text', type: 'material-community', size: 17, color: '#fff', backgroundColor: '#ff9900' },
          title: 'About',
          description: 'Not informed',
          delay: !isTablet(), onPress: () => { }
        }
      ]}
      />

      <Item data={{
        icon: { name: 'plus', type: 'feather', size: 23, color: '#fff', backgroundColor: 'transparent', color: colors.primary },
        title: `Create group with Emma Taylor`,
        color: colors.primary,
        chevron: false,
        delay: false,
        onPress: () => { }
      }}
        header={'0 common groups'}
      />

      <List data={[
        {
          icon: { name: 'chatbox', type: 'ionicons', size: 17, color: '#fff', backgroundColor: colors.primary },
          title: 'Send message',
          chevron: false,
          delay: false,
          onPress: () => { }
        },
        {
          icon: { name: 'share-outline', type: 'ionicons', size: 17, color: '#fff', backgroundColor: colors.primary },
          title: 'Share contact',
          chevron: false,
          delay: false,
          onPress: () => { }
        },
      ]}
      />

      <List data={[
        {
          icon: { name: 'star', type: 'ionicons', size: 17, color: '#fff', backgroundColor: '#FFCC01' },
          title: 'Favorite messages',
          description: 'No description',
          chevron: false,
          delay: false,
          onPress: () => { }
        },
        {
          icon: { name: 'time-outline', type: 'ionicons', size: 17, color: '#fff', backgroundColor: '#5856D6' },
          title: 'Temporary messages',
          description: 'Disabled',
          delay: false,
          chevron: false,
          onPress: () => { },
        },
        {
          icon: { name: 'volume-high', type: 'ionicons', size: 17, color: '#fff', backgroundColor: '#FF3B2F' },
          title: 'Silence',
          delay: false,
          switch: true,
          onPress: () => { },
        }
      ]} header="Messages" />

      <Item data={{
        icon: { name: 'shield-checkmark-outline', type: 'ionicons', size: 17, color: '#fff', backgroundColor: colors.primary },
        title: 'Cryptography and Security',
        delay: false,
        chevron: true,
        onPress: () => { },
      }}
      />

      <List data={[
        {
          title: `Block Emma Taylor`,
          color: { title: '#FF453A' },
          delay: false,
          chevron: false,
          onPress: () => { },
        },
        {
          title: `Report Emma Taylor`,
          color: { title: '#FF453A' },
          delay: false,
          chevron: false,
          onPress: () => { },
        }
      ]}
      />

      <Item data={{
        title: 'Clear conversation',
        color: { title: '#FF453A' },
        chevron: false,
        delay: false,
        onPress: () => { }
      }}
      />
      <Divider />
    </ScrollView>
  );
}

export default ContactView;
