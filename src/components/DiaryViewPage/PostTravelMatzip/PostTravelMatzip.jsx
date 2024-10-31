import "../PostTravelMatzip/posttravelmatzip.css";

function PostTravelMatzip(props) {
    return (
        <div className="postTravelMatzip-container">
            <div className="img-container">
                <img className="posthavebadge-img" src={props.imgsrc} alt="게시물 이미지" />
            </div>

            <div className="diary-post-info">
                <div className="diary-post title">
                    <div className="diary-text-title">가을 낭만 가득한 맛집 추천</div>
                </div>

                <div className="diary-post-subtitle">
                    <div className="text-subtitle">영주, 경주, 강릉, 남이섬, 춘천</div>
                </div>
            </div>
        </div>
    )
}

export default PostTravelMatzip;