/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import { useState } from "react"
import { ScrollView } from "react-native"

// React Native UI DevKit
import { Divider, Item, List, } from "react-native-ui-devkit"

const Privacy = () => {
  const [switchValue, setSwitchValue] = useState(false)

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="always"
    >
      <List
        header='Who can see your data'
        headerOnAndroid
        data={[
          {
            title: 'Last seen',
            description: 'Nobody',
            onPress: () => { },
          },
          {
            title: 'Profile picture',
            description: 'All',
            onPress: () => { },
          },
          {
            title: 'Message',
            description: 'All',
            onPress: () => { },
          },
          {
            title: 'Grups',
            description: 'All',
            onPress: () => { },
          },
          {
            title: 'Status',
            description: '1 contact deleted',
            onPress: () => { },
          },
        ]}
      />

      <Item
        footerOnAndroid
        data={{
          title: 'Real-time location',
          description: 'None',
          onPress: () => { },
        }}
        footer='List of conversations where you shared your real-time location'
      />
      <Item
        data={{
          title: 'Calls',
          onPress: () => { },
        }}
      />

      <Item
        footerOnAndroid
        data={{
          title: 'Blocked',
          description: '4 contacts',
          onPress: () => { },
        }}
        footer='List of contacts you have blocked'
      />

      <Item
        footerOnAndroid
        data={{
          title: 'Read confirmation',
          switch: {
            value: switchValue,
            onValueChange: () => setSwitchValue(prev => !prev)
          }
        }}
        footer="If you turn off read receipts, you won' t be able to see other people's read receipts. Read receipts are always sent to group conversations"
      />
      <Divider />
    </ScrollView>
  )
}

export default Privacy