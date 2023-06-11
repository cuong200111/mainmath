import React from "react";
import { useLocation } from "react-router-dom";

const NotFoundPage = () => {

  return (
    <div className="container">
      <div className="alert alert-warning">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          &times;
        </button>
        <strong>Không Tìm Thấy Trang</strong>
      </div>
    </div>
  );
};

export default NotFoundPage;
