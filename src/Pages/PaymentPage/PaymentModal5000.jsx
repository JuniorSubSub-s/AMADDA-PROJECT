import React, { useState } from 'react';
import { Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

import '../../ui/PaymentPage/PaymentModal.css';
import api from "../../api/axios";

function PaymentModal5000({ isOpen, onClose, userEmail, userName }) {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    // 현재 시간을 기준으로 merchant_uid 생성
    const generateMerchantUid = () => {
        const now = new Date();
        return `IMP${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
    };

    const handlePayment = () => {
        if (!window.confirm("구매 하시겠습니까?")) return;

        const IMP = window.IMP;
        IMP.init("imp70427074");

        // merchant_uid를 generateMerchantUid 함수로 생성
        const merchantUid = generateMerchantUid();

        IMP.request_pay(
            {
                channelKey: "channel-key-d3bc3a7d-5ac7-4033-ac2e-7831ea0f6d05",
                merchant_uid: merchantUid,
                name: "100 AMC",
                pay_method: "card",
                escrow: false,
                amount: "5000",
                tax_free: 3000,
                buyer_name: "홍길동",
                buyer_email: "buyer@example.com",
                buyer_tel: "02-1670-5176",
                buyer_addr: "성수이로 20길 16",
                buyer_postcode: "04783",
                m_redirect_url: "https://helloworld.com/payments/result", // 모바일 환경에서 필수 입력
                notice_url: "https://helloworld.com/api/v1/payments/notice",
                confirm_url: "https://helloworld.com/api/v1/payments/confirm",
                currency: "KRW",
                locale: "ko",
                custom_data: { userId: 30930 },
                display: { card_quota: [0, 6] },
                appCard: false,
                useCardPoint: true,
                bypass: {
                    tosspayments: {
                        useInternationalCardOnly: true, // 영어 결제창 활성화
                    },
                },
            },
            async (rsp) => {

                if (rsp.success) {
                    try {
                        const response = await api.post("api/payments/verify", {
                            impUid: rsp.imp_uid,
                            merchantUid: rsp.merchant_uid,
                            amount: rsp.paid_amount,
                        }
                        );
                        console.log("결제 검증 결과:", response.data);

                        if (response.status === 200) {
                            alert("결제가 완료되었습니다.");
                            window.location.reload();
                        } else {
                            alert(`결제 완료 후 저장 오류: 관리자에게 문의바랍니다.`);
                        }
                    } catch (error) {
                        console.error("결제 검증 실패:", error);
                    }
                } else {
                    alert(`결제 실패: ${rsp.error_msg}`);
                }
            }
        );
    };

    if (!isOpen) return null;

    const handlePaymentMethodClick = (method) => {
        setSelectedMethod(method);
    };

    const handleTermsCheck = (event) => {
        setIsTermsChecked(event.target.checked);
    };

    return (
        <div className="payment-method-overlay">
            <div className="payment-method-modal-container">
                <button className="payment-close-button" onClick={onClose}>✕</button>

                <div style={{ fontSize: "24px", fontFamily: "font-notosansKR-medium" }}>상품 정보</div>
                <div className="payment-product-info">
                    <img src="/img/CoinImg/coin.png" alt="Product" className="payment-product-image" />
                    <div style={{ marginBottom: "5px", fontFamily: "font-notosansKR-medium" }}>100 AMC</div>
                    <div style={{ marginBottom: "30px", fontFamily: "font-notosansKR-medium" }}>금액: ₩5,000</div>
                </div>

                <div style={{ fontSize: "20px", fontFamily: "font-notosansKR-medium" }}>결제 방법</div>
                <div className="payment-methods">
                    <Button
                        variant="outlined"
                        style={{ fontFamily: "font-notosansKR-medium", width: "100%", marginBottom: "2px" }}
                        onClick={() => handlePaymentMethodClick('creditCard')}
                        color={selectedMethod === 'creditCard' ? "primary" : "default"}
                    >
                        신용/체크카드
                    </Button>

                    <Button
                        variant="outlined"
                        style={{ fontFamily: "font-notosansKR-medium", width: "100%" }}
                        onClick={() => handlePaymentMethodClick('tossPay')}
                        color={selectedMethod === 'tossPay' ? "primary" : "default"}
                    >
                        토스페이
                    </Button>

                </div>

                <FormControlLabel
                    control={<Checkbox color="primary" onChange={handleTermsCheck} />}
                    label={<Typography variant="caption" className="payment-terms">
                        [필수] 결제 서비스 이용 약관, 개인정보 처리 동의
                    </Typography>}
                    className="terms-checkbox"
                />

                {/* 하단의 결제하기 버튼 */}
                <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "100%", marginTop: "20px", fontFamily: "font-notosansKR-medium" }}
                    disabled={selectedMethod !== 'tossPay' || !isTermsChecked}
                    onClick={handlePayment}
                >
                    결제하기
                </Button>
            </div>
        </div>
    );
}

export default PaymentModal5000;
