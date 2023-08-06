import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "madeBy": "Made by MindX 🔥",
        "availableOn": "Available on:",
        "todoListHeader": "You have {{count}} tasks left!",
        "dueDate": "Due",
        "delete": "Delete",
        "submit": "Submit",
        "checkBoxLabel": "Not finished only",
        "taskInputPlaceholder": "Enter task...",
        "dueDatePlaceholder": "Select Due Date",
      },
    },
    vn: {
      translation: {
        "madeBy": "Được tạo bởi MindX 🔥",
        "availableOn": "Có sẵn trên:",
        "todoListHeader": "Bạn còn {{count}} việc cần làm!",
        "dueDate": "Hạn",
        "delete": "Xóa",
        "submit": "Lưu",
        "checkBoxLabel": "Chỉ việc chưa xong",
        "taskInputPlaceholder": "Nhập việc cần làm...",
        "dueDatePlaceholder": "Chọn ngày đến hạn",
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);