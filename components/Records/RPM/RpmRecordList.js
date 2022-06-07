import React, { useState, useEffect } from "react";
import {useParams} from 'react-router';
import { Link } from "react-router-dom";
import UserService from "../../../services/user.service";
import EventBus from "../../../common/EventBus";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RpmRecordList = () => {
  const { pci, pid} = useParams()
  const [content, setContent] = useState([]);
  const [pri, setPri] = useState([]);
  const [getValue, setGetValue] = useState('');
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // process error
    }
  }

 function LoadRecords(user) {
      UserService.getRpmRecords(pci,user).then(
        (response) => {
          if ( response.data[0] != null)
          {
            setPri(response.data[0].providerId);
          }
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
      LoadRecords(user);  
    }
    fetchData();
   
  }, []);

  const handleDelete = async(id) =>{
    let user = await getData('user');
    setGetValue(user);
    console.log(user)
    UserService.deleteRpmRecord(id, pci, pid,user).then((data) => {
           LoadRecords(user);
    })
  }

    return (
    <div>
      <div className="right">
        <Link to={`/createrpm/${pri}/${pci}/${pid}`}>Add Record</Link>
      </div>    
      <div className="Details">
            {content && content.map((record)=> ((
                <article  key={record.id}>
                   <div className="id"> ID: {record.id}</div> 
                     <div className="Date">Date: {moment(record.date).format("MM-DD--YYYY")}</div> 
                    <div className="PatientCategoryId">Patient Category ID: {record.patientCategoryId}</div> 
                    <div className="ProviderId">Provider ID: {record.providerId}</div> 
                    <div className="Value">Value: {record.value}</div> 
                    <button onClick={() => handleDelete(record.id)}>delete</button>
                    <Link to={`/editrpm/${record.id}/${record.providerId}/${pci}/${pid}`}>edit</Link>
                    <p></p>
                </article>
             )))}
      </div>
    </div>
    );
}
 
export default RpmRecordList;