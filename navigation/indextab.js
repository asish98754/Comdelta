import React from 'react';
import { Button, StyleSheet, useState, TouchableOpacity, Text } from 'react-native';
import { Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskOne from '../src/task1';
import Welcome from '../src/welcome';
//import Task2TableOrg from '../src/pdfddmo';
import FTrail from '../src/finaltrail';
import NewPdf from '../src/task2';
const Tab = createBottomTabNavigator();
function MyTabs() {
       return (
              <Tab.Navigator>
                     <Tab.Screen name="Welcome" component={Welcome} options={{
                            tabBarIcon: () => (<Image source={require("./../asset/icon/weather.png")} style={{ width: 20, height: 20 }} />)
                            , title: 'Welcome', headerStyle: {
                                   backgroundColor: '#1468C0'
                            }
                     }} />
                     <Tab.Screen name="Task1" component={TaskOne} options={{
                            tabBarIcon: () => (<Image source={require("./../asset/icon/1.png")} style={{ width: 20, height: 20 }} />)
                            , title: 'Task1', headerStyle: {
                                   backgroundColor: '#1468C0'
                            },
                     }} />
                     <Tab.Screen name="Task2" component={NewPdf} options={{
                            tabBarIcon: () => (<Image source={require("./../asset/icon/task2demo.png")} style={{ width: 20, height: 20 }} />)
                            , title: 'Task2', headerStyle: {
                                   backgroundColor: '#1468C0'
                            },
                     }} />
                     <Tab.Screen name="Task3" component={FTrail} options={{
                            tabBarIcon: () => (<Image source={require("./../asset/icon/locationIcon.png")} style={{ width: 20, height: 20 }} />)
                            , title: 'Task3', headerStyle: {
                                   backgroundColor: '#1468C0'
                            },
                     }} />
              </Tab.Navigator>
       );
}
const styles = StyleSheet.create({
       button: {
              title: 'Back',
              color: '#2C3539',
       },
       buttonText: {
              fontSize: 22,
              fontWeight: '600',
              color: 'white',
       },
});
export default MyTabs;