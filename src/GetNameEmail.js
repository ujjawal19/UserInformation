import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
        "Gender": user[0]?.gender,
        "Name": `${user[0]?.name.first} ${user[0]?.name.last}`
      }
      
      setLocaldata((prev) => [_data, ...prev]);
    }
  }, [user])

  return (
    <div className='parent' >
      <span className='title'>User Information</span>
      {user?.map((data,idx) => (
        <div key={idx} className='cardWrapper'>
          <p><span className='key'>Gender:</span> {data.gender}</p>
          <p><span className='key'>Name:</span> {data.name.first}</p>
        </div>
      ))}
      <button onClick={fetchData}>Refersh</button>
      <div className='localDataWrapper' >
        {localdata?.map((data,idx) => (
          <div key={idx}  className='cardWrapper'>
            <p><span className='key'>Gender:</span> {data.Gender}</p>
            <p><span className='key'>Name:</span> {data.Name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetNameEmail;