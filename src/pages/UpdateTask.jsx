import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../component/Input';

const UpdateTask = () => {
  const { index } = useParams(); 
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToEdit = savedTasks[index];
    if (taskToEdit) {
      setTask(taskToEdit.task); 
    }
  }, [index]);

  const handleSaveTask = () => {
    if (task.trim()) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks[index] = {
        ...savedTasks[index],
        task,
        date: new Date().toLocaleString(), 
      };

     
      localStorage.setItem('tasks', JSON.stringify(savedTasks));

      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl text-gray-800 font-bold mb-4">Edit Task</h1>

      <div className="flex  flex-col gap-5">
        <Input
          type="text"
          placeholder="Edit your task"
          className="flex-1 border border-gray-400 outline-none 
          focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 bg-gray-100  px-3 py-1 rounded-md "
          value="task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="flex  w-full items-center gap-3 bg-blue-700 text-white px-4 py-2 
          rounded-lg transition focus:ring-1  hover:bg-blue-800 justify-center"
          onClick={handleSaveTask}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
