import React, { useState } from 'react';
import { Grid } from '@mui/material';

import './PostItem.css';

function PostItem({ data }) {

    return (
        <div className="post-item">

            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={8}>
                    <div className="mat-left-area" >
                        {data.isReceiptVerified && (
                            <img style={{ position: 'absolute' }} src="/img/FindBestResPageImg/vector-4.svg" />
                        )}
                        <div className="post-img">
                            {/* 여기 이미지 넣으셈 */}
                        </div>

                        <div style={{ padding: '20px', width: '100%' }}>
                            <div className="receipt-verification-text"
                                style={{ color: data.isReceiptVerified ? "#00B058" : "black" }}>
                                {data.isReceiptVerified ? "영수증 인증 게시글" : "영수증 미인증 게시글"}
                            </div>
                            <div className="user-info">
                                <div className="user-profile-img">
                                    {/* 여기 이미지 넣으셈 */}
                                </div>

                                <div style={{ marginLeft: '10px' }}>
                                    <div className="user-name-text">{data.userName}</div>
                                    <div className="write-date-text">18일 전 작성</div>
                                </div>
                            </div>

                            <div className="divider" />

                            <div className="badge-area">
                                <div className="badge" />
                                <div className="badge" />
                                <div className="badge" />
                                <div className="badge" />

                            </div>

                            <div className="hashtag-area">
                                <div className="hashtag-text">#가을맛집</div>
                                <div className="hashtag-text">#가을맛집</div>
                                <div className="hashtag-text">#가을맛집</div>
                                <div className="hashtag-text">#가을맛집</div>
                                <div className="hashtag-text">#가을맛집</div>
                                <div className="hashtag-text">#가을맛집</div>
                            </div>

                            <div className="location-text">
                                롯데백화점 부근에 위치
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} md={12} lg={4}>
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center' }} >
                        <div className="mat-right-area">
                            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', columnGap: '30px' }}>
                                <div className="mat-card-div">
                                    <div className="text-1">작성자 감정</div>

                                    <div className="mat-card-container">
                                        <div className="mat-card">
                                            <div style={{ width: '100%' }}>
                                                <img className="mat-img-icon" src="/img/FindBestResPageImg/korean.svg" />
                                            </div>

                                            <div style={{ backgroundColor: '#FF81D3', width: '100%', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', alignContent: 'center' }}>
                                                <div className="mat-card-text">행복</div>
                                            </div>
                                        </div>

                                        <div className="mat-card">
                                            <div style={{ width: '100%' }}>
                                                <img className="mat-img-icon" src="/img/FindBestResPageImg/korean.svg" />
                                            </div>

                                            <div style={{ backgroundColor: '#FF81D3', width: '100%', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', alignContent: 'center' }}>
                                                <div className="mat-card-text">행복</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="mat-card-div">
                                    <div className="text-1">게시물 간략 소개</div>

                                    <div className="mat-card-container">
                                        <div className="mat-card">
                                            <div style={{ width: '100%' }}>
                                                <img className="mat-img-icon" src="/img/FindBestResPageImg/korean-2.png" />
                                            </div>

                                            <div style={{ backgroundColor: '#FFA53F', width: '100%', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', alignContent: 'center' }}>
                                                <div className="mat-card-text">가을</div>
                                            </div>
                                        </div>

                                        <div className="mat-card">
                                            <div style={{ width: '100%' }}>
                                                <img className="mat-img-icon" src="/img/FindBestResPageImg/korean-3.png" />
                                            </div>

                                            <div style={{ backgroundColor: '#4E37FF', width: '100%', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', alignContent: 'center' }}>
                                                <div className="mat-card-text">한식</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="mat-detail-btn">
                                <div className="mat-detail-text">상세보기</div>
                            </button>

                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default PostItem;
