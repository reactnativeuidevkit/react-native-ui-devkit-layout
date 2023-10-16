/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, Linking, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { GlobalContext } from '../../../libs/globalContext';

// React Native UI DevKit
import { List, Item, TitleFontSize, Button, Icon, BorderRadius, useColors } from 'react-native-ui-devkit';

const ProductCreate = (props) => {
  const { navigation } = props;
  const { global } = useContext(GlobalContext);
  const colors = useColors();

  const titleRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create a new product',
    });
  }, [navigation, colors])

  const [data, setData] = useState({ title: '', description: '', whoCanSee: 0, condition: 'new', price: '', images: [] })
  const [priceFocus, setPriceFocus] = useState(false)
  const [timestamp, setTimestamp] = useState(null)

  const handleImageSelection = async () => {
    const { assets, didCancel, errorCode } = await launchImageLibrary({ mediaType: 'photo', includeExtra: true, selectionLimit: data?.images?.length ? 6 - data?.images?.length : 6, includeBase64: false })

    if (errorCode == 'permission') {
      Alert.alert(
        'Permission error',
        'Permission is not allowed to access images',
        [{ text: 'No', style: 'cancel', onPress: async () => { } }, { text: 'Settings', style: 'default', onPress: async () => { Linking.openSettings() } }],
        { cancelable: false },
      );
      return
    }

    if (didCancel) {
      return
    }

    if (!assets) {
      Alert.alert('Error', 'Select photo error')
      return
    } else {
      let images = data?.images ?? [];

      for (let i = 0; i < assets?.length; i++) {
        const image = {
          _id: new Date().getTime() + i,
          uri: assets[i]?.uri,
        }
        images.push(image)

        setData(prev => { return { ...prev, images } })
      }
    }
  }

  const titleAndDescription = [
    {
      component:
        <TextInput
          ref={titleRef}
          placeholder={'Title'}
          placeholderTextColor={colors.secondary}
          keyboardType='ascii-capable'
          keyboardAppearance={global.dark ? 'dark' : 'default'}
          value={data.title}
          onFocus={() => { setTimestamp(new Date()) }}
          onBlur={() => { setTimestamp(new Date()) }}
          onChangeText={(text) => { setData(prev => ({ ...prev, title: text })) }}
          style={[{ flex: 1, color: colors.text }, TitleFontSize()]}
        />,
      ...titleRef?.current?.isFocused && titleRef?.current?.isFocused() && {
        cleaner: {
          visible: (data && data?.title?.length >= 1),
          onPress: () => {
            setData(prev => ({ ...prev, title: '' }))
            titleRef?.current?.focus && titleRef.current.focus();
          }
        }
      }
    },
    {
      component:
        <TextInput
          ref={descriptionRef}
          placeholder={'Description'}
          placeholderTextColor={colors.secondary}
          keyboardType="ascii-capable"
          keyboardAppearance={global.dark ? 'dark' : 'default'}
          value={data.description}
          onFocus={() => { setTimestamp(new Date()) }}
          onBlur={() => { setTimestamp(new Date()) }}
          onChangeText={(text) => { setData(prev => ({ ...prev, description: text })) }}
          multiline={true}
          style={[{ color: colors.text, height: 105, paddingTop: 10, paddingBottom: 10 }, TitleFontSize()]}
        />,
      ...descriptionRef?.current?.isFocused && descriptionRef?.current?.isFocused() && {
        cleaner: {
          visible: (data?.description?.length >= 1),
          onPress: () => {
            setData((prevState) => ({ ...prevState, description: '' }));
            descriptionRef?.current?.focus && descriptionRef.current.focus();
          }
        }
      }
    }];


  const price = {
    component:
      <TouchableWithoutFeedback
        onPress={() => {
          priceRef?.current?.focus();
        }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[{ color: priceFocus ? colors.primary : colors.text }, TitleFontSize(), priceFocus && { fontWeight: 'normal' }]}>
            {new Intl.NumberFormat('en', { currency: 'USD', style: 'currency' }).format(data.price)}
          </Text>

          <TextInput
            ref={priceRef}
            keyboardType={'number-pad'}
            autoCompleteType={'off'}
            textContentType={'none'}
            autoCorrect={false}
            autoCapitalize={'none'}
            onFocus={() => { setPriceFocus(true) }}
            onBlur={() => { setPriceFocus(false) }}
            value={data.price}
            onChangeText={async (text) => { setData(prev => ({ ...prev, price: text })) }}
            style={{ width: 0, height: '100%', opacity: 0 }}
          />
        </View>
      </TouchableWithoutFeedback>,
  };


  const _renderItem = ({ item, index }) => {
    return (
      <Item
        data={{
          component:
            <View>
              <Image
                source={{ uri: item.uri }}
                style={{ width: 80, height: 80, paddingRight: 15 }}
              />
            </View>,
          padding: false,
          chevron: false,
        }}
        style={{ marginLeft: 0, marginVertical: 0, ...Platform.OS == 'android' && { marginRight: 5 } }}
        marginTop={false}
      />
    )
  }

  const Images = () => {
    return (
      <FlatList
        data={data?.images ?? []}
        renderItem={_renderItem}
        horizontal
        contentContainerStyle={{ marginVertical: 9, paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <Item
            data={{
              component:
                <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: global.dark ? colors.tertiary : colors.background }}>
                  <Icon name="add" type='ionicons' color={colors.text} size={27} />
                </View>,
              chevron: false,
              padding: false,
              disabled: data?.images?.length >= 6,
              onPress: () => {
                if (data?.images?.length < 6) {
                  handleImageSelection()
                } else {
                  Alert.alert('Photo limit reached')
                }
              }
            }}
            style={[BorderRadius(), { marginHorizontal: 0 }]}
            marginTop={false}
          />
        }
      />
    )
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
    >
      <List data={titleAndDescription} header={'Title and Description'} headerOnAndroid />
      <Item data={price} header='Price' headerOnAndroid />
      <Item data={{ component: Images(), padding: false }} header='Photos' headerOnAndroid />
      <Button blue data={{ title: 'Create Product', onPress: () => { }, }} />
    </ScrollView>
  );
}

export default ProductCreate;
