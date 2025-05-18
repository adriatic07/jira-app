import React, { useState, useEffect } from "react";
import { config } from "../utils/config";
import { useSelector } from "react-redux";

const ActDropdown = () => {
  const filteredActs = config
    .filter((item) => item.Leads.includes("aniket"))
    .map((item) => item.ACT);

  const [selectedAct, setSelectedAct] = useState("");
  const token = useSelector((store) => store.user.userToken);

  //   useEffect(() => {
  //     if (filteredActs.length > 0) {
  //       setSelectedAct(filteredActs[0]); // set default value
  //     }
  //   }, [filteredActs]);

  const fetchTaskFromJira = async () => {
    const query = config.find((item) => item.ACT === selectedAct)?.Query;

    console.log(query);
    try {
      const response = await fetch("http://localhost:5000/fetchItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, query }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.body;
    } catch {}
  };

  return (
    <div style={{ border: "1px solid black", height: "30px" }}>
      <label htmlFor="act-dropdown">Select ACT: </label>
      <select
        id="act-dropdown"
        value={selectedAct}
        onChange={(e) => setSelectedAct(e.target.value)}
        style={{
          width: "80px",
        }}
      >
        <option></option>
        {filteredActs.map((act) => (
          <option key={act} value={act}>
            {act}
          </option>
        ))}
      </select>
      <button
        style={{
          margin: "5px",
          backgroundColor: "lightblue",
          borderRadius: "3px",
        }}
        onClick={() => fetchTaskFromJira()}
      >
        submit
      </button>
    </div>
  );
};

export default ActDropdown;
