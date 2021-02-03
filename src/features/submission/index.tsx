import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Typography } from "antd";
import React, { useState } from "react";
import SongSubmission from "./components/song-submission";
import { SubmissionSelectionWrapper, SubmissionWrapper } from "./styled";

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
  const [ dropdownTitle, setDropdownTitle ] = useState('Select a song');
  const [ uploadUiDisplay, setUploadUiDisplayed] = useState(false);

  const menu = (
    <Menu>
      {
        songs.map((song, index) => {
          return (
            <Menu.Item key={index} onClick={() => updateCurrentSong(song)}>
              {song}
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

  const updateCurrentSong = (song: string) => {
    setDropdownTitle(song);
    setUploadUiDisplayed(true);
  }

  return (
    <SubmissionWrapper>
      <SubmissionSelectionWrapper>
        <Typography.Text>Step 1: </Typography.Text>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link">
            {dropdownTitle} <DownOutlined />
          </a>
        </Dropdown>
      </SubmissionSelectionWrapper>
      {uploadUiDisplay && (
        <SongSubmission />
      )}
    </SubmissionWrapper>
  );
}

export default Submission;