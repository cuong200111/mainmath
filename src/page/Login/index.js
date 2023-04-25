import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Mycontext } from '../Layout';

const Login = (props) => {

  const value = useContext(Mycontext)

  const [isChecked, setIsChecked] = useState([]);
  const [items, setItems] = useState(["item 1", "item 2", "item 3"]);

  const location = useLocation()

  useEffect(() => {
    value.setShow(false)
    return () => {
      return value.setShow(true)
    };

  }, [location])
  const handleDeleteClick = () => {
    const filteredItems = items.filter((item, index) => {

      return !isChecked[index];
    });

    setItems(filteredItems);
  }
  const handleCheck = (e, index) => {
    const checked = e.target.checked;
    setIsChecked(prevState => {

      const newState = [...prevState];
      newState[index] = checked;
      return newState;
    });
  }
  return (
    <div>
      {items.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            onChange={(e) => { handleCheck(e, index) }}
          />
          {item}
        </label>
      ))}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );


}

export default Login