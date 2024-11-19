import { useEffect } from 'react';
import './ThemeStore.css'
import { Rating } from '@mui/material';

function ThemeItem({ data }) {

    useEffect(() => {
       
    }, [data]); 

    const discountedPrice = data.discount
    ? data.themePrice - (data.themePrice * (data.discount / 100))
    : data.themePrice;


    const formatPrice = (price) => {
        if (price === undefined || price === null) {
            console.error('Invalid price value:', price);
            return '0'; // 기본값 반환
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천 단위로 콤마 추가
    };
    

    return (
        <div className="theme-item">
            <div className="item-image-container">
                <img src={data.themeImage} alt={data.themeName} className="theme-image"
                        style={{
                            width: '100%',  // Box 너비에 맞춤
                            height: '100%', // Box 높이에 맞춤
                            objectFit: 'cover', // 크롭하며 비율 유지
                        }} />
            </div>

            <div className="info-area">
                <div className="theme-name">{data.themeName}</div>
                <Rating name="rating" value={data.rating} size="small" readOnly style={{ marginTop: '15px' }} />
                <div className="horizontal-container">
                    {data.discount > 0 && <div className="discount-per">{data.discount}%</div>}
                    <div className="discounted-price">{formatPrice(discountedPrice.toFixed(0))}원</div>
                    {data.discount > 0 && (
                        <div className="price">{formatPrice(data.themePrice)}원</div>
                    )}

                    

                </div>

            </div>

        </div>
    );
}

export default ThemeItem;