import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {Text, View} from "react-native";

type TTabBarIconProps = {
    focused?: boolean,
    title: string,
    icon: any,
    styles?: any
}

export default function TabBarIcon(props: TTabBarIconProps) {
    const {focused, title, icon, styles} = props;

    return (
        <View style={[styles, { alignItems: 'center', justifyContent: 'center' }]}>
            <Ionicons
                name={icon}
                color={focused
                    ? 'white'
                    : styles ? 'white' : 'gray'
                }
                size={30}
            />
            <Text style={{color: focused ? 'white' : styles ? 'white' : 'gray', fontSize: 12}}>
                {title}
            </Text>
        </View>
    )
}