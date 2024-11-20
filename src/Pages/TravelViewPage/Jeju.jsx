import { Container, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DiaryPostItem from '../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem';
import "../../ui/TravelViewPage/style4.css";
import Footer from "../Foorter/Footer";
import Header from "../Header/MainHeader";

export const Jeju = () => {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12; // 페이지당 보여줄 아이템 수

  useEffect(() => {
    getPostData();
  }, []); // 컴포넌트 마운트 시 한번만 데이터 요청

  const api_array = axios.create({
    baseURL: 'http://localhost:7777',
    paramsSerializer: (params) => {
      return Object.entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&');
          }
          return `${key}=${encodeURIComponent(value)}`;
        })
        .join('&');
    },
  });

  const getPostData = async () => {
    try {
      const response = await api_array.get("/api/amadda/posts/topics", {
        params: { topicNames: '제주도' },
      });
      console.log("응답 데이터: ", response.data);

      if (Array.isArray(response.data)) {
        setPostData(response.data);  
        setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // 총 페이지 수 계산
      } else {
        setPostData([]); 
      }

    } catch (error) {
      console.error("Error fetching topic data:", error);
    }
  };


  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = postData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 증가 함수
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 페이지 감소 함수
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div>
      <Header />
      <div className="travel-view-page">
        <Container className="main">
          <div className="main-background4">
            <div
              className="main-photo"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/TravelViewPageImg/jeju.png)`,
              }}
            />
            <div className="main-textcontent">
              <div className="emphasis">제주가 온다</div>
              <div className="p">제주 대표 맛집 다 모여라</div>
            </div>
          </div>

          <div className="heading-wrapper">
            <div className="text-wrapper-12">맛집 일기</div>
          </div>

          <Grid container spacing={2} className="list-2">
            {currentData && currentData.length > 0 ? (
              currentData.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <DiaryPostItem data={data} />
                </Grid>
              ))
            ) : (
              <div className="no-posts-message">게시물이 없습니다.</div>
            )}
          </Grid>

          <div className="pagination-buttons">
            <div
              className={`button-2 ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <div className="text-wrapper-10">되돌리기</div>
            </div>

            <div
              className={`button-3 ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <div className="text-wrapper-11">더보기</div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Jeju;
