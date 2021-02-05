import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import SearchResult from "./SearchResult";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  storeSearchResults: (searchResults) => dispatch({ type: "STORE_SEARCH_RESULTS", payload: searchResults }),
  storeRecentSearch: (searchTerm) => dispatch({ type: "ADD_RECENT_SEARCH", payload: searchTerm }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

function MainSearch(props) {
  const [searchInput, setSearchInput] = useState({
    what: "",
    where: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputUpdateHandler = (event) => {
    setSearchInput({ ...searchInput, [event.target.id]: event.target.value });
  };

  const searchHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json${
          searchInput.what.length !== 0 ? `?description=${searchInput.what}` : ""
        }${
          searchInput.where.length !== 0
            ? searchInput.what.length === 0
              ? `?location=${searchInput.where}`
              : `&location=${searchInput.where}`
            : ""
        }`
      );
      const data = await response.json();
      if (data) {
        setTimeout(() => {
          props.storeSearchResults(data);
          props.storeRecentSearch(searchInput);
          setSearchInput({
            what: "",
            where: "",
          });
          setIsLoading(false);
        }, 1000);
      } else {
        props.setError(data);
        props.showErrors(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    props.storeSearchResults([]);
  }, []);

  return (
    <Container className="mt-4">
      <div id="main-banner" className="mb-5">
        <div className="banner-img"></div>
        <div className="banner-text-wrap">
          <h2 className="banner-text light-text font-weight-bold mb-2">Welcome to _DevSearch</h2>
          <h5 className="banner-text-small dark-background light-text">
            Helping you to find the next step in your journey.
          </h5>
        </div>
      </div>
      <h5 className="font-weight-bold">Search 169,239 new jobs - 10,394 added in the last 24 hours</h5>
      <div id="main-search">
        <Row className="align-items-end">
          <Col xs={5}>
            <h5 className="mb-1 ml-1 font-weight-bold">What</h5>
            <input
              id="what"
              type="text"
              placeholder="e.g. react developer"
              className="w-100"
              onChange={(event) => inputUpdateHandler(event)}
              value={searchInput.what}
            />
          </Col>
          <Col xs={5}>
            <h5 className="mb-1 ml-1 font-weight-bold">Where</h5>
            <input
              id="where"
              type="text"
              placeholder="city or country"
              className="w-100"
              onChange={(event) => inputUpdateHandler(event)}
              value={searchInput.where}
            />
          </Col>
          <Col xs={4} lg={2}>
            <Button className="search-btn mt-3" onClick={searchHandler}>
              Search Jobs
            </Button>
          </Col>
        </Row>
      </div>

      <div id="search-results" className="mt-4">
        {isLoading && (
          <div className="d-flex align-items-center">
            <span className="font-weight-bold">Loading search results...</span>
            <Spinner animation="grow" variant="dark" />
            <Spinner animation="grow" variant="dark" />
            <Spinner animation="grow" variant="dark" />
          </div>
        )}
        <Row>
          {props.search.searchResults.length > 0 &&
            props.search.searchResults.map((result, index) => <SearchResult key={index} data={result} />)}
        </Row>
      </div>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
