import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import '../../ui/PaymentPage/PaymentPageModal.css';

import PaymentModal5000 from "./PaymentModal5000";
import PaymentModal15000 from "./PaymentModal15000";
import PaymentModal25000 from "./PaymentModal25000";

function PaymentInfoModal({ isOpen, onClose }) {

    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 모달이 열리면 스크롤을 비활성화, 닫힐 때 활성화하는 useEffect 추가
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // 컴포넌트가 언마운트될 때 스크롤을 원래대로 돌려줌
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const products = [
        { amount: "100 AMC", price: "₩5,000", buttonLabel: "결제하기", icon: "/img/CoinImg/coin.png", modal: "PaymentModal5000" },
        { amount: "300 AMC", price: "₩15,000", buttonLabel: "결제하기", icon: "/img/CoinImg/more_coin.png", modal: "PaymentModal15000" },
        { amount: "500 AMC", price: "₩25,000", buttonLabel: "결제하기", icon: "/img/CoinImg/many_coin.png", modal: "PaymentModal25000" },
        { amount: "AMADDA 구독서비스", price: "월 ₩9,500", buttonLabel: "구독하기", icon: "/img/CoinImg/subscribe.png" },
    ];

    const handlePaymentClick = (product) => {
        setSelectedProduct(product.modal)
        setPaymentModalOpen(true);
    }

    const renderPaymentModal = () => {
        switch (selectedProduct) {
            case "PaymentModal5000":
                return <PaymentModal5000
                    isOpen={isPaymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)} />;
            case "PaymentModal15000":
                return <PaymentModal15000
                    isOpen={isPaymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)} />;
            case "PaymentModal25000":
                return <PaymentModal25000
                    isOpen={isPaymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)} />;
            default:
                return null;
        }
    }

    return (
        <div className="coin-modal-overlay">
            <div className="modal-container">
                <button className="pay-close-button" onClick={onClose}>✕</button>

                {/* 상단 제목과 설명 */}
                <div className="text-overlay">
                    <Typography className="modal-title">
                        AMADDA COIN 결제
                    </Typography>
                    <Typography variant="body1" className="modal-description">
                        더 개성 넘치는 일기장을 원하시나요?<br /> AMADDA 코인을 충전하고 마음에 드는 테마를 지금 바로 만나보세요!
                    </Typography>
                </div>

                {/* 가운데 카드 배치 */}
                <Grid container spacing={4} justifyContent="center">
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card className="plugin-card">
                                <CardContent>
                                    <div className="coin-image">
                                        <img src={product.icon} alt={product.amount} />
                                    </div>
                                    <div style={{ marginBottom: "10px", fontSize: "20px", fontFamily: "font-notosansKR-medium" }}>
                                        {product.amount}
                                    </div>
                                    <div style={{ fontFamily: "font-notosansKR-medium" }}>
                                        {product.price}
                                    </div>
                                    <Button variant="contained"
                                        color="primary"
                                        className="purchase-button"
                                        onClick={() => handlePaymentClick(product)}>
                                        {product.buttonLabel}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            
            {/* 결제 모달 렌더링 */}
            {renderPaymentModal()}

        </div>
    );
}

export default PaymentInfoModal;
