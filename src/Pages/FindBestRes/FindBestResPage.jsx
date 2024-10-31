import React, { useState } from "react";
import { LinearMapLocationPointOnMap } from "../../assets/icons/LinearMapLocationPointOnMap";
import { Container, Grid, Button, Drawer, useMediaQuery, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import CheckBoxGroup from "../../components/FindBestRes/CheckBoxGroup";
import PostList from "../../components/FindBestRes/PostList";
import MainHeader from "../../Pages/Header/MainHeader";

import "../../ui/FindBestRes/FindBestResPage.css";

export const FindBestResPage = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobileView = useMediaQuery('(max-width:900px)'); // 1200px 이하일 때 true

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // 메뉴 버튼 생성됐을 때
  const FilterMenu1 = () => (
    
    <div style={{
      padding: '20px',
      width: '250px',
      backgroundColor: '#f7f7f7', // Drawer 배경색
      height: '100%', // Drawer 높이
      display: 'flex',
      flexDirection: 'column',}}>

      <div className="show-map-btn" style={{
        backgroundColor: '#328ca8',
        borderRadius: '42px',
        height: '42px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'}}>

        <LinearMapLocationPointOnMap className="linear-map-location" />
        <div className="show-map-text" style={{
          color: '#ffffff',
          fontFamily: 'font-medium',
          fontSize: '15px'
        }}>지도로 보기</div>
      </div>

      <div className="divider" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="filter-title">필터</div>
        <button className="filter-reset-btn" style={{
          border: '1px solid',
          borderColor: '#328ca8',
          borderRadius: '26px',
          boxSizing: 'border-box',
          alignItems: 'center',
          justifyContent: 'center',
          height: '24px',
          width: '70px'
        }}
        >
          <div className="filter-reset-text" style={{
            color: '#328ca8',
            fontFamily: 'font-medium',
            fontSize: '11px'
          }}
          >필터초기화
          </div>
        </button>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="맛집명 검색"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid',
          borderColor: '#d3d3d3',
          borderRadius: '5px',
          fontFamily: 'font-medium',
          fontSize: '14.8px',
          height: '35px',
          width: '100%',
          padding: '5px 0px',
          margin: '20px 0px'
        }}

      />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">인증</div>
        <CheckBoxGroup labels={['전체', '인증', '미인증']} />
      </div>

      <div className="divider" />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">pin 색상</div>
        <CheckBoxGroup labels={['전체', 'Black', 'Red', 'Orange', 'Blue', 'Yellow', 'Purple']} />
      </div>

      <div className="divider" />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">나의 감정</div>
        <CheckBoxGroup labels={['전체', '평온', '행복', '사랑', '호기심', '스트레스', '귀찮음']} />
      </div>

      <div className="divider" />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">찾는 주제</div>
        <CheckBoxGroup labels={['전체', '가을', '제주', '데이트', '캠핑', '가성비', '미슐랭']} />
      </div>

      <div className="divider" />

      <div className="pin-info">
        <p className="amadda-pin-color-pin" style={{
          color: '#505050',
          fontFamily: 'font-medium',
          fontSize: '12px',
          textAlign: 'left',
          width: '100%'
        }}
        >
          Amadda pin color는 해당 위치의 맛집에
          회원들이 pin을 꽂은 개수로 판단하였습니다.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{
              color: '#000000',
              fontFamily: 'font-medium',
              fontSize: '12px',
              width: '70px',
              textAlign: 'left'
            }}>Black</div>
            <div className="pin-color-text-2" style={{
              color: '#000000',
              fontFamily: 'font-light',
              fontSize: '12px',
              width: '100px',
              textAlign: 'left'
            }}>50회 미만</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{
              color: '#ff0000',
              fontFamily: 'font-medium',
              fontSize: '12px',
              width: '70px',
              textAlign: 'left'
            }}>Red</div>
            <div className="pin-color-text-2" style={{
              color: '#000000',
              fontFamily: 'font-light',
              fontSize: '12px',
              width: '100px',
              textAlign: 'left'
            }}>50회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{
              color: '#ff5d00',
              fontFamily: 'font-medium',
              fontSize: '12px',
              width: '70px',
              textAlign: 'left'
            }}>Orange</div>
            <div className="pin-color-text-2" style={{
              color: '#000000',
              fontFamily: 'font-light',
              fontSize: '12px',
              width: '100px',
              textAlign: 'left'
            }}>100회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{
              color: '#003dff',
              fontFamily: 'font-medium',
              fontSize: '12px',
              width: '70px',
              textAlign: 'left'
            }}>Blue</div>
            <div className="pin-color-text-2" style={{
              color: '#000000',
              fontFamily: 'font-light',
              fontSize: '12px',
              width: '100px',
              textAlign: 'left'
            }}>200회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{
              color: '#f1dd00',
              fontFamily: 'font-medium',
              fontSize: '12px',
              width: '70px',
              textAlign: 'left'
            }}>Yellow</div>
            <div className="pin-color-text-2" style={{
              color: '#000000',
              fontFamily: 'font-light',
              fontSize: '12px',
              width: '100px',
              textAlign: 'left'
            }}>300회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{
              color: '#d400ff',
              fontFamily: 'font-medium',
              fontSize: '12px',
              width: '70px',
              textAlign: 'left'
            }}>Purple</div>
            <div className="pin-color-text-2" style={{
              color: '#000000',
              fontFamily: 'font-light',
              fontSize: '12px',
              width: '100px',
              textAlign: 'left'
            }}>400회 이상</div>
          </div>
        </div>
      </div>
    </div>
  );


  const FilterMenu2 = () => (
    <div className="filter-menu-area">
      <div className="show-map-btn">
        <LinearMapLocationPointOnMap className="linear-map-location" />
        <div className="show-map-text">지도로 보기</div>
      </div>

      <div className="divider" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="filter-title">필터</div>
        <button className="filter-reset-btn">
          <div className="filter-reset-text">필터초기화</div>
        </button>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="맛집명 검색"
      />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">인증</div>
        <CheckBoxGroup labels={['전체', '인증', '미인증']} />
      </div>

      <div className="divider" />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">pin 색상</div>
        <CheckBoxGroup labels={['전체', 'Black', 'Red', 'Orange', 'Blue', 'Yellow', 'Purple']} />
      </div>

      <div className="divider" />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">나의 감정</div>
        <CheckBoxGroup labels={['전체', '평온', '행복', '사랑', '호기심', '스트레스', '귀찮음']} />
      </div>

      <div className="divider" />

      <div style={{ marginTop: '10px' }}>
        <div className="filter-title">찾는 주제</div>
        <CheckBoxGroup labels={['전체', '가을', '제주', '데이트', '캠핑', '가성비', '미슐랭']} />
      </div>

      <div className="divider" />

      <div className="pin-info">
        <p className="amadda-pin-color-pin">
          Amadda pin color는 해당 위치의 맛집에
          회원들이 pin을 꽂은 개수로 판단하였습니다.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{ color: '#000000' }}>Black</div>
            <div className="pin-color-text-2">50회 미만</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{ color: '#ff0000' }}>Red</div>
            <div className="pin-color-text-2">50회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{ color: '#ff5d00' }}>Orange</div>
            <div className="pin-color-text-2">100회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{ color: '#003dff' }}>Blue</div>
            <div className="pin-color-text-2">200회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{ color: '#f1dd00' }}>Yellow</div>
            <div className="pin-color-text-2">300회 이상</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="pin-color-text-1" style={{ color: '#d400ff' }}>Purple</div>
            <div className="pin-color-text-2">400회 이상</div>
          </div>
        </div>
      </div>
    </div>
  );

  const testData = [
    { id: 1, userName: 'User1', diaryTitle: 'DiaryTitle1', isReceiptVerified: true, pinColor: 'RED' },
    { id: 2, userName: 'User2', diaryTitle: 'DiaryTitle2', isReceiptVerified: false, pinColor: 'PURPLE' },
    { id: 3, userName: 'User3', diaryTitle: 'DiaryTitle3', isReceiptVerified: true, pinColor: 'BLUE' },
    { id: 4, userName: 'User4', diaryTitle: 'DiaryTitle4', isReceiptVerified: true, pinColor: 'YELLOW' },
    { id: 5, userName: 'User5', diaryTitle: 'DiaryTitle5', isReceiptVerified: false, pinColor: 'RED' },
    { id: 6, userName: 'User6', diaryTitle: 'DiaryTitle6', isReceiptVerified: true, pinColor: 'BLUE' },
    { id: 7, userName: 'User7', diaryTitle: 'DiaryTitle7', isReceiptVerified: true, pinColor: 'PURPLE' },
    { id: 8, userName: 'User8', diaryTitle: 'DiaryTitle8', isReceiptVerified: false, pinColor: 'YELLOW' },
    { id: 9, userName: 'User9', diaryTitle: 'DiaryTitle9', isReceiptVerified: true, pinColor: 'RED' },
    { id: 10, userName: 'User10', diaryTitle: 'DiaryTitle10', isReceiptVerified: false, pinColor: 'BLUE' },
    { id: 11, userName: 'User11', diaryTitle: 'DiaryTitle11', isReceiptVerified: true, pinColor: 'PURPLE' },
    { id: 12, userName: 'User12', diaryTitle: 'DiaryTitle12', isReceiptVerified: true, pinColor: 'YELLOW' },
    { id: 13, userName: 'User13', diaryTitle: 'DiaryTitle13', isReceiptVerified: true, pinColor: 'RED' },
    { id: 14, userName: 'User14', diaryTitle: 'DiaryTitle14', isReceiptVerified: false, pinColor: 'BLUE' },

  ];

  return (
    <div>
      <MainHeader/>
      <div className="post-list-view">
        <div className="search-area">
          {/* <div className="tabpanel-container">
            <div className="tabpanel">
              <div className="city-select-area">
                <div className="select-text-1">도시명/랜드마크</div>

                <div className="select-text-2">도시명/랜드마크 선택</div>
              </div>

              <div className="hashtag-select-area">
                <div className="select-text-1">해시태그</div>

                <div className="select-text-2">해시태그 선택</div>
              </div>

              <div className="pin-select-area">
                <div className="select-text-1">Pin Color 조절</div>

                <div className="select-text-2">Pin Color 조절</div>
              </div>

              <div className="search-btn-area">
                <div className="search-btn-text">검색</div>  
              </div>
              
            </div>
          </div> */}
        </div>

        <div className="main-container">

          <Container maxWidth="xl" style={{ marginTop: '30px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2.5} lg={2.5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {isMobileView ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                      <IconButton onClick={handleDrawerToggle} style={{ color: '#328ca8' }}>
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <Drawer
                      anchor="left"
                      open={isDrawerOpen}
                      onClose={handleDrawerToggle}
                    >
                      <FilterMenu1 />
                    </Drawer>
                  </>
                ) : (
                  <FilterMenu2 />
                )}

              </Grid>

              <Grid item xs={12} md={9.5} lg={9.5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="post-list-area">
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
                    <div className="post-count-text">총 {testData.length}개 맛집</div>
                    <div className="navbar">
                      <button className="button-6">추천순</button>

                      <button className="button-7">댓글수 많은순</button>

                      <button className="button-8">댓글수 낮은순</button>

                      <button className="button-9">최신순</button>
                    </div>
                  </div>

                  <div className="post-list">
                    <PostList data={testData} />
                  </div>


                </div>
              </Grid>
            </Grid>
          </Container>

          <div style={{ height: '100px' }} />


        </div>

      </div>
    </div>
  );
};

export default FindBestResPage;