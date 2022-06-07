import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/user.service";
import EventBus from "../../../common/EventBus";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditRpm = () => {
    const { id, pci, pid } = useParams()
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

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
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
          navigate('/rpmrecordlist/'+ pci+'/'+ pid);
        })
    }

    return (
      <div className="edit">
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
    );
}
 
export default EditRpm;