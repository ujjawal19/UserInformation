import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
const GetNameEmail = () => {
  const [user, setUser] = useState([]);
  const [localdata, setLocaldata] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("https://randomuser.me/api/");
    const user = data.results;
    setUser(user);
  }

  useEffect(() => {
    fetchData();
  }, [])
  console.log(user);
  useEffect(() => {
    if (user.length) {
      console.log("hello", user)
      const _data = {
        "Address": `${user[0]?.location.street.number} ${user[0]?.location.street.name} ${user[0]?.location.city}`,
        "Name": `${user[0]?.name.title} ${user[0]?.name.first} ${user[0]?.name.last}`
      }
      
      setLocaldata((prev) => [_data, ...prev]);
    }
  }, [user])

  return (
    <div className='parent' >
      <div className='heading'>User Information</div>
      {user?.map((data,idx) => (
        <div key={idx} className='cardWrapper'>
          <p><span className='key'>Address:</span> {data.location.street.number} {data.location.street.name}{data.location.city}</p>
          <p><span className='key'>Name:</span> {data.name.title} {data.name.first} {data.name.last}</p>
        </div>
      ))}
      <button onClick={fetchData}>Refersh</button>
      <div className='localDataWrapper' >
        {localdata?.map((data,idx) => (
          <div key={idx}  className='cardWrapper'>
            <p><span className='key'>Address:</span> {data.Address}</p>
            <p><span className='key'>Name:</span> {data.Name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetNameEmail