import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import Detailcredit from './components/detailcredit';
import NotFound from './components/NotFound';
import Simulate from './components/Simulate';
import Evaluate from './components/Evaluate';
import NewCredit from './components/NewCredit';
import Credit from './components/Credit';
import Register from './components/Register';
import Login from './components/Login';
import ListCredit from './components/ListCredit';
import Detailuser from './components/Detailuser';
import { useEffect } from 'react';





const App = () => {
  
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="" element={<Home/>} />
              <Route path="/credit" element={<Credit/>} />
              <Route path="/credit/new" element={<NewCredit/>} />
              <Route path="/simulate" element={<Simulate/>} />
              <Route path="/evaluate" element={<Evaluate/>} />
              <Route path="/credit/list" element={<ListCredit/>} />
              <Route path="/detailuser" element={<Detailuser/>} />
              <Route path="/detailcredit" element={<Detailcredit/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
