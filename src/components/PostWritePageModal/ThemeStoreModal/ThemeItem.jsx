import { useEffect } from 'react';
import './style.css'
import { Rating } from '@mui/material';

function ThemeItem({ data }) {

    useEffect(() => {
       
    }, [data]); 

    const discountedPrice = data.price - (data.price * (data.discount / 100));

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천 단위로 콤마 추가
    };

    return (
        <div className="theme-item">
            <div className="item-image-container" />

            <div className="info-area">
                <div className="theme-name">{data.themeName}</div>
                <Rating name="rating" defaultValue={data.rating} size="small" readOnly style={{ marginTop: '15px'}} />
                <div className="horizontal-container">
                    <div className="discount-per">{data.discount}%</div>
                    <div className="discounted-price">{formatPrice(discountedPrice.toFixed(0))}원</div>
                    <div className="price">{formatPrice(data.price)}원</div>
                </div>
            </div>

        </div>
    );
}

export default ThemeItem;