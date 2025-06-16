import React from "react";

const Explore = () => {
  return (
    <div className='explore-container text-light'>
      <div className='left-column'>
        <div className='first-row' style={{ overflowY: "auto" }}></div>
        <hr className='horizontal-line' />
        <div className='second-row' style={{ overflowY: "auto" }}></div>
      </div>
      <div className='right-column'>
        <div className="customer-form-container"></div>
      </div>
    </div>
  );
};

export default Explore;
