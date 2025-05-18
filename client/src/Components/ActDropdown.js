import React, { useState, useEffect } from "react";
import { config } from "../utils/config";
import { useSelector } from "react-redux";
import WorkItem from "./WorkItem";

const ActDropdown = (props) => {
  const [workItem, setWorkItem] = useState("");
  const { loggedInUser } = props;
  console.log(loggedInUser);
  const filteredActs = config
    .filter((item) => item.Leads.includes(loggedInUser))
    .map((item) => item.ACT);

  const [selectedAct, setSelectedAct] = useState("");
  const token = useSelector((store) => store.user.userToken);
  console.log("hello", workItem);

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
        body: JSON.stringify({ loggedInUser, token }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      //console.log("Items", data);
      setWorkItem(data);

      //return response.body;
    } catch {}
  };

  return (
    <>
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
      <div>
        {workItem &&
          workItem.issues.map((item) => (
            <WorkItem
              key={item.id}
              assignee={item.fields.assignee.displayName}
              summary={item.fields.summary}
            />
          ))}
      </div>
    </>
  );
};

export default ActDropdown;
