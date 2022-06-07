// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button,TouchableWithoutFeedback,Pressable } from 'react-native';

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
/* import { Link } from 'react-router-dom' */
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const RpmRecordListScreen = ({ route, navigation }) => {

    const [content, setContent] = useState([]);
    const [getValue, setGetValue] = useState('');
    const { pci, pid } = route.params;
    const [pri, setPri] = useState([]);

    function LoadRecords(user) {
        UserService.getRpmRecords(pci,user).then(
          (response) => {
            if ( response.data[0] != null)
            {
              setPri(response.data[0].providerId);
            }
            setContent(response.data);
            console.log(response.data);
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


    const categoryHandle = (item) => {
    console.log(item)
    alert(item.id);
    
    }

    const handleDelete = async(id) =>{
        let user = await getData('user');
        setGetValue(user);
        console.log(user)
        UserService.deleteRpmRecord(id, pci, pid,user).then((data) => {
            LoadRecords(user);
        })
    }


    const onPress = ()=>{
        
    }


    const  _onDeletePressButton= async(navigation,item)=> {
      let user = await getData('user');
      setGetValue(user);
      console.log(user)
      UserService.deleteRpmRecord(item.id, pci, pid,user).then((data) => {
             LoadRecords(user);
      })
      }

    const  _onEditPressButton= (navigation,item)=> {
      console.log('item + ' + item.id);
      console.log('pci + ' + pci);
      console.log('pid + ' + pid);
      /*   alert('You tapped the button!', item.id)
        alert(item.id);
 */

        navigation.navigate('EditRecord', {
          id: item.id,
          pci: pci,
          pid: pid,
        });
      }

      
    const  _onAddPressButton= (navigation)=> {
/*       console.log('item + ' + item.id);
      console.log('pci + ' + pci);
      console.log('pid + ' + pid); */
      /*   alert('You tapped the button!', item.id)
        alert(item.id);
 */

        navigation.navigate('AddRecord', {
          pri: pri,
          pci: pci,
          pid: pid,
        });
      }


    const Item = ({ title }) => (
    <View style={styles.item}>
        <Button style={styles.title} title={title}></Button>
    </View>
    );


    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={ () => categoryHandle(item)}>
            <View style={styles.item}>
         
                <Text style={styles.title} >Value: {item.value}</Text>     
                <Text style={styles.title} >Date: {moment(item.date).format("MM-DD--YYYY")}</Text>


    <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={ () =>_onEditPressButton(navigation,item)}
            title="Edit"
          />
          <Button
            onPress={ () =>_onDeletePressButton(navigation, item)}
            title="Delete"
            color="#841584"
          />
        </View>


                </View>
        </TouchableWithoutFeedback>
);


    async function getData(key) {
      try {
      /*   console.log("authentcation token" +  authState.token) */
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (e) {
        // process error
      }
    }
  
  
  useEffect(() => {
    async function fetchData() {
      let user = await getData('user');
      setGetValue(user);
      console.log(user);
      LoadRecords(user);  
    }
    fetchData();
   
  }, []);

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.AddButton}>
          <Button
            onPress={ () =>_onAddPressButton(navigation)}
            title="Add"
          />
          </View>
      <FlatList style={styles.flatlist}
        data={content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  flatlist: {
      marginTop: 35
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
  }
});

export default RpmRecordListScreen;
