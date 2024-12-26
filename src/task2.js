import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row, Rows, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Entypo';
//const image = { require:require("./../asset/icon/logo.jpg") };
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { DataTable } from 'react-native-paper';
const NewPdf = ({ navigation }) => {
    const [data, setData] = useState({});
    const [selectedPrinter, setSelectedPrinter] = React.useState();
    var myHeaders = new Headers();
    myHeaders.append("sign", "5f062697e472c5928c7010a3e06063fe09d3992de6574ac6327e1e2e251a1e28");
    myHeaders.append("token", "a2066a39a575cbbc9237de633c96219457d38c28103589d26cc754c94a8400bb");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    useEffect(() => {
        fetch("https://www.lampmonitor.com/lampmonitor/api/auth/web/lampControls?projectId=595&pageSize=50", requestOptions)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error(error))

    }, []);
    const arry = data?.data?.items.map(data => {
        let signalIcon = data.fields.signal_status == 0 ?
            <Icon style={{ alignSelf: 'center' }} allowFontScaling={true} name="signal" color={'#000000'} size={25} /> :
            <Icon style={{ alignSelf: 'center' }} allowFontScaling={true} name="signal" color={'#04B404'} size={25} />;
        let lightIcon = data.fields.light_brightness == 0 ?
            <Icon style={{ alignSelf: 'center' }} allowFontScaling={true} name="light-bulb" color={'#000000'} size={25} /> :
            <Icon style={{ alignSelf: 'center' }} allowFontScaling={true} name="light-bulb" color={'#04B404'} size={25} />;
        const nwArr = [];
        nwArr.pop(data.id);
        nwArr.push(data.fields.lamp_no);
        nwArr.push(data.fields.road_section);
        nwArr.push(data.fields.module_id);
        nwArr.push(signalIcon);
        nwArr.push(data.fields.update_timestamp);
        nwArr.push(data.fields.moduleStatus);
        nwArr.push(data.fields.signal_strength);
        nwArr.push(data.fields.total_energy_generation);
        nwArr.push(data.fields.total_energy_consumption);
        nwArr.push(lightIcon);
        nwArr.push(data.fields.bat_voltage);
        nwArr.push(data.fields.solar_voltage);
        nwArr.push(data.fields.solar_current);
        nwArr.push(data.fields.solar_power);
        return nwArr;
    });
    const htmlDatasheet = data?.data?.items.map((data) => {
        const newaLm = [],
            newaR = [],
            newaM = [],
            newaS = [],
            newaL = [],
            newaB = [],
            newaPG = [],
            newaPC = [],
            newaUP = []
        newaLm.push(data.fields.lamp_no)
        newaR.push(data.fields.road_section)
        newaM.push(data.fields.module_id)
        newaS.push(data.fields.signal_status)
        newaL.push(data.fields.light_brightness)
        newaB.push(data.fields.bat_voltage)
        newaPG.push(data.fields.total_energy_generation)
        newaPC.push(data.fields.total_energy_consumption)
        newaUP.push(data.fields.update_timestamp)
        let dataT = [];
        for (let a in newaLm) {
            for (let b in newaR) {
                for (let c in newaM) {
                    for (let d in newaS) {
                        for (let e in newaL) {
                            for (let f in newaB) {
                                for (let g in newaPG) {
                                    for (let h in newaPC) {
                                        for (let i in newaUP) {
                                            const newaLmItem = newaLm[a],
                                                newaRItem = newaR[b],
                                                newaMItem = newaM[c],
                                                newaSItem = newaS[d],
                                                newaLItem = newaL[e],
                                                newaBItem = newaB[f],
                                                newaPGItem = newaPG[g],
                                                newaPCItem = newaPC[h],
                                                newaUPItem = newaUP[i]
                                            dataT +=
                                                `<tr>
                                            <td>${newaLmItem}</td>
                                            <td>${newaRItem}</td>
                                            <td>${newaMItem}</td>
                                            <td>${newaSItem}</td>
                                            <td>${newaLItem}</td>
                                            <td>${newaBItem}</td>
                                            <td>${newaPGItem}</td>
                                            <td>${newaPCItem}</td>
                                            <td>${newaUPItem}</td>
                                            </tr>`
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return dataT;
    }).join(' ');
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <style type="text/css">
    @page{
        size: A4 landscape;
        margin-top:0px;
        margin-bottom:0px;
        margin-left:10px;
        margin-right:10px; 
    }
    .demo {
		border:1px solid #C0C0C0;
		border-collapse:collapse;
		padding:5px;
        page-break-inside:auto;
        margin-buttom:300px;
        table-layout:fixed;
    }
    .demo tr{
        border:2px solid #C0C0C0;
		padding:5px;
        page-break-inside:avoid; 
        page-break-after:auto;
    }
    .demo th {
		border:2px solid #C0C0C0;
		padding:5px;
		background:#F0F0F0;
    }
    .demo td {
		border:2px solid #C0C0C0;
		padding:5px;
        text-align: center;
    }
    .images {
        text-align: center;
    }
    body{
        padding-top: 30px;
        padding-bottom: 60px;
    }
    .footers {
        position: fixed;
        bottom: 0;
        width: 100%;
        color: black;
        z-index: 9999;
        font-style: italic;
        font-weight: bold;
        text-align: center;
        background-color: #ffffff;
    }
    pagging {
        text-align: left;
        counter-reset: page;
    }
    pagees::before{
        counter-increment: page;
        content: "Page " counter(page);
        text-align:left;
    }
    </style>
    </head>
    <body>
    <div class="reportcontainer">
    <div class="reportbody">
    <div class="images">
    <img src="https://www.comdelta.com.my/wp-content/uploads/2021/10/Logo.jpeg"
    alt="Comdelta Technologies Sdn. Bhd"
    width="200" height="80"/>
    </div>
    <table class="demo">
    <h2>Comdelta Technologies Sdn. Bhd</h2>
	<thead>
    <tr> 
    <th>Lamp No</th>
    <th>Road</th>
    <th>PN</th>
    <th>Status</th>
    <th>Light</th>
    <th>Battery</th>
    <th>Power Generation</th>
    <th>power Consumption</th>
    <th>Last Update</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${htmlDatasheet}</td>
    </tr>
	</tbody>
    </table>
    <div class="footers">
    Copyright &copy; 2022 Comdelta Technologies Sdn. Bhd.All rights reserved.
    </div>
    </body>
    </html>`;
    const html2 = `
    <!DOCTYPE html>
    <html>
    <head>
    <style type="text/css">
    @page{
        size: A4 landscape;
        margin-top:0px;
        margin-bottom:0px;
        margin-left:10px;
        margin-right:10px;  
    }
    .demo {
        border:1px solid #C0C0C0;
        border-collapse:collapse;
        padding:5px;
        page-break-inside:auto;
        margin-buttom:300px;
        table-layout:fixed;
    }
    .demo tr{
        border:1px solid #C0C0C0;
        padding:5px;
        page-break-inside:avoid; 
        page-break-after:auto;
    }
    .demo th {
        border:2px solid #C0C0C0;
        padding:5px;
        background:#F0F0F0;
        font-size: 24px;
    }
    .demo td {
        border:1px solid #C0C0C0;
        padding:5px;
        text-align: center;   
    }
    .images {
    text-align: center;
    }
    body{
        padding-top: 30px;
        padding-bottom: 40px;
    }
    h2{
        font-size: 45px;
    }
    .footers {
        position: fixed;
        bottom: 0;
        width: 100%;
        color: black;
        z-index: 9999;
        font-style: italic;
        font-weight: bold;
        text-align: center;
        background-color: #ffffff;
        font-size: 20px;
    }
    pagging {
        text-align: left;
        counter-reset: page;
    }
    pagees::before{
        counter-increment: page;
        content: "Page " counter(page);
        text-align:left;
    }
    </style>
    </head>
    <body>
    <div class="reportcontainer">
    <div class="reportbody">
    <div class="images">
    <img src="https://www.comdelta.com.my/wp-content/uploads/2021/10/Logo.jpeg"
    alt="Comdelta Technologies Sdn. Bhd"
    width="250" height="100"/>
    </div>
    <table class="demo">
    <h2>Comdelta Technologies Sdn. Bhd</h2>
    <thead>
    <tr>
    <th>Lamp No</th>
    <th>Road</th>
    <th>PN</th>
    <th>Status</th>
    <th>Light</th>
    <th>Battery</th>
    <th>Power Generation</th>
    <th>power Consumption</th>
    <th>Last Update</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${htmlDatasheet}</td>
    </tr>
    </tbody>
    </table>
    <div class="footers">
    Copyright &copy; 2022 Comdelta Technologies Sdn. Bhd.All rights reserved.
    </div>
    </body>
    </html>`;
    const generatePdf = async () => {
        const { uri } = await printToFileAsync({
            html, base64: false,
            numberOfPages: 4,
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
    const generatePdfIos = async () => {
        const { uri } = await printToFileAsync({
            html: html2,
            width: 612, height: 708,
            margins: {
                left: 20,
                top: 50,
                right: 20,
                //bottom: 20,
            },
            base64: false,
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
    const td = ['Lamp No', 'Road Section', 'Module Id ', 'Signal Status',
        'Update TimeStamp', 'ModuleStatus', 'Signal Strength', 'Total Energy Generation',
        'Total Energy Consumption', 'Light Brightness', 'Bat Voltage', 'Solar Voltage',
        'Solar Current', 'Solar Power'
    ];
    const widthArr = [150, 150, 150, 150, 150, 160, 200, 200, 200, 150, 150, 150, 150, 150];
    return (
        <View style={styles.container}>
            <Image source={require('./../asset/icon/logo.jpg')} style={{ width: 200, height: 100, marginTop: 20, marginLeft: 70 }} />
            {Platform.OS === 'android' && (
                <>
                    <View />
                    <TouchableOpacity
                        onPress={generatePdf} style={styles.button}>
                        <Text style={styles.buttonText}>Convert PDF</Text>
                    </TouchableOpacity>


                </>
            )}
            {Platform.OS === 'ios' && (
                <>
                    <View />
                    <TouchableOpacity
                        onPress={generatePdfIos} style={styles.button}>
                        <Text style={styles.buttonText}>Convert PDF</Text>
                    </TouchableOpacity>


                </>
            )}

            <DataTable style={{ marginTop: 8 }}>
                <ScrollView horizontal={true}>
                    <View>
                        <DataTable.Header style={styles.head}>
                            <DataTable.Title style={{ width: 100 }}>LampNo</DataTable.Title>
                            <DataTable.Title style={{ width: 215 }}>RoadSection</DataTable.Title>
                            <DataTable.Title style={{ width: 150 }}>ModuleId</DataTable.Title>
                            <DataTable.Title style={{ width: 100 }}>SignalStatus</DataTable.Title>
                            <DataTable.Title style={{ width: 170 }}>UpdateTimeStamp</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>ModuleStatus</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>SignalStrength</DataTable.Title>
                            <DataTable.Title style={{ width: 150 }}>TotalEnergyGeneration</DataTable.Title>
                            <DataTable.Title style={{ width: 150 }}>TotalEnergyConsumption</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>LightBrightness</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>BatVoltage</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>SolarVoltage</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>SolarCurrent</DataTable.Title>
                            <DataTable.Title style={{ width: 80 }}>SolarPower</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView>
                            {arry?.map((item) => (
                                <DataTable.Row key={item[0]} style={{ borderBottomWidth: 3 }} >
                                    <DataTable.Cell style={{ width: 100, borderBottomWidth: 1 }}>{item[0]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 215, borderBottomWidth: 1 }}>{item[1]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 150, borderBottomWidth: 1 }}>{item[2]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 100, borderBottomWidth: 1 }}>{item[3]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 170, borderBottomWidth: 1 }}>{item[4]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 120, borderBottomWidth: 1 }}>{item[5]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 120, borderBottomWidth: 1 }}>{item[6]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 150, borderBottomWidth: 1 }}>{item[7]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 150, borderBottomWidth: 1 }}>{item[8]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 120, borderBottomWidth: 1 }}>{item[9]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 120, borderBottomWidth: 1 }}>{item[10]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 120, borderBottomWidth: 1 }}>{item[11]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 120, borderBottomWidth: 1 }}>{item[12]}</DataTable.Cell>
                                    <DataTable.Cell style={{ width: 80, borderBottomWidth: 1 }}>{item[13]}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </DataTable>
        </View>
    )
}
export default NewPdf;
const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 10, paddingHorizontal: 30, backgroundColor: 'white' },
    head: { height: 50, backgroundColor: '#1468C0', borderBottomWidth: 3 },
    row: { height: 40, backgroundColor: 'lightyellow' },
    headstyle: { width: 200 },
    rowstyle: { width: 200 },
    button: {
        borderRadius: 12, width: '32%', textAlign: "center",
        backgroundColor: "#1468C0", padding: 12, marginLeft: 240, marginTop: 12,
    },
    buttonText: { fontSize: 14, fontWeight: '600', color: 'black' },
})
