import React, {useEffect} from 'react';
import {Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import {TextInput} from 'react-native-paper';
import {Appbar, Card, Avatar} from 'react-native-paper';
import { Drawer } from 'react-native-paper';

// import { DatePickerModal } from 'react-native-paper-dates';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DayScreen from './DayScreen.js';
import CustomTabBar from '../components/CustomTabBar.js';
import {Image, View} from 'react-native';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MenuDrawer from 'react-native-side-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import logobk from '../../assets/Burger-King.png';
import user_img from '../../assets/img/user_img.png';
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


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  appBar: {
    // color: "#fff",
    backgroundColor: '#fff',
  },
  animatedBox: {
    flex: 1,
    // backgroundColor: "#fff",
    shadowColor: "#f6f7f8",
    // borderRightColor:'#f6f7f8',
    // borderRightWidth:2,
    // padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  clrW: {
    color: '#fff',
  },
  container: {
    //  paddingTop: 25, //ios only
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    width: '60%',
    margin: 'auto',
  },
  txtcontent: {
    borderColor: 'red',
    borderBottomWidth: 1,
    padding: 20,
    fontWeight: '400',
    fontSize: 21,
    width: '100%',
  },
  cardrow: {
    width: '100%',
  },
  userInfoSection:{
    paddingTop: 27,
    paddingBottom:20
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    margin: 'auto',
    // minHeight: 100,
    // height: "100%",
    // maxHeight: 1200,
    // maxHeight: 500,
    // marginTop:20,
    // marginBottom:30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardTable: {
    backgroundColor: '#fff',
    width: '90%',
    margin: 'auto',
    // height: 110,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    // borderRadius: 20
  },
  columnC: {
    width: '5%',
    padding: 8,
    paddingLeft: 10,
    // paddingTop:10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '800',
    // borderRightWidth:1,
    // borderRightColor: '#fff'
  },
  column: {
    width: '24%',
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '800',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    paddingTop: 14,
  },
  columnD: {
    width: '18%',
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '800',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    paddingTop: 14,
  },
  columnL: {
    width: '24%',
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '800',
    // borderRightWidth:1,
    // borderRightColor: '#fff',
    paddingTop: 14,
  },

  image: {
    width: 300,
    margin: 'auto',
    //   marginTop: 100
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: '#f5a04c',
    color: '#ffffff',
  },
  input: {
    width: '97%',
    margin: 5,
    //  height: 40,
    //  borderColor: '#7a42f4',
    //  borderWidth: 1
  },
  tableHeader: {
    backgroundColor: '#efeff5',
    textAlign: 'center',
  },
  tableRightBorder: {
    borderRightWidth: 1,

    backgroundColor: '#f5a04c',
    color: '#ffffff',
    borderRightColor: '#cfcece',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    // alignItems:  'stretch'
  },
  tableRow: {
    paddingLeft: 0,
  },
  tableColumn: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tableColumnF: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  calendar: {
    // position:'relative',
    // marginTop:4,
    height: 17,
    width: 21,
    alignSelf: 'center',
    alignItem: 'center',
    // padding:0
  },
  clrL: {
    color: '#fff',
  },
  
  submitButtonText: {
    color: 'white',
  },
  txtDay: {
    position: 'relative',
    bottom: 4,
  },
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: 'orange',
      height: 3,
    },
    '& .MuiTab-root.Mui-selected': {
      color: 'red',
    },
  },


// Extra content

Home: {
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
  width: 11.31,
  height: 6.6,
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
  width: 97,
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
  width: 68,
  height: 16,
},

Fill7: {
  width: 11.31,
  height: 6.6,
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
var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var digitmonth = new Date().getMonth() +1; //Current Month

if (digitmonth < 10) {
  digitmonth = '0' + digitmonth.toString();
}
if (date < 10) {
  date = '0' + date.toString();
}
var year = new Date().getFullYear();

const new_dt = date + ' ' + months[month] + ' ' + year;
const current_dt = year + '-' + digitmonth + '-' + date;

function MonthScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No data for month!</Text>
    </View>
  );
}
function YearsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No data for month!</Text>
    </View>
  );
}
function DrawerContent() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
          
          </View>
        
    </View>
  );
}
const Home = ({navigation}) => {
  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [userdetails, setUserdetails] = React.useState([]);
  const [username, setUsername] = React.useState([]);
  const [resultdata, setResultdata] = React.useState([]);
  const [dte, setDte] = React.useState(new_dt);
  const [confirmdate, setConfirmdate] = React.useState(current_dt);
  const [enddte, setEnddte] = React.useState('');
  const [tabtype, setTabtype] = React.useState('Day');
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState('home');
  
  const [isloading, setIsloading] = React.useState(false);
  const [route, setRoute] = React.useState('Day');

  //    const goToAbout = () => {
  //       Actions.about()
  //    }

  
  const logOutuser = async () => {
    try {
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
  // const onDismissSingle = React.useCallback(() => {
  //   setOpen(false);
  // }, [setOpen]);

  const startOfWeek = () => {
    const curdate = new Date(dte);
    
    var week_day = curdate.getDay();
    if(week_day==0){
      week_day=6
    }else{
      week_day = week_day - 1
    }
    var lastday = curdate.getDate() - week_day;
    
    let startWeekDate = new Date(curdate.setDate(lastday));
    var wdate = startWeekDate.getDate(); //Current Date
    
    var wmonth = startWeekDate.getMonth(); //Current Month
    // if (wmonth < 10) {
    //   wmonth = '0' + wmonth.toString();
    // }
    if (wdate < 10) {
      wdate = '0' + wdate.toString();
    }
    var year = startWeekDate.getFullYear();

    const week_dt = wdate + ' ' + months[wmonth] + ' ' + year;
    return week_dt;

  }

  const startOfMonth = () => {
    console.log('month confirmdate = ', confirmdate)
    console.log('month dte = ',dte)
    const curdate = new Date(dte);
    var wdate = '1' //Current Date
    
    var wmonth = curdate.getMonth(); //Current Month
    if (wdate < 10) {
      wdate = '0' + wdate.toString();
    }
    var year = curdate.getFullYear();
    const month_dt = wdate + ' ' + months[wmonth] + ' ' + year;
    return month_dt;
  }

  const startOfYear = () => {
    const curdate = new Date(dte);
    var wdate = '1' //Current Date
    var wmonth = 0;//curdate.getMonth(); //Current Month
    if (wdate < 10) {
      wdate = '0' + wdate.toString();
    }
    var year = curdate.getFullYear();
    const month_dt = wdate + ' ' + months[wmonth] + ' ' + year;
    return month_dt;
  }

  // const getWeekDate = () => {
  //   let today = new Date();
  //   today.setDate(today.getDate() - 7);
  //   var wdate = today.getDate(); //Current Date
  //   var wmonth = today.getMonth() + 1; //Current Month
  //   if (wmonth < 10) {
  //     wmonth = '0' + wmonth.toString();
  //   }
  //   if (wdate < 10) {
  //     wdate = '0' + wdate.toString();
  //   }
  //   var year = today.getFullYear();

  //   const week_dt = wdate + '-' + wmonth + '-' + year;
  //   return week_dt;
  // };
  const setActiveTab = (type) => {
    setTabtype(type);
    if (type == 'Day') {
      setEnddte(' - ');
    }
    if (type == 'Week') {
      const week_end_date = startOfWeek();
      setEnddte( week_end_date + ' - ');
    }
    if (type == 'Month') {
      const week_end_date = startOfMonth();
      setEnddte( week_end_date + ' - ');
    }
    if (type == 'Year'){
      const week_end_date = startOfYear();
      setEnddte( week_end_date + ' - ');
    }
  };

  const drawerContent = () => {
    return (
      <TouchableOpacity onPress={toggleOpen} style={styles.animatedBox}>
        <View style={styles.Home}>
      <View style={styles.Group66716}>
        {/* <Text style={styles.Txt736}>Day</Text> */}
        <Image
          style={styles.Fill6}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3326?alt=media&token=01135525-a767-4553-b649-38014bd19227",
          }}
        />
      </View>
      
      <View style={styles.Group66738}>
        <Image
          style={styles.Rectangle113}
          source={user_img}
        />
        <Text style={styles.Txt695}>{username}</Text>
        <Text style={styles.Txt183}>{userdetails}</Text>
        <View style={styles.Line33} />
        <View style={styles.Group348}>
          <Image
            style={styles.Group66728}
            source={logobk}
          />
          <View style={styles.Group66727}>
            <Text style={styles.Txt451}>BURGER KING</Text>
            <Text style={styles.Txt837}>India Limited</Text>
          </View>
          <Image
            style={styles.Fill7}
            source={right_icon}
          />
        </View>
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

  const toggleOpen = () => {
    console.log('toggleOpen = ')
    setOpen(!open)
  };

  const onConfirmSingle = (date) => {
    const ndate = date.getDate();
    let nmonth = date.getMonth() + 1; //Current Month
    if (nmonth < 10) {
      nmonth = '0' + nmonth.toString();
    }
    const nyear = date.getFullYear();
    const ndt = nyear + '-' + nmonth + '-' + ndate;

    setOpen(false);
    setDte(ndt);
    // getDateData(ndt);
    // setRange({ startDate, endDate });
  };
  // [setOpen, setRange]
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('useremail')
      console.log('jsonValue = ',jsonValue)
      setUserdetails(jsonValue)
      if(jsonValue){
        const name = jsonValue.split('@')[0]
        setUsername(name)
      }
      
      return jsonValue != null ? jsonValue : null;
    } catch(e) {
      console.log(e)
      console.log("There was an error")
    }
  }
  useEffect(() => {
    getData();
    // .then(user => {
    //   if(user){
    //     const username = user.split('@')[0]
    //     setUserdetails(username)
    //   }else{

    //   }
      
      
    // })

    // const useremail = getData()
    // console.log('home == ', useremail)
    // setUserdetails(useremail)
    // document.addEventListener('click', setOpen(false));

  //   // console.log("call function")
  //   // setDte(dt)
  //   getDateData(dte)
  },[])
  return (
    <View style={styles.container}>
      <MenuDrawer
          open={open}
          position={'left'}
          drawerContent={drawerContent()}
          drawerPercentage={75}
          animationTime={250}
          overlay={true}
          opacity={0.2}
        >
      
      <StatusBar
        barStyle="dark-content"
        style={{height: 70}}
        animated={true}
        backgroundColor="#f5a04c"
        onPress={() => setOpen(false)}
      />
      {/* <View style={styles.container}> */}
      <Appbar color="white" style={styles.appBar} onPress={() => setOpen(false)}>
        <Appbar.Action
          style={styles.appBar}
          icon="menu"
          // color="#f5a04c"
          onPress={() => setOpen(true)}
        />
        <Image source={logobk} style={{width: 40, height: 30}} />
        <Appbar.Content
          style={{
            fontSize: 8,
            fontWeight: '80',
            position: 'absolute',
            top: 20,
            right: 80,
          }}
          title={
            <Text
              style={{
                fontSize: 13,
                position: 'relative',
                top: 0,
                right: 20,
                fontWeight: '100',
                textAlign: 'right',
              }}
            >
              {tabtype == 'Day' ? dte : (tabtype == 'Week' || tabtype == 'Month' || tabtype == 'Year') ? enddte + dte : dte}
            </Text>
          }
          subtitle={''}
        />
        {/* <Appbar.Action icon="calendar" onPress={() => setOpen(true)} color="#f5a04c" /> */}
        <Appbar.Action
          style={{position: 'absolute', top: 5, right: 0}}
          icon="home"
          onPress={() => setOpen(false)}
        />
        {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
      </Appbar>
      
      {/* <Text style={{position:'relative', right:15, top:22, textAlign:'right', marginBottom:8, marginRight:5}}>{dte}</Text> */}
      
      <Card style={styles.card} >
        
        <Tab.Navigator
          swipeEnabled={false}
          onPress={() => setOpen(false)}
          tabBar={props => (
            <CustomTabBar {...props} setActiveTab={setActiveTab} />
          )}
          onChangeIndex={(newIndex) => {console.log('newIndex = ',newIndex)}}
          //   style={{ textTransform: 'lowercase'}}
          //   upperCaseLabel={false}
          //   activeColor={'#F5CB44'}
          //             inactiveColor={'#F4F4F4'}
          //   screenOptions={{
          //     activeTintColor: '#F4F4F4',
          //     inactiveColor:'#F4F4F4',
          //   tabBarActiveTintColor: '#fff',
          //   tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize', },
          //   pressColor: '#fff',
          //   upperCaseLabel:false,
          //   // tabBarItemStyle: { width: 100 },
          //   tabBarStyle: { backgroundColor: '#fff', activeColor:'red', textTransform: 'lowercase', },
          //   // tabBarIndicatorContainerStyle: { backgroundColor: 'red' },
          //   tabBarIndicatorStyle:{ backgroundColor: 'white',   },
          // }}
        >
          <Tab.Screen
            style={{textTransform: 'lowercase'}}
            name="Day"
            onPress={() => setOpen(false)}
            // component={DayScreen}
            children={() => {
              return (
                <>
                {tabtype == 'Day' && (
                <DayScreen
                  navigation={navigation}
                  setEnddte={setEnddte}
                  selectedDate={setDte}
                  confirmdate={confirmdate}
                  setConfirmdate={setConfirmdate}
                  closeMenu={() => setOpen(false)}
                  type="day"
                  setActiveTab={setActiveTab}
                />)}
                </>
              );
            }}
          />
          <Tab.Screen
            name="Week"
            children={() => {
              
              return (
                <>
                {tabtype == 'Week' && (
                <DayScreen
                  navigation={navigation}
                  setEnddte={setEnddte}
                  selectedDate={setDte}
                  confirmdate={confirmdate}
                  setConfirmdate={setConfirmdate}
                  closeMenu={() => setOpen(false)}
                  type="week"
                  setActiveTab={setActiveTab}
                />)}
                </>
              );
            }}
          />
          <Tab.Screen name="Month" disabled={true} 
          // component={MonthScreen} 
          children={() => {
            return (
              <>
              {tabtype == 'Month' && (
              <DayScreen
                navigation={navigation}
                setEnddte={setEnddte}
                selectedDate={setDte}
                confirmdate={confirmdate}
                setConfirmdate={setConfirmdate}
                closeMenu={() => setOpen(false)}
                type="month"
                setActiveTab={setActiveTab}
              />
              )}
              </>
            );
          }}
          />
          <Tab.Screen name="Year" disabled={true} 
          // component={YearsScreen} 
          children={() => {
            return (
              <>
              {tabtype == 'Year' && (
              <DayScreen
                navigation={navigation}
                setEnddte={setEnddte}
                selectedDate={setDte}
                confirmdate={confirmdate}
                setConfirmdate={setConfirmdate}
                closeMenu={() => setOpen(false)}
                type="year"
                setActiveTab={setActiveTab}
              />)}
              </>
            );
          }}
          />
        </Tab.Navigator>
      </Card>
      {/* <ScrollView style={styles.card}> */}

      {/* <View  style={styles.card}> */}

      {/* <Text style={{textAlign:'right', marginBottom:8, marginRight:5}}>{dte}</Text>     */}

      {/* </View> */}

      {/* <Button onPress={() => setOpen(true)} style={{width:'100%',height:40, marginTop:50}} uppercase={false} mode="outlined">
        Pick single date
      </Button> */}

      {/* <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      /> */}

      {/* </ScrollView> */}
      {/* </View> */}
      </MenuDrawer>
    </View>
  );
};
export default Home;
