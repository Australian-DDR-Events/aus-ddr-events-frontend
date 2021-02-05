import {
  Avatar,
  Button,
  Skeleton,
  Space,
  Typography,
  Card,
  Row,
  Col,
  Popover,
} from 'antd';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { StateOptions } from 'features/profile/constants';
import { DefaultUser, UserRepositoryContext } from 'context/dancer';
import { Title } from 'react-head';
import ProfileForm from './components/profile-form';
import CollectionContainer from './components/collection-container';
import { ProfileHeader, ProfileWrapper } from './styled';

interface ProfileProps {
  id?: string;
}

const Profile: React.FC<ProfileProps> = ({ id = undefined }: ProfileProps) => {
  const userRepo = useContext(UserRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [user, setUser] = useState(DefaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  const loggedInUserId = loggedInUser.id;
  const emailVerified = loggedInUser.hasVerifiedEmail;
  const isEditable = !id || loggedInUserId === id;

  useEffect(() => {
    if (!isEditing) {
      setLoading(true);
      const lookupId = id ?? loggedInUserId;
      userRepo.userRepositoryInstance.get(lookupId).then((u) => {
        setUser(u.okOrDefault());
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const getStateTextualRepresentation = (): string => {
    return StateOptions.find((state) => state.key === user.state)?.value || '';
  };

  return !isEditing ? (
    <ProfileWrapper>
      {!loading && <Title>{user.dancerName} | Australian DDR Events</Title>}
      <Row gutter={16}>
        <Col xs={24} xl={8}>
          <Card>
            <Space align="center" size={16} direction="vertical">
              {loading && (
                <>
                  <Skeleton.Avatar active size={80} shape="square" />
                  <Skeleton
                    active
                    paragraph={{
                      rows: 4,
                      width: '100%',
                    }}
                  />
                  <Skeleton.Button active size="default" shape="square" />
                </>
              )}

              {!loading && (
                <>
                  <Avatar
                    size={80}
                    shape="square"
                    src={
                      user.profilePicture || 'https://i.imgur.com/o0ulS6k.png'
                    }
                  />
                  <ProfileHeader level={2}>{user.userName}</ProfileHeader>
                  <Typography.Text key="dancerName">
                    Dancer Name: {user.dancerName}
                    {emailVerified ? (
                      <Popover content="User is verified.">
                        <CheckCircleOutlined
                          style={{ marginLeft: '4px', color: 'green' }}
                        />
                      </Popover>
                    ) : (
                      <Popover content="User is not verified.">
                        <CloseOutlined
                          style={{ marginLeft: '4px', color: 'red' }}
                        />
                      </Popover>
                    )}
                  </Typography.Text>
                  <Typography.Text key="dancerId">
                    DDR Code: {user.dancerId}
                  </Typography.Text>
                  <Typography.Text>
                    State: {getStateTextualRepresentation()}
                  </Typography.Text>
                  <Typography.Text key="dancerMachine">
                    Primary Machine: {user.primaryMachine}
                  </Typography.Text>

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
        </Col>
        <Col xs={24} xl={16}>
          <CollectionContainer />
        </Col>
      </Row>
    </ProfileWrapper>
  ) : (
    <ProfileForm
      formData={user}
      onSuccessfulSubmit={() => {
        setIsEditing(false);
      }}
      onCancelSubmit={() => {
        setIsEditing(false);
      }}
    />
  );
};

export default Profile;
