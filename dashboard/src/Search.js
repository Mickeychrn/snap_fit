/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React, { useState } from 'react';
import TyresTableCard from './components/TyresTableCard';

function Search() {
  const [queryData, setQueryData] = useState(null);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${'/assets/snap-n-fit.jpg'})`,
        backgroundRepeat: 'repeat',
      }}
    >
      {/* <DashTabs /> */}
      <TyresTableCard queryData={queryData} setQueryData={setQueryData} />
    </div>
  );
}

export default Search;
