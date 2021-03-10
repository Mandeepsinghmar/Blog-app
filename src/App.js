
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <Home />
       </div>
  
       <Footer />

    </div>
  )
}

export default App
