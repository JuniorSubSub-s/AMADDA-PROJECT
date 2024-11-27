import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPenToSquare, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function EventUpdate({ listId, dateId, setShowUpdateModal, getEventData, getData, currentMonth }) {
    const { kakao } = window;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [eventColor, setEventColor] = useState("red");
    const [address, setAddress] = useState(""); // 기존 주소 상태 추가
    const [lat, setLat] = useState(37.5665);
    const [lon, setLon] = useState(126.9780);
    const [map, setMap] = useState();
    const [markers, setMarkers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedMarker, setSelectedMarker] = useState(null);

    const CUSTOM_CLICK_IMAGE_URL = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const DEFAULT_IMAGE_URL = "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";

    // 기존 일정 데이터 가져오기
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await api.get(`events/gettodo/${listId}`);
                const { title, content, color, address } = response.data; // 주소 포함
                setTitle(title);
                setContent(content);
                setEventColor(color);
                setAddress(address); // 기존 주소 설정
            } catch (err) {
                console.error(err);
            }
        };
        fetchEventData();
    }, [listId]);

    // 주소 검색 처리
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
                markerData.forEach((marker) =>
                    bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng))
                );
                map.setBounds(bounds);
            } else {
                console.error("검색 실패 : ", status);
            }
        });
    }, [map, searchKeyword, kakao]);

    // 수정 데이터 저장
    const handleUpdate = async () => {
        if (!title.trim()) return;

        const data = {
            calId: listId,
            title: title.trim(),
            content: content.trim(),
            color: eventColor,
            address: selectedMarker?.address || address, // 기존 주소 유지 또는 선택된 주소 사용
        };

        try {
            await api.put(`/events/update`, data);
            getEventData(currentMonth); // 캘린더 업데이트
            getData(dateId); // 특정 날짜 데이터 업데이트
            setShowUpdateModal(false); // 모달 닫기
        } catch (err) {
            console.error("수정 실패: ", err);
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

    // 지도 마커 렌더링
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
                        onClick={() => setShowUpdateModal(false)}
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
                    <div>{renderColorButtons()}</div>
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
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="titleicon"
                        style={{ marginTop: "8px", color: "#f5f5f5" }}
                    />
                    <textarea
                        className="content"
                        style={{ height: "100px" }}
                        value={content}
                        placeholder="내용"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="titleicon"
                        style={{ marginTop: "8px", color: "#f5f5f5" }}
                    />
                    <input
                        type="text"
                        className="content"
                        style={{ height: "40px" }}
                        placeholder="주소"
                        value={searchKeyword || address} // 기존 주소 또는 검색어 표시
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
                        {renderMarkers()}
                    </Map>
                </div>

                <div>
                    <button
                        title="수정"
                        style={{ cursor: "pointer" }}
                        disabled={!title.trim()}
                        className="TodoButton"
                        onClick={handleUpdate}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventUpdate;
