/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useLayoutEffect } from 'react';
import { Platform, ScrollView, View, Text, Image, PixelRatio } from 'react-native';
import { GlobalContext } from '../../../libs/globalContext';

// React Native UI DevKit
import { List, Item, Divider, Button, IosOldVersion, AndroidOldVersion, useColors } from 'react-native-ui-devkit';

const Settings = (props) => {
  const { navigation } = props;
  const { global } = useContext(GlobalContext);
  const colors = useColors();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerRight: () => (
        <>
          <Button icon right data={{ icon: { name: Platform.OS == 'android' ? 'share' : 'share-outline', type: Platform.OS == 'android' ? 'font-awesome' : 'ionicons', size: Platform.OS == 'android' ? 18 : 25, color: colors.text }, onPress: () => { } }} />
        </>
      )
    });
  }, [navigation, colors])

  return (
    <ScrollView style={{ flex: 1 }}>
      <List
        data={[{
          icon: Platform.OS == 'ios' && {
            component:
              <View style={[{ marginVertical: 10, width: 60, height: 60, marginRight: 15 }]}>
                <Image
                  source={{ uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              </View>
          },
          component:
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={[{ flex: 1, justifyContent: 'center' }, Platform.OS == 'android' && { marginLeft: 0, marginRight: 15 }]}>
                  <Text style={{ color: colors.text, fontSize: ((Platform.OS == 'ios' ? 22 : (24 * PixelRatio.getFontScale()))) }} numberOfLines={1}>Ivor Fugler</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.9 }}>
                    <Text style={{ color: colors.text }} numberOfLines={2}>Your personal information, Purchases </Text>
                  </View>
                </View>

                {Platform.OS == 'android' &&
                  <View style={[{ marginVertical: 16 }]}>
                    <Image
                      source={{ uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri }}
                      style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                  </View>
                }
              </View>
            </View>,
          ...Platform.OS == 'android' && {
            style: {
              backgroundColor: AndroidOldVersion() ? (global.dark ? '#222' : '#fff') : colors.android?.item
            }
          },
          onPress: async () => { }
        },
        Platform.OS == 'ios' && {
          title: 'Stories',
          color: { title: colors.text },
          badge: {
            value: 2,
            color: { badge: colors.notification }
          },
          separator: { start: (Platform.OS == 'ios' ? (IosOldVersion() ? 90 : 105) : 0) },
          onPress: async () => { }
        }]}
      />

      {Platform.OS == 'android' &&
        <Item
          data={{
            ...Platform.OS == 'android' && { icon: { name: 'circle-o-notch', type: 'font-awesome', size: 19, color: '#FFFFFF', backgroundColor: colors.primary } },
            title: 'Stories',
            description: (Platform.OS == 'android' && 'Your stories and updates!'),
            onPress: () => { }
          }}
        />
      }

      <List
        data={[
          {
            icon: { name: 'devices', type: 'material', size: 19, color: '#fff', backgroundColor: '#FF9933' },
            title: 'Devices',
            description: (Platform.OS == 'android' ? 'Your connected devices.' : 'Scan QR Code'),
            action: {
              icon: { name: 'qr-code-outline', type: 'ionicons', size: 20 },
              iOS: false,
              onPress: async () => { }
            },
            onPress: () => { }
          },
          {
            icon: { name: Platform.OS == 'android' ? 'lock' : 'lock', type: Platform.OS == 'android' ? 'font-awesome' : 'font-awesome', size: 21, color: '#fff', backgroundColor: '#589edb' },
            title: 'Privacy',
            description: (Platform.OS == 'android' && 'Status, about, profile picture and more...'),
            onPress: () => { }
          },
          {
            icon: { name: Platform.OS == 'android' ? 'notifications' : 'notification', type: Platform.OS == 'android' ? 'ionicons' : 'entypo', size: 19, color: '#fff', backgroundColor: colors.notification },
            title: 'Notifications',
            description: (Platform.OS == 'android' && 'Show notifications, sounds, reactions and preview or reset notification settings.'),
            onPress: () => { }
          }]}
      />
      <Item
        data={{
          icon: { name: 'heart', type: 'font-awesome', size: 18, color: '#fff', backgroundColor: '#f7408a' },
          title: 'Rate this app',
          description: (Platform.OS == 'android' && 'Are you enjoying our app? Click here to leave your review!'),
          chevron: false,
          onPress: () => { }
        }}
      />
      <List
        data={[
          {
            icon: { name: 'information', type: 'ionicons', size: 23, color: '#fff', backgroundColor: Platform.OS == 'ios' && colors.primary },
            title: 'Help',
            ...Platform.OS == 'android' && { description: 'Do you need some kind of help?' },
            onPress: () => { }
          },
          {
            icon: { name: 'short-text', type: 'material', size: 22, color: '#fff', backgroundColor: colors.primary },
            title: 'About Us',
            ...Platform.OS == 'android' && { description: 'Get to know a little about us.' },
            onPress: () => { }
          }
        ]}
      />
      <Divider />
    </ScrollView>
  )
}

export default Settings;
