import React, { useState, useEffect } from "react";
import {useParams} from 'react-router';
import { useNavigate,Link  } from "react-router-dom";
import UserService from "../../../services/user.service";
import EventBus from "../../../common/EventBus";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RtmRecordList = () => {
    const {id} = useParams()
    const [content, setContent] = useState([]);
    const [getValue, setGetValue] = useState('');
    async function getData(key) {
      try {
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

    
  function LoadRecords(user) { 
    UserService.getRtmCategories(id,user).then(
      (response) => {
        console.log(response.data)
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


    /* const {data: movie, isPending} = useFetch('https://my-json-server.typicode.com/haithemaraissia/myjsonserver/movies/' + id);

    const navigate = useNavigate();

    const handleClick = () => {
        fetch('https://my-json-server.typicode.com/haithemaraissia/myjsonserver/movies/' + movie.id, {
          method: 'DELETE'
        }).then(() => {
            navigate('/');
        }) 
    } */

    return (
        /* {<div className="Details">
            {isPending && <div>Loading...</div>}
            {movie && (
                <article>
                   <div className="id"> ID: {movie.id}</div> 
                     <div className="Date">Patient ID: {movie.Date}</div> 
                    <div className="rtmProviderCategoryId">RMT Provider Category ID: {movie.rtmProviderCategoryId}</div> 
                    <div className="ProviderId">Patient ID: {movie.ProviderId}</div> 
                    <div className="Value">Patient ID: {movie.Value}</div> 

                {<button onClick={handleClick}>delete</button>}
                </article>
            )}
            
        </div> }*/

        <div className="Details">
        {{content} && content.map((movie)=> (
                <div className='List' key={movie.id}>
                   <div className="id"> ID: {movie.id}</div> 
                     <div className="patientId">Patient ID: {movie.patientId}</div> 
                    <div className="rtmProviderCategoryId">RTM Provider Category ID: {movie.rtmProviderCategoryId}</div> 
                  
                  {/*   <div className="rtmRecords">RTM Records: {movie.rtmRecords}</div> */}

                    <div className="title">Title: {movie.title}</div> 
                    <div className="right">
                        <Link to={`/rtmrecordlist/${movie.id}`}>See Records</Link>
                        
                    </div> 
                   <p><br/></p>
                </div> 
        ))}

      </div> 


      );
}
 
export default RtmRecordList;