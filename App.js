/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LookHistory from './app/main/LookHistory';
import Mine from "./app/main/Mine";
import ClassPage from './app/main/ClassPage';
import LessonListPage from './app/main/second/LessonListPage';
import LessonPageDetail from './app/main/second/LessonPageDetail';

const BottomTab = createBottomTabNavigator(
  {
      LookHistory: { 
          screen: LookHistory,
          navigationOptions: ({navigation}) => {

              return {
              
              tabBarLabel: '已下载',
              tabBarIcon: ({tintColor}) => (
                  <FontAwesome
                      name={'wpforms'}
                      size={25}
                      color={tintColor}
                  />
              ),
              tabBarOnPress: () => {
                  navigation.navigate("LookHistory")
              }
          }
          }
      },

      ClassPage: { 
          screen: ClassPage,
          navigationOptions: ({navigation}) => ({
              tabBarLabel: '课程',
              tabBarIcon: ({tintColor}) => (
                  <MaterialCommunityIcons
                      name={'format-list-bulleted'}
                      size={25}
                      color={tintColor}
                  />
              ),
              tabBarOnPress: () => {
                  navigation.navigate("ClassPage", {classType: 5})
              }
          }),
      },

      Mine: { 
          screen: Mine,
          navigationOptions: ({navigation}) => ({
              tabBarLabel: '我的',
              tabBarIcon: ({tintColor}) => (
                  <Feather
                      name={'settings'}
                      size={25}
                      color={tintColor}
                  />
              ),
              tabBarOnPress: () => {
                  navigation.navigate("Mine")
              }
          })
      },
  },

  {
    initialRouteName: 'LookHistory',
    initialRouteParams: {title: 'Net'}, 

    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
);

const navigator = createStackNavigator({
        BottomTab: BottomTab,
        LookHistory: LookHistory,
        Mine: Mine,
        ClassPage: ClassPage,
        LessonListPage: LessonListPage,
        LessonPageDetail : LessonPageDetail
    }, 

    {
        initialRouteName: 'BottomTab', // 默认显示界面
        headerMode: "none"
    }
)
export default createAppContainer(navigator);