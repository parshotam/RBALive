import React, {useEffect} from 'react';
import {Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Image, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logobk from '../../assets/Burger-King.png';
import user_img from '../../assets/img/user_img.png';
import profile from '../../assets/profile.png';


import down_icon from '../../assets/img/down_icon.png';
import delivery_icon from '../../assets/img/delivery_icon.png';
import inventery_icon from '../../assets/img/inventery_icon.png';
import maps_icon from '../../assets/img/maps_icon.png';
import person_icon from '../../assets/img/person_icon.png';
import right_icon from '../../assets/img/right_icon.png';
import sales_icon from '../../assets/img/sales_icon.png';
import settings from '../../assets/img/settings.png';
import sync_history from '../../assets/img/sync_history.png';
import sign_out from '../../assets/img/sign_out.png';

const drawerContent = (open, setOpen, navigation) => {
const [userdetails, setUserdetails] = React.useState({access_token:'', data:{},business_type:[]});
  const [username, setUsername] = React.useState('');
  const [businesstype, setBusinesstype] = React.useState({});
  const logOutuser = async () => {
    try {
        setOpen(false);
        console.log('navigation loginn')
          await AsyncStorage.removeItem('useremail').then(() => {
             AsyncStorage.removeItem('usertoken').then(() => {
                navigation.navigate('login') 
             })

             
              // props.navigation.navigate('same page name refresh ');   
             /* setprevCar({ carNumner: '', carModel: '' }) return  empty obj if deleted. */
          })


      }
      catch (exception) {
          return false;
      }

  
    
  }
  const toggleOpen = () => {
    console.log('toggleOpen = ')
    setOpen(!open);
  };
  const selectBrand = () => {
    setOpen(!open);
    navigation.navigate('selectbrand');
  };
  
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user')
          const userdata = JSON.parse(jsonValue);
          console.log('userdata = ',userdata)
          setUserdetails(userdata)
          setUsername(userdata.data.first_name + ' '+userdata.data.last_name)
          const businessValue = await AsyncStorage.getItem('businesstype')
          const business = JSON.parse(businessValue);
          console.log('business = ',business)
          setBusinesstype(business)
          // if(jsonValue){
          //   const name = jsonValue.split('@')[0]
          //   setUsername(name)
          // }
          
          return jsonValue != null ? jsonValue : null;
        } catch(e) {
          console.log(e)
          console.log("There was an error")
        }
      }
    useEffect(() => {
        getData();
        // const businessValu = await AsyncStorage.getItem('businesstype')
        // const busines = JSON.parse(await AsyncStorage.getItem('businesstype'));
        // setBusinesstype(busines)
    },[navigation]);
    return (
      <TouchableOpacity onPress={toggleOpen} style={styles.animatedBox}>
        <View style={styles.Home}>
      <View style={styles.Group66716}>
        <Image
          style={styles.Fill6}
          source={down_icon}
        />
      </View>
      
      <View style={styles.Group66738}>
        <Image
          style={styles.Rectangle113}
          source={profile}
        />
        <Text style={styles.Txt695}>{username}</Text>
        <Text style={styles.Txt183}>{userdetails.data.email}</Text>
        <View style={styles.Line33} />
        <TouchableOpacity  onPress={selectBrand}>
        <View style={styles.Group348}>
          <Image
            style={styles.Group66728}
            source={logobk}
          />
          <View style={styles.Group66727} >
            <Text style={styles.Txt451}>BURGER KING</Text>
            <Text style={styles.Txt837}>{businesstype.name}</Text>
          </View>
          <Image
            style={styles.Fill7}
            source={right_icon}
          />
        </View>
        </TouchableOpacity>
        <View style={styles.Line34} />
        <View style={styles.linklist}>
        <View style={styles.Group66736}>
          <Image
            style={styles.Sales}
            source={sales_icon}
          />
          <Text style={styles.Txt352}>Sales</Text>
        </View>
        <View style={styles.Group66736}>
          <Image
            style={styles.Sales}
            source={person_icon}
          />
          <Text style={styles.Txt352}>Labour</Text>
        </View>
        <View style={styles.Group66736}>
          <Image
            style={styles.Sales}
            source={delivery_icon}
          />
          <Text style={styles.Txt352}>Delivery</Text>
        </View>
        <View style={styles.Group66736}>
          <Image
            style={styles.Sales}
            source={maps_icon}
          />
          <Text style={styles.Txt352}>Map</Text>
        </View>
        <View style={styles.Group66736}>
          <Image
            style={styles.Sales}
            source={inventery_icon}
          />
          <Text style={styles.Txt352}>Inventory</Text>
        </View>
        <View style={styles.Group66736}>
          <Image
            style={styles.Sales}
            source={sync_history}
          />
          <Text style={styles.Txt352}>Sync History</Text>
        </View>
        <View style={styles.Group66736}>
          <Image
            style={styles.BlackSettingsButton}
            source={settings}
          />
          <Text style={styles.Txt352}>Settings</Text>
        </View>
        <View style={styles.Group66730}>
          <Image
            style={styles.Sales}
            source={sign_out}
          />
          <Text onPress={() => logOutuser()} style={styles.Txt352}>Sign out</Text>
        </View>
        </View>
        <Text style={styles.Txt1016}>APP VERSION: 1.0.0 </Text>
      </View>
    </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  // Extra content
  animatedBox: {
    flex: 1,
    // backgroundColor: "#fff",
    shadowColor: "#f6f7f8",
    // borderRightColor:'#f6f7f8',
    // borderRightWidth:2,
    // padding: 10
  },
  Home: {
    // opacity: 0.1,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // position: "relative",
    // borderRadius: 30,
    // backgroundColor: "rgba(252,252,252,1)",
    // width: 375,
    // height: 812,
  },
  Group983: {
    position: "absolute",
    top: 62,
    none: "0px",
    borderRadius: 269,
    backgroundColor: "rgba(245,234,220,1)",
    width: 538,
    height: 192,
  },
  Statusbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    top: "32.29%",
    bottom: "44.79%",
    left: "15.06%",
    right: "15.24%",
    paddingTop: 13,
    paddingBottom: 11,
    paddingLeft: 19,
    paddingRight: 13,
    width: 375,
    height: 44,
  },
  Action: {
    marginRight: 220,
    width: 54,
    height: 18,
  },
  Txt202: {
    fontSize: 15,
    //  // fontFamily: "SF Pro Text, sans-serif",
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: -0.2,
    color: "rgba(18,18,18,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 55,
  },
  
  Container: {
    width: 67,
    height: 11.5,
  },
  
  Group737: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 121,
    none: "0px",
    width: 179,
    height: 42,
  },
  Group66684: {
    width: 21,
    height: 21,
    marginRight: 117,
  },
  Group65818: {
    width: 41.07,
    height: 41.82,
  },
  
  Txt142: {
    position: "absolute",
    top: "17.98%",
    bottom: "79.68%",
    left: "7.73%",
    right: "58.67%",
    fontSize: 14,
    //  // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 126,
    height: 19,
  },
  Group66716: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 142,
    left: 252,
    paddingTop: 6,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 9,
    borderRadius: 4,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(26,26,26,1)",
    width: 64,
    height: 27,
  },
  Txt736: {
    fontSize: 12,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: 13,
  },
  Fill6: {
    width: 9,
    height: 5,
  },
  
  Txt656: {
    position: "absolute",
    top: "22.78%",
    bottom: "74.88%",
    left: "7.73%",
    right: "76%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 61,
    height: 19,
    opacity: 0.5,
  },
  Txt1088: {
    position: "absolute",
    top: "33.5%",
    bottom: "63.42%",
    left: "7.47%",
    right: "51.2%",
    fontSize: 18,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 155,
    height: 25,
  },
  Txt702: {
    position: "absolute",
    top: "25.12%",
    bottom: "70.69%",
    left: "7.73%",
    right: "62.67%",
    fontSize: 25,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "500",
    color: "rgba(26,26,26,1)",
    width: 111,
    height: 34,
  },
  Group66685: {
    position: "absolute",
    top: 215,
    left: 143,
    paddingTop: 7,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 7,
    backgroundColor: "rgba(26,26,26,1)",
    width: 26,
    height: 14,
  },
  Txt438: {
    fontSize: 7.47,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  Group66687: {
    position: "absolute",
    top: 240,
    left: 29,
    paddingTop: 4,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 5,
    borderRadius: 8.5,
    backgroundColor: "rgba(64,200,0,1)",
    width: 46,
    height: 17,
  },
  Group66686: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  Group66642: {
    width: 9.32,
    height: 6,
    marginRight: 1,
  },
  Txt886: {
    fontSize: 7.47,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(64,200,0,1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  Vector2: {
    position: "absolute",
    top: "24.63%",
    bottom: "70.2%",
    left: "63.73%",
    right: "8.93%",
    width: 102.5,
    height: 42,
  },
  Group978: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 145,
    none: "0px",
    width: 23,
    height: 149,
  },
  IconlyBoldCalendar: {
    width: 18,
    height: 20,
    marginBottom: 110,
  },
  IconlyLightArrowRightSquare: {
    width: 18.5,
    height: 18.5,
  },
  
  IconlyLightArrowLeftSquare: {
    position: "absolute",
    top: 275,
    left: 299,
    width: 18.5,
    height: 18.5,
    opacity: 0.5,
  },
  Group331: {
    position: "absolute",
    top: 312,
    none: "0px",
    borderRadius: 20,
    backgroundColor: "rgba(85,110,190,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 151,
    height: 162,
  },
  Vector4: {
    position: "absolute",
    top: "8.64%",
    bottom: "42.9%",
    left: "10.6%",
    right: "21.85%",
    width: 102,
    height: 78.5,
  },
  Group246: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 14,
    none: "0px",
    width: 108,
    height: 135,
  },
  Vector3: {
    width: 102,
    height: 68,
  },
  Txt1087: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(85,110,190,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginBottom: 58,
  },
  Group414: {
    display: "flex",
    flexDirection: "row",
  },
  Txt718: {
    fontSize: 18,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: 1,
  },
  Group66688: {
    paddingTop: 7,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 7,
    backgroundColor: "rgba(26,26,26,1)",
    width: 26,
    height: 14,
  },
  Txt438: {
    fontSize: 7.47,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  Txt624: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    opacity: 0.7,
  },
  
  Group271: {
    position: "absolute",
    top: 488,
    none: "0px",
    borderRadius: 20,
    backgroundColor: "rgba(250,156,94,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 151,
    height: 162,
  },
  Vector8: {
    position: "absolute",
    top: "18.52%",
    bottom: "42.59%",
    left: "11.26%",
    right: "18.87%",
    width: 105.5,
    height: 63,
  },
  Group121: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 25,
    none: "0px",
    width: 110,
    height: 124,
  },
  Txt268: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(250,156,94,1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  Vector7: {
    width: 105.5,
    height: 53,
    marginBottom: 20,
  },
  Group414: {
    display: "flex",
    flexDirection: "row",
  },
  Txt718: {
    fontSize: 18,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: 1,
  },
  Group66688: {
    paddingTop: 7,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 7,
    backgroundColor: "rgba(26,26,26,1)",
    width: 26,
    height: 14,
  },
  Txt438: {
    fontSize: 7.47,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  Txt624: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    opacity: 0.7,
  },
  
  Group378: {
    position: "absolute",
    top: 312,
    none: "0px",
    borderRadius: 20,
    backgroundColor: "rgba(129,96,139,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 152,
    height: 162,
  },
  Vector6: {
    position: "absolute",
    top: "19.75%",
    bottom: "42.9%",
    left: "9.21%",
    right: "14.8%",
    width: 115.5,
    height: 60.5,
  },
  Group423: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 25,
    none: "0px",
    width: 116,
    height: 124,
  },
  Txt235: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(129,96,139,1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  Vector5: {
    width: 115.5,
    height: 52,
    marginBottom: 19,
  },
  Group414: {
    display: "flex",
    flexDirection: "row",
  },
  Txt718: {
    fontSize: 18,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: 1,
  },
  Group66688: {
    paddingTop: 7,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 7,
    backgroundColor: "rgba(26,26,26,1)",
    width: 26,
    height: 14,
  },
  Txt438: {
    fontSize: 7.47,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  Txt624: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    opacity: 0.7,
  },
  
  Group525: {
    position: "absolute",
    top: 488,
    none: "0px",
    borderRadius: 20,
    backgroundColor: "rgba(231,119,109,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 152,
    height: 162,
  },
  Vector10: {
    position: "absolute",
    top: "35.19%",
    bottom: "39.81%",
    left: "12.5%",
    right: "16.78%",
    width: 107.5,
    height: 40.5,
  },
  Group3103: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 25,
    none: "0px",
    width: 114,
    height: 124,
  },
  Txt659: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(231,119,109,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  Vector9: {
    width: 107.5,
    height: 31,
    marginBottom: 15,
  },
  Group414: {
    display: "flex",
    flexDirection: "row",
  },
  Txt718: {
    fontSize: 18,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: 1,
  },
  Group66688: {
    paddingTop: 7,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 3,
    borderRadius: 7,
    backgroundColor: "rgba(26,26,26,1)",
    width: 26,
    height: 14,
  },
  Txt438: {
    fontSize: 7.47,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  
  Txt624: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    opacity: 0.7,
  },
  
  Group141: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    position: "absolute",
    top: 665,
    none: "0px",
    paddingTop: 9,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 317,
    height: 37,
  },
  Txt672: {
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(244,130,51,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: 212,
  },
  Fill7: {
    
    width: 6.31,
    height: 12,
    marginBottom:10,
    marginRight:15
  },
  
  Group66692: {
    position: "absolute",
    top: 794,
    left: 155,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 192,
    height: 40,
  },
  
  Group66694: {
    position: "absolute",
    top: 750,
    left: 155,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 192,
    height: 40,
  },
  
  Group66696: {
    position: "absolute",
    top: 706,
    left: 155,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 192,
    height: 40,
  },
  
  Group66693: {
    position: "absolute",
    top: 794,
    left: 30,
    borderRadius: 8,
    backgroundColor: "rgba(245,245,245,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 121,
    height: 40,
  },
  
  Group66695: {
    position: "absolute",
    top: 750,
    left: 30,
    borderRadius: 8,
    backgroundColor: "rgba(245,245,245,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 121,
    height: 40,
  },
  
  Group66697: {
    position: "absolute",
    top: 706,
    left: 30,
    borderRadius: 8,
    backgroundColor: "rgba(245,245,245,1)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(178,178,178,1)",
    width: 121,
    height: 40,
  },
  
  Txt269: {
    position: "absolute",
    top: "88.3%",
    bottom: "9.36%",
    left: "12.27%",
    right: "71.47%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 61,
    height: 19,
  },
  Txt502: {
    position: "absolute",
    top: "88.3%",
    bottom: "9.36%",
    left: "44.8%",
    right: "34.4%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 78,
    height: 19,
  },
  Txt249: {
    position: "absolute",
    top: "93.72%",
    bottom: "3.94%",
    left: "44.8%",
    right: "38.93%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 61,
    height: 19,
  },
  Txt259: {
    position: "absolute",
    top: "99.14%",
    bottom: "-1.48%",
    left: "44.8%",
    right: "45.33%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 37,
    height: 19,
  },
  Txt622: {
    position: "absolute",
    top: "93.72%",
    bottom: "3.94%",
    left: "12.27%",
    right: "79.73%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 30,
    height: 19,
  },
  Txt520: {
    position: "absolute",
    top: "99.14%",
    bottom: "-1.48%",
    left: "12.27%",
    right: "74.4%",
    fontSize: 14,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 50,
    height: 19,
  },
  linklist:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  
  },
  Group66738: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 64,
    paddingBottom: 24,
    paddingLeft: 28,
    paddingRight: 24,
    backgroundColor: "rgba(214,214,214,0.2)",
    backdropFilter: "blur(40px)",
    shadowColor: "rgba(0,0,0,0.15)",
    elevation: 1,
    shadowOffset: { width: 4, height: 0 },
    width: 290,
    height: 812,
  },
  Rectangle113: {
    width: 69,
    height: 69,
    marginBottom: 7,
  },
  Txt695: {
    fontSize: 18,
    textTransform: 'capitalize',
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(46,45,45,1)",
    marginBottom: 2,
  },
  Txt183: {
    fontSize: 12,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(140,140,140,1)",
    marginBottom: 14,
  },
  Line33: {
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 258,
    height: 0.5,
    opacity: 0.5,
    marginBottom: 14,
  },
  Group348: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 14,
  },
  Group66728: {
    width: 45.71,
    height: 46.55,
    marginRight: 14,
  },
  Group66727: {
    position: "relative",
    marginRight: 94,
    width: 97,
    height: 34.01,
  },
  Txt451: {
    position: "absolute",
    top: "0%",
    bottom: "44.13%",
    left: "0%",
    right: "0%",
    fontSize: 14.15,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "700",
    color: "rgba(0,0,0,1)",
    width: 117,
    height: 19,
  },
  Txt837: {
    position: "absolute",
    top: "52.93%",
    bottom: "0.02%",
    left: "0%",
    right: "29.9%",
    fontSize: 11.58,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
    width: 118,
    height: 16,
  },
  
  Line34: {
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 258,
    height: 0.5,
    opacity: 0.5,
    marginBottom: 33,
  },
  Group66736: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    left:0,
    alignItems: "flex-start",
  },
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  // Group66736: {
  //   display: "flex",
  //   flexDirection: "row",
  //   marginBottom: 20,
  // },
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  BlackSettingsButton: {
    width: 19,
    height: 19,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  Group66730: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 146,
  },
  Sales: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  Txt352: {
    fontSize: 16,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(0,0,0,1)",
  },
  
  Txt1016: {
    fontSize: 12,
     // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    letterSpacing: 1.2,
    color: "rgba(46,45,45,1)",
    opacity: 0.5,
  },
  
  
  });
  export default drawerContent;