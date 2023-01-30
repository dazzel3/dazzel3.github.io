import React from 'react';
import styled from '@emotion/styled';

const PROFILE_IMAGE_LINK = `https://avatars.githubusercontent.com/u/50357236?v=4`;

const ProfileImage = () => {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />;
};

export default ProfileImage;

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
`;
