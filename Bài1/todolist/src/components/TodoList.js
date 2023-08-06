import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Form from "./Form/Form";
import TodoListHeader from "./Header/TodoListHeader";
import Checkbox from "./features/Checkbox";
import { useTranslation } from 'react-i18next';

const getStoredTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  const storedDueDates = JSON.parse(localStorage.getItem("dueDates")) || {};
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];
  return tasks.map((task) => ({
    ...task,
    dueDate: storedDueDates[task.task] ? new Date(storedDueDates[task.task]) : null,
  }));
};

const getStoredTaskCount = () => {
  const storedTaskCount = localStorage.getItem("taskCount");
  return storedTaskCount ? parseInt(storedTaskCount) : 0;
};

const TodoList = () => {
  const [todos, setTodos] = useState(getStoredTasks());
  const [taskCount, setTaskCount] = useState(getStoredTaskCount());
  const [showOnlyNotFinished, setShowOnlyNotFinished] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const mountedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const withDoneParam = searchParams.get("withDone");
    // Update the showOnlyNotFinished state based on the "withDone" URL parameter
    setShowOnlyNotFinished(withDoneParam !== "1");
  }, [searchParams]);

  useEffect(() => {
    // Update the URL parameter based on the showOnlyNotFinished state
    const updatedSearchParams = new URLSearchParams();
    updatedSearchParams.set("withDone", showOnlyNotFinished ? "0" : "1");
    // Update the URL without reloading the page
    if (searchParams.get("withDone") !== updatedSearchParams.get("withDone") && mountedRef.current) {
      navigate(`?${updatedSearchParams.toString()}`);
    }
  }, [showOnlyNotFinished]);

  useEffect(() => {
    localStorage.setItem("taskCount", taskCount);
  }, [taskCount]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const addTodo = (task, dueDate) => {
    const newTodo = {
      task,
      dueDate: dueDate ? new Date(dueDate) : null,
      done: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("tasks", JSON.stringify(updatedTodos));
    setTaskCount((prevCount) => prevCount + 1);

    // Save the dueDate to local storage
    if (dueDate) {
      const storedDueDates = JSON.parse(localStorage.getItem("dueDates")) || {};
      storedDueDates[newTodo.task] = newTodo.dueDate;
      localStorage.setItem("dueDates", JSON.stringify(storedDueDates));
    }
  };

  const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
    localStorage.setItem("tasks", JSON.stringify(updatedTodos));

    // Update the task count based on the done status of the task
    if (updatedTodos[index].done) {
      setTaskCount((prevCount) => prevCount - 1);
    } else {
      setTaskCount((prevCount) => prevCount + 1);
    }
  };

  const handleCheckboxChange = () => {
    setShowOnlyNotFinished((prevState) => !prevState);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    const deletedTodo = updatedTodos.splice(index, 1)[0];
    setTodos(updatedTodos);
    localStorage.setItem("tasks", JSON.stringify(updatedTodos));
  
    // Update the task count based on the deleted task
    if (!deletedTodo.done) {
      setTaskCount((prevCount) => prevCount - 1);
    }
  };

  // Filter the tasks based on the showOnlyNotFinished state
  const filteredTodos = showOnlyNotFinished
    ? todos.filter((todo) => !todo.done)
    : todos;

    const { t } = useTranslation(); 

  return (
    <div className="container">
      <TodoListHeader taskCount={taskCount} />
      <div className="checkbox-container">
        <Checkbox
          label={t("checkBoxLabel")}
          checked={showOnlyNotFinished}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="todo-list-container">
        {filteredTodos.map((todo, index) => (
          <div
            key={index}
            className={`todo-item-container ${todo.done ? "done" : ""}`}
          >
            {todo.done ? (
              <FaRegCheckCircle color="#9a9a9a" className="item-done-button" onClick={() => toggleDone(index)} />
            ) : (
              <FaRegCircle className="item-done-button" color="#9a9a9a" onClick={() => toggleDone(index)}/>
            )}
            <div className="itemList">
              <div className="item-title">{todo.task}</div>
              {todo.dueDate !== null && (
                <div className="item-duedate">
                  {t("dueDate")}: {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(todo.dueDate))}
                </div>
              )}
              <button className="item-delete-button" onClick={() => handleDeleteTodo(index)}>{t("delete")}</button>
            </div>
          </div>
        ))}
        <div className="form-container">
          <Form addTodo={addTodo} />
        </div>
      </div>
    </div>
  );
};

export default TodoList;