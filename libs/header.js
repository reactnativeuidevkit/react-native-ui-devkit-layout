import React, { useContext } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

// React Native UI DevKit
import { Item, TitleFontSize, BorderRadius, AndroidOldVersion, useColors } from 'react-native-ui-devkit'

import { GlobalContext } from '../libs/globalContext';

const Header = ({ type }) => {
    const { global, setGlobal } = useContext(GlobalContext);
    const colors = useColors();

    const iconSize = Platform.OS == 'android' ? 80 : 60;
    let iconBackgroundColor = colors.primary;

    let title = 'Layout';
    if (type == 'home') {
        iconBackgroundColor = '#04A1CE';
    }

    return (
        <>
            <Item data={{
                component: (
                    <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                        <View style={[{ width: iconSize, height: iconSize, backgroundColor: iconBackgroundColor, alignItems: 'center', justifyContent: 'center' }, BorderRadius()]}>
                            {type == 'home' && <Image source={{ uri: Image.resolveAssetSource(require('../static/img/icon-white.png')).uri }} style={{ width: iconSize / 1.3, height: iconSize / 2 }} />}
                        </View>
                        <Text style={[styles.text, { color: colors.text }, TitleFontSize(1.5)]}>
                            {title}
                        </Text>
                    </View>
                )
            }} index={0} count={2} style={Platform.OS == 'android' && { backgroundColor: (AndroidOldVersion() ? (global.dark ? '#222' : '#fff') : colors.android?.item) }} />
            <Item data={{
                icon: { name: global.dark ? 'dark-mode' : 'light-mode', type: 'material', size: 20, color: colors.background, backgroundColor: colors.text },
                title: `Theme`,
                description: global.dark ? 'Dark' : 'Light',
                switch: {
                    value: global.dark, onValueChange: (value) => {
                        setGlobal((prevState) => ({ ...prevState, dark: value }));
                    }
                }
            }}
                index={1} count={2} style={Platform.OS == 'android' && { backgroundColor: (AndroidOldVersion() ? (global.dark ? '#222' : '#fff') : colors.android?.item) }} />
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 10
    },
});

export default Header;
