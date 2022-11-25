import React, {useEffect} from "react"
import { StyleSheet, Image, Text, View,  ImageBackground, StatusBar, TouchableOpacity } from "react-native"

import { TextInput } from 'react-native-paper';
import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';
import DrawerContent from '../components/DrawerContent.js';
import bkking from '../../assets/Burger-King.png';
import menu from '../../assets/img/menu_new.png';
import pope from '../../assets/img/pope.png';
import testheader from '../../assets/img/testheader.png';
import { block } from "react-native-reanimated";



const SelectBrand = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [userdata, setUserdata] = React.useState([]);
    const [brand, setBrand] = React.useState([]);

    const setbusinesstype = async (type) => {
        console.log('type = ',type)
        AsyncStorage.setItem('businesstype', JSON.stringify(type));
        // setTimeout(() => {navigation.navigate('home');}, 1000)
        navigation.navigate('home');

        
        
    }
    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('user');
        const userdata = JSON.parse(jsonValue)
        console.log('userdata = ',userdata)
        setUserdata(userdata);
        setBrand(userdata.business_type);
        console.log('userdata.business_type = ',userdata.business_type)
    }
      useEffect(() => {
        getData();
      },[])

    return (
        <>
        <StatusBar
        barStyle="dark-content"
        style={{height: 70}}
        animated={true}
        backgroundColor="#f5a04c"
        onPress={() => setOpen(false)}
      />
        <MenuDrawer
          open={open}
          position={'left'}
          style={open ? styles.displayshow: styles.displayhide}
          drawerContent={DrawerContent(open, setOpen, navigation)}
          drawerPercentage={75}
          animationTime={250}
          overlay={true}
          opacity={0.07}
        >
        <View style={styles.topheader} onPress={() => setOpen(false)}>
        <ImageBackground imageStyle={{ backgroundColor: '#fff'}} style={styles.imageback} source={testheader} resizeMode="cover" ></ImageBackground>
            
            <TouchableOpacity style={styles.MenuIcon} onPress={() => setOpen(true)}><Image
                // style={styles.MenuIcon}
                source={menu}
            /></TouchableOpacity>
            <Image
                style={styles.bkkinglogo}
                source={bkking}
            />
        </View>
        {/* <View style={styles.header}>
            <Image
                style={styles.Group737}
                source={menu}
            />
            <Image
                style={styles.bkking}
                source={bkking}
            />
        </View> */}
        <View style={styles.Home}>
        <View>
            <Text style={styles.brandName}>Select Brand</Text>
        </View>
        <View style={styles.brandList}>
        {brand.map((item, index) => {
        return (
            <TouchableOpacity  onPress={() => setbusinesstype(item)}>
            <View style={styles.selectbrand}>
                <View style={styles.brandround}>
                <Image
                    style={styles.bkking}
                    source={bkking}
                />
                </View>
                <Text style={styles.brandtype}>{item.name}</Text>
            </View>
            </TouchableOpacity>
        )
        })}
            {/* <Text style={styles.brandtype}>India Limited</Text> */}
            {/* <View style={styles.selectbrand}>
                <View style={styles.brandround}>
                    <Image
                        style={styles.bkking}
                        source={bkking}
                    />
                </View>
                <Text  style={styles.brandtype}>Indonesia</Text>
            </View>
            <View style={styles.selectbrand}>
                <View style={styles.brandround}>
                    <Image
                        style={styles.bkking}
                        source={pope}
                    />
                </View>
                <Text style={styles.brandtype}>Indonesia</Text>
            </View> */}
        </View>
        </View>
        </MenuDrawer>
        </>
    )
}



const styles = StyleSheet.create({
  displayshow:{
    display:"block",
  },
  displayhide:{
    display:"none",
  },
    topheader:{
        display: "flex",
        height:140
      },
      imageback:{
        flex: 1, width:'100%', height:140, justifyContent: "center"
      },
      MenuIcon: {
        // display: "flex",
        // flexDirection: "row",
        position: "absolute",
        top: 50,
        left:20,
      //   borderWidth:1,
      // borderColor:'red',
        // none: "0px",
        width: 37,
        height: 35,
        padding:2,
        // borderWidth:1,
        // borderColor:'green'
        
      },
      bkkinglogo: {
        // display: "flex",
        // flexDirection: "row",
        position: "absolute",
        top: 50,
        left:'44.51%',
        right:'44.51%',
        // none: "0px",
        width: 41.07,
        height: 43.82,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'auto',
        marginBottom:'auto',
        // padding:2,
        // borderWidth:1,
        // borderColor:'green'
        
      },
      Home: {
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "flex-start",
        // alignItems: "center",
        // position: "relative",
        // borderRadius: 30,
        backgroundColor: "#fff",
        // width: 375,
        minHeight:600,
        height: '100%',
        // padding: '8%',
        paddingTop:9,
        // marginRight:'auto',
        // marginLeft:'auto'
        // borderColor:'red',
        // borderWidth:1
      },
    header:{
        // display: "flex",
        // boxSizing: 'border',
        height:120,
        width:'100%',
        // position: 're',
        // left: '-21.6%',
        // right: '-21.87%',
        // top: '-7.64%',
        // bottom: '83.99%',
        background: '#F5EADC',
        backgroundColor:'#F5EADC',
        // borderBottomRightRadius: 381,
        // borderBottomLeftRadius: 382
        transform : [ { scaleX : 1.5 } ],
        borderBottomStartRadius : 230,
        borderBottomEndRadius : 200,
    },
    Group737: {
        // display: "flex",
        // flexDirection: "row",
        position: "absolute",
        top: 60,
        left:80,
        // none: "0px",
        width: 22,
        height: 23,
        // padding:2,
        // borderWidth:1,
        // borderColor:'green'
        
      },
      brandtype:{
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10
      },
      brand:{
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        width: '100%',
        // height:30,
        borderWidth:1,
        borderColor:'red',
        alignItems: 'center',
        justifyContent: 'center',
      },
      brandList:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        // borderWidth:1,
        // borderColor:'green',
        padding:20
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // display: "flex",
        // flexDirection: "row",
      },
      brandround:{
        borderColor:'#F48233',
        backgroundColor: '#F5EADC',
        borderWidth:1,
        borderRadius:80,
        width:146,
        height:146
      },
      selectbrand:{
          width:146, 
          margin:9,
          height:155, 
          padding:5,
        //   borderWidth:1,
        //   borderColor:'#F48233',
        // marginLeft:'auto',
        // marginRight:'auto'
        // alignItems: 'center',
        // justifyContent: 'center',
        },
      brandName: {
          color: '#000000',
          opacity: 0.6, 
          fontSize:22, 
          fontWeight:'600',
          alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
        width:'100%',
        left:'33.51%',
        right:'33.51%',
        },
      bkking: {
        // display: "flex",
        // flexDirection: "row",
        // position: "absolute",
        // top: 60,
        // left:'44.51%',
        // right:'44.51%',
        // none: "0px",
        width: 71.07,
        height: 72.28,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'auto',
        marginBottom:'auto',
        // padding:2,
        // borderWidth:1,
        // borderColor:'green'
        
      },
      Group66684: {
        width: 25,
        height: 25,
        marginRight: 117,
      },
})
export default SelectBrand;