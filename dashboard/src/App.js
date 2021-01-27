
/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OrderCard from './components/OrderCard';
import Search from './Search';

function App() {
  const [queryData, setQueryData] = useState(null);
  const [selectedPage, setSelectedPage] = useState('dashboard');

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${'/assets/snap-n-fit.jpg'})`,
        backgroundRepeat: 'repeat',
      }}
    >
      <Navbar fixed="top" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      {/* <DashTabs /> */}
      {selectedPage === 'dashboard' ? <OrderCard queryData={queryData} setQueryData={setQueryData} selectedPage={selectedPage} setSelectedPage={setSelectedPage} /> : null}
      {selectedPage === 'database' ? <Search selectedPage={selectedPage} setSelectedPage={setSelectedPage} /> : null}
    </div>
  );
}


export default App;
