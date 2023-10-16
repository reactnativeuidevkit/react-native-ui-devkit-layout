/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import { useLayoutEffect } from "react";
import { Platform, ScrollView, Text, View } from "react-native"
import { useRoute } from "@react-navigation/native";

// React Native UI DevKit
import { Button, Divider, Item, TitleFontSize, useColors } from "react-native-ui-devkit"

const HelpDetail = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const colors = useColors();
  const title = route?.params?.title;

  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [title])

  const itWasUseful = {
    component: (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Button
            data={{
              icon: { name: 'like2', type: 'antdesign', size: 23, color: colors.primary, backgroundColor: 'transparent' },
              delay: false,
              onPress: () => { },
              style: { marginHorizontal: 0 }
            }}
            marginTop={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            data={{
              icon: { name: 'dislike2', type: 'antdesign', size: 23, color: colors.notification, backgroundColor: 'transparent' },
              delay: false,
              onPress: () => { },
              style: { marginHorizontal: 0 }
            }}
            marginTop={false}
          />
        </View>
      </View>
    ),
    padding: false
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        {...Platform.OS == 'ios' && {
          contentContainerStyle: { paddingBottom: Platform.OS == 'ios' ? 45 : 0 }
        }}
      >
        <Divider />

        <Text style={[TitleFontSize(), { color: colors.text, marginHorizontal: 15 }]}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur dolor itaque explicabo facere, eum, qui quidem voluptatum placeat minima mollitia at tempora blanditiis incidunt nostrum magnam quos, magni laborum!
        </Text>

        <Item
          data={itWasUseful}
          header='This article was useful'
          footer='Please indicate whether this information was helpful in resolving your issue'
          footerOnAndroid
          headerOnAndroid
          expanded
          style={{ backgroundColor: 'transparent', marginHorizontal: Platform.OS == 'ios' ? 15 : 0 }}
        />
        <Divider />
      </ScrollView>

    </View>
  )
}

export default HelpDetail
