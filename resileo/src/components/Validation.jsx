import axios from "axios";
import React, { useEffect, useState } from "react";
import "./main.css";


function Validation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  
  console.log(name)
  const handleClick = (e) => {
    e.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
    if (name.length >= 4 && mobile.length === 10 && re.test(email)) {
      
      let data = {
        name,
        email,
        mobile,
        address,
      };

      axios({
        method: "POST",
        url: "https://masai-hotel30.herokuapp.com/users",
        data,
      })
        .then((res) => {
          setFlag(true);
        })
        .then((res)=>{
          getData();
        })
        .then((error) => {});
    } 
    else if (name.length < 4) {
      alert("Name is not 4 digit");
    }
    else if (mobile.length !== 10) {
      alert("Enter the correct mobile number");
    }
    else if (!re.test(email)) {
      alert("Email not valid");
    }

  };

  const getData = () => {
    axios({
      method: "GET",
      url: "https://masai-hotel30.herokuapp.com/users",
    })
      .then((res) => {
        setData(res.data);
      })
      .then((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (flag) {
      getData();
    }
    getData();
  }, [flag]);

  // console.log(data, "kjdgskhghddf")

  return (
    <div id="validation">
      <h1 id="h1">Validation</h1>
      <form id="form">
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <label>Mobile</label>
        <input
          type="number"
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
        />
        <br />
        <div>
        </div>
        <label>Address</label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <br />
        <button 
        id="submit" 
        onClick={handleClick}>
          Submit
        </button>
      </form>

      <div>
        <table id="container">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Validation;
