import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Input from '../component/Input';

const SaveTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = useParams();
  const { tasks, taskToEdit } = location.state;

  const [editTask, setEditTask] = useState(taskToEdit);

  const handleSaveTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editTask;
    
    navigate('/', { state: { tasks: updatedTasks } });
  };

  return (
    <div className="flex flex-col items-center border-gray-400 focus:ring-gray-300 
      foucs:ring-offset-1 justify-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <div className="w-[50vw]">

        <Input 
          type="text"
          value="editTask"
          onChange={(e) => setEditTask(e.target.value)}
          className=" w-full px-2 py-1 border border-gray-400 rounded-md "
        />
        <button
          onClick={handleSaveTask}
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mt-3 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SaveTask;