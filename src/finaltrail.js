import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, RefreshControl, Text, SafeAreaView, Fragment } from 'react-native';
import { useQuery, useQueries } from 'react-query';
import MapView, { MapMarker } from 'react-native-maps';
import axios from 'axios';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Table, Row, Rows, Col, Cell, Cols } from 'react-native-table-component';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const FTrail = () => {
    const countRef = useRef(0);
    const [datao, setDatao] = useState();
    //const [data, setData] = useState();
    const [dataLoc, setDataLoc] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);
    const fetchPosts = async () => {
        const { data } = await axios.get("https://www.lampmonitor.com/lampmonitor/api/auth/web/lampControls?projectId=595&pageSize=50", {
            headers: {
                sign: "5f062697e472c5928c7010a3e06063fe09d3992de6574ac6327e1e2e251a1e28",
                token: "a2066a39a575cbbc9237de633c96219457d38c28103589d26cc754c94a8400bb"
            }
        });
        return data.data.items;
    }
    const usePosts = useQuery('posts', fetchPosts);
    let devices = [];
    if (usePosts.isFetched === true) {
        devices = usePosts.data?.map(a => a.id);
    }
    //console.log(devices);
    const idDetails = usePosts.data?.map(datao => {
        const nwArr = [];
        nwArr.push(datao.id);
        nwArr.push(datao.fields.lamp_no);
        nwArr.push(datao.fields.road_section);
        nwArr.push(datao.fields.update_timestamp);
        nwArr.push(datao.fields.signal_strength);
        nwArr.push(datao.fields.light_brightness);
        return nwArr;
    });
    async function fetchData() {
        try {
            const requestArray = await Promise.all(devices?.map((id) => {
                const info = axios.get(`https://www.lampmonitor.com/lampmonitor/api/auth/web/lampControl/${id}`, {
                    headers: {
                        sign: "5f062697e472c5928c7010a3e06063fe09d3992de6574ac6327e1e2e251a1e28",
                        token: "a2066a39a575cbbc9237de633c96219457d38c28103589d26cc754c94a8400bb"
                    }
                });
                countRef.current += 1
                return info;
            }));
            return requestArray;
        }
        catch (error) {
            console.log(error);
        }
    }
    const usePost = useQuery('post', fetchData, { refetchInterval: () => countRef.current < 2 ? 3000 : false });
    const latlng = usePost.data?.map(a => [a.data.data.latitude, a.data.data.longitude, a.data.data.id])
    //console.log(latlng);
    const bigArr = latlng?.map((obj, i) => {
        return [...obj, ...idDetails[i].splice(1)];
    })
    //console.log(bigArr);
    const lAray = (bigArr) => {
        const map1 = {};
        bigArr?.forEach(([lat, lng, id, lightN, roadN, ...rest]) => {
            const key1 = `${String(roadN)}`;
            if (!map1[key1]) {
                map1[key1] = [roadN]
            }
            map1[key1].push(lat, lng, id, lightN, ...rest);
        });
        return Object.values(map1);
    }
    //console.log(lAray(bigArr));
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        longitude: 110.941690,
                        latitude: 4.020472,
                        latitudeDelta: 48,
                        longitudeDelta: 1,
                    }}>
                    {lAray(bigArr)?.map((m, id) =>
                        <Marker
                            key={id}
                            coordinate={{
                                latitude: m[1],
                                longitude: m[2],
                            }}>
                            <Callout>
                                <View style={styles.container2}>
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                        <Row data={[`ID : ${m[10]}`]}
                                            //widthArr={widthArr}
                                            style={styles.header}
                                            textStyle={styles.text1} />
                                        <Col
                                            data={[`Lamp  No:  ${m[11]}`,
                                            `Road  Section:  
 ${m[0]}  `,
                                            `Update  Time:  ${[12]}`,
                                            `Signal  Strength:  ${m[13]}`,
                                            `Light  Brightness:  ${m[14]}`]}
                                            textStyle={styles.text2}
                                        />
                                    </Table>
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                        <Row data={[`ID : ${m[3]}`]}
                                            //widthArr={widthArr}
                                            style={styles.header}
                                            textStyle={styles.text1} />
                                        <Col
                                            data={[`Lamp  No:  ${m[4]}`,
                                            `Road  Section:  
 ${m[0]}  `,
                                            `Update  Time:  ${[5]}`,
                                            `Signal  Strength:  ${m[6]}`,
                                            `Light  Brightness:  ${m[7]}`]}
                                            textStyle={styles.text2}
                                        />
                                    </Table>
                                </View>
                            </Callout>
                        </Marker>
                    )}
                </MapView>
            </ScrollView>
        </SafeAreaView>
    );
}
export default FTrail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    map: {
        borderRadius: 60,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    scrollView: {
        flex: 1,
        //marginTop: 100,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '700',
        width: 180,
        height: 130,
    },
    header: { height: 30, backgroundColor: '#537791' },
    text1: { textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 16 },
    text2: { textAlign: 'center', fontWeight: '500', color: 'black', fontSize: 13 },
    container2: {
        flex: 1,
        flexDirection: "row-reverse",
    }

});