import React, { useState, useEffect } from "react";

export const Custommodal = (data, fields) => {
  const [updatedData, setUpdatedData] = useState(data);
  console.log("data in custom modal is ", data, fields);
  return (
    <div className="modal">
      {fields?.fields.map((field) => {
        field.type == "input" ? (
          <input />
        ) : field.type == "dropdown" ? (
          <div class="dropdown">
            <button class="dropbtn">dropdown</button>
            <div class="dropdown-content">
              <a>dp content</a>
            </div>
          </div>
        ) : (
          <h4>Input type not handled</h4>
        );
      })}
    </div>
  );
};
