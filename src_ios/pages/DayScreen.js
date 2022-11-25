import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {IconButton, Colors} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {ScrollView, ActivityIndicator, ImageBackground, TouchableOpacity} from 'react-native';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import bugerGif from '../../assets/BurgerAnimation2sec.gif';
import {DataTable} from 'react-native-paper';
import DashedLine from 'react-native-dashed-line';
import Dash from 'react-native-dash';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import Collapsible from 'react-native-collapsible';
import config from '../../config'

const Tab = createMaterialTopTabNavigator();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const styles = StyleSheet.create({
  appBar: {
    // color: "#fff",
    backgroundColor: '#fff',
  },
  clrW: {
    color: '#fff',
  },
  container: {
    //  paddingTop: 25,
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    width: '60%',
    margin: 'auto',
  },
  txtcontent: {
    // borderColor: '#f5a04c',
    // borderBottomWidth: 1,
    padding: 10,
    paddingLeft: 22,
    fontWeight: 'bold',
    // paddingBottom: 10,
    fontWeight: '400',
    fontSize: 16,
    width: '100%',
  },
  cardrow: {
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    margin: 'auto',
    minHeight: 1000,
    // height: "100%",
    // maxHeight: 1200,
    // maxHeight: 500,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardTable: {
    backgroundColor: '#fff',
    width: '90%',
    margin: 'auto',
    // height: 110,
    // marginTop: 20,
    marginBottom: 10,
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
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Avenir',
    width: '100%',
    height: 35,
    minHeight: 35,
    // marginBottom:10
  },
  tableRightBorder: {
    borderRightWidth: 1,
    fontSize: 10,
    backgroundColor: '#ee7602',
    color: '#fff',
    // borderStyle: 'dashed',
    borderRightColor: '#cfcece',
    textAlign: 'center',
    justifyContent: 'center',

    height: 35,
    width: '100%',
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0dede',
  },
  tableRow: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 3,
    paddingRight: 0,
    marginBottom: 0,
    fontFamily: 'Avenir',
    height: 35,
    minHeight: 35,
    borderBottomWidth: 0 
  },
  tableColumn: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Avenir',
    width: '100%',
    minWidth: 50,
    height: 35,
    fontSize: 11,
    paddingBottom: 0,
    marginBottom: 0,
    borderWidth:0,
    borderColor:'#fff'
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
    color: 'black',
    fontSize: 11,
    fontFamily: 'Avenir',
    flex: 0.5,
  },
  textSize: {
    fontSize: 11,
  },
  submitButtonText: {
    color: 'white',
  },
  txtDay: {
    position: 'relative',
    bottom: 4,
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  Gif: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
if (month < 10) {
  month = '0' + month.toString();
}
if (date < 10) {
  date = '0' + date.toString();
}

var year = new Date().getFullYear();

const new_dt = year + '-' + month + '-' + date;




const DayScreen = ({navigation, selectedDate, type, setEnddte, closeMenu, setActiveTab, setConfirmdate, confirmdate}, props) => {
  const [resultdata, setResultdata] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dte, setDte] = React.useState(confirmdate);
  const [isloading, setIsloading] = React.useState(false);
  const [numberitem, setNumberitem] = React.useState(3);
  const [iscollaps, setIscollaps] = React.useState(true);
  const [iscollaps1, setIscollaps1] = React.useState(true);
  const [iscollaps2, setIscollaps2] = React.useState(true);
  const [iscollaps3, setIscollaps3] = React.useState(true);

  const setcollapsVal = index => {
    if (index == 0) {
      setIscollaps(!iscollaps);
    }
    if (index == 1) {
      setIscollaps1(!iscollaps1);
    }
    if (index == 2) {
      setIscollaps2(!iscollaps2);
    }
    if (index == 3) {
      setIscollaps3(!iscollaps3);
    }
  };

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

  const getDateData = async (newdate) => {
    console.log('newdate = ',newdate)
    setConfirmdate(newdate)
    const conf = await config();
    const url = conf.apiUrl +'/report/getReport'; //"http://localhost:3001/v1/api/users/login"//"http://bkadmin.in/indoapp/user/userLogin"
    const data = {report_type: type, date_Val: newdate};
    
    let headers = new Headers();
    const token = await AsyncStorage.getItem('usertoken')
    
    setIsloading(true);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+ token);
    headers.append('x-access-token', token);
    
    
    setResultdata([]);
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        
        try{
          // if(data.success){
            if(data.results.length>0){
              setResultdata(data.results);
            }
            setIsloading(false);
          // }else{
          //   console.log('login')
          //   logOutuser();
          // }
          
        }catch(e){
          setIsloading(false);
        }
        
        // }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // const getWeekDate = (confirmdate) => {
  //   let selecteddate = confirmdate;
  //   selecteddate.setDate(selecteddate.getDate() - 7);
  //   var wdate = selecteddate.getDate(); //Current Date
  //   var wmonth = selecteddate.getMonth() + 1; //Current Month
  //   if (wmonth < 10) {
  //     wmonth = '0' + wmonth.toString();
  //   }
  //   if (wdate < 10) {
  //     wdate = '0' + wdate.toString();
  //   }
  //   var year = selecteddate.getFullYear();

  //   const week_dt = wdate + '-' + wmonth + '-' + year;
  //   return week_dt;
  // };

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
    setOpen(false);
    setDte(ndt);
    getDateData(ndt);
    const selectedmonth = confirmdate.getMonth()
    const new_dtn = ndate + ' ' + months[selectedmonth] + ' ' + nyear;
    selectedDate(new_dtn);
    let weeklastdate = startOfWeek(confirmdate);
    if(type == 'month'){
      weeklastdate = startOfMonth(confirmdate);
    }
    if (type == 'year'){
      weeklastdate = startOfYear(confirmdate);
    }
    
    setEnddte(weeklastdate + ' - ');
  };
  const selectedDateSet = (dte) => {
    const selected_dt = new Date(dte)
    let weeklastdate = startOfWeek(selected_dt);
    if(type == 'month'){
      weeklastdate = startOfMonth(selected_dt);
    }
    
    setEnddte(weeklastdate + ' - ');
  }
  useEffect(() => {
    
    getDateData(dte);
    // selectedDateSet()
    // if(type=='day'){
    //   setActiveTab('Day')
    // }
    // if(type=='week'){
    //   setActiveTab('Week')
    // }
  }, [type]);
  return (
    
    <ScrollView style={{backgroundColor: '#fff'}} >
      <TouchableOpacity style={{height:'100%'}}  activeOpacity={.9}   onPress={closeMenu} >
      {/* <Image source={bugerGif}  /> */}
      {/* <ImageBackground source={bugerGif} style={styles.Gif}></ImageBackground> */}

      {isloading && (
        <Text
          style={{position: 'relative', top: 50, left: 130, marginBottom: 50}}
        >
          <ImageBackground
            source={bugerGif}
            style={{width: 100, height: 100}}
          />
        </Text>
      )}
      {!isloading && (
        <Text style={styles.txtcontent}>
          Net Sales:{' '}
          {resultdata.length > 0 && !isloading ? (
            resultdata[0].net_stale.val
          ) : !isloading ? (
            <>0</>
          ) : (
            ''
          )}
        </Text>
      )}

      <IconButton
        onPress={() => setOpen(true)}
        style={{position: 'absolute', right: 20, top: -6}}
        // iconContainerStyle={{height: 50, width: 50, fontSize:40}}
        color="grey"
        size={30}
        icon="calendar"
      />
      {resultdata.map((item, index) => {
        return (
          <Card style={styles.cardTable} key={index}>
            <DataTable rowHeight={30}>
              <DataTable.Header  style={styles.tableHeader}>
                <Text style={{paddingTop: 6}}>{item.net_stale.type == 'National' ? 'Indonesia' :item.net_stale.type } </Text>

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
              </DataTable.Header>

              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell  style={styles.tableRightBorder}>
                  <Text style={styles.clrL}>Net Sales</Text>
                </DataTable.Cell>
                <DataTable.Cell  style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.net_stale.val}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              
              <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
              
              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell style={styles.tableRightBorder}>
                  <Text style={styles.clrL}>ADS</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.tableColumn}>
                <Text style={styles.textSize}>{item.ADS.val}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
              <DataTable.Row style={styles.tableRow}>
                <DataTable.Cell style={styles.tableRightBorder}>
                  <Text style={styles.clrL}>SSSG %</Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.tableColumn}>
                <Text style={styles.textSize}> {item.SSSG.val}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              
              <Collapsible
                collapsed={
                  index == 0
                    ? iscollaps
                    : index == 1
                    ? iscollaps1
                    : index == 2
                    ? iscollaps2
                    : iscollaps3
                }
                align="center"
              >
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>SSTG</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.SSTG.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>ADT</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.ADT.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>APC</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.APC.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>WoW SSSG %</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.WOWSSSG.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>MoM SSSG %</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.MOMSSSG.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>DineIn Net Sales</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.DINEINNETSALES.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>DineIn ADS</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.DINEINADS.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DashedLine dashLength={5}  style={{width:'43%', backgroundColor:'#ee7602'}} dashStyle={{ borderRadius: 5, marginLeft:5, width:8.7, backgroundColor:'#d5cfcf' }} dashThickness={1} />
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={styles.tableRightBorder}>
                    <Text style={styles.clrL}>Delivery %</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableColumn}>
                  <Text style={styles.textSize}>{item.DELIVERYPERCENT.val}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </Collapsible>
            </DataTable>
          </Card>
        );
      })}
      <DateTimePickerModal
        isVisible={open}
        mode="date"
        maximumDate={new Date()}
        textColor="#f5a04c"
        color="#f5a04c"
        onConfirm={onConfirmSingle}
        onCancel={onDismissSingle}
      />
      </TouchableOpacity>
    </ScrollView>
    
  );
};
export default DayScreen;
