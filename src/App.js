import React, {useEffect, useState} from 'react' 
import cong from "./index"
import { getDatabase, ref, onValue, set } from 'firebase/database';


const App = () => {
  const [data, setData] = useState([]);
  const [itemList, setItemList] = useState({});
  const [count, setCount] = useState(0);
  const placeholder = "Was brauchen wir noch?";
  const [item, setItem] = useState(placeholder);
  const database = getDatabase(cong);
  const messageRef = ref(database, "messages");
  
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
/*     setItemList(...itemList, item); */
    itemList[count] = item;
    set(messageRef, itemList);
    setItem(placeholder);
  };

  const removeItem = (index) => {



    delete itemList[index];
    setCount(count - 1);
    set(messageRef, itemList);
  };


  
  return (
    <div className='bg-gradient-to-t from-pink-400 to-pink-100 flex w-full flex-col h-screen justify-between items-center text-center'>
      <h1 className='mt-32 text-3xl font-semibold '>WG Wünsche</h1>
      <ul className='mt-36 flex-col flex items-start'>
        {data.map((item, index) => (
          <li key={index} className='flex items-center justify-start w-80 h-11'>
            <input className='rounded-full peer' type="checkbox" id={item} ></input>
            <label className='ml-5 text-xl tracking-wider peer-checked:line-through w-full text-left' for={item}>{item}</label>
            <button onClick={() => removeItem(index)} className='text-2xl hover:text-red-500 hover:text-3xl cursor-pointer active:text-2xl'>x</button>
            </li>
        ))}
      </ul>
      <form className='mb-16' onSubmit={addItem}>
        <input className='w-64 bg-white border-2 border-pink-600 rounded-full h-11 p-5 text-gray-600' type='text' placeholder={item} value={item} onFocus={(e) => {e.target.value = '';}} onChange={(e) => {setItem(e.target.value); setCount(count+1)}}></input>
        <button className='bg-white w-11 h-11 ml-6 text-black rounded-full border-pink-600 border-2' type='submit'>&gt;</button>
      </form>
    </div>
  );
}

export default App
