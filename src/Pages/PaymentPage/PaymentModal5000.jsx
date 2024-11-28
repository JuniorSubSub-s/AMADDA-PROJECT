import React, { useState } from 'react';
import { Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

import '../../ui/PaymentPage/PaymentModal.css';
import api from "../../api/axios";

function PaymentModal5000({ isOpen, onClose, userEmail, userName }) {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isTermsChecked, setIsTermsChecked] = useState(false);


    const handlePayment = () => {
        if (!window.confirm("구매 하시겠습니까?")) return;

        const IMP = window.IMP;
        IMP.init("imp70427074");

        setTimeout(() => {
            IMP.request_pay(
                {
                    pg: "kakaopay.TC0ONETIME",
                    pay_method: "card",
                    name: "100AMC",
                    amount: 5000,
                    buyer_email: userEmail, // 사용자 이메일
                    buyer_name: userName,  // 사용자 이름
                    buyer_tel: "010-1234-5678",
                    buyer_addr: "서울특별시 강남구 신사동",
                    buyer_postcode: "01181",
                    merchant_uid: `payment-${crypto.randomUUID()}`,
                },
                async (rsp) => {
                    if (rsp.success) {
                        try {
                            const response = await api.post('api/payments/complete', {
                                impUid: rsp.imp_uid,
                                merchantUid: rsp.merchant_uid,
                            });
                            alert("결제가 성공적으로 완료되었습니다.");
                        } catch (error) {
                            alert(`결제 검증 실패: ${error.response?.data || error.message}`);
                        }
                    } else {
                        alert(`결제 실패: ${rsp.error_msg}`);
                    }
                }
            );
        });
    };

    const confirmPayment = async (impUid, amount) => {
        try {
            const response = await api.post('/api/payments/confirm', {
                impUid,
                amount,
            });
            return response.data;
        } catch (error) {
            console.error("Error response:", error.response);
            throw new Error(error.response?.data || 'Failed to confirm payment.');
        }
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
                        카카오페이
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
