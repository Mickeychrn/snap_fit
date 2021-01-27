/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import DataTable, { memoize } from 'react-data-table-component';
import { Card } from 'react-md';

const OrderTable = (props) => {
  const handleRowClicked = (row) => {
    props.setViewingCustomerInfo(true);
    props.setSelectedOrder(row.OrderID);
  };

  function msToTime(duration) {
    // let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)));

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return `${days}:${hours}:${minutes}:${seconds}`;
  }

  const columns = memoize(() => [
    {
      name: 'Order ID',
      selector: 'OrderID',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    // {
    //   name: 'Images',
    //   cell: (row) => (
    //     <div className="imageCell">
    //       <ImageLightbox
    //         images={row.ImagePath}
    //         maxContainerWidth={200}
    //       />
    //     </div>
    //   ),
    //   grow: 1,
    //   wrap: true,
    // },
    {
      name: 'Name',
      selector: 'Fname',
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: 'Brand',
      selector: 'CarBrand',
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: 'Model',
      selector: 'CarModel',
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: 'Received',
      selector: 'OrderDateTime',
      sortable: true,
      cell: ((row) => {
        // t = time from database, split into array of numbers
        const t = row.OrderDateTime.split(/[- : T Z]/);
        // Use number(t[0]) etc here to avoid converting string "4" to a number, implicitly
        // convert it with number()
        const queryDate = new Date(Number(t[0]),
          Number(t[1] - 1), // Month starts from the zeroeth
          Number(t[2]),
          Number(t[3]),
          Number(t[4]),
          Number(t[5]));
        const currentDate = new Date();
        const difference = currentDate - queryDate;
        return (`${msToTime(difference)} ago`); // 'D:H:M:S ago'
      }),
      wrap: true,
      grow: 2,
    },
    {
      name: 'Order Status',
      selector: 'OrderStatus',
      sortable: true,
      wrap: true,
      grow: 0,
    },
  ]);

  return (
    <Card style={{ height: '100%' }}>
      <DataTable
        title="Orders"
        columns={columns()}
        data={props.queryData ? props.queryData.data : []}
        highlightOnHover
        defaultSortField="OrderDateTime"
        onRowClicked={handleRowClicked}
        pagination
        progressPending={!props.queryData}
        progressCentered
      />
    </Card>
  );
};

export default OrderTable;
