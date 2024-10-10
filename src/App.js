import React, {useEffect, useState} from 'react' 
import cong from "./index"
import { getDatabase, ref, onValue, push, set } from "firebase/database";


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(cong);
    
    // Reference to the specific collection in the database
    const collectionRef = ref(database, "messages");

    

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };
    
    // Fetch data when the component mounts
    fetchData();
  }, []);

  
  return (
    <div>
      <h1>WG Website</h1>
      <form>
        <input type='text' placeholder='Was brauchen wir noch?'></input>
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
