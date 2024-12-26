import React from "react";
import { ImageBackground, StyleSheet, 
    Text, View,SafeAreaView,
    StatusBar,TouchableOpacity } from "react-native";




const image = { uri: "https://i.pinimg.com/originals/6a/f1/69/6af1692067da293893315a1903b057c8.jpg" };
const Welcome = ({navigation}) => (
    <View style={styles.backgroud}>
    <StatusBar  
                    backgroundColor = "blue"   
                    barStyle = "dark-content"   
                    hidden = {false}    
                    translucent = {true}  
                />


      <SafeAreaView style={styles.backgroud}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

      <Text style={styles.text}>TASK : Fetch Data </Text>



      


      <TouchableOpacity onPress={() => navigation.navigate("TaskOne")} 
    style={styles.button}>
        <Text style={styles.buttonText}>WELCOME</Text>
    </TouchableOpacity>
     
      </ImageBackground>
    </SafeAreaView>

   

   
    </View>












  );
  const styles = StyleSheet.create({
    backgroud: {
      flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
      text:
      {
        
        color: "yellow",
        fontSize: 32,
        lineHeight: 64,
        
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
        
      },
    button:{
        width: '60%',
        justifyContent:'center',
        textAlign: "center",
        backgroundColor: "#2B1B17",
        padding: 22,
        borderRadius:42,
        alignItems: 'center',
        //paddingTop:50,
        marginTop: 280,
        marginLeft: 85,
      

    },
    buttonText:
    {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        
    },
  });
  
  export default Welcome;



