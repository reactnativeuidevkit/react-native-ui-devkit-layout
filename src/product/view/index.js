/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import { useLayoutEffect, useState } from "react";
import { View, Image, useWindowDimensions, Text, FlatList, Platform, TouchableWithoutFeedback, ScrollView } from "react-native";

// React Native UI DevKit
import { BorderRadius, Button, DescriptionFontSize, Divider, Item, List, MediumFontSize, PaddingHorizontal, TitleFontSize, useColors } from "react-native-ui-devkit";

const ProductView = (props) => {
  const { navigation } = props;
  const { width } = useWindowDimensions();
  const colors = useColors();

  const [shortDescription, setShortDescription] = useState(true);

  const [like, setLike] = useState(false)

  const images = [
    { id: '1', url: Image.resolveAssetSource(require('../../../static/img/shoes-1.png')).uri },
    { id: '2', url: Image.resolveAssetSource(require('../../../static/img/shoes-2.png')).uri },
    { id: '3', url: Image.resolveAssetSource(require('../../../static/img/shoes-3.png')).uri },
    { id: '4', url: Image.resolveAssetSource(require('../../../static/img/shoes-4.png')).uri },
    { id: '5', url: Image.resolveAssetSource(require('../../../static/img/shoes-5.png')).uri },
  ]

  const description = `Born on the pitch, the Samba is a timeless icon of street style. This silhouette stays true to its legacy with a tasteful, low-profile, soft leather upper, suede overlays and gum sole, making it a staple in everyone's closet - on and off the pitch.00

  - Regular fit

  - Lace closure

  - Regular fit

  - Full grain leather upper with
    gritty suede and gold foil details

  - Synthetic leather lining;
    Gum rubber cupsole

  - Gum rubber midsole

  - Imported

  - Product color: Core Black / Cloud White / Gum

  - Product code: B75807
  `

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product View',
      headerRight: () => (
        <>
          <Button icon right data={{ icon: { name: like ? 'heart' : 'heart-outline', type: 'ionicons', size: 25, color: like ? colors.notification : colors.text }, onPress: () => { setLike(prev => !prev) } }} />
          <Button icon right data={{ icon: { name: 'cart-outline', type: 'ionicons', size: 25, color: colors.text }, onPress: () => { } }} />
        </>
      )
    })
  }, [navigation, like])

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      style={{}}>
      <View>
        <FlatList
          data={images}
          keyExtractor={({ id }) => { String(id) }}
          horizontal
          pagingEnabled
          renderItem={({ item }) => {
            return (
              <Image
                source={{ uri: item.url }}
                style={{ width, height: 500 }}
              />
            )
          }}
        />
        <Button icon
          data={{ icon: { name: 'share-social-outline', type: 'ionicons', size: 25, color: colors.primary }, onPress: () => { } }}
          style={[BorderRadius(), {
            position: 'absolute', bottom: 10, right: 10, backgroundColor: '#ffffff', shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }]}
        />
      </View>

      <Item
        style={{ backgroundColor: 'transparent' }}
        data={{
          padding: Platform.OS == 'android',
          component: <View>
            <Text style={[MediumFontSize(), { textDecorationLine: 'line-through', color: colors.secondary }]}>{new Intl.NumberFormat('uss', { currency: 'USD', style: 'currency' }).format(100)}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[TitleFontSize(1.2), { color: colors.text }]}>{new Intl.NumberFormat('uss', { currency: 'USD', style: 'currency' }).format(85)} </Text>
              <Text style={[MediumFontSize(), { color: colors.notification }]}>15% OFF</Text>
            </View>
          </View>
        }}
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button style={{ flex: 1 }} blue data={{ style: { marginRight: 0 }, title: 'Buy now', onPress: () => { } }} />
        <Button data={{ style: { backgroundColor: '#e5edfa' }, title: 'Add to cart', onPress: () => { } }} />
      </View>


      <List
        data={[{
          icon: { name: 'storefront', size: 32, color: colors.primary, backgroundColor: 'transparent' },
          title: 'Official Bag Store',
          description: 'See more',
          onPress: () => { }
        }, {
          component:
            <TouchableWithoutFeedback onPress={() => { setShortDescription(prev => !prev); }}>
              <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                <Text style={[MediumFontSize(), { color: colors.text }]}>
                  {description?.length > 200 ? (shortDescription ? description?.substring(0, 200) + ', more...' : description) : description}
                </Text>
              </View>
            </TouchableWithoutFeedback>
        }]}
      />

      <Item
        header="Related"
        headerOnAndroid
        style={{ marginHorizontal: 0, backgroundColor: 'transparent' }}
        data={{
          padding: false,
          component: <FlatList
            data={images}
            keyExtractor={({ id }) => { String(id) }}
            horizontal
            contentContainerStyle={[PaddingHorizontal(), { gap: 10 }]}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ width: 200, padding: 10, marginVertical: 5, borderWidth: 0.8, borderColor: Platform.OS == 'android' ? colors.android.line : colors.ios.line, backgroundColor: colors.card, borderRadius: 20 }}>
                  <Image
                    source={{ uri: item.url }}
                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                  />
                  <View style={{ marginVertical: 15 }}>
                    <Text style={[DescriptionFontSize(), { textDecorationLine: 'line-through', color: colors.secondary }]}>{new Intl.NumberFormat('uss', { currency: 'USD', style: 'currency' }).format(100.00)}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[MediumFontSize(), { color: colors.text }]}>{new Intl.NumberFormat('uss', { currency: 'USD', style: 'currency' }).format(85.00)} </Text>
                      <Text style={[DescriptionFontSize(), { color: colors.notification }]}>15% OFF</Text>
                    </View>
                    <Text style={[DescriptionFontSize(), { marginTop: 15, color: colors.secondary }]}>GAZELLE SHOES</Text>
                  </View>
                  <View>

                  </View>
                </View>
              )
            }}
          />

        }}
      />
      <Divider />
    </ScrollView>
  )
}

export default ProductView
