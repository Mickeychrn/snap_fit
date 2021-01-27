/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import DataTable, { memoize } from 'react-data-table-component';

import ImageLightbox from './ImageLightbox';

const CustomerOrderInfo = (props) => {
  if (props.queryData) {
    const customerData = props.queryData;

    const columns = memoize(() => [
      {
        name: 'Order ID',
        selector: 'OrderID',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Quantity',
        selector: 'Quantity',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Customer Specs',
        selector: 'TyreSize',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Car Brand',
        selector: 'CarBrand',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Car Model',
        selector: 'CarModel',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Email',
        selector: 'Email',
        sortable: true,
        wrap: true,
        grow: 1,
      },
      {
        name: 'Phone',
        selector: 'Phone',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Post Code',
        selector: 'PostalCode',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Preffered Brand',
        selector: 'PrefferedBrand',
        sortable: true,
        wrap: true,
        grow: 0,
      },
      {
        name: 'Voucher',
        selector: 'VoucherCode',
        sortable: true,
        wrap: true,
        grow: 0,
      },
    ]);

    return (
      <Card.Body>
        <button type="button" onClick={() => props.setViewingCustomerInfo(false)}>Close</button>
        <DataTable
          title={customerData.Fname}
          columns={columns()}
          data={[customerData] || []}
          highlightOnHover
          responsive
          dense
        />
        <ImageLightbox images={customerData.ImagePath} />
      </Card.Body>
    );
  }

  return (true);
};

export default CustomerOrderInfo;
