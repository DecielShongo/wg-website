import React, {useEffect, useState} from 'react' 
import cong from "./index"
import { getDatabase, ref, onValue, push, set } from "firebase/database";


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

  }, []);
  
  const addItem = (event) => {
    event.preventDefault();
    itemList[count] = item;
    set(messageRef, itemList);
    setItem(placeholder);
  };


  
  return (
    <div className='bg-gradient-to-t from-pink-400 to-pink-100 flex w-full flex-col h-screen justify-between items-center text-center'>
      <h1 className='mt-20 text-3xl font-semibold '>WG Wünsche</h1>
      <ul className='mt-40 flex-col flex items-start'>
        {data.map((item, index) => (
          <li key={index}>
            <input className='rounded-full' type="checkbox" id={item} ></input>
            <label className='ml-' for={item}>{item}</label>
            </li>
        ))}
      </ul>
      <form className='mb-16' onSubmit={addItem}>
        <input className='w-56 bg-white border-2 border-pink-600 rounded-full h-10 p-5' type='text' placeholder={item} onChange={(e) => {setItem(e.target.value); setCount(count+1)}}></input>
        <button className='bg-white w-8 h-8 ml-6 text-black rounded-full' type='submit'>&gt;</button>
      </form>
    </div>
  );
}

export default App
