/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import { ScrollView } from "react-native";

// React Native UI DevKit
import { List, } from "react-native-ui-devkit";

const Help = (props) => {
  const { navigation } = props;

  const _list = [
    {
      title: 'First steps',
      onPress: () => { navigation.navigate('HelpDetail', { title: 'First steps' }) },
    },
    {
      title: 'Account',
      onPress: () => { navigation.navigate('HelpDetail', { title: 'Account' }) },
    },
    {
      title: 'Access',
      onPress: () => { navigation.navigate('HelpDetail', { title: 'Access' }) },
    },
    {
      title: 'Safety Tips',
      onPress: () => { navigation.navigate('HelpDetail', { title: 'Safety Tips' }) },
    },
    {
      title: 'Forgot my password',
      onPress: () => { navigation.navigate('HelpDetail', { title: 'Forgot my password' }) },
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="always">
      <List data={_list} />
    </ScrollView>
  )
}

export default Help
