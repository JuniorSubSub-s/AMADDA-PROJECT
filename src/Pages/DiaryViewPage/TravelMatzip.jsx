import PostTravelMatzip from "../../components/DiaryViewPage/PostTravelMatzip/PostTravelMatzip";

import "../../ui/DiaryViewPage/travelMatzip.css"

function TravelMatzip () {
    return (
        <div className="travelMatzip-container">
            <p className="main-title-1">여행지로 보는 내가 찾던 맛집!</p>
            <div className="main-title-underbar" />

            <div className="travel-post-group">
                <PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/17.png"}/>
                <PostTravelMatzip imgsrc={"/img/DiaryViewPageImg//18.png"}/>
                <PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/19.png"}/>
                <PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/20.png"}/>
                <PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/21.png"}/>
                <PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/22.png"}/>
            </div>
        </div>
    )
}

export default TravelMatzip;