import React from "react";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  function sendData() {
    console.log("dataSend",inputs.name, " ", inputs.email, " ", inputs.password, " ", inputs.password2 );
  }

  function onChange(event){
    setInputs((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
  }

  return (
    <div>
      <form onSubmit={sendData}>
        <h3>Sign up</h3>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter a unique username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            onChange={onChange}
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            placeholder="Re-enter Password"
            required
          />
        </div>
        <br />
        <div className="submitBtn">
          <button type="submit" value="Submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
