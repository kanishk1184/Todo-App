import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import edit from "./assets/edit.svg";
import del from "./assets/delete.svg"

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    let items = localStorage.getItem("todos");
    if (items != null && items != undefined){
      items = JSON.parse(items);
      setTodos(items);
    }
  }, [])

  const saveItem = (nT)=>{
    localStorage.setItem("todos", JSON.stringify(nT));
  }
  


  const handleChange = (e)=>{
    setTodo(e.target.value);
  };
  const handleAdd = ()=>{
    if (todo != ""){
      const newTodos = [...todos, {id: uuidv4(), text: todo}];
      setTodos(newTodos);
      saveItem(newTodos);
      setTodo("");
    }
  };
  const handleEdit = (id)=>{
    const element = todos.filter(item=>{
      return item.id === id;
    });
    setTodo(element[0].text);
    handleDelete(id);
  };
  const handleDelete = (id)=>{
    let newTodos = todos.filter((item)=>{
      return item.id !== id
    });
    setTodos(newTodos);
    saveItem(newTodos);
  };

  return (
    <>
      <div className="container mx-auto p-1 flex flex-col justify-center items-center">
        <h1 className='text-center text-5xl text-white'>Todo App</h1>
        <div className="app flex flex-col justify-center min-h-screen py-5 w-[85vw]">
          <div className="add flex justify-center px-11 gap-5">
            <input type="text" name="addTodo" onChange={handleChange} className='bg-slate-500 border-gray-50 placeholder:px-3 px-3 rounded-lg text-white placeholder:text-gray-400 w-3/4 focus:outline-none focus:bg-slate-700 transition-all' placeholder='Enter Your Todo' value={todo}/>
            <button className='text-white bg-gray-500 w-20 text-lg h-max rounded-lg py-1 hover:bg-slate-700 transition-all' onClick={handleAdd}>Save</button>
          </div>
          <div className="todos">
            {todos.map((item)=>{
              return (
                <div key={item.id} className="todo flex justify-between px-10 my-5 items-center">
                  <div className="text text-white w-1/2 break-words">{item.text}</div>
                  <div className="buttons flex justify-center items-center gap-5">
                    <button onClick={()=>{handleEdit(item.id)}} className='text-white bg-gray-500 w-12 h-10 text-lg rounded-lg py-1 hover:bg-slate-700 transition-all flex justify-center items-center'><img src={edit} alt="" className='w-6'/></button>
                    <button onClick={()=>{handleDelete(item.id)}} className='text-white bg-gray-500 w-12 h-10 text-lg rounded-lg py-1 hover:bg-slate-700 transition-all flex justify-center items-center'><img src={del} alt="" className='w-8'/></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
