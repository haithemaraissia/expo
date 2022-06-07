import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {

 const [currentUser, setCurrentUser] = useState("");

 useEffect(() => {
     async function fetchData() {
        await AuthService.getCurrentUser().then((data) => {
        const result = JSON.parse(data)
        setCurrentUser(result) 
    }, [])
  }

  fetchData();

}, []);

  return (
    <div className="container">
   <header className="jumbotron">
        <h3>
       {currentUser && ( 
        <strong>Profile: {currentUser.token} </strong> )}
        </h3>
      </header>
    </div>
  );
};

export default Profile;
