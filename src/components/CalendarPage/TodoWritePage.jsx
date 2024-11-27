import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { format } from "date-fns";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPenToSquare, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";

function TodoWritePage({ dateId, currentMonth, setShowModal, getEventData, getData, userId }) {
    const { kakao } = window;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [eventColor, setEventColor] = useState("red");
    const [lat, setLat] = useState(37.5665);
    const [lon, setLon] = useState(126.9780);
    const [map, setMap] = useState();
    const [markers, setMarkers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedMarker, setSelectedMarker] = useState(null);

    const CUSTOM_CLICK_IMAGE_URL = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const DEFAULT_IMAGE_URL = "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";

    // 현재 위치 가져오기
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    }, []);

    // 검색 처리 함수
    const handleSearch = useCallback(() => {
        if (!map || !kakao?.maps?.services?.Places) return;
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(searchKeyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                const markerData = data.map((place) => ({
                    position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
                    content: place.place_name,
                    address: place.address_name,
                }));
                setMarkers(markerData);
                markerData.forEach((marker) => bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng)));
                map.setBounds(bounds);
            } else {
                console.error("검색 실패 : ", status);
            }
        });
    }, [map, searchKeyword, kakao]);

    // 데이터 저장
    const handleSave = async () => {
        if (!title.trim()) return;

        const data = {
            day: dateId,
            title: title.trim(),
            content: content.trim() || "",
            color: eventColor,
            address: selectedMarker?.address || "",
            userId,
        };

        try {
            await api.post(`/events/save`, data);
            alert("글 작성을 완료");
            getEventData(format(currentMonth, "yyyy-MM"));
            getData(dateId);
            setShowModal(false);
        } catch (err) {
            console.error("글 작성 실패 : ", err);
        }
    };

    // 색상 버튼 렌더링
    const renderColorButtons = () =>
        ["red", "orange", "green", "blue"].map((color) => (
            <button
                key={color}
                className={`colorbtn ${eventColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setEventColor(color)}
            />
        ));

    // 마커 렌더링
    const renderMarkers = () =>
        markers.map((marker, index) => (
            <MapMarker
                key={index}
                position={marker.position}
                clickable={true}
                image={{
                    src: selectedMarker?.content === marker.content ? CUSTOM_CLICK_IMAGE_URL : DEFAULT_IMAGE_URL,
                    size: { width: 24, height: 35 },
                    options: { offset: { x: 12, y: 35 } },
                }}
                onClick={() => setSelectedMarker(marker)}
            >
                {selectedMarker?.content === marker.content && (
                    <div style={{ width: "150px", maxWidth: "300px", color: "black", textAlign: "center" }}>
                        {marker.content}
                    </div>
                )}
            </MapMarker>
        ));

    return (
        <div className="container" onClick={(e) => e.stopPropagation()}>
            <div className="btncontainer">
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="xbutton"
                        onClick={() => setShowModal(false)}
                    />
                </div>

                <div className="eventcolor">
                    <div style={{ marginBottom: "3px" }}>
                        <img src="/img/CalendarImg/Rainbow.jpg" alt="Rainbow" className="rainbow" />
                    </div>
                    <div style={{ margin: "0" }}>
                        <label className="eventcolorlabel"> 이벤트 색상 </label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                        {["red", "orange", "green", "blue"].map((color) => (
                            <button
                                key={color}
                                className={`colorbtn ${eventColor === color ? "selected" : ""}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setEventColor(color)}
                            ></button>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="titleicon"
                        style={{ color: eventColor, borderColor: eventColor }}
                    />
                    <input
                        type="text"
                        className="content"
                        style={{ height: "25px" }}
                        value={title}
                        placeholder="제목"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div style={{ display: "flex" }}>
                    <FontAwesomeIcon icon={faPenToSquare} className="titleicon" style={{ marginTop: "8px", color: "#f5f5f5" }} />
                    <input
                        type="text"
                        className="content"
                        style={{ height: "100px" }}
                        value={content}
                        placeholder="내용"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div style={{ display: "flex" }}>
                    <FontAwesomeIcon icon={faLocationDot} className="titleicon" style={{ marginTop: "8px", color: "#f5f5f5" }} />
                    <input
                        type="text"
                        className="content"
                        style={{ height: "40px" }}
                        placeholder="주소"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />
                </div>

                <div style={{ width: "420px", height: "200px", borderRadius: "14px", marginLeft: "72px" }}>
                    <Map
                        center={{ lat, lng: lon }}
                        style={{ width: "100%", height: "100%" }}
                        level={3}
                        onCreate={setMap}
                    >
                        {markers.map((marker, index) => (
                            <MapMarker
                                key={index}
                                position={marker.position}
                                clickable={true}
                                image={{
                                    src: selectedMarker?.content === marker.content ? CUSTOM_CLICK_IMAGE_URL : DEFAULT_IMAGE_URL,
                                    size: { width: 24, height: 35 },
                                    options: { offset: { x: 12, y: 35 } },
                                }}
                                onClick={() => {
                                    setSelectedMarker(marker);
                                }}
                            >
                                {selectedMarker?.content === marker.content && (
                                    <div style={{ width: "150px", maxWidth: "300px", color: "black", textAlign: "center" }}>
                                        {marker.content}
                                    </div>
                                )}
                            </MapMarker>
                        ))}
                    </Map>
                </div>

                <div>
                    <button
                        title="저장"
                        style={{ cursor: "pointer" }}
                        disabled={!title.trim()}
                        className="TodoButton"
                        onClick={handleSave}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoWritePage;