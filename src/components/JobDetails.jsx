import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

function JobDetails(props) {
  const jobDetailsAsHTML = () => {
    return { __html: props.search.selectedJob.description };
  };
  const howToApplyAsHTML = () => {
    return { __html: props.search.selectedJob.how_to_apply };
  };

  return (
    <div id="job-detail-main">
      <h1 className="font-weight-bold mb-0">
        {props.search.selectedJob.title} - {props.search.selectedJob.type}
      </h1>
      <h3 className="mb-4">{props.search.selectedJob.location} </h3>
      <div className="d-flex mb-5">
        <img src={props.search.selectedJob.company_logo} className="mr-3" alt="company-logo" />
        <div>
          <h5 className="font-weight-bold mb-0">{props.search.selectedJob.company}</h5>
          <a href={props.search.selectedJob.company_url} target="_blank">
            {props.search.selectedJob.company_url}
          </a>
        </div>
      </div>
      <div dangerouslySetInnerHTML={jobDetailsAsHTML()}></div>
      <h3 className="font-weight-bold mt-4">How to apply</h3>
      <div dangerouslySetInnerHTML={howToApplyAsHTML()}></div>
      <Button variant="dark" className="px-5 py-3">
        Apply Now!
      </Button>
    </div>
  );
}

export default connect(mapStateToProps)(JobDetails);
