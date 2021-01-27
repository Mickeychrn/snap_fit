/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import './style.css';
import { ButtonToolbar } from 'react-bootstrap';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import CustomerOrderInfo from './CustomerOrderInfo';

const baseURL = require('./Development');

const CustomerInfo = (props) => {
  // const [queryData, setQueryData] = useState(null);
  // const [customerData, setCustomerData] = useState(null);
  const [loadIndexes, setLoadIndexes] = useState(null);
  const [loadIndexList, setLoadIndexList] = useState([]);
  const [profiles, setProfiles] = useState(null);
  const [profileList, setProfileList] = useState([]);
  const [rims, setRims] = useState(null);
  const [rimList, setRimList] = useState([]);
  const [speedIndexes, setSpeedIndexes] = useState(null);
  const [speedIndexList, setSpeedIndexList] = useState([]);
  const [widths, setWidths] = useState(null);
  const [widthList, setWidthList] = useState([]);
  const [selectedLoadIndex, setSelectedLoadIndex] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedRim, setSelectedRim] = useState(null);
  const [selectedSpeedIndex, setSelectedSpeedIndex] = useState(null);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [premiumTyreResults, setPremiumTyreResults] = useState(null);
  const [valueTyreResults, setValueTyreResults] = useState(null);
  const [budgetTyreResults, setBudgetTyreResults] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const sortMapAndPreSelect = (arrToModify) => {
    const arr = arrToModify;
    arr.sort((a, b) => ((a.retailPrice > b.retailPrice
      || a.retailPrice === b.retailPrice) ? 1 : -1));
    arr.map((datum) => ({ ...datum, preSelected: false }));
    if (arr.length > 2) {
      arr[0].preSelected = true;
      arr[1].preSelected = true;
    } else if (arr.length !== 0) {
      arr[0].preSelected = true;
    }
    return arr;
  };

  // For populating the search boxes
  // Fetches load indexes
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getLoadIndexes`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setLoadIndexes(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  // Map load indexes to a usable data structure
  useEffect(() => {
    if (loadIndexes != null) {
      for (let i = 0; i < loadIndexes.length; i += 1) {
        const temp = loadIndexList;
        temp.push({
          label: loadIndexes[i],
          value: i,
        });
        setLoadIndexList(temp);
      }
    }
  }, [loadIndexes, loadIndexList]);

  // Fetches profiles
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getProfiles`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setProfiles(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  // Map profiles to a usable data structure
  useEffect(() => {
    if (profiles != null) {
      for (let i = 0; i < profiles.length; i += 1) {
        const temp = profileList;
        temp.push({
          label: profiles[i],
          value: i,
        });
        setProfileList(temp);
      }
    }
  }, [profiles, profileList]);

  // Fetches rims
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getRims`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setRims(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  // Map rims to a usable data structure
  useEffect(() => {
    if (rims != null) {
      for (let i = 0; i < rims.length; i += 1) {
        const temp = rimList;
        temp.push({
          label: rims[i],
          value: i,
        });
        setRimList(temp);
      }
    }
  }, [rims, rimList]);

  // Fetches speed indexes
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getSpeedIndexes`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setSpeedIndexes(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  // Map speed indexes to a usable data structure
  useEffect(() => {
    if (speedIndexes != null) {
      for (let i = 0; i < speedIndexes.length; i += 1) {
        const temp = speedIndexList;
        temp.push({
          label: speedIndexes[i],
          value: i,
        });
        setSpeedIndexList(temp);
      }
    }
  }, [speedIndexes, speedIndexList]);

  // Fetches widths
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getWidths`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setWidths(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  // Map widths to a usable data structure
  useEffect(() => {
    if (widths != null) {
      for (let i = 0; i < widths.length; i += 1) {
        const temp = widthList;
        temp.push({
          label: widths[i],
          value: i,
        });
        setWidthList(temp);
      }
    }
  }, [widths, widthList]);

  // get the 3 tyres to add to the customer's order
  const tyreSearchHandler = (customerData) => {
    let errors = false;
    let selectedLoadIndexesString = '';
    if (selectedLoadIndex != null) {
      selectedLoadIndexesString = '&loadIndex=';
      selectedLoadIndexesString = `${selectedLoadIndexesString + selectedLoadIndex.label},`;
    } else {
      errors = true;
    }

    let selectedProfilesString = '';
    if (selectedProfile != null) {
      selectedProfilesString = '&profile=';
      selectedProfilesString = `${selectedProfilesString + selectedProfile.label},`;
    } else {
      errors = true;
    }

    let selectedRimsString = '';
    if (selectedRim != null) {
      selectedRimsString = '&rim=';
      selectedRimsString = `${selectedRimsString + selectedRim.label},`;
    } else {
      errors = true;
    }

    let selectedSpeedIndexesString = '';
    if (selectedSpeedIndex != null) {
      selectedSpeedIndexesString = '&speedIndex=';
      selectedSpeedIndexesString = `${selectedSpeedIndexesString + selectedSpeedIndex.label},`;
    } else {
      errors = true;
    }

    let selectedWidthsString = '';
    if (selectedWidth != null) {
      selectedWidthsString = '&width=';
      selectedWidthsString = `${selectedWidthsString + selectedWidth.label},`;
    } else {
      errors = true;
    }

    const selectedQuantityString = `${`&quantity=${customerData.Quantity}`}`;
    const selectPremium = `${`&brandCategory=${1}`},`;
    const selectValue = `${`&brandCategory=${2}`},`;
    const selectBudget = `${`&brandCategory=${3}`},`;
    const forCustomer = `${`&fromCustomer=${true}`},`;

    // Concatenate all query string parameters
    const searchUrlPrem = `${baseURL}getTyres?
    ${forCustomer}${selectPremium}${selectedLoadIndexesString}${selectedProfilesString}${selectedRimsString}${selectedSpeedIndexesString}${selectedWidthsString}${selectedQuantityString}`;

    const searchUrlValue = `${baseURL}getTyres?${forCustomer}${selectValue}${selectedLoadIndexesString}${selectedProfilesString}${selectedRimsString}${selectedSpeedIndexesString}${selectedWidthsString}${selectedQuantityString}`;

    const searchUrlBudget = `${baseURL}getTyres?${forCustomer}${selectBudget}${selectedLoadIndexesString}${selectedProfilesString}${selectedRimsString}${selectedSpeedIndexesString}${selectedWidthsString}${selectedQuantityString}`;

    if (!errors) {
      // Fetch the API with the searchURL string for PREMIUM
      fetch(encodeURI(searchUrlPrem), { method: 'GET' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((resultPrem) => {
          // Take the result, sort, map and pre-select the two cheapest then set
          // the corresponding result to this modified result
          setPremiumTyreResults(sortMapAndPreSelect(resultPrem));
        })
        .catch(() => {
          setFetchError(true);
        });

      // Fetch the API with the searchURL string FOR VALUE
      fetch(encodeURI(searchUrlValue), { method: 'GET' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((resultVal) => {
          // Take the result, sort, map and pre-select the two cheapest then set
          // the corresponding result to this modified result
          setValueTyreResults(sortMapAndPreSelect(resultVal));
        })
        .catch(() => {
          setFetchError(true);
        });

      // Fetch the API with the searchURL string FOR BUDGET
      fetch(encodeURI(searchUrlBudget), { method: 'GET' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((resultBud) => {
          // Take the result, sort, map and pre-select the two cheapest then set
          // the corresponding result to this modified result
          setBudgetTyreResults(sortMapAndPreSelect(resultBud));
        })
        .catch(() => {
          setFetchError(true);
        });
    }
  };

  let customerData = null;
  if (props.queryData) {
    // Get the selected OrderID
    for (let index = 0; index < props.queryData.data.length; index += 1) {
      if (props.queryData.data[index].OrderID === props.selectedOrder) {
        customerData = props.queryData.data[index];
      }
    }
  }

  const columns = () => [

    {
      name: 'Tyre ID',
      selector: 'tyre_id',
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: 'Quantity',
      selector: 'quantity',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Price',
      selector: 'retailPrice',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Brand',
      selector: 'brand',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Width',
      selector: 'width',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Rim',
      selector: 'rim',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Load Index',
      selector: 'load_index',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Speed Index',
      selector: 'speed_index',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Profile',
      selector: 'profile',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      wrap: true,
      grow: 0,
    },
    {
      name: 'Pattern',
      selector: 'pattern',
      sortable: true,
      wrap: true,
      grow: 0,
    },
  ];

  return (
    <div>
      <div style={{ display: (!fetchError ? 'none' : 'block') }}>
        {/* TODO: Make this more visible} */}
        <h5>There seems to have been an error. Please refresh the page</h5>
      </div>
      <CustomerOrderInfo
        queryData={customerData}
        setViewingCustomerInfo={props.setViewingCustomerInfo}
      />
      <ButtonToolbar>
        <p>Width</p>
        <Select
          style={{ width: '100px' }}
          options={widthList}
          placeholder="All"
          onChange={(opt) => setSelectedWidth(opt)}
        />
        <p>Profile</p>
        <Select
          className="selectTest"
          options={profileList}
          placeholder="All"
          autosize={false}
          style={{ minWidth: '0px', width: '100px' }}
          onChange={(opt) => setSelectedProfile(opt)}
        />
        <p>Rim</p>
        <Select
          options={rimList}
          placeholder="All"
          autosize={false}
          style={{ minWidth: '0px', width: '100px' }}
          onChange={(opt) => setSelectedRim(opt)}
        />
        <p>Load Index</p>
        <Select
          options={loadIndexList}
          placeholder="All"
          autosize={false}
          style={{ minWidth: '0px', width: '100px' }}
          onChange={(opt) => setSelectedLoadIndex(opt)}
        />
        <p>Speed Index</p>
        <Select
          options={speedIndexList}
          placeholder="All"
          autosize={false}
          style={{ minWidth: '100px', width: '100px' }}
          onChange={(opt) => setSelectedSpeedIndex(opt)}
        />
        <p />
        <button
          id="tyreSearchButton"
          type="button"
          className="tyreSearchButton"
          onClick={() => tyreSearchHandler(customerData)}
        >  Get tyres
        </button>
      </ButtonToolbar>
      <DataTable
        title="Premium"
        columns={columns()}
        data={premiumTyreResults || []}
        highlightOnHover
        defaultSortField="retailPrice"
        pagination
        responsive
        selectableRows
        dense
        selectableRowsPreSelectedField="preSelected"
      />
      <DataTable
        title="Value"
        columns={columns()}
        data={valueTyreResults || []}
        highlightOnHover
        defaultSortField="retailPrice"
        pagination
        selectableRows
        responsive
        dense
        selectableRowsPreSelectedField="preSelected"
      />
      <DataTable
        title="Budget"
        columns={columns()}
        data={budgetTyreResults || []}
        highlightOnHover
        defaultSortField="retailPrice"
        pagination
        selectableRows
        responsive
        dense
        selectableRowsPreSelectedField="preSelected"
      />
    </div>
  );
};

export default CustomerInfo;
