/* eslint-disable react/jsx-filename-extension */
import './style.css';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import TyresTable from './TyresTable';
import SearchBar from './SearchBar';

const TyresTableCard = (props) => {
  const [queryData, setQueryData] = useState(null);

  if (props.queryData) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Search tyres by clicking column titles, or by typing below</Card.Title>
          <SearchBar queryData={queryData} setQueryData={setQueryData} />
          <TyresTable queryData={queryData} />
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>Search all tyres</Card.Title>
        <SearchBar queryData={queryData} setQueryData={setQueryData} />
        <TyresTable queryData={queryData} />
      </Card.Body>
    </Card>
  );
};

export default TyresTableCard;
