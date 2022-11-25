import React, {useEffect} from "react"
import { StyleSheet, ScrollView, Image, Text, View,  ImageBackground } from "react-native"

import { TextInput, ActivityIndicator } from 'react-native-paper';
import SnackBar from 'react-native-snackbar-component'
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import bkimage from '../../assets/img/bkimage.png';
import bkking from '../../assets/Burger-King.png';
import config from '../../config'

const SignIn = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [errmsg, setErrmsg] = React.useState('');
  const [isopen, setIsopen] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const btnEnable = (password.length >= 2 )
   
  const goToLogin = async () => {
    console.log('btnEnable - ',btnEnable)
    // setIsopen(false)
    if (!btnEnable){
      alert('Please enter correct email and password.')
      // setIsopen(true)
      return false
    }
    setIsloading(true);
    const conf = await config();
    const url = conf.apiUrl + "/users/signin" //"http://localhost:3001/v1/api/users/login"//"http://bkadmin.in/indoapp/user/userLogin"
    const data = { "email": email, "password": password }
    console.log('url= ',url)
    alert(url)
    alert(data)
    console.log('data = ',data)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: headers,
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setIsloading(false);
        if(data.type == 'success'){
         console.log('data.message= ',data.user)
         AsyncStorage.setItem('user', JSON.stringify(data.user));
         AsyncStorage.setItem('usertoken', data.user.access_token)
         AsyncStorage.setItem('businesstype', JSON.stringify(data.user.business_type[0]))
         if(data.user.business_type.length>1){
          navigation.navigate('selectbrand') 
         }else{
          navigation.navigate('home', {btype: data.user.business_type[0].name}) 
         }
         
        }else{
          alert(data.message);
        //  setErrmsg(data.message)
         setIsopen(true)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

   }

   const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('useremail')
        
        if(jsonValue != null && jsonValue != '' && jsonValue != undefined){
          navigation.navigate('home') 
        }
        return jsonValue != null ? jsonValue : null;
      } catch(e) {
        console.log(e)
        console.log("There was an error")
      }
    }
   useEffect(() => {
      getData()
    },[])
  return (
    
    <View style={styles.SignIn}>
      <ScrollView style={{backgroundColor: "rgba(255, 255, 255, 1)",}}>
      
      <View style={styles.Group694}>
        <ImageBackground imageStyle={{ backgroundColor: 'rgba(0,0,0,0.5)'}} style={styles.imageback} source={bkimage} resizeMode="cover" >
          
          <View style={styles.logoimg}>
        <Image
          style={styles.Group65818}
          source={bkking}
        />
        </View>
        </ImageBackground>
      </View>
      
      <View style={styles.Group627}>
        <Text style={styles.Txt167}>Welcome Back</Text>
        <View style={styles.Group971}>
          <Text style={styles.Txt278}>
            Enter your email address and password to sign In with Burger king
          </Text>
          <Text style={styles.Txt10910}>Email</Text>
          <View style={styles.Group332}>
            <TextInput
              style={styles.input}
              // mode="outlined"
              // label="Email"
              onChangeText={text => setEmail(text)}
              value={email}
              underlineColor='transparent'
              placeholder="Enter your Email"
              editable={true}
              theme={styles.textInputOutlineStyle}
              // inputContainerStyle={{borderBottomWidth:0, borderBottomColor:'red'}}
              // InputProps={{ disableUnderline: true }}

              // right={<TextInput.Icon name="email" />}
          />
            {/* <Text style={styles.Txt734}>you@gmail.com</Text> */}
          </View>
          <Text style={styles.Txt10910}>Password</Text>
          <View style={styles.Group127}>
          <TextInput
            style={styles.input}
            // mode="outlined"
            textContentType={'password'} 
            borderWidth={0}
            secureTextEntry={passwordVisible}
            multiline={false}
            value={password}
            onChangeText={text =>  setPassword(text)} 
            // label="Password"
            placeholder="Password"
            underlineColor='transparent'
            activeUnderlineColor='transparent'
            // right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}

         />
            
            <Text style={styles.Txtforgot}>Forgot Password?</Text>
          </View>
          
          {/* disabled={!btnEnable} icon="login"*/}
          <Button uppercase="false" disabled={isloading}  labelStyle={styles.submitButtonText}  style={isloading ? styles.lbtndisable: styles.lbtn}   mode="contained" onPress={() => goToLogin()}>
            
            {isloading ? (
              <Text style={styles.Txt4410} uppercase={false} >Sign In... </Text>
            ): (<Text style={styles.Txt4410} uppercase={false} >Sign In </Text>)}
          </Button>
        </View>
      </View>
      <SnackBar visible={isopen} backgroundColor="red" position="top"  containerStyle={styles.snackbar}
            autoHidingTime={2000} textMessage={errmsg} 
            actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="let's go"/>
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  SignIn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    // borderRadius: 30,
    backgroundColor: "rgba(0,0,0,1)",
    // width: 375,
    // height: 812,
  },
  logoimg:{
    backgroundColor: 'rgba(0,0,0,0.5)', textAlign: "center",
    justifyContent: "center",  height:"100%"
  },
  imageback:{
    flex: 1, width:'100%',  justifyContent: "center"
  },
  lbtn:{
    // padding:10,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "rgba(245,130,51,1)",
    
  },
  lbtndisable:{
    // padding:10,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "rgba(245,130,51,7)",
    opacity:.7
  },
  submitButtonText:{
    // color: 'white',
    fontSize: 20,
    // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(248,248,248,1)",
 },
  Group694: {
    position: "absolute",
    top: 0,
    // none: "0px",
    // paddingTop: 101,
    // paddingBottom: 100,
    // paddingLeft: 171,
    // paddingRight: 365,
    backgroundColor: "white",
    /* url(https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vnbz69ayv3-57%3A2453?alt=media&token=293ee81b-8768-4d11-b262-ed567a403cee) */
    width: '100%',
    height: 301,
  },
  Group65818: {
    width: 115.43,
    height: 117.55,
    marginLeft:'auto', 
    marginRight:'auto',
  },

  
  Action: {
    marginRight: 220,
    width: 54,
    height: 18,
  },
  Txt716: {
    fontSize: 15,
    // fontFamily: "sans-serif",
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: -0.2,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    width: 55,
  },

  Container: {
    width: 67,
    height: 11.5,
  },

  Group627: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: 250,
    left:0,
    // marginLeft:8,
    // none: "0px",
    paddingTop: 15,
    paddingBottom: 46,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 30,
    
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: '100%',
    height: 750,
  },
  Txt167: {
    fontSize: 30,
    // fontFamily: "Flame, sans-serif",
    fontWeight: "700",
    color: "rgba(245,130,51,1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  Group971: {
    display: "flex",
    flexDirection: "column",
    
  },
  Txt278: {
    fontSize: 15,
    // fontFamily: "Nunito, sans-serif",
    fontWeight: "500",
    letterSpacing: 0.6,
    color: "#303030",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
    
  },
  Group127: {
    // paddingTop: 15,
    // paddingBottom: 3,
    // paddingLeft: 15,
    // paddingRight: 196,
    marginBottom: 20,
    // borderRadius: 10,
    // backgroundColor: "rgba(242,242,242,1)",
    // width: 317,
    // height: 48,
  },
  Txt711: {
    fontSize: 22,
    // fontFamily: "Proxima Nova, sans-serif",
    fontWeight: "600",
    letterSpacing: 5.94,
    color: "rgba(26,26,26,1)",
  },

  Group8: {
    paddingTop: 16,
    paddingBottom: 14,
    paddingLeft: 126,
    paddingRight: 125,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "rgba(245,130,51,1)",
    shadowColor: "rgba(0,0,0,0.13)",
    elevation: 1,
    shadowOffset: { width: 0, height: 10 },
    // width: 317,
    // height: 60,
  },
  Txt4410: {
    fontSize: 20,
    // fontFamily: "Nunito, sans-serif",
    fontWeight: "600",
    color: "rgba(248,248,248,1)",
    textTransform: 'capitalize'
  },

  Txt10910: {
    fontSize: 14,
    // fontFamily: "Proxima Nova, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
    marginBottom: 6,
  },
  Group332: {
    // paddingTop: 14,
    // paddingBottom: 13,
    // paddingLeft: 14,
    // paddingRight: 187,
    marginBottom: 37,
    // borderRadius: 10,
    // backgroundColor: "rgba(242,242,242,1)",
    // width: 317,
    height: 49,
  },
  Txt734: {
    fontSize: 16,
    // fontFamily: "Proxima Nova, sans-serif",
    fontWeight: "600",
    color: "rgba(26,26,26,1)",
  },
  textInputOutlineStyle:{ 
    colors: { 
       placeholder: 'black', 
      //  text: 'white', 
      primary: 'white',
       underlineColor:'red',    
       
      //  background : "rgba(242,242,242,1)"
  }},
  input: {
    width: '100%',
    height: 49,
    color:'red',
    backgroundColor: "rgba(242,242,242,1)",
    borderColor: "red",
    borderBottomColor:'green',
    marginTop:10,
     margin: 'auto',
     marginLeft: 'auto',
      marginRight: 'auto',
      borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    
  },

  Txt887: {
    fontSize: 16,
    // fontFamily: "Proxima Nova, sans-serif",
    fontWeight: "600",
    letterSpacing: 0.64,
    color: "rgba(24,24,24,1)",
    textAlign: "center",
    justifyContent: "center",
  },

  Txtforgot: {
    fontSize: 16,
    // fontFamily: "Proxima Nova, sans-serif",
    fontWeight: "600",
    letterSpacing: 0.64,
    color: "rgba(24,24,24,1)",
    textAlign: "center",
    justifyContent: "center",
    marginTop:14
  },
})
export default SignIn