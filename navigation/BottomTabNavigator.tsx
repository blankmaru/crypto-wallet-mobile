/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {BottomTabParamList, HomeParamList, MarketParamList, PortfolioParamList, ProfileParamList} from '../types';
import HomeScreen from "../screens/HomeScreen";
import PortfolioScreen from "../screens/Portfolio";
import MarketScreen from "../screens/MarketScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TabBarIconComponent from "./TabBarIcon";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint,
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 15,
                    height: 90
                }}}>
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({focused}) => <TabBarIconComponent focused={focused} title={'Home'} icon={'home-outline'} />,
                }}
            />
            <BottomTab.Screen
                name="Portfolio"
                component={PortfolioNavigator}
                options={{
                    tabBarIcon: ({focused}) => <TabBarIconComponent focused={focused} title={'Portfolio'} icon={'briefcase-outline'} />,
                }}
            />
            <BottomTab.Screen
                name="Market"
                component={MarketNavigator}
                options={{
                    tabBarIcon: ({focused}) => <TabBarIconComponent focused={focused} title={'Market'} icon={'list-outline'} />,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({focused}) => <TabBarIconComponent focused={focused} title={'Profile'} icon={'person-outline'} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerTitle: 'Home'}}
            />
        </HomeStack.Navigator>
    );
}

const PortfolioStack = createStackNavigator<PortfolioParamList>();

function PortfolioNavigator() {
    return (
        <PortfolioStack.Navigator screenOptions={{headerShown: false}}>
            <PortfolioStack.Screen
                name="PortfolioScreen"
                component={PortfolioScreen}
                options={{headerTitle: 'Portfolio'}}
            />
        </PortfolioStack.Navigator>
    );
}

const MarketStack = createStackNavigator<MarketParamList>();

function MarketNavigator() {
    return (
        <MarketStack.Navigator screenOptions={{headerShown: false}}>
            <MarketStack.Screen
                name="MarketScreen"
                component={MarketScreen}
                options={{headerTitle: 'Market'}}
            />
        </MarketStack.Navigator>
    );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}}>
            <ProfileStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{headerTitle: 'Profile'}}
            />
        </ProfileStack.Navigator>
    );
}