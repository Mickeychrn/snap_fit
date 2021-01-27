/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import './style.css';

import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Select from 'react-select';

const baseURL = require('./Development').toString();

/**
 * @description Creates a search bar with filters which can be applied to query
 * an API. Must pass in queryData and setQueryData hooks as props.
 */
const SearchBar = (props) => {
  const [brands, setBrands] = useState(null);
  const [brandList, setBrandList] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
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
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLoadIndex, setSelectedLoadIndex] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedRim, setSelectedRim] = useState(null);
  const [selectedSpeedIndex, setSelectedSpeedIndex] = useState(null);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  // Fetches all data
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getTyres?query=all`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        props.setQueryData(result);
      })
      .catch(() => {
        setFetchError(true);
      });
    // eslint-disable-next-line
  }, []);

  // Fetches brands
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getBrands`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setBrands(result); // brands will be a list of distinct brands from the API
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []); // Empty array means this useEffect will run only once on load

  // Once brands are downloaded - map to usable data structure
  useEffect(() => {
    if (brands != null) { // Wait until brands has been assigned
      for (let i = 0; i < brands.length; i += 1) { // Iterate through brands
        const temp = brandList;
        temp.push({
          label: brands[i], // Assign the label and value
          value: i,
        });
        setBrandList(temp);
      }
    }
  }, [brands, brandList]); // This array means this useEffect will only run if
  // brands or brandList changes

  // THE FOLLOWING USEEFFECT'S FOLLOW THE SAME STRUCTURE

  // Fetches categories
  useEffect(() => {
    const getParam = { method: 'GET' };
    const searchUrl = `${baseURL}getCategories`;

    fetch(encodeURI(searchUrl), getParam)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        setCategories(result);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  // Map categories to a usable data structure
  useEffect(() => {
    if (categories != null) {
      for (let i = 0; i < categories.length; i += 1) {
        const temp = categoryList;
        temp.push({
          label: categories[i],
          value: i,
        });
        setCategoryList(temp);
      }
    }
  }, [categories, categoryList]);

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


  /**
   * @description Will check
   * all filter parameters and apply them condtionally
   * then fetch the API with the supplied parameters.
   */
  function queryButtonHandler() {
    // Initialise an empty string for all parameters
    let selectedBrandsString = '';
    if (selectedBrand && selectedBrand.value) { // Check the selected paramater isn't empty
      selectedBrandsString = '&brand='; // Will add at least one parameter of the given type
      // start the string off with '&parameter='

      selectedBrand.value.forEach((brand) => { // Loop through selected parameters
        selectedBrandsString = `${selectedBrandsString + brand.label},`; // Add them to the string
      });
    }

    let selectedCategoriesString = '';
    if (selectedCategory != null && selectedCategory.length > 0) {
      selectedCategoriesString = '&category=';
      selectedCategory.forEach((category) => {
        selectedCategoriesString = `${selectedCategoriesString + category.label},`;
      });
    }

    let selectedLoadIndexesString = '';
    if (selectedLoadIndex != null && selectedLoadIndex.length > 0) {
      selectedLoadIndexesString = '&loadIndex=';
      selectedLoadIndex.forEach((loadIndex) => {
        selectedLoadIndexesString = `${selectedLoadIndexesString + loadIndex.label},`;
      });
    }

    let selectedProfilesString = '';
    if (selectedProfile != null && selectedProfile.length > 0) {
      selectedProfilesString = '&profile=';
      selectedProfile.forEach((profile) => {
        selectedProfilesString = `${selectedProfilesString + profile.label},`;
      });
    }

    let selectedRimsString = '';
    if (selectedRim != null && selectedRim.length > 0) {
      selectedRimsString = '&rim=';
      selectedRim.forEach((rim) => {
        selectedRimsString = `${selectedRimsString + rim.label},`;
      });
    }

    let selectedSpeedIndexesString = '';
    if (selectedSpeedIndex != null && selectedSpeedIndex.length > 0) {
      selectedSpeedIndexesString = '&speedIndex=';
      selectedSpeedIndex.forEach((speedIndex) => {
        selectedSpeedIndexesString = `${selectedSpeedIndexesString + speedIndex.label},`;
      });
    }

    let selectedWidthsString = '';
    if (selectedWidth != null && selectedWidth.length > 0) {
      selectedWidthsString = '&width=';
      selectedWidth.forEach((width) => {
        selectedWidthsString = `${selectedWidthsString + width.label},`;
      });
    }

    const forCustomer = `${`&fromCustomer=${true}`},`;

    // Concatenate all query string parameters
    let searchUrl = `${baseURL}getTyres?${forCustomer}${selectedBrandsString}${selectedCategoriesString}${selectedLoadIndexesString}${selectedProfilesString}${selectedRimsString}${selectedSpeedIndexesString}${selectedWidthsString}`;

    // If nothing is selected then change query to all
    if (searchUrl === `${baseURL}getTyres?`) {
      searchUrl = `${baseURL}getTyres?query=all`;
    }

    // Fetch the API with the searchURL string
    fetch(encodeURI(searchUrl), { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((result) => {
        props.setQueryData(result); // Set the queryData (Passed down from props) to the result
      })
      .catch(() => {
        setFetchError(true);
      });
  }

  if (fetchError) {
    return (
      <div>
        There has been an error, please refresh your browser.
      </div>
    );
  }

  // Return the search bar
  return (
    <Card>
      <Card.Body>
        <div id="controls" className="flex-container">
          <div style={{ width: '300px' }}>
            Width ({widthList.length})
            <Select options={widthList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(opt) => setSelectedWidth(opt)} />
          </div>

          <div style={{ width: '300px' }}>
            Profile ({profileList.length})
            <Select options={profileList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(opt) => setSelectedProfile(opt)} />
          </div>
          <div style={{ width: '300px' }}>
            Rim ({rimList.length})
            <Select options={rimList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(opt) => setSelectedRim(opt)} />
          </div>
          <div style={{ width: '300px' }}>
            Load Index ({loadIndexList.length})
            <Select options={loadIndexList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(opt) => setSelectedLoadIndex(opt)} />
          </div>
          <div style={{ width: '300px' }}>
            Speed Index ({speedIndexList.length})
            <Select options={speedIndexList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(opt) => setSelectedSpeedIndex(opt)} />
          </div>
          <div style={{ width: '300px' }}>
            Brand ({brandList.length})
            <Select options={brandList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(value) => setSelectedBrand({ value })} />
          </div>
          <div style={{ width: '300px' }}>
            Category ({categoryList.length})
            <Select options={categoryList} placeholder="All" isMulti autosize={false} style={{ minWidth: '0px', width: '100px' }} closeMenuOnSelect={false} onChange={(opt) => setSelectedCategory(opt)} />
          </div>

          <div style={{ width: '300px' }}>
            <button id="queryButton" type="button" className="queryButton" onClick={queryButtonHandler}>Query</button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SearchBar;
