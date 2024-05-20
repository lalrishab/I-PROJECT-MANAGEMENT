import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ToDo = () => {
  const { projectId } = useParams(); 
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let storedTodos = localStorage.getItem(`todos_${projectId}`);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([]);
    }
  }, [projectId]);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem(`todos_${projectId}`, JSON.stringify(updatedTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    if (t) {
      setTodo(t.todo);
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos
    
    const newTodo = { id: uuidv4(), todo: todo.trim(), isCompleted: false }; // Trim whitespace from todo
    
    // Update state with the new todo
    setTodos(prevTodos => [...prevTodos, newTodo]);
    
    // Update local storage with the updated todos array
    saveToLS(prevTodos => [...prevTodos, newTodo]);

    // Clear the input field after adding the todo
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  };

  return (
    <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]'>
      <div className='my-5'>
        <h2 className='text-lg font-bold'>Add Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
        <button onClick={handleAdd} disabled={todo.trim().length === 0} className='bg-violet-800 hover:bg-violet-700 p-3 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
      </div>

      <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className='Todos'>
        {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className='Todo flex w-1/4 my-3 justify-between'>
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className='buttons flex h-full'>
              <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-700 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-700 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default ToDo;
