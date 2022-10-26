import { authAPI } from '@lib/apis/auth';
import { gray } from '@lib/styles/palette';
import { useSelector } from '@store/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '@components/common/Avatar';
import Card from '@components/common/Card';
import Flexbox from '@components/common/Flexbox';
import Title from '@components/common/Title';
import Layout from '@components/Layout';
import UnregisterButton from '@components/UnregisterButton';

const Base = styled.div`
  .mypage-button {
    background-color: ${gray[100]};
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${gray[200]};
    }
  }

  .mypage-input {
    background-color: ${gray[100]};
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    color: ${gray[400]};
  }
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;
`;

const Box = styled.div`
  border: 1px solid ${gray[300]};
  width: 100%;
  padding: 1rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1rem;
  color: ${gray[500]};
`;

const MyPage: React.FC = () => {
  const { data } = useSelector((state) => state.user);
  console.log(data);

  const navigate = useNavigate();

  const handleUnregisterButtonClick = async () => {
    try {
      await authAPI.unregister();
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Base>
        <Card>
          <Flexbox flex="col" items="start" padding="1rem" gap="3rem">
            <Title>마이페이지</Title>
            <Flexbox flex="col" gap="1rem" width="100%" items="start">
              <SubTitle>프로필 사진</SubTitle>
              <Box>
                <Flexbox justify="start" gap="2rem">
                  <Avatar
                    size="6rem"
                    src={data.profileImage}
                    alt="profile-image"
                  />
                  <Flexbox flex="col" gap="1rem" items="start" width="60%">
                    <a
                      href="https://www.google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="mypage-button">프로필 사진 업데이트</div>
                    </a>
                    <Description>
                      프로필 사진은 구글 계정 설정에서 업데이트 할 수 있습니다.
                    </Description>
                  </Flexbox>
                </Flexbox>
              </Box>
            </Flexbox>
            <Flexbox flex="col" gap="1rem" width="100%" items="start">
              <h2 className="subtitle">프로필 정보</h2>
              <Box>
                <Flexbox items="stretch" justify="between">
                  <p style={{ padding: '0.75rem 0' }}>닉네임</p>
                  <Flexbox flex="col" gap="1rem" items="start" width="80%">
                    <div className="mypage-input">{data.name}</div>
                    <Description>
                      닉네임은 구글 계정 설정에서 변경하실 수 있습니다.
                    </Description>
                  </Flexbox>
                </Flexbox>
              </Box>
              <Box>
                <Flexbox items="stretch" justify="between">
                  <p style={{ padding: '0.75rem 0' }}>이메일</p>
                  <Flexbox flex="col" gap="1rem" items="start" width="80%">
                    <div className="mypage-input">{data.email}</div>
                    <Description>게정에 등록된 이메일입니다.</Description>
                  </Flexbox>
                </Flexbox>
              </Box>
            </Flexbox>
            <Flexbox width="100%" justify="end">
              <UnregisterButton
                onClick={() => {
                  void handleUnregisterButtonClick;
                }}
              />
            </Flexbox>
          </Flexbox>
        </Card>
      </Base>
    </Layout>
  );
};

export default MyPage;
