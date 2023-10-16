/*
* MIT License
* Copyright © 2023 React Native UI DevKit - All rights reserved
* Copyright © 2023 React Native UI DevKit Layout - All rights reserved
*/
import { ScrollView } from "react-native"
import { useEffect, useState } from "react"

// React Native UI DevKit
import { Item, List, } from "react-native-ui-devkit"

let timeout;
const Language = () => {
  const [language, setLanguage] = useState('English')
  const [loading, setLoading] = useState({ language: '' })

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="always">
      <Item
        header="Selected Language"
        headerOnAndroid
        data={{
          title: language,
          checkbox: true
        }}
      />

      <List
        header="Languages"
        footer='Select one to change the app language'
        headerOnAndroid
        FooterOnAndroid
        data={[
          language !== 'English' && {
            title: 'English',
            loading: loading.language == 'English',
            disabled: loading.language !== '',
            chevron: false,
            delay: false,
            onPress: () => {
              clearTimeout(timeout)
              setLoading({ language: 'English' })

              timeout = setTimeout(() => {
                setLanguage('English')
                setLoading({ language: '' })
              }, 1500)
            }
          },
          language !== 'Spanish' && {
            title: 'Spanish',
            loading: loading.language == 'Spanish',
            disabled: loading.language !== '',
            chevron: false,
            delay: false,
            onPress: () => {
              clearTimeout(timeout)
              setLoading({ language: 'Spanish' })

              timeout = setTimeout(() => {
                setLanguage('Spanish')
                setLoading({ language: '' })
              }, 1500)
            }
          },
          language !== 'Portuguese' && {
            title: 'Portuguese',
            loading: loading.language == 'Portuguese',
            disabled: loading.language !== '',
            chevron: false,
            delay: false,
            onPress: () => {
              clearTimeout(timeout)
              setLoading({ language: 'Portuguese' })

              timeout = setTimeout(() => {
                setLanguage('Portuguese')
                setLoading({ language: '' })
              }, 1500)
            }
          },
          language !== 'French' && {
            title: 'French',
            loading: loading.language == 'French',
            disabled: loading.language !== '',
            chevron: false,
            delay: false,
            onPress: () => {
              clearTimeout(timeout)
              setLoading({ language: 'French' })

              timeout = setTimeout(() => {
                setLanguage('French')
                setLoading({ language: '' })
              }, 1500)
            }
          },
        ]}
      />
    </ScrollView>
  )
}

export default Language
