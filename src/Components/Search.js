import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Styles/App.css";

export default function Search(value) {

  return (

    <input
      className="search"
      placeholder="Search?"
      value={value.value}
      onChange={value.onChange}
      style={{width:"40%"}}
    />

  );

}