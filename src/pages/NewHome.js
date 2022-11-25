import React, { useEffect, useRef } from "react"
import { StyleSheet, Platform, Image, Text, View, Picker,StatusBar, ImageBackground } from "react-native"

import { TextInput } from 'react-native-paper';
import {ScrollView, TouchableOpacity, BackHandler} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropdownMenu from 'react-native-dropdown-menu';
import bugerGif from '../../assets/burgerloader.gif';
import { Button } from 'react-native-paper';
import bkking from '../../assets/Burger-King.png';
import menu from '../../assets/img/menu_new.png';
import testheader from '../../assets/img/testheader.png';
import DrawerContent from '../components/DrawerContent.js';
import config from '../../config'
import AsyncStorage from '@react-native-community/async-storage';
import {Card} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import {IconButton, Colors} from 'react-native-paper';
import MenuDrawer from 'react-native-side-drawer'
import down_icon from '../../assets/img/down_icon.png';
import calendar from '../../assets/img/calendar.png';
import vector_line from '../../assets/img/vector_line.png';
import Vector_line_down from '../../assets/img/Vector_line_down.png';

import vector_up from '../../assets/img/vector_up.png';
import vector_down from '../../assets/img/vector_down.png';
import { getRelativeCoords } from "react-native-reanimated";
import { useFocusEffect } from '@react-navigation/native';



var datatype = [['Day','Week', 'Month', 'Quarterly', 'Year']]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
let hours = (new Date().getHours() < 10 ? '0' : '') + new Date().getHours();
let minutes = (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();


const new_dt = date + ' ' + months[month] + ' ' + year //+', '+hours+':'+minutes;
const current_dt = year + '-' + digitmonth + '-' + date;

const NewHome = ({route, navigation}) => {
  // console.log('route.params = ',route.params)
  const childRef = useRef();
  
  const  btype  = route.params ? route.params.btype :'';
  const [email, setEmail] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [displaydt, setDisplaydt] = React.useState(new_dt);
  
  
  const [selectedtype, setSelectedtype] = React.useState('Day');
  const [resultdata, setResultdata] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [opencalendar, setOpencalendar] = React.useState(false);
  const [regionType, setRegionType] = React.useState('Full');
  const [drawer, setDrawer] = React.useState('');
  const [confirmdate, setConfirmdate] = React.useState(current_dt);
  const [type, setType] = React.useState('day');
  // const [open, setOpen] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [spin, setSpin] = React.useState(true);
  const [isopendropdown, setIsopendropdown] = React.useState(null);
  const [numberitem, setNumberitem] = React.useState(3);
  const [iscollaps, setIscollaps] = React.useState(true);
  const [iscollaps1, setIscollaps1] = React.useState(true);
  const [iscollaps2, setIscollaps2] = React.useState(true);
  const [iscollaps3, setIscollaps3] = React.useState(true);
  const [businesstype, setBusinesstype] = React.useState({});
  const [isregion, setIsregion] = React.useState(false);
  const [expandedRows, setExpandedRows] = React.useState([]);
  const [expandState, setExpandState] = React.useState({});

  const handleEpandRow = (event, userId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(userId);

    let obj = {};
    isRowExpanded ? (obj[userId] = false) :  (obj[userId] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded ?
          currentExpandedRows.filter(id => id !== userId) :
          currentExpandedRows.concat(userId);

    setExpandedRows(newExpandedRows);
  }

  const setcollapsVal = (index, item) => {
    const tmpdata = resultdata;
    setResultdata([]);
    item.open = !item.open;
    console.log("tmpdata[index] = ",tmpdata[index].open)
    // tmpdata[index] = 
    setResultdata(tmpdata);
    console.log('resultdata 1= ',resultdata[index].open)
      // if (index == 0) {
      //   setIscollaps(!iscollaps);
      // }
      // if (index == 1) {
      //   setIscollaps1(!iscollaps1);
      // }
      // if (index == 2) {
      //   setIscollaps2(!iscollaps2);
      // }
      // if (index == 3) {
      //   setIscollaps3(!iscollaps3);
      // }
    };

    const startOfWeek = (curdate) =>
  {
    
    var week_day = curdate.getDay();
    if(week_day==0){
      week_day=6
    }else{
      week_day = week_day - 1
    }
    var lastday = curdate.getDate() - week_day;
    // var lastday = curdate.getDate() - (curdate.getDay() - 1);
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

  const startOfMonth = (curdate) => {
    var lastday = curdate.getDate() - (curdate.getDay() - 1);
    let startWeekDate = new Date(curdate.setDate(lastday));
    var wdate = '1'//startWeekDate.getDate(); //Current Date
    var wmonth = startWeekDate.getMonth(); //Current Month
    // if (wmonth < 10) {
    //   wmonth = '0' + wmonth.toString();
    // }
    if (wdate < 10) {
      wdate = '0' + wdate.toString();
    }
    var year = startWeekDate.getFullYear();
    
    const month_dt = wdate + ' ' + months[wmonth] + ' ' + year;
    return month_dt;
  }

  const startOfYear = (curdate) => {
    var lastday = curdate.getDate() - (curdate.getDay() - 1);
    let startWeekDate = new Date(curdate.setDate(lastday));
    var wdate = '1'//startWeekDate.getDate(); //Current Date
    var wmonth = 0 ;//startWeekDate.getMonth(); //Current Month
    // if (wmonth < 10) {
    //   wmonth = '0' + wmonth.toString();
    // }
    if (wdate < 10) {
      wdate = '0' + wdate.toString();
    }
    var year = startWeekDate.getFullYear();
    
    const month_dt = wdate + ' ' + months[wmonth] + ' ' + year;
    return month_dt;
  }

    const onConfirmSingle = (confirmdate) => {
      // setIsloading(true);
      let ndate = confirmdate.getDate();
      let nmonth = confirmdate.getMonth() + 1; //Current Month
      if (nmonth < 10) {
        nmonth = '0' + nmonth.toString();
      }
      if (ndate < 10) {
        ndate = '0' + ndate.toString();
      }
      const nyear = confirmdate.getFullYear();
      const ndt = nyear + '-' + nmonth + '-' + ndate;
      setOpencalendar(false);
      // setDte(ndt);
      getDateData(ndt, type, regionType);
      const selectedmonth = confirmdate.getMonth()
      const new_dtn = ndate + ' ' + months[selectedmonth] + ' ' + nyear;
      setDisplaydt(new_dtn);
      let weeklastdate = startOfWeek(confirmdate);
      if(type == 'month'){
        weeklastdate = startOfMonth(confirmdate);
      }
      if (type == 'year'){
        weeklastdate = startOfYear(confirmdate);
      }
      
      // setEnddte(weeklastdate + ' - ');
    };

    const onDismissSingle = React.useCallback(() => {
      setOpencalendar(false);
    }, [setOpencalendar]);

    const logOutuser = async () => {
      try {
          setOpen(false);
          console.log('navigation loginn')
            await AsyncStorage.removeItem('user').then(() => {
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

    const getRegionData = async (region) => {
      console.log('region = ',region)
      console.log('isregion = ',isregion)
      if((region!=='India' && region !== 'National' && isregion == false ) || region == 'Full'){
      // if(region=='North' || region == 'East' || region == 'South' || region == 'West' || region == 'Full'){
        setIsloading(true);
        setResultdata([]);
        setRegionType(region)
        getDateData(confirmdate, type, region);
        if(region == 'Full'){
          setIsregion(false);
        }else{
          setIsregion(true);
        } 
      }
    }
    
    const getDateData = async (newdate, ntype, rtype) => {
      console.log('newdate = ',newdate)
      setConfirmdate(newdate)
      const selbusinesstype = await AsyncStorage.getItem('businesstype');
      const nbusiness = JSON.parse(selbusinesstype)
      setBusinesstype(JSON.parse(selbusinesstype));
      const conf = await config();
      let url = conf.apiUrl +'/reports/statistics'; //"http://localhost:3001/v1/api/users/login"//"http://bkadmin.in/indoapp/user/userLogin"
      
      let newtype=ntype
      if(ntype == 'quarterly'){
        newtype = 'quarter'
      }
      // console.log('ntype = ',ntype)
      // console.log('businesstype = ',businesstype)
      // console.log('selbusinesstype 12= ',nbusiness)
      const data = {filter: newtype, date: newdate, business_code: nbusiness.code};
      // console.log('regionType = ',regionType)
      // console.log('rtype = ',rtype)
      if (rtype !== "Full"){
      //   url = conf.apiUrl +'/reports/regional_statistics';
        data['region']=rtype
      }
      console.log('data = ',data)
      let headers = new Headers();
      const token = await AsyncStorage.getItem('usertoken')
      
      setIsloading(true);
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+ token);
      headers.append('x-access-token', token);
      headers.append('token', token);
      
      
      setResultdata([]);
      fetch(url, {
        method: 'POST', // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          
          try{
            // console.log('data.results = ',data)
            if(data.type == 'success'){
              if(data.data.length>0){
                setResultdata(data.data);
                console.log(data.data[1])
              }
              setIsloading(false);
            }else{
              // console.log('login')
              logOutuser();
            }
            
          }catch(e){
            setIsloading(false);
          }
          
          // }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const changetype = (ntype) => {
      setSelectedtype(ntype);
      setType(ntype.toLowerCase());
      getDateData(confirmdate, ntype.toLowerCase(), regionType);
    }

    const setbusiness = async () => {
      const selbusinesstype = await AsyncStorage.getItem('businesstype');
      console.log('selbusinesstype = ',selbusinesstype)
      setBusinesstype(JSON.parse(selbusinesstype));
      
    }
    const closeDropDown =() => {
      childRef.current.setState({
        activityIndex: -1,
      });
    }

    useEffect(() => {
      console.log("useEffect")
      setbusiness();
      getDateData(confirmdate, type, regionType);
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
      // setDrawer(DrawerContent(open, setOpen, navigation));
    }, [btype]);
    

    return (
      <ScrollView style={{backgroundColor: '#fff'}} onPress={() => {setOpen(false)}} >
        
        <TouchableOpacity activeOpacity={.9}  onPress={() => {setOpen(false); closeDropDown()}} >
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
          drawerContent={ open ? <DrawerContent open={open} setOpen={setOpen} navigation={navigation}/> : <></> }//{DrawerContent(open, setOpen, navigation)}
          drawerPercentage={100}
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
                style={styles.bkking}
                source={bkking}
            />
        </View>
        
        <View style={styles.Home}>
        <View style={styles.Txt142}>
        {regionType != 'Full' && <TouchableOpacity  onPress={() => getRegionData('Full')}>
           <IconButton style={{ height:24, width:24, position: "relative", top: -9, left:-7 }} icon="home"></IconButton></TouchableOpacity>}
          <Text style={{color: "rgba(26,26,26,1)"}}>{displaydt}</Text></View>
          <View style={styles.Group66716}>
          <DropdownMenu
            ref={childRef}
            // visible={isopendropdown}
            // bannerAction={isopendropdown}
            // openOrClosePanel={() => isopendropdown}
            style={{ height:10, width:174, padding:0,margin:0}}
            bgColor={'transparent'}
            tintColor={'#000000'}
            activityTintColor={'#f5a04c'}
            handler={(selection, row) => changetype(datatype[selection][row])}
            data={datatype}
            optionTextStyle={{width:170, 
              position: "relative", top:1, left:-15, marginRight:30,  width:170, zIndex:1000,  marginTop:1, marginBottom:1, paddingBottom:1, paddingTop:0}}
            >
            </DropdownMenu>
            {/* <Text style={styles.Txt736}>Day</Text> */}
            {/* <Image
              style={styles.Fill6}
              source={down_icon}
            /> */}
          </View>
          <TouchableOpacity style={styles.IconlyBoldCalendar} onPress={() => {setOpencalendar(true); closeDropDown()}}>
          <Image
            style={styles.IconCalendar}
            source={calendar}
          /></TouchableOpacity>
          
          {/* <View style={{width:'100%', height:40, marginTop:10, padding:5, color:'#fff', backgroundColor:'black'}}>
        <Text style={{color:'#fff',}}>Could not connect to internet</Text>
        </View> */}
          <View style={{marginTop:25, }}>
          <TouchableOpacity  ><Text style={styles.Txt656}>Net Sales</Text> 
          </TouchableOpacity>
            <Text style={styles.Txt702}>
            {resultdata.length > 0 && !isloading ? (
            resultdata[0].net_stale.val
          ) : !isloading ? (
            <>0</>
          ) : (
            ''
          )}
              {/* <View style={styles.Group66685}>
                <Text style={styles.Txt438}>USD</Text>
              </View> */}
            </Text>
            {/* <Image
            style={styles.Vector2}
            source={resultdata.length > 0 && resultdata[0].net_stale.val && !isloading ? (vector_line): (Vector_line_down)}
          /> */}
            {!isloading && <IconButton onPress={() => getDateData(confirmdate, type, regionType)} style={{ height:24, width:24, position: "absolute", top: -2, right:2 }} icon="refresh"></IconButton>}
          </View>
          
          {/* <View style={resultdata.length > 0 && resultdata[0].net_stale.val && !isloading ? (styles.Group66687): (styles.GroupDown)}>
            <View style={styles.Group66686}>
              <Image
                style={styles.Group66642}
                source={resultdata.length > 0 && resultdata[0].net_stale.val && !isloading ? (vector_up): (vector_down)}
              />
              <Text style={resultdata.length > 0 && resultdata[0].net_stale.val && !isloading ? (styles.Txt886): (styles.Txtdown)}>4.39%</Text>
            </View>
          </View> */}
          {isloading && (
            <View>
            <Text
              style={{position: 'relative', top: 120, marginLeft: 'auto', marginRight:'auto', marginBottom: 50}}
            >
              <ImageBackground
                source={bugerGif}
                style={{width: 100, height: 100}}
              />
            </Text>
            </View>
          )}
          {/* <View style={{paddingTop:10,paddingBottom:10, display: "flex",
        flexDirection: "row",}}>
          <Text style={styles.Txt1088}>Sales by zone wise</Text>
          
            
            <Image
              style={styles.IconlyLightArrowLeftSquare}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3347?alt=media&token=2969078b-f412-45de-a417-b72185a5a492",
              }}
            />
            <Image
              style={styles.IconlyLightArrowRightSquare}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3342?alt=media&token=546697d9-b21f-487c-a1ee-c414ba842e2c",
              }}
            />
          </View> */}
          
      {/* <View style={styles.ContainerZone}>
      <View style={styles.Group331}>
        <Image
          style={styles.Vector4}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3397?alt=media&token=2bfa59dc-ee63-42e8-82ff-a899738a5423",
          }}
        />
        <View style={styles.Group246}>
        <Text style={styles.Txt1087}>40%</Text>
          <Image
            style={styles.Vector3}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3398?alt=media&token=d360706d-65d0-40a3-82aa-c74cda506a5e",
            }}
          />
          
          <View style={styles.Group414}>
            <Text style={styles.Txtcount}>28063.55</Text>
            <View style={styles.Group66688}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>West</Text>
        </View>
      </View>
      <View style={styles.Group378}>
        <Image
          style={styles.Vector6}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3399?alt=media&token=4e025c8b-4225-43a6-8151-eac7cdcb366e",
          }}
        />
        <View style={styles.Group423}>
          <Text style={styles.Txt235}>38%</Text>
          <Image
            style={styles.Vector5}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3400?alt=media&token=1fd2c839-6f86-41da-b876-ede3478dde73",
            }}
          />
          <View style={styles.Group414}>
            <Text style={styles.Txtcountsouth}>21063.55</Text>
            <View style={styles.Groupusd}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>South</Text>
        </View>
      </View>
      </View>
      <View style={styles.ContainerZone}>
      
      <View style={styles.Group271}>
        <Image
          style={styles.Vector8}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3401?alt=media&token=01b549ce-fe2b-4829-8b09-4baa0c1973c5",
          }}
        />
        <View style={styles.Group246}>
          <Text style={styles.TxtNorth}>35%</Text>
          <Image
            style={styles.Vector7}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3402?alt=media&token=15d039d6-cfa1-42ed-9316-e1f582986779",
            }}
          />
          <View style={styles.Group414}>
            <Text style={styles.Txtcountnorth}>28063.55</Text>
            <View style={styles.Group66689}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>North</Text>
        </View>
      </View>

      
      <View style={styles.Group525}>
        <Image
          style={styles.Vector10}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3406?alt=media&token=5cad3bdd-6235-4271-ad34-1881e9a23c32",
          }}
        />
        <View style={styles.Group3103}>
          <Text style={styles.Txt659}>20%</Text>
          <Image
            style={styles.Vector9}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3407?alt=media&token=c13dcc25-6056-40f8-9f7c-524f1fecd863",
            }}
          />
          <View style={styles.Group414}>
            <Text style={styles.Txtcounteast}>21063.55</Text>
            <View style={styles.Groupusd}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>East</Text>
        </View>
      </View>
      </View> */}

      
      {/* <View style={styles.Group141}>
        <Text style={styles.Txt672}>Indonesia</Text>
        <Image
          style={styles.Fill7}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3396?alt=media&token=61fe1a70-18cc-4231-b4fd-6a75ba31d686",
          }}
        />
      </View> */}
      
      {resultdata.map((item, index) => {
        return (
          <>
            {/* <View style={styles.Group141}>
              <Text style={styles.Txt672}>{item.net_stale.type == 'National' ? 'Indonesia' :item.net_stale.type }</Text>
              <IconButton
                  onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', right: 0, top: -6}}
                  iconContainerStyle={{height: 30, width: 20}}
                  color="grey"
                  icon={iscollaps ? 'chevron-up' : 'chevron-down'}
                  icon={
                    index == 0
                      ? iscollaps
                        ? 'chevron-down'
                        : 'chevron-up'
                      : index == 1
                      ? iscollaps1
                        ? 'chevron-down'
                        : 'chevron-up'
                      : index == 2
                      ? iscollaps2
                        ? 'chevron-down'
                        : 'chevron-up'
                      : iscollaps3
                      ? 'chevron-down'
                      : 'chevron-up'
                  }
                />
            </View> */}
            <DataTable rowHeight={30} key={index} >
              <DataTable.Header  style={styles.tableHeader}>
          <TouchableOpacity onPress={() => getRegionData(item.net_stale.type)} ><Text style={styles.Txt672}>{item.net_stale.type == 'National' ? businesstype.name :item.net_stale.type } </Text></TouchableOpacity>
              {businesstype.name == 'India' && (
                <>
              <Text style={styles.Txt673}>Company</Text>
              <Text style={styles.Txt674}>Franchise</Text>
              </>)}
              {/* <TouchableOpacity style={{position: 'absolute', right: 0, top: 0}}> */}
                <IconButton
                  onPress={event => handleEpandRow(event, index)}
                  style={{position: 'absolute', right: -8, top: -6, zIndex:1000}}
                  iconContainerStyle={{height: 30, width: 20, zIndex:1000}}
                  color="#F48233"
                  icon={expandState[index] ? 'chevron-up' : 'chevron-down'}
                  // icon={
                  //   index == 0
                  //     ? iscollaps
                  //       ? 'chevron-down'
                  //       : 'chevron-up'
                  //     : index == 1
                  //     ? iscollaps1
                  //       ? 'chevron-down'
                  //       : 'chevron-up'
                  //     : index == 2
                  //     ? iscollaps2
                  //       ? 'chevron-down'
                  //       : 'chevron-up'
                  //     : iscollaps3
                  //     ? 'chevron-down'
                  //     : 'chevron-up'
                  // }
                />
                {/* </TouchableOpacity> */}
              </DataTable.Header>

              <View style={styles.tableRow}>
                <DataTable.Cell  style={styles.tableRightBorder}>
                  <Text  style={styles.clrL}>Net Sales</Text>
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.val}</Text>
                { Platform.OS === 'android' && ( Math.sign(item.net_stale.val).toString() === 'NaN'  || Math.sign(item.net_stale.val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                { Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
              </View>
              
              
              
              <View style={styles.tableRow}>
                <DataTable.Cell style={styles.tableRightBorder}>
                  <Text style={styles.clrL}>ADS</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.ADS.val} 
                
                </Text>
                {Platform.OS === 'android' && ( Math.sign(item.ADS.val).toString() === 'NaN' || Math.sign(item.ADS.val) >0 ?
                (<IconButton
                  disableFocusRipple={true}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
              </View>
              
              <View style={styles.tableRow}>
                <DataTable.Cell style={styles.tableRightBorder}>
                  <Text style={styles.clrL}>SSSG %</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.tableColumn}>
                <Text style={styles.textSize}> {item.SSSG.val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.SSSG.val).toString() === 'NaN' || Math.sign(item.SSSG.val) >0?
                (<IconButton
                  disableFocusRipple={true}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
              </View>
              
              <Collapsible 
                collapsed={ !expandState[index] }
                //   index == 0
                //     ? iscollaps
                //     : index == 1
                //     ? iscollaps1
                //     : index == 2
                //     ? iscollaps2
                //     : iscollaps3
                // }
                align="center"
              >
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>SSTG</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.SSTG.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.SSTG.val).toString() === 'NaN' || Math.sign(item.SSTG.val) >0?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>ADT</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.ADT.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.ADT.val).toString() === 'NaN'  || Math.sign(item.ADT.val) >0?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>APC</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.APC.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.APC.val).toString() === 'NaN'  || Math.sign(item.APC.val) >0  ?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>WoW SSSG %</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.WOWSSSG.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.WOWSSSG.val).toString() === 'NaN'  || Math.sign(item.WOWSSSG.val) >0 ?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>MoM SSSG %</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.MOMSSSG.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.MOMSSSG.val).toString() === 'NaN'  || Math.sign(item.MOMSSSG.val) >0 ?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>DineIn Net Sales</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.DINEINNETSALES.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.DINEINNETSALES.val).toString() === 'NaN' || Math.sign(item.DINEINNETSALES.val) >0 ?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>DineIn ADS</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.DINEINADS.val}</Text>
                  {Platform.OS === 'android' && ( Math.sign(item.DINEINADS.val).toString() === 'NaN' || Math.sign(item.DINEINADS.val) >0 ?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
                
                <View style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>Delivery %</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.DELIVERYPERCENT.val} </Text>
                  {Platform.OS === 'android' && ( Math.sign(item.DELIVERYPERCENT.val).toString() === 'NaN' || Math.sign(item.DELIVERYPERCENT.val) >0 ?
                  (<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#44C905"
                    icon={'menu-up'}
                    />):(<IconButton
                      disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                  </DataTable.Cell>
                  {businesstype.name == 'India' && (
                <>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.coco_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.coco_val).toString() === 'NaN'  || Math.sign(item.net_stale.coco_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.fofo_val}</Text>
                {Platform.OS === 'android' && ( Math.sign(item.net_stale.fofo_val).toString() === 'NaN'  || Math.sign(item.net_stale.fofo_val) >0?
                (<IconButton
                  // onPress={() => setcollapsVal(index)}
                  style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                  disableFocusRipple={true}
                  color="#44C905"
                  icon={'menu-up'}
                  />):(<IconButton
                    disableFocusRipple={true}
                    style={{position: 'absolute', height:20, width:20, right: 0, top: 2, zIndex:1000}}
                    // iconContainerStyle={{position: 'absolute', top:0,right:0}}
                    color="#ff5252"
                    icon={'menu-down'}
                    />))}
                </DataTable.Cell>
                </>)}
                </View>
              </Collapsible>
            </DataTable>
          </>
        );
      })}


  <DateTimePickerModal
        isVisible={opencalendar}
        mode="date"
        maximumDate={new Date()}
        textColor="#f5a04c"
        color="#f5a04c"
        onConfirm={onConfirmSingle}
        onCancel={onDismissSingle}
      />
          
          {/* <View style={styles.Group978}>
        
        <Image
          style={styles.IconlyLightArrowRightSquare}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3342?alt=media&token=546697d9-b21f-487c-a1ee-c414ba842e2c",
          }}
        />
      </View> */}
        </View>
        {/* <View style={styles.Home}>
      
      <Text style={styles.Txt142}>27 July 2022, 17:32</Text>
      <View style={styles.Group66716}>
        <Text style={styles.Txt736}>Day</Text>
        <Image
          style={styles.Fill6}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3326?alt=media&token=01135525-a767-4553-b649-38014bd19227",
          }}
        />
      </View>


      <Text style={styles.Txt656}>Net Sales</Text>
      <Text style={styles.Txt1088}>Sales by zone wise</Text>
      <Text style={styles.Txt702}>50912.55 </Text>
      <View style={styles.Group66685}>
        <Text style={styles.Txt438}>USD</Text>
      </View>
      <View style={styles.Group66687}>
        <View style={styles.Group66686}>
          <Image
            style={styles.Group66642}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3338?alt=media&token=f0a182a4-d9ed-461f-b63c-3ba4db886feb",
            }}
          />
          <Text style={styles.Txt886}>4.39%</Text>
        </View>
      </View>
      <Image
        style={styles.Vector2}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3341?alt=media&token=e7a886c4-1dca-4d56-b39c-80effcd2ed41",
        }}
      />




      <View style={styles.Group978}>
        <Image
          style={styles.IconlyBoldCalendar}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3320?alt=media&token=af93e7c1-0759-467d-81de-fd9e2e8e5187",
          }}
        />
        <Image
          style={styles.IconlyLightArrowRightSquare}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3342?alt=media&token=546697d9-b21f-487c-a1ee-c414ba842e2c",
          }}
        />
      </View>


      <Image
        style={styles.IconlyLightArrowLeftSquare}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3347?alt=media&token=2969078b-f412-45de-a417-b72185a5a492",
        }}
      />
      <View style={styles.Group331}>
        <Image
          style={styles.Vector4}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3397?alt=media&token=2bfa59dc-ee63-42e8-82ff-a899738a5423",
          }}
        />
        <View style={styles.Group246}>
          <Image
            style={styles.Vector3}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3398?alt=media&token=d360706d-65d0-40a3-82aa-c74cda506a5e",
            }}
          />
          <Text style={styles.Txt1087}>40%</Text>
          <View style={styles.Group414}>
            <Text style={styles.Txt718}>28063.55</Text>
            <View style={styles.Group66688}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>West</Text>
        </View>
      </View>
      <View style={styles.Group271}>
        <Image
          style={styles.Vector8}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3401?alt=media&token=01b549ce-fe2b-4829-8b09-4baa0c1973c5",
          }}
        />
        <View style={styles.Group121}>
          <Text style={styles.Txt268}>35%</Text>
          <Image
            style={styles.Vector7}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3402?alt=media&token=15d039d6-cfa1-42ed-9316-e1f582986779",
            }}
          />
          <View style={styles.Group414}>
            <Text style={styles.Txt718}>28063.55</Text>
            <View style={styles.Group66688}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>North</Text>
        </View>
      </View>
      <View style={styles.Group378}>
        <Image
          style={styles.Vector6}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3399?alt=media&token=4e025c8b-4225-43a6-8151-eac7cdcb366e",
          }}
        />
        <View style={styles.Group423}>
          <Text style={styles.Txt235}>38%</Text>
          <Image
            style={styles.Vector5}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3400?alt=media&token=1fd2c839-6f86-41da-b876-ede3478dde73",
            }}
          />
          <View style={styles.Group414}>
            <Text style={styles.Txt718}>21063.55</Text>
            <View style={styles.Group66688}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>South</Text>
        </View>
      </View>
      <View style={styles.Group525}>
        <Image
          style={styles.Vector10}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3406?alt=media&token=5cad3bdd-6235-4271-ad34-1881e9a23c32",
          }}
        />
        <View style={styles.Group3103}>
          <Text style={styles.Txt659}>20%</Text>
          <Image
            style={styles.Vector9}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3407?alt=media&token=c13dcc25-6056-40f8-9f7c-524f1fecd863",
            }}
          />
          <View style={styles.Group414}>
            <Text style={styles.Txt718}>21063.55</Text>
            <View style={styles.Group66688}>
              <Text style={styles.Txt438}>USD</Text>
            </View>
          </View>
          <Text style={styles.Txt624}>East</Text>
        </View>
      </View>
      <View style={styles.Group141}>
        <Text style={styles.Txt672}>Indonesia</Text>
        <Image
          style={styles.Fill7}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/9ybtqppy4fj-67%3A3396?alt=media&token=61fe1a70-18cc-4231-b4fd-6a75ba31d686",
          }}
        />
      </View>
      <View style={styles.Group66692}></View>
      <View style={styles.Group66694}></View>
      <View style={styles.Group66696}></View>
      <View style={styles.Group66693}></View>
      <View style={styles.Group66695}></View>
      <View style={styles.Group66697}></View>
      <Text style={styles.Txt269}>Net Sales</Text>
      <Text style={styles.Txt502}>2250.87 mn</Text>
      <Text style={styles.Txt249}>13.01 mn</Text>
      <Text style={styles.Txt259}>45.39</Text>
      <Text style={styles.Txt622}>ADS</Text>
      <Text style={styles.Txt520}>SSSG%</Text>
      
    </View> */}
      </MenuDrawer>
      </TouchableOpacity>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
  tableHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#B2B2B2",
    // justifyContent: "flex-end",
    textAlign: 'center',
    // justifyContent: 'center',
    fontFamily: 'Avenir',
    width: '100%',
    height:40,
    minHeight: 40,
    // top:30,
    marginTop:10,
    marginBottom:5
  },
  // refresh: {
  //   marginTop: "20",
  //   cursor: "pointer",
  //   margin: "auto",
  //     "&.spin": {
  //         animation: "$spin 1s 1",
  //         // pointerEvents:'none'
  //     }
  // },
  // "@keyframes spin": {
  //     "0%": {
  //         transform: "rotate(0deg)"
  //     },
  //     "100%": {
  //         transform: "rotate(360deg)"
  //     }
  // },
  tableRightBorder:{
    width:112,
    height:40,
    marginRight:5,
    marginBottom:3,
    borderRadius: 4,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#B2B2B2",
    backgroundColor:'#F5F5F5',
    textAlign: 'center',
    justifyContent: 'center',
  },
  clrL: {
    fontSize:10,
  },
  textSize: {
    fontSize:12,
  },
  tableColumn:{
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#B2B2B2",
    textAlign: 'center',
    justifyContent: 'center',
    // fontSize:8,
    width:192,
    height:40,
  },
  // textSize: {
  //   fontSize:10,
  //   color:'red'
  // },
  tableRow:{
    margin:0,
    marginTop:0,
    padding:0,
    display: "flex",
    flexDirection: "row",
  },
    header:{
        // display: "flex",
        // boxSizing: 'border',
        height:400,
        width:'100%',
        // position: 're',
        // left: '-21.6%',
        // right: '-21.87%',
        // top: '-7.64%',
        // bottom: '83.99%',
        borderRadius:140,
        background: '#F5EADC',
        backgroundColor:'#F5EADC',
        // borderBottomRightRadius: 80,
        // borderBottomLeftRadius: 80,
        // transform : [ { scaleX : 1.3 } ],
        // borderBottomStartRadius : 220,
        // borderBottomEndRadius : 220,
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
        // none: "0px",
        width: 37,
        height: 35,
        padding:2,
        // padding:2,
        // borderWidth:1,
        // borderColor:'green'
        
      },
      bkking: {
        // display: "flex",
        // flexDirection: "row",
        position: "absolute",
        top: 50,
        left:'44.51%',
        right:'44.51%',
        // none: "0px",
        width: 45.07,
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
      topheader:{
        display: "flex",
        height:140
      },
      Home: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "flex-start",
        // alignItems: "center",
        // position: "relative",
        // borderRadius: 30,
        backgroundColor: "#fff",
        // width: 375,
        minHeight:600,
        height: '100%',
        padding: '6%',
        paddingTop:9,
        // marginRight:'auto',
        // marginLeft:'auto'
        // borderColor:'red',
        // borderWidth:1
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


      ContainerZone:{
        marginBottom:20,
          display: "flex",
          flexDirection: "row",
          
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
        // display: "flex",
        flexDirection: "row",
        // position: "absolute",
        // top: "17.98%",
        // bottom: "79.68%",
        // left: "7.73%",
        // right: "58.67%",
        fontSize: 14,
        //  // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        // borderWidth:1,
        // borderColor:'red',
        justifyContent: "flex-start",
        // width: 126,
        height: 22,
      },
      Group66716: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 8,
        left: '62%',
        paddingTop: 6,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 9,
        borderRadius: 4,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(26,26,26,1)",
        width: 104,
        height: 27,
        zIndex:1000
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
        // position: "absolute",
        // top: "22.78%",
        // bottom: "74.88%",
        // left: "7.73%",
        // right: "76%",
        fontSize: 14,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        width: 191,
        height: 19,
        opacity: 0.5,
      },
      Txt1088: {
        // position: "absolute",
        // top: "33.5%",
        // bottom: "63.42%",
        // left: "7.47%",
        // right: "51.2%",
        fontSize: 18,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        width: '80%',
        height: 25,
        // borderColor:'red',
        // borderWidth:1
      },
      Txt702: {
        // position: "absolute",
        // top: "25.12%",
        // bottom: "70.69%",
        // left: "7.73%",
        // right: "62.67%",
        fontSize: 25,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "500",
        color: "rgba(26,26,26,1)",
        width: 181,
        height: 34,
      },
      Group66685: {
        position: "relative",
        // top: 215,
        // left: 143,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 7,
        // marginBottom:10,
        backgroundColor: "rgba(26,26,26,1)",
        width: 26,
        height: 14,
      },
      Txt438: {
        fontSize: 6.47,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(255, 255, 255, 1)",
        textAlign: "right",
        justifyContent: "flex-end",
      },
    
      Group66687: {
        // position: "absolute",
        top: 5,
        // left: 29,
        paddingTop: 3,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 5,
        borderRadius: 8.5,
        backgroundColor: "#bce2a5",
        width: 46,
        height: 17,
        // opacity: 0.1
      },
      GroupDown: {
        // position: "absolute",
        // top: 240,
        // left: 29,
        paddingTop: 3,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 5,
        borderRadius: 8.5,
        backgroundColor: "#FFCACB",
        width: 46,
        height: 17,
        // opacity: 0.1
      },
      Group66686: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        zIndex:2
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

      Txtdown: {
        fontSize: 7.47,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "#FF5252",
        textAlign: "right",
        justifyContent: "flex-end",
      },
      Vector2: {
        position: "absolute",
        top: "24.63%",
        bottom: "70.2%",
        left: "53.73%",
        right: "18.93%",
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
        position: "absolute",
        top: 10,
        right: 32,
        width: 18,
        height: 20,
        marginBottom: 110,
        textAlign: "right",
      },
      IconCalendar: {
        // position: "absolute",
        // top: 10,
        // right: 42,
        width: 18,
        height: 20,
        // marginBottom: 110,
        // textAlign: "right",
      },
      IconlyLightArrowRightSquare: {
        width: 18.5,
        height: 18.5,
        textAlign:'right',
      },
    
      IconlyLightArrowLeftSquare: {
        // position: "absolute",
        // top: 275,
        // left: 299,
        textAlign:'right',
        marginRight:10,
        width: 18.5,
        height: 18.5,
        // opacity: 0.5,
      },
      Group331: {
        // position: "absolute",
        // top: 312,
        none: "0px",
        borderRadius: 20,
        backgroundColor: "#EEF1F8",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "rgba(178,178,178,1)",
        width: 151,
        height: 162,
        padding:12,
      },
      Vector4: {
        // position: "absolute",
        top: "8.64%",
        // bottom: "42.9%",
        left: "12%",
        // right: "21.85%",
        width: 102,
        height: 78.5,
      },
      Group246: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 14,
        none: "0px",
        width: 148,
        height: 135,
      },
      Vector3: {
        left:14.5,
        width: 102,
        height: 68,
      },
      Txt1087: {
        position:'relative',
        fontSize: 14,
        top:12,
        left: 12,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(85,110,190,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        // marginBottom: 58,
      },
      TxtNorth: {
        position:'relative',
        fontSize: 14,
        top:12,
        left: 12,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(250,156,94,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        // marginBottom: 58,
      },
      Group414: {
        display: "flex",
        flexDirection: "row",
        // marginRight: 'auto',
        // marginLeft: 'auto',
      },
      Txtcount: {
        fontSize: 18,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        marginTop:0,
        paddingLeft:15
        
      },
      Txtcountsouth:{
        fontSize: 18,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        marginTop:12,
        paddingLeft:15
      },
      Txtcountnorth:{
        fontSize: 18,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        // marginTop:10,
        paddingLeft:15
      },
      Txtcounteast:{
        fontSize: 18,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        marginTop:10,
        paddingLeft:15
      },

      Group66688: {
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 2,
        paddingRight: 5,
        borderRadius: 7,
        backgroundColor: "rgba(26,26,26,1)",
        width: 26,
        height: 14,
        top:15,
        left:3
      },
      Group66689:{
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 2,
        paddingRight: 5,
        borderRadius: 7,
        backgroundColor: "rgba(26,26,26,1)",
        width: 26,
        height: 14,
        top:5,
        left:3
      },

      Groupusd: {
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 2,
        paddingRight: 5,
        borderRadius: 7,
        backgroundColor: "rgba(26,26,26,1)",
        width: 26,
        height: 14,
        top:25,
        left:3
      },
      
    
      Txt624: {
        fontSize: 14,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(26,26,26,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        paddingLeft:16
        // opacity: 0.7,
      },
    
      Group271: {
        // position: "absolute",
        // top: 20,
        none: "0px",
        borderRadius: 20,
        backgroundColor: "#fff5ef",
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
        // top: 25,
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
        marginBottom: 10,
        marginLeft:19
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
      
      Group378: {
        // position: "absolute",
        // top: 312,
        none: "0px",
        borderRadius: 20,
        backgroundColor: "#F2EFF3",//"rgba(129,96,139,1)",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "rgba(178,178,178,1)",
        width: 152,
        height: 162,
        marginLeft:25
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
        top: 15,
        none: "0px",
        width: 116,
        height: 124,
      },
      Txt235: {
        position:'relative',
        top:12,
        left: 12,
        fontSize: 14,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(129,96,139,1)",
        textAlign: "left",
        justifyContent: "flex-end",
      },
      Vector5: {
        width: 115.5,
        height: 52,
        // top:0,
        // marginBottom: 19,
        marginLeft:12
      },
      
      
      
    
      Group525: {
        // position: "absolute",
        // top: 20,
        none: "0px",
        borderRadius: 20,
        backgroundColor: "#FDF1F0",
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: "rgba(178,178,178,1)",
        width: 152,
        height: 162,
        marginLeft:25
      },
      Vector10: {
        position: "absolute",
        top: "19.19%",
        bottom: "39.81%",
        left: "12.5%",
        right: "16.78%",
        width: 115.5,
        height: 60.5,
      },
      Group3103: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 3,
        none: "0px",
        width: 114,
        height: 124,
      },
      Txt659: {
        position:'relative',
        fontSize: 14,
        top:12,
        left: 12,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(231,119,109,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        marginBottom: 12,
      },
      Vector9: {
        // width: 115.5,
        // height: 31,
        // marginBottom: 10,
        // marginLeft:25
        width: 115,
        height: 52,
        // top:0,
        // marginBottom: 19,
        marginLeft:19
      },
      
      Group141: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        // position: "absolute",
        top: 25,
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
        width:165,
        fontSize: 14,
        // borderColor:'red',
        // borderWidth:1,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "600",
        color: "rgba(244,130,51,1)",
        textAlign: "left",
        justifyContent: "flex-end",
        // marginRight: 212,
        marginTop:10
      },
      Txt673:{
        width:70,
        marginTop:14,
        // marginLeft:'40%',
        fontSize: 10,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "400",
        color: "rgba(244,130,51,1)",
        textAlign: "left",
        justifyContent: "flex-end",
      },
      Txt674:{
        marginTop:14,
        marginLeft:'5%',
        fontSize: 10,
         // fontFamily: "Nunito, sans-serif",
        fontWeight: "400",
        color: "rgba(244,130,51,1)",
        textAlign: "right"
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
        // position: "absolute",
        top: "8.3%",
        // bottom: "9.36%",
        // left: "12.27%",
        // right: "71.47%",
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
        width: 316,
        height: 812,
      },
      Rectangle113: {
        width: 69,
        height: 69,
        marginBottom: 7,
      },
      Txt695: {
        fontSize: 18,
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
    
      Group66736: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
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
    
      Group66736: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
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
    
      Group66736: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
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
    
      Group66736: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
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
    
      Group66736: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
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
    
      Group66736: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
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
})
export default NewHome;