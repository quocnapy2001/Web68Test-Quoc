import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => {
  return (
    <div className="App">
        <TodoList />
      <Footer />
    </div>
  );
};
