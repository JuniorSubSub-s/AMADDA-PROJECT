import { useEffect } from 'react';
import './ThemeStore.css'

function MyThemeItem({ data }) {

    useEffect(() => {
       
    }, [data]); 

    return (
        <div className="theme-item">
            <div className="item-image-container">
                <img src={data.themeImage} alt={data.themeName} 
                        style={{
                            width: '175px',  // Box 너비에 맞춤
                            height: '250px', // Box 높이에 맞춤
                            objectFit: 'contain', // 크롭하며 비율 유지
                        }} />
            </div>

            <div className="info-area">
                <div className="theme-name">{data.themeName}</div>
                <div className="theme-description">{data.themeDescription}</div>

            </div>

        </div>
    );
}

export default MyThemeItem;