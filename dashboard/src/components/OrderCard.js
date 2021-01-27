/* eslint-disable react/jsx-filename-extension */
import './style.css';

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import OrderTable from './OrderTable';
import CustomerInfo from './CustomerInfo';

const baseURL = require('./Development');

const OrderCard = (props) => {
  const [viewingCustomerInfo, setViewingCustomerInfo] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // The parameters of the call
    const getParam = { method: 'GET' };

    const query = 'all';
    const searchUrl = `${baseURL}customerData?query=${query}`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then((result) => {
        props.setQueryData(result);
      })
      .catch(() => {
        setFetchError(true);
      });
    // eslint-disable-next-line
  }, []);

  function refreshButtonHandler() {
    // The parameters of the call
    const getParam = { method: 'GET' };

    const query = 'all';
    const searchUrl = `${baseURL}customerData?query=${query}`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then((result) => {
        props.setQueryData(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }

  return (
    <div>
      <div style={{ display: (!fetchError ? 'none' : 'block') }}>
        {/* TODO: Make this more visible} */}
        <h5>There seems to have been an error. Please refresh the page</h5>
      </div>
      <div style={{ display: (viewingCustomerInfo ? 'none' : 'block') }}>
        <Card>
          <Card.Body>
            <Card.Title>
              Active Orders
              <button type="button" id="refreshButton" onClick={refreshButtonHandler}>Refresh</button>
            </Card.Title>
            <OrderTable
              queryData={props.queryData}
              setViewingCustomerInfo={setViewingCustomerInfo}
              setSelectedOrder={setSelectedOrder}
            />
          </Card.Body>
        </Card>
      </div>
      <div style={{ display: (!viewingCustomerInfo ? 'none' : 'block') }}>
        <Card>
          <CustomerInfo
            queryData={props.queryData}
            selectedOrder={selectedOrder}
            setViewingCustomerInfo={setViewingCustomerInfo}
          />
        </Card>
      </div>
    </div>
  );
};

export default OrderCard;
