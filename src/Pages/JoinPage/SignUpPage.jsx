import React from 'react';
import { Container, Grid, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import MainHeader from '../Header/MainHeader';
import Footer from '../Foorter/Footer';

import '../../ui/JoinPage/SignUpPage.css';

function SignUpPage() {
    return (
        <div className="signup-page">
            <MainHeader />

            <Container maxWidth="md" className="signup-container">
                <Grid   container spacing={2} 
                        alignItems="center" 
                        justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" 
                                    align="center" 
                                    gutterBottom 
                                    className="signup-title">
                            회원가입
                        </Typography>
                        <Typography variant="subtitle1" 
                                    align="center" 
                                    className="signup-subtitle">
                            카카오 간편 회원가입을 하시면 아맛따 캘린더 사용이 가능합니다.<br/>
                            캘린더를 사용해서 자신의 맛집 스케쥴러를 제작해보세요.
                        </Typography>
                    </Grid>

                    {/* 카카오 간편가입 버튼 */}
                    <Grid item xs={12} className="kakaoJoin-button-container">
                        <Button variant="contained" className="join-kakao-button">
                            카카오 1초 간편가입
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <hr className="join-divider" />
                    </Grid>

                    {/* 본인인증 영역 */}
                    <Grid item xs={12}>
                        <Typography variant="h6" className="section-title">본인인증</Typography>
                    </Grid>
                    
                    {/* 이름 + 내국인/외국인 선택 */}
                    <Grid item xs={12} sm={10}>
                        <TextField  fullWidth 
                                    label="이름" 
                                    variant="outlined" 
                                    className="input-field" 
                                    />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>내국인</InputLabel>
                            <Select className="input-field">
                                <MenuItem value="KR">내국인</MenuItem>
                                <MenuItem value="FR">외국인</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    {/* 생년월일 + 성별 선택 */}
                    <Grid item xs={12} sm={10}>
                        <TextField fullWidth label="생년월일 (예: 2024.10.28)" variant="outlined" className="input-field" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>성별</InputLabel>
                            <Select className="input-field">
                                <MenuItem value="M">남성</MenuItem>
                                <MenuItem value="F">여성</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    {/* 통신사 + 010 선택 + 전화번호 입력 */}
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>통신사</InputLabel>
                            <Select className="input-field">
                                <MenuItem value="SKT">SKT</MenuItem>
                                <MenuItem value="KT">KT</MenuItem>
                                <MenuItem value="LGU">LGU+</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth variant="outlined">
                            <Select defaultValue="010" className="input-field">
                                <MenuItem value="010">010</MenuItem>
                                <MenuItem value="011">011</MenuItem>
                                <MenuItem value="016">016</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField  fullWidth label="전화번호" 
                                    variant="outlined" 
                                    className="input-field" />
                    </Grid>
                    
                    {/* 본인 인증 버튼 */}
                    <Grid item xs={12}>
                        <Button variant="outlined" 
                                fullWidth 
                                className="join-verify-button">
                            본인 인증
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <hr className="join-divider" />
                    </Grid>

                    {/* 필수정보 영역 */}
                    <Grid item xs={12}>
                        <Typography variant="h6" className="section-title">필수정보</Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField fullWidth label="이메일" variant="outlined" className="input-field" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="outlined" 
                                fullWidth 
                                className="join-check-button">
                            중복확인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="비밀번호 (8~16자, 영문, 숫자, 특수문자 포함)" variant="outlined" type="password" className="input-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="닉네임" variant="outlined" className="input-field" />
                    </Grid>

                    {/* 가입하기 버튼 */}
                    <Grid item xs={12}>
                        <Button variant="contained" 
                                fullWidth 
                                className="signup-button">
                            동의하고 가입하기
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </div>
    );
}

export default SignUpPage;