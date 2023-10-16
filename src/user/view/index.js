/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import { useLayoutEffect, useState } from "react"
import { View, ScrollView, Image, Text, FlatList, Platform, Dimensions, TouchableWithoutFeedback } from "react-native";
import moment from 'moment';

// React Native UI DevKit
import { Button, Divider, Icon, Item, List, MediumFontSize, TitleFontSize, useColors, AndroidOldVersion, IosOldVersion } from "react-native-ui-devkit";

const UserView = (props) => {
  const { navigation } = props;
  const { width } = Dimensions.get('screen');
  const colors = useColors();

  const [like, setLike] = useState(false);
  const [shortAbout, setShortAbout] = useState(true);

  const about = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aspernatur voluptatum temporibus adipisci laborum possimus velit dolorem ducimus perspiciatis, accusantium quae deserunt eaque commodi reiciendis nostrum ipsum maiores laboriosam molestiae!'
  const images = [
    { id: '1', uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri },
    { id: '2', uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri },
    { id: '3', uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri },
    { id: '4', uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri },
    { id: '5', uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri },
    { id: '6', uri: Image.resolveAssetSource(require('../../../static/img/avatar-1.png')).uri },
  ]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button icon right data={{ icon: { name: like ? 'star' : 'star-outline', type: 'ionicons', size: like ? 26 : 25, color: like ? '#ff9500' : colors.text }, onPress: () => { setLike(prev => !prev) } }} />
    })
  }, [navigation, like])

  const Images = () => {
    return (
      <FlatList
        data={images}
        keyExtractor={item => item?.id}
        renderItem={renderImage}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 15, paddingLeft: 15 }}
      />
    )
  }

  const renderImage = ({ item, index, isActive }) => {
    return (
      <Item
        key={index}
        data={{
          component:
            <Image
              source={{ uri: item.uri, }}
              style={{ width: 100, height: 100 }}
            />,
          padding: false,
          chevron: false,
          onPress: () => { }
        }}
        style={{ marginLeft: 0, marginRight: 15 }}
        marginTop={false}
      />
    )
  }

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
              <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                {Platform.OS == 'ios' && [...Array(3)].map((item, index) => <Icon key={String(index)} name={'star'} type="ionicons" color={'#ff9500'} size={12} style={{ marginHorizontal: 0.5 }} />)}
                {Platform.OS == 'ios' && [...Array(2)].map((item, index) => <Icon key={String(index)} name='star-outline' type="ionicons" color={colors.tertiary} size={12} style={{ marginHorizontal: 0.5 }} />)}

                {Platform.OS == 'android' &&
                  <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[MediumFontSize(), { color: colors.secondary, marginRight: 5 }]}>{parseFloat(3.5).toFixed(1)}</Text>
                    <Icon name={'star'} type="ionicons" color={colors.text} size={13} />
                  </View>
                }
              </View>
            </View>
        }}
      />

      <View style={AndroidOldVersion() && { marginTop: 10 }}>
        <Divider />
        <TouchableWithoutFeedback onPress={() => { setShortAbout(!shortAbout); }}>
          <View>
            <Text style={[{ color: colors.text, marginHorizontal: 30 }, MediumFontSize()]}>
              {about?.length > 100 ? (shortAbout ? about?.substring(0, 100) + ', more...' : about) : about}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Button blue data={{ title: 'Send message', onPress: () => { } }} style={{ flex: 1 }} />

      <List
        data={[
          { icon: { name: 'user', type: 'font-awesome', color: '#fff', size: 18, backgroundColor: colors.primary }, title: 'Gallery' },
          { component: Images(), padding: false }
        ]}
      />

      <List
        data={[
          {
            icon: { name: 'location-sharp', type: 'ionicons', size: 17, color: '#fff', backgroundColor: '#39CA61' },
            title: '75 Barclay St',
            description: 'New York, NY 10007, EUA',
            subdescription: 'New York, NY 10007, EUA',
            onPress: () => { }
          },
          {
            component:
              <Image
                source={{ uri: Image.resolveAssetSource(require("../../../static/img/map.png")).uri }}
                style={{ width: Platform.OS == 'ios' ? width - (IosOldVersion() ? 0 : 15) : width, height: 150 }}
              />,
            padding: false,
            chevron: false,
            onPress: () => { }
          }
        ]}
      />

      <Item
        data={{
          icon: { name: 'calendar', type: 'font-awesome', color: '#fff', size: 15, backgroundColor: '#ff9900' },
          title: 'Account created at',
          subdescription: `${moment('2022-10-10').format('dddd, ll')}`,
          ...Platform.OS == 'android' && { description: `${moment('2022-10-10').format('dddd, ll')}` },
        }}
      />

      <List
        data={[
          {
            title: 'Share', color: { title: colors.primary },
            chevron: false,
            onPress: () => { }
          },
          {
            title: 'Report',
            ...Platform.OS == 'android' && { description: 'If this profile is fake or is trying to carry out a scam, you can report it.' },
            color: { title: colors.notification },
            chevron: false,
            onPress: () => { }
          }]}
      />

      <Divider />
    </ScrollView>
  )
}

export default UserView
