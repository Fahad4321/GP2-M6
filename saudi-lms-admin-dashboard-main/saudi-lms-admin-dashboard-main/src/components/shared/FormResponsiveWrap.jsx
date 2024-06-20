import React from "react";
import { Col, Row } from "antd";

const FormResponsiveWrap = ({ children }) => {
  return (
    <>
      <Row>
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          sm={{
            span: 22,
            offset: 1,
          }}
          md={{
            span: 8,
            offset: 8,
          }}
          className="d-flex justify-content-center align-items-center vh-100 my-sm-5"
        >
          {children}
        </Col>
      </Row>
    </>
  );
};

export default FormResponsiveWrap;
