import React, {useEffect, useState} from 'react' 
import cong from "./index"
import { getDatabase, ref, onValue, set } from "firebase/database";


const App = () => {
  const [data, setData] = useState([]);
  const database = getDatabase(cong);
  const messageRef = ref(database, "messages");
  const [itemList, setItemList] = useState({});
  const [count, setCount] = useState(0);
  const placeholder = "Was brauchen wir noch?";
  const [item, setItem] = useState(placeholder);


  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    
    // Reference to the specific collection in the database

    

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(messageRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values(dataItem);
          setData(displayItem);
          setItemList(displayItem);
        }
      });
    };
    
    // Fetch data when the component mounts
    fetchData();

  }, [messageRef]);
  
  const addItem = (event) => {
    event.preventDefault();
    itemList[count] = item;
    set(messageRef, itemList);
    setItem(placeholder);
  };
  
  return (
    <div>
      <h1>WG Website</h1>
      <form onSubmit={addItem}>
        <input type='text' placeholder={item} onChange={(e) => {setItem(e.target.value); setCount(count+1)}}></input>
        <button type='submit'>Submit</button>
      </form>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <input type="checkbox" id={item}></input>
            <label for={item}>{item}</label>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App
