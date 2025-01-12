import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Box, Edit, Trash2 } from 'lucide-react';
import Input from '../component/Input';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        task: newTask,
        date: new Date().toLocaleString(), 
      };

     
      setTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setNewTask(''); 
    }
  };

 
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

 
  const handleEditTask = (index) => {
    navigate(`/update/${index}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl text-gray-800 font-bold mb-4">Task Tracker</h1>

      <div className="flex gap-5">

        < Input
          type="text"
          placeholder="Write a task"
          className="border border-gray-200 rounded-md focus:outline-none px-3 py-1  ring-offset-gray-200 focus:ring-gray-300"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="flex items-center gap-3 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 justify-center"
          onClick={handleAddTask}
        >
          <Plus size={24} />
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <Box className="h-16 text-gray-500" />
          <p className="text-gray-600 mt-2 font-mono">No tasks yet!</p>
        </div>
      ) : (
        <div className="mt-5">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="border border-gray-200 outline outline-1 outline-gray-200 
              p-1 flex justify-between items-center bg-white rounded-lg shadow-md mb-2"
            >
              <div className="flex flex-col">
                <span>{task.task}</span>
                <span className="text-sm text-gray-500">{task.date}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTask(index)}
                  className=" text-blue-600 px-2 py-1 rounded-md  hover:bg-gray-50"
                >
                  <Edit className="h-5" />
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="text-red-600 px-2 py-1 rounded-lg hover:bg-gray-50"
                >
                  <Trash2 className="h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
