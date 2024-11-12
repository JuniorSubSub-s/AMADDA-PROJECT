import React, { useState } from 'react';
import { Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

import '../../ui/PaymentPage/PaymentModal.css';

function PaymentModal5000({ isOpen, onClose }) {

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

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
                    <img src="/img/CoinImg/many_coin.png" alt="Product" className="payment-product-image" />
                    <div style={{ marginBottom: "5px", fontFamily: "font-notosansKR-medium" }}>500 AMC</div>
                    <div style={{ marginBottom: "30px", fontFamily: "font-notosansKR-medium" }}>금액: ₩25,000</div>
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
                    <div className="horizontal-buttons">
                        <Button
                            variant="outlined"
                            style={{ fontFamily: "font-notosansKR-medium", width: "49%" }}
                            onClick={() => handlePaymentMethodClick('kakaoPay')}
                            color={selectedMethod === 'kakaoPay' ? "primary" : "default"}
                        >
                            카카오페이
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ fontFamily: "font-notosansKR-medium", width: "49%" }}
                            onClick={() => handlePaymentMethodClick('tossPay')}
                            color={selectedMethod === 'tossPay' ? "primary" : "default"}
                        >
                            토스페이
                        </Button>
                    </div>
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
                    disabled={!selectedMethod || !isTermsChecked} // 결제 방법이 선택되고 약관 동의 시 활성화
                >
                    결제하기
                </Button>
            </div>
        </div>
    );
}

export default PaymentModal5000;
