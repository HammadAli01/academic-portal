import React from "react";

import { Dropdown } from "react-bootstrap";
export const Customdropdown = ({
  data,
  selected,
  setCategorySelected,
  titleProperty,
}) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selected[titleProperty]}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {data?.map((item, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => {
                setCategorySelected(item);
              }}
            >
              {item[titleProperty]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
