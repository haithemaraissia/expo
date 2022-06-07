// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Button,TouchableWithoutFeedback } from 'react-native';

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
/* import { Link } from 'react-router-dom' */
import AsyncStorage from '@react-native-async-storage/async-storage';





const RpmCategoryScreen = ({navigation}) => {

    const [content, setContent] = useState([]);
    const [getValue, setGetValue] = useState('');
    /* const { state: authState } = React.useContext(AuthContext);
 */



const categoryHandle = (navigation,item) => {
  console.log(item)
/*    alert(item.id);
 */

   navigation.navigate('RecordsList', {
    pci: item.id,
    pid: item.patientId,
  });
 
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Button style={styles.title} title={title}></Button>
  </View>
);


const renderItem = ({ item }) => (


  <TouchableWithoutFeedback onPress={ () => categoryHandle(navigation,item)}>


 <View style={styles.item}>
 <Text style={styles.title} >{item.title}</Text>
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
  
  /*   useEffect(() => {
      UserService.getRpmCategories(1052).then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
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
    }, []);
   */
  
    useEffect(() => {
  
      async function fetchData() {
          let user = await getData('user');
          setGetValue(user);
          console.log(user)
  
          UserService.getRpmCategories(1052, user).then(
            (response) => {
              setContent(response.data);
            },
            (error) => {
              const _content =
                (error.response &&
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
  
      fetchData();
  
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
  flatlist: {
      marginTop: 35
  }
});

export default RpmCategoryScreen;
