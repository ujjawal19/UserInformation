import React, { useState, useEffect } from 'react'
import axios from 'axios'
const GetNameEmail = () => {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("https://randomuser.me/api/");
    console.log("RESPONSE:", data);
    const user = data.results;
    setUser(user);
  }
  useEffect(() => {
    fetchData();

  }, [])
  console.log("Data :-",user);
  return (
    <div>
      {user.map(user => (
          <div key={user.login.uuid}>
            <h1>Gender: {user.gender}</h1>
            <h1>Name : {user.name.first} {user.name.last}</h1>
          </div>  
        ))}
    </div>
  )
}

export default GetNameEmail;