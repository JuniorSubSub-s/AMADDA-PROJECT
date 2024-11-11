import "../PostTravelMatzip/posttravelmatzip.css";

function PostTravelMatzip({ imgsrc, title, subtitle }) {
    return (
        <div className="postTravelMatzip-container">
            <div className="img-container">
                <img className="posthavebadge-img" src={imgsrc} alt="게시물 이미지" />
            </div>

            <div className="diary-post-info">
                <div className="diary-post title">
                    <div className="diary-text-title">{title}</div>
                </div>

                <div className="diary-post-subtitle">
                    <div className="text-subtitle">{subtitle}</div>
                </div>
            </div>
        </div>
    );
}

export default PostTravelMatzip;
