import { Alert, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../ui/JoinPage/SignUpPage.css';
import Footer from '../Foorter/Footer';
import MainHeader from '../Header/MainHeader';
function SignUpPage() {
    const [formData, setFormData] = useState({
        user_email: "",
        user_pwd: "",
        user_nickname: "",
        user_phonenumber: "",
        user_gender: "M", // 기본값
        user_nation: "1",
        user_name: "",
        user_birth: "" 
    });

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const error = queryParams.get('error');


    const [identifyNum, setIndentifyNum] = useState("") ;
    const [signupFlag, setSignupFlag] = useState(false);
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
    const [isIdentified, setIsIdentified] = useState(false);
    // const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);


    const [phonePrefix, setPhonePrefix] = useState("010"); // 통신사 기본값
    const [phoneNumber, setPhoneNumber] = useState(""); // 입력된 뒷번호
    React.useEffect(() => {
        const allFieldsFilled =
            formData.user_email &&
            formData.user_pwd &&
            formData.user_nickname &&
            formData.user_phonenumber &&
            formData.user_birth &&
            formData.user_gender &&
            formData.user_nation &&
            formData.user_name;
    
        setSignupFlag(allFieldsFilled && isDuplicateChecked && isIdentified);
    }, [isDuplicateChecked, isIdentified, formData]);
    //성별 
    const handleGender = (e) => {
        console.log("성별 : ", e.target.value);
        setFormData({...formData, user_gender : e.target.value})
    }
    //국적
    const handleNation = (e) => {
        console.log("국적 : ", e.target.value);
        setFormData({...formData, user_nation : e.target.value})
    }
    //이메일
    const handleEmail = (e) => {
        console.log("이메일 : ", e.target.value);
        setFormData({...formData, user_email : e.target.value})
    }
    //이름
    const handleName = (e) => {
        console.log("이름 : ", e.target.value);
        setFormData({...formData, user_name : e.target.value})
    }
    //닉네임
    const handleNickname = (e) => {
        console.log("닉네임 : ", e.target.value);
        setFormData({...formData, user_nickname : e.target.value})
    }
    //비밀번호
    const handlePwd = (e) => {
        console.log("비밀번호 : ", e.target.value);
        setFormData({...formData, user_pwd : e.target.value})
    }

    //전화번호 - 추가하기
    const handleSelectChange = (e) => {
        const prefix = e.target.value;
        setPhonePrefix(prefix);
        updatePhoneNumber(prefix, phoneNumber); // 최종 전화번호 업데이트
    };
    
    // 전화번호 뒷자리 입력 핸들러
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
        if (value.length > 8) return;
        setPhoneNumber(value);
        updatePhoneNumber(phonePrefix, value); // 최종 전화번호 업데이트
    };

    // 최종 전화번호 업데이트
    const updatePhoneNumber = (prefix, number) => {
        const formattedNumber = `${prefix}-${number.slice(0, 4)}-${number.slice(4)}`; // "010-1234-5678"
        setFormData({
            ...formData,
            user_phonenumber: formattedNumber,
            
        });
    };


    //가입버튼 후 메인페이지
    const goHome = async () => {
        navigate("/amadda");
    }

    //가입버튼 누를때
    const handleSubmit = async () => {
        console.log("formData : ", formData);
        const password = formData.user_pwd.trim(); // 공백없애기
        console.log(formData.user_pwd); 

        const passwordForm = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        console.log("password form flag : " , passwordForm.test(password));
        if (!passwordForm.test(password)) {
            Swal.fire('비밀번호는 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다.');
            return; 
        }
        try {
            const response = await axios.post('http://localhost:7777/ama/new', {
                ...formData,
                user_birth: formData.user_birth.toISOString(),
            });
            console.log("jwt : ", response.data) ;
            localStorage.setItem("jwt", response.data) ;
            
            Swal.fire({
                icon: "success",
                title: "환영합니다!",
                text: "가입이 완료되었습니다.",
            });
            goHome() ;
            
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "warning",
                title: "이런!",
                text: "가입에 오류가 발생하였습니다.",
            });
        }
    };

    //메일발송
    const sendMail = async () => {
        // const response = await axios.post('http://localhost:7777/send-one');
        
        try {
            const response = await axios.post('http://localhost:7777/send-one',null, {
                params: { user_phonenumber: formData.user_phonenumber }
            });
            console.log("response", response.data);
            Swal.fire("인증번호가 전송되었습니다.");
        } catch (error) {
            console.error('Error sending verification code:', error);
            Swal.fire("인증번호 전송 중 오류가 발생했습니다.");
        }
        
    }

    //인증번호 검수
    const identifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:7777/identify-code',null, {
                params: {
                    user_phonenumber: formData.user_phonenumber,
                    identify_num: identifyNum
                }
            });
            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "인증성공!",
                    text: "전화번호 인증에 성공하였습니다.",
                });
                setIsIdentified(true) ;
            } else {
                Swal.fire("인증번호가 일치하지 않습니다.");
                setIsIdentified(false);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            Swal.fire("인증번호 확인 중 예기치 못한 오류가 발생했습니다.");
        }
    };

    //생년월일
    const handleBirthDateChange = (e) => {
            // 현재 입력값 가져오기
        let value = e.target.value;

        // 숫자만 남기기
        value = value.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자는 제거

        // 8자리까지만 허용
        if (value.length > 8) {
            value = value.slice(0, 8); // 최대 8자리까지만 자름
        }

        // 값 업데이트 (숫자만 허용한 상태로)
        e.target.value = value;


        const year = parseInt(value.slice(0, 4), 10);
        const month = parseInt(value.slice(4, 6), 10) - 1;
        const day = parseInt(value.slice(6, 8), 10);
        
        const birth = new Date(year, month, day);
    
        setFormData({
            ...formData,
            user_birth: birth,
        });
    };
    

    //이메일 중복확인
    const duplicateClick = async () => {
        console.log("중복클릭");


        //이메일 형식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.user_email)) {
            Swal.fire("유효하지 않은 이메일 형식입니다.");
            return; // 잘못된 형식이면 함수 종료
        }

        try {
            const response = await axios.post('http://localhost:7777/ama/check-duplicate', {
                user_email: formData.user_email
            });
            console.log(response.data);
            
            if (!response.data) {
                Swal.fire("사용가능한 이메일입니다.");
                setIsDuplicateChecked(true);
                
            } else if (response.data) {
                Swal.fire('이미 사용중인 이메일입니다.');
                setIsDuplicateChecked(false);
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('중복 확인 중 예기치 못한 오류가 발생했습니다.');
            setIsDuplicateChecked(false);
        }
    }

    //입력한 인증번호 전송
    const handleIdentifyNumChange = (e) => {
        console.log("입력한 인증번호 :" + e.target.value)
        setIndentifyNum(e.target.value);
    };
    
    //카카오로 회원가입 버튼 눌렀을 때
    const handleKakaoLogin = async () => {
        try {
            // 카카오 로그인 URL 요청
            
            const response = await axios.post("http://localhost:7777/auth/kakao/signup");
            const kakaoLoginUrl = response.data.kakaoLoginUrl;
            console.log("KakaoLoginUrl : ", kakaoLoginUrl);
            
            window.location.href = kakaoLoginUrl;
          } catch (error) {
            console.error("Error fetching Kakao login URL:", error);
            Swal.fire({
              icon: "warning",
              title: "이런!",
              text: " 요청 중 문제가 발생하였습니다.",
            });
          }
    };
    
    

    return (
        <div>
            {/* 카카오톡 이메일 중복 시 */}
            {error === 'email-exists' && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                    <Alert 
                        severity="error" 
                        style={{
                            fontSize: '16px',
                            padding: '12px 24px',
                            maxWidth: '600px',
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fdecea',
                            color: '#d32f2f',
                        }}
                    >
                        <strong>이미 등록된 이메일입니다.</strong> 다른 이메일을 사용해주세요.
                    </Alert>
                </div>
            )}
        <div className="signup-page">
            
            <MainHeader />

            <Container maxWidth="md" className="signup-container">
                <Grid container spacing={2}
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
                            카카오 간편 회원가입을 하시면 아맛따 캘린더 사용이 가능합니다.<br />
                            캘린더를 사용해서 자신의 맛집 스케쥴러를 제작해보세요.
                        </Typography>
                    </Grid>

                    {/* 카카오 간편가입 버튼 */}
                    <Grid item xs={12} className="kakaoJoin-button-container">
                        <Button variant="contained" 
                                className="join-kakao-button"
                                onClick={handleKakaoLogin}>
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
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleName}
                                    />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>내국인</InputLabel>
                            <Select className="input-field"
                                    value={formData.user_nation}
                                    onChange={handleNation}>
                                <MenuItem value="1">내국인</MenuItem>
                                <MenuItem value="0">외국인</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* 생년월일 + 성별 선택 */}
                    <Grid item xs={12} sm={10}>
                        <TextField  fullWidth label="생년월일 (예: 20241028)" 
                                    variant="outlined" 
                                    className="input-field"
                                    onChange={handleBirthDateChange}
                                   />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>성별</InputLabel>
                            <Select className="input-field"
                                    value={formData.user_gender}
                                    onChange={handleGender}
                                    >
                                <MenuItem value="M">남성</MenuItem>
                                <MenuItem value="F">여성</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* 통신사 + 010 선택 + 전화번호 입력 */}
                    
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth variant="outlined">
                            <Select defaultValue="010" className="input-field"
                                     value={phonePrefix}
                                     onChange={handleSelectChange} // 통신사 선택 핸들러
                                     >
                                <MenuItem value="010">010</MenuItem>
                                <MenuItem value="011">011</MenuItem>
                                <MenuItem value="016">016</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField  fullWidth label="전화번호" 
                                    variant="outlined" 
                                    className="input-field"
                                    name="user_phonenumber"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}   />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField  fullWidth label="인증번호" 
                                        variant="outlined" 
                                        className="input-field"
                                        name="identifyNum"
                                        onChange={handleIdentifyNumChange}  />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="outlined"
                                fullWidth
                                className="join-check-button"
                                value={formData.user_email}
                                onClick={sendMail}>
                            인증번호발송
                        </Button>
                    </Grid>

                    {/* 본인 인증 버튼 */}
                    <Grid item xs={12}>
                        <Button variant="outlined" 
                                onClick={identifyCode}
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
                        <TextField fullWidth    label="이메일 주소" 
                                                variant="outlined" 
                                                className="input-field"
                                                name="user_email"
                                                value={formData.user_email}
                                                onChange={handleEmail} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="outlined"
                                fullWidth
                                className="join-check-button"
                                onClick={duplicateClick}>
                            중복확인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth    label="닉네임"
                                                variant="outlined"
                                                className="input-field"
                                                name="user_nickname"
                                                
                                                value={formData.user_nickname}
                                                onChange={handleNickname} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField  fullWidth label="비밀번호 (8~16자, 영문, 숫자, 특수문자 포함)" 
                                    variant="outlined" 
                                     type="password" 
                                     className="input-field"
                                     name="user_pwd"
                                     value={formData.user_pwd}
                                    onChange={handlePwd} />
                    </Grid>
                    

                    {/* 가입하기 버튼 */}
                    <Grid item xs={12}>
                        <Button variant="contained" 
                                fullWidth 
                                className="signup-button"  
                                onClick={handleSubmit}
                                disabled={!signupFlag}>
                            동의하고 가입하기
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </div>
        </div>
    );
}

export default SignUpPage;