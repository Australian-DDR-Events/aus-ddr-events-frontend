import { Col, Menu, Row, Typography } from "antd";
import React, { useState } from "react";
import SubmissionSong from "./components/submission-song";
import { SubmissionWrapper } from "./styled";

const Submission = () => {
  const songs = ['BURNIN\' THE FLOOR',
    'Holic',
    'Heron',
    'Eternal Summer',
    'RIGHT ON TIME',
    'Pierce The Sky',
    'nightbird lost wing',
    'PRANA',
    'out of focus',
    'Magnetic',
    'Cosy Catastrophe'
  ]

  return (
    <SubmissionWrapper>
      <Typography.Title level={2}>Individual Song Submission</Typography.Title>
        <Row gutter={[{xs: 16, xl: 48}, {xs: 16, xl: 24}]}>
          {
            songs.map((title) => {
              return (
                <Col xs={12} xl={4} className="gutter-row">
                  <SubmissionSong title={title} />
                </Col>
              )
            })
          }
        </Row>
    </SubmissionWrapper>
  );
}

export default Submission;