
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button,TouchableWithoutFeedback,Pressable,TextInput } from 'react-native';

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
/* import { Link } from 'react-router-dom' */
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
//import DatePicker from the package we installed
/* import DatePicker from 'react-native-datepicker'; */

const AddRpmScreen= ({ route, navigation }) => {
    const {pri, pci, pid} = route.params;
    let defaultDate = moment().format("YYYY-MM-DD");
    const [date, setDate] = useState(defaultDate);
    const [patientCategoryId] = useState([]);
    const [providerId] = useState([]);
    const [value, setValue] = useState(75);
    const [getValue, setGetValue] = useState('');






    //const [date, setDate] = useState('09-10-2020');


    async function getData(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (e) {
        // process error
      }
    }


    const handleSubmit = async(navigation ) => {
      /* e.preventDefault(); */

    let user = await getData('user');
    setGetValue(user);
    console.log(user)

    const record = { date, patientCategoryId, providerId, value };
    record.date = date;
    record.patientCategoryId = pci;
    record.providerId = pri;
    record.value = value;

    UserService.createRmpRecord(pci, pid, JSON.stringify(record),user).then((data) => {

/*         navigation.navigate('RecordsList', {
            pri: pri,
            pci: pci,
            pid: pid,
          });
 */
          navigation.navigate('RpmCategory');
      })
    }

    return (
      
        <form>
        {date && (<TextInput
        style={styles.input}
        onChangeText={(e) => setValue(e.target.value)}
        value={date}
        keyboardType="date"
        label="date"
        />  )}
        <TextInput
        style={styles.input}
        onChangeText={(e) => setValue(e.target.value)}
        value={value}
        placeholder="value"
        keyboardType="numeric"
        label="value"
        />
        <Button title="Add"   onPress={ () =>handleSubmit(navigation)} />

   {/*      <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        /> */}
        </form>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#009387',
      color: '#FFFFFF',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      marginTop: 25,
      marginBottom: 25,
      borderRadius: 15
  
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white'
    },
    titleBlack: {
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black'
    },

  
  
  
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      width: '30%'
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    AddButton: {
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      






      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });

 
export default AddRpmScreen;