import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Button, StatusBar, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import { object } from 'prop-types';
const TaskOne = () => {
  const [data, setData] = useState({ data: {} });
  //console.log(data);
  var myHeaders = new Headers();
  myHeaders.append("sign", "5f062697e472c5928c7010a3e06063fe09d3992de6574ac6327e1e2e251a1e28");
  myHeaders.append("token", "a2066a39a575cbbc9237de633c96219457d38c28103589d26cc754c94a8400bb");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  useEffect(() => {
    fetch("http://www.lampmonitor.com/lampmonitor/api/auth/web/user/", requestOptions)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Company Information</Text>
      <ScrollView style={styles.sc}>
      
        {/* 
         {Object.entries(data.data).map(([key, val]) => {
          if (key == "companyId" || key == "factoryId" || key == "groupName" || key == "id" || key == "loginId" || key == "name")
            return <Text style={styles.text1}>{key + " : " + val}</Text>
        })}     
       */}
        <Text style={styles.text1}>companyId: {data?.data?.companyId}</Text>
        <Text style={styles.text1}>factoryId: {data?.data?.factoryId}</Text>
        <Text style={styles.text1}>groupName: {data?.data?.groupName}</Text>
        <Text style={styles.text1}>id: {data?.data?.id}</Text>
        <Text style={styles.text1}>loginId: {data?.data?.loginId}</Text>
        <Text style={styles.text1}>name: {data?.data?.name}</Text>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:
  {
    paddingTop: 95,
    color: "#000080",
    fontSize: 25,
    lineHeight: 64,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "C0C0C0",
  },
  text1:
  {
    paddingTop: 15,
    marginLeft: 0,
    color: "#fcf3cf",
    fontSize: 22,
    lineHeight: 26,
    textAlign: 'center',
    width: 300,
    height: 48,
    fontWeight: "600",
    backgroundColor: "#1468C0",
  },
  sc:
  {
  }
});
export default TaskOne;