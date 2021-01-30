import { Avatar, Button, Card, Skeleton, Space, Tabs, Typography } from 'antd';
import React from 'react';
import { User } from '../../../../context/user/types';
import { StateOptions } from '../../constants';
import { ProfileHeader } from '../../styled';

const ProfileContainer = ({
  user,
  loading,
  isEditable,
  setIsEditing,
}: {
  user: User;
  loading: Boolean;
  isEditable: Boolean;
  setIsEditing: Function;
}) => {
  return (
    <Card>
      <Space align="center" size={16} direction="vertical">
        {loading && (
          <>
            <Skeleton.Avatar active size={80} shape="square" />
            <Skeleton active paragraph={{ rows: 5 }}/>
            <Skeleton.Button active size="default" shape="square" />
          </>
        )}

        {!loading && (
          <>
            <Avatar
              size={80}
              shape="square"
              src={user.profilePicture || "https://i.imgur.com/o0ulS6k.png"} />
            <ProfileHeader level={2}>{user.userName}</ProfileHeader>
            <Typography.Text>Dancer Name: {user.dancerName}</Typography.Text>
            <Typography.Text>DDR Code: {user.dancerId}</Typography.Text>
            {StateOptions.map((option) => {
              if (option.value === user.state) {
                return <Typography.Text>State: {option.label}</Typography.Text>
              }
              return <></>
            })}
            <Typography.Text>Primary Machine: {user.primaryMachine}</Typography.Text>
            {isEditable && (
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            )}
          </>
        )}
      </Space>
    </Card>
  )
}

export default ProfileContainer;