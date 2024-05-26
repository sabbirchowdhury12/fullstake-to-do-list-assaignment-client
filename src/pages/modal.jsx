/* eslint-disable react/prop-types */
import { useState } from "react";

const Modal = ({ setModal, updateTask, setUpdateTask }) => {
  //set form data dynamacally
  const [formData, setFormData] = useState({
    title: updateTask ? updateTask.title : "",
    description: updateTask ? updateTask.description : "",
    dueDate: updateTask ? updateTask.dueDate : "",
    status: updateTask ? updateTask.status : "",
  });

  // add a task
  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      resetFormData();

      setModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  //handle update a task
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${updateTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      resetFormData();
      setModal(false);
      setUpdateTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  // logical form implement
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask ? handleUpdate() : handleCreate();
  };

  // set form field value
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // reset form
  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: "",
    });
  };

  const handleClose = () => {
    setModal(false);
    setUpdateTask(null);
  };
  return (
    <div>
      <div
        className="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Add Task
            </h1>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Title
              </label>
              <input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="home work"
                required="true"
              />
              <label
                htmlFor="description"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="description"
                required="true"
              />
              <label
                htmlFor="dueDate"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                required="true"
              />
              <label
                htmlFor="status"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                required={true}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              >
                <option>Choose Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                type="submit"
              >
                Create Task
              </button>
            </form>

            <button
              onClick={handleClose}
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
