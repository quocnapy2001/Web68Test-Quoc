import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const Form = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "" || dueDate === null) {
      alert("Please enter a task and due date.");
      return;
    }
    addTodo(task, dueDate.toISOString());
    setTask("");
    setDueDate(null);
    setSelectedDate(new Date());
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    if (dueDate === null) {
      return t("dueDatePlaceholder");
    }
    return `${day}/${month}/${year}`;
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setDueDate(date);
    setShowCalendar(false);
  };

  const handleClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="taskInput"
          placeholder={t("taskInputPlaceholder")}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          type="button"
          className="dateInput"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {formatDate(selectedDate)}
        </Button>
        <button type="submit">{t("submit")}</button>
      </form>
      {showCalendar && (
        <div className="calendar-container" ref={calendarRef}>
          <Calendar
            onChange={(date) => handleSelectDate(date)}
            value={selectedDate}
            className="form-control"
          />
        </div>
      )}
    </>

  );
};

export default Form;