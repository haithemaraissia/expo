import React, { useState } from "react";
import {useParams} from 'react-router';
import { useNavigate  } from "react-router-dom";
import UserService from "../../../services/user.service";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRpm = () => {
    const {pri, pci, pid} = useParams()
    let defaultDate = moment().format("YYYY-MM-DD");
    const [date, setDate] = useState(defaultDate);
    const [patientCategoryId] = useState([]);
    const [providerId] = useState([]);
    const [value, setValue] = useState(75);
    const [getValue, setGetValue] = useState('');
    async function getData(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (e) {
        // process error
      }
    }
    


    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();

    let user = await getData('user');
    setGetValue(user);
    console.log(user)

    const record = { date, patientCategoryId, providerId, value };
    record.date = date;
    record.patientCategoryId = pci;
    record.providerId = pri;
    record.value = value;

    UserService.createRmpRecord(pci, pid, JSON.stringify(record),user).then((data) => {
        navigate('/rpmrecordlist/'+ pci+'/'+ pid);
      })
    }

    return (
      <div className="create">
        <h2>Add a New Record</h2>
        <form onSubmit={handleSubmit}>
         <label>Date:</label>
          <input 
            type="date" 
            required 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        <label>Value:</label>
          <input 
            type="number" 
            required 
            value={value}
            min="0" 
            onChange={(e) => setValue(e.target.value)}
          /> 
          <p></p>
          <button>Add Record</button>
        </form>
      </div>
    );
}
 
export default CreateRpm;