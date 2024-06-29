import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'antd';
import moment from 'moment';

const CalendarPage = () => {
  const navigate = useNavigate();
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  const handleBack = () => {
    navigate('/Homepage'); 
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const dayTodos = todos.filter(todo => {
      if (todo.routine) {
        return moment(formattedDate).day() === moment().day(todo.dayOfWeek).day();
      } else {
        const todoStartDate = moment(todo.startDate, 'YYYY-MM-DD HH:mm');
        const todoEndDate = moment(todo.endDate, 'YYYY-MM-DD HH:mm');
        return value.isBetween(todoStartDate, todoEndDate, null, '[]');
      }
    });

    return (
      <ul className="events">
                {dayTodos.map((item, index) => (
          <li key={index}>
            <span>{item.title}</span>
            <br />
            <span> {item.routine} - {item.routine ? `${item.startTime} - ${item.endTime}` : `${item.startDate} to ${item.endDate}`}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Calendar Page</h1>
        <Button type="primary" onClick={handleBack}>Back to Homepage</Button>
      </div>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default CalendarPage;


