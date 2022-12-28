import React, {useEffect} from 'react'
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-paper';
import { Image, View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-community/async';
import AsyncStorage from '@react-native-community/async-storage';

import SyncStorage from 'sync-storage';
import SnackBar from 'react-native-snackbar-component'
import logobk from '../../assets/Burger-King.png'
import config from '../../config'

const styles = StyleSheet.create({
    container: {
    //    paddingTop: 23,
      backgroundColor: "#fff",
      height:"100%",
      fontFamily:"Flame-Regular"
    },
    containera:{
        // height: "100%",
        backgroundColor: "#fff"
    },
    header:{
      width:'40%',
      marginTop:120,
      margin:'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    loginText:{
        margin: 'auto',
        marginTop:25,
        fontSize:30,
        color: "#f5a04c",
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    image:{
       width: 300,
      margin:'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    //   marginTop: 100
    },
    input: {
      width: '90%',
      marginTop:10,
       margin: 'auto',
       marginLeft: 'auto',
        marginRight: 'auto'
    },
    submitButton: {
       backgroundColor: '#fff',
       padding: 10,
       margin: 15,
       height: 40,
    },
    btnrow:{
        width: '90%',
        marginTop:20,
        margin: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    lbtn:{
        padding:10
    },
    inputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#d7d7d7'
      },
    submitButtonText:{
       color: 'white'
    },
    snackbar:{
       width:"90%",
       margin: 'auto',
       marginLeft: 15,
       marginRight: 'auto'
    }
 })

const Login = ({navigation}) => {
   const [email, setEmail] = React.useState('');
   const [passwordVisible, setPasswordVisible] = React.useState(true);
   
   const [password, setPassword] = React.useState('');
   const [errmsg, setErrmsg] = React.useState('');
   const [isopen, setIsopen] = React.useState(false);
   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const btnEnable = (password.length >= 2 )
   
   const goToLogin = async () => {
    const conf = await config();
    const url = conf.apiUrl + "/user/userLogin" //"http://localhost:3001/v1/api/users/login"//"http://bkadmin.in/indoapp/user/userLogin"
    const data = { "userName": email, "passWord": password }
    
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
        if(data.success){
         console.log('data.message= ',data.message)

         AsyncStorage.setItem('userdetails', data.message);
         AsyncStorage.setItem('useremail', data.message.email);
         AsyncStorage.setItem('usertoken', data.message.token)
         navigation.navigate('selectbrand') 
        }else{
         setErrmsg(data.message)
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
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" style={{height:100}} 
          showHideTransition={1} animated={true} backgroundColor="#f5a04c" />
          <View style={styles.containera}>
         <View style={styles.header}>
            <Image source={logobk}  style={{ width: 150, height: 150 }} />
         </View>
         
         <Text style={styles.loginText}>Login</Text>
         <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your Email"
            right={<TextInput.Icon name="email" />}
         />
         <TextInput
            style={styles.input}
            mode="outlined"
            textContentType={'password'} 
            secureTextEntry={passwordVisible}
            multiline={false}
            value={password}
            onChangeText={text =>  setPassword(text)} 
            label="Password"
            placeholder="Password"
            right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}

         />
         <View style={styles.btnrow}>
            {/* <Button
                title="Login"
                color="#f5a04c"
                style={styles.lbtn}
                
                accessibilityLabel="Login"
            /> */}
            <Button uppercase="false" disabled={!btnEnable} labelStyle={styles.submitButtonText} icon="login" style={styles.lbtn}   mode="contained" onPress={() => goToLogin()}>
                Login
            </Button>
         </View>
         <SnackBar visible={isopen} backgroundColor="red" position="top"  containerStyle={styles.snackbar}
            autoHidingTime={2000} textMessage={errmsg} 
            actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="let's go"/>

         </View>
      </View>
   )
}
export default Login

