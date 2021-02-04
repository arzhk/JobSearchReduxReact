import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setSelectedJob: (job) => dispatch({ type: "SET_SELECTED_JOB", payload: job }),
  addToFavourites: (job) => dispatch({ type: "ADD_NEW_FAVOURITE", payload: job }),
  removeFromFavourites: (job) => dispatch({ type: "REMOVE_FAVOURITE", payload: job }),
});

function SearchResults(props) {
  const [isFavourited, setIsFavourited] = useState(false);
  let history = useHistory();

  const moreDetailsHandler = () => {
    props.setSelectedJob(props.data);
    history.push(`/${props.data.id}`);
  };

  useEffect(() => {
    if (props.user.favourites.filter((favourite) => favourite.id === props.data.id).length === 1) {
      setIsFavourited(true);
    } else {
      setIsFavourited(false);
    }
  }, []);

  useEffect(() => {
    if (props.user.favourites.filter((favourite) => favourite.id === props.data.id).length === 1) {
      setIsFavourited(true);
    } else {
      setIsFavourited(false);
    }
  }, [props.user.favourites]);

  return (
    <Col xs={6}>
      <div className="search-result mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="font-weight-bold mb-0">{props.data.title}</h2>
          <i
            className={isFavourited ? "fas fa-star pl-4 rotate-in-2-cw" : "far fa-star pl-4"}
            onClick={
              isFavourited ? () => props.removeFromFavourites(props.data) : () => props.addToFavourites(props.data)
            }
          ></i>
        </div>
        <p className="font-weight-bold mb-3">{props.data.location}</p>
        <div className="d-flex">
          <img src={props.data.company_logo} className="mr-3" alt="company-logo" />
          <div>
            <h5 className="font-weight-bold mb-0">{props.data.company}</h5>
            <a href={props.data.company_url} target="_blank">
              {props.data.company_url}
            </a>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end mt-4">
          <p className="job-type mb-0">{props.data.type}</p>
          <Button variant="dark" className="px-4 mb-0" style={{ fontSize: 14 }} onClick={moreDetailsHandler}>
            More details...
          </Button>
        </div>
      </div>
    </Col>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
