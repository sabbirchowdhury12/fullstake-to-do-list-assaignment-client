import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import Modal from "./modal";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  //get all tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [modal]);

  //delete a task
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  //   update task
  const handleUpdate = (task) => {
    setUpdateTask(null);
    setUpdateTask(task);
    setModal(true);
  };
  return (
    <div className="w-full bg-gray-900  min-h-screen pt-20 px-4">
      <div className=" flex justify-between items-center mx-4 ">
        <h2 className="text-white pt-5 text-2xl font-bold">TO-DO LIST</h2>
        <button
          onClick={() => setModal(true)}
          className="bg-white py-1 px-2 font-bold rounded flex items-center"
        >
          <MdAdd size={24} />
          ADD TASK
        </button>
      </div>

      <div className="w-full block  ">
        <div className=" overflow-auto lg:overflow-visible ">
          <table className="table w-full mx-4 text-gray-400 border-separate space-y-6 text-sm">
            <thead className="w-full bg-gray-800 text-gray-500">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Deu Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr className="bg-gray-800" key={task.id}>
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <div className="ml-3">
                        <div className="">{task.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-bold w-1/2">{task.description}</td>
                  <td className="p-3">{task.dueDate}</td>

                  <td className="p-3">
                    <span className="bg-green-600 text-gray-50 rounded-md px-2 py-1">
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 flex justify-center items-center">
                    <button
                      onClick={() => handleUpdate(task)}
                      className="text-gray-400 hover:text-gray-100 mr-2"
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(task?.id)}
                      className="text-gray-400 hover:text-gray-100  mx-2"
                    >
                      <MdDelete size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          setModal={setModal}
          updateTask={updateTask}
          setUpdateTask={setUpdateTask}
        />
      )}
    </div>
  );
};

export default HomePage;
