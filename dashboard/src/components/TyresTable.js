/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const TyresTable = (props) => {
  if (props.queryData) {
    // props.queryData.data;
    return (
      <div>
        <ReactTable
          data={props.queryData}
          filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
          columns={[{
            Header: 'Tyre ID',
            accessor: 'tyre_id',
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
              && row[filter.id].endsWith(filter.value),
          },
          {
            Header: 'Tyre Description',
            accessor: 'description',
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
              && row[filter.id].endsWith(filter.value),
          },
          {
            Header: 'Brand',
            id: 'brand',
            accessor: (d) => d.brand,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['brand'] }),
            filterAll: true,
          },
          {
            Header: 'Pattern',
            id: 'pattern',
            accessor: (d) => d.pattern,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['pattern'] }),
            filterAll: true,
          },
          {
            Header: 'Price',
            id: 'retailPrice',
            accessor: (d) => d.retailPrice,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['retailPrice'] }),
            filterAll: true,
          },
          {
            Header: 'Rim',
            id: 'rim',
            accessor: (d) => d.rim,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['rim'] }),
            filterAll: true,
          },
          {
            Header: 'Profile',
            id: 'profile',
            accessor: (d) => d.profile,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['profile'] }),
            filterAll: true,
          },
          {
            Header: 'Width',
            id: 'width',
            accessor: (d) => d.width,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['width'] }),
            filterAll: true,
          },
          {
            Header: 'Load Index',
            id: 'load_index',
            accessor: (d) => d.load_index,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['load_index'] }),
            filterAll: true,
          },
          {
            Header: 'Speed Index',
            id: 'speed_index',
            accessor: (d) => d.speed_index,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['speed_index'] }),
            filterAll: true,
          },

          {
            Header: 'Quantity/Stock',
            id: 'quantity',
            accessor: (d) => d.quantity,
            filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['quantity'] }),
            filterAll: true,
          },
            /* section here for filtering speed index properly
            {
              Header: "Age",
              accessor: "age"
            },
            {
              Header: "Over 21",
              accessor: "age",
              id: "over",
              Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                if (filter.value === "true") {
                  return row[filter.id] >= 21;
                }
                return row[filter.id] < 21;
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                  <option value="all">Show All</option>
                  <option value="true">Can Drink</option>
                  <option value="false">Can't Drink</option>
                </select>
            } */
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }

  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
};

export default TyresTable;

/*
{values.tyres.map((tyres) => (
          <tr key={tyres.tyre_id}>
          <td>{tyres.description}</td>
          </tr>)
        )}


*/
// //
