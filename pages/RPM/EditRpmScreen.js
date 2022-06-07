
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button,TouchableWithoutFeedback,Pressable,TextInput  } from 'react-native';

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
/* import { Link } from 'react-router-dom' */
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const EditRpmScreen = ({ route, navigation }) => {
    const { id, pci, pid } = route.params;
    const [content, setContent] = useState([]);
    const [date, setDate] = useState([]);
    const [patientCategoryId] = useState([]);
    const [providerId] = useState([]);
    const [value, setValue] = useState([]);
    const [getValue, setGetValue] = useState('');
    async function getData(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (e) {
        // process error
      }
    }

    function LoadSingleRecord(user) {
      UserService.getRpmSingleRecord(id,user).then(
        (response) => {
          setValue(response.data.value);
          let defaultDate = moment(response.data.date).format("YYYY-MM-DD")
          setDate(defaultDate); 
          setContent(response.data);
        },
        (error) => {
          const _content = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
          setContent(_content);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }

    useEffect(() => {
      async function fetchData() {
        let user = await getData('user');
        setGetValue(user);
        console.log(user);
        LoadSingleRecord(user);  
      }
      fetchData();
     
    }, []);

   // const navigate = useNavigate();

    const handleSubmit = async(navigation) => {
      //e.preventDefault();
      let user = await getData('user');
      setGetValue(user);
      console.log(user)

      const record = { date, patientCategoryId, providerId, value };
      record.id = content.id;
      record.date = date;
      record.patientCategoryId = content.patientCategoryId;
      record.providerId =  content.providerId;
      record.value = value;

      UserService.editRmpRecord(JSON.stringify(record),user).then((data) => {
         // navigation.navigate('/rpmrecordlist/'+ pci+'/'+ pid);

                 navigation.navigate('RecordsList', {
            pci: pci,
            pid: pid,
          });

        })
    }

    return (
/*       <div className="edit">
        <h2>Edit Record</h2>
        <form onSubmit={handleSubmit}>
         <label>Date:</label>
         {date && (<input 
            type="date" 
            required 
            placeholder="dd-mm-yyyy" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
         )}
        <label>Value:</label>
          <input 
            type="number" 
            required 
            value={value}
            min="0" 
            onChange={(e) => setValue(e.target.value)}
          /> 
          <p></p>
          <button>Edit Record</button>
        </form>
        


      </div>
 */
      <SafeAreaView style={styles.container}>
      <View>
      <form onSubmit={handleSubmit}>
                  {date && (<TextInput
              style={styles.input}
              onChangeText={(e) => setValue(e)}
              value={date}
              keyboardType="date"
              label="date"
            />  )}
            <TextInput
              style={styles.input}
              onChangeText={(e) => setValue(e)}
              value={value}
              placeholder="value"
              keyboardType="numeric"
              label="value"
            />
            <Button title="Edit" onPress={ () =>handleSubmit(navigation)} />
              </form>
      </View>
      </SafeAreaView>
      
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
  });

  
export default EditRpmScreen;