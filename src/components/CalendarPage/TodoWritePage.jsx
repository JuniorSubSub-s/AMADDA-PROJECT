import { useState, useEffect } from "react";
import api                     from "../../api/axios";
import { format }              from 'date-fns';
import { Map, MapMarker }      from 'react-kakao-maps-sdk';
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faCalendar, faPenToSquare, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';

function TodoWritePage(props) {
    const { kakao } = window;

    const [title, setTitle]                   = useState('');
    const [content, setContent]               = useState('');
    const [eventColor, setEventColor]         = useState("red");

    const [lat, setLat]                       = useState(37.5665);
    const [lon, setLon]                       = useState(126.9780);
    const [map, setMap]                       = useState();
    const [info, setInfo]                     = useState();
    const [markers, setMarkers]               = useState([]);
    const [searchKeyword, setSearchKeyword]   = useState('');
    const [selectedMarker, setSelectedMarker] = useState(null);

    // 원하는 클릭 이미지 URL 설정
    const CUSTOM_CLICK_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const DEFAULT_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';


    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    };

    useEffect(() => {
        console.log(selectedMarker);

    }, [selectedMarker]);

    const titleHandler = (e) => {
        setTitle(e.target.value);
    };

    const contentHandler = (e) => {
        setContent(e.target.value);
    };

    const redBtn = () => setEventColor("red");
    const orangeBtn = () => setEventColor("orange");
    const greenBtn = () => setEventColor("green");
    const blueBtn = () => setEventColor("blue");

    const onSubmit = async () => {
        if (title.trim()) {
            const data = {
                day: props.dateId,
                title: title.trim(),
                content: content.trim() || '',  // content가 없으면 빈 문자열로 처리
                color: eventColor,
                address: info?.address || '',  // address가 없으면 빈 문자열로 처리
                userId: props.userId  // userId 추가
            };
    
            try {
                const response = await api.post(`/events/save`, data);
                console.log(response);
                alert("글 작성을 완료");
                props.getEventData(format(props.currentMonth, 'yyyy-MM'));
                props.getData(props.dateId);
                props.setShowModal(false);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleSearch = () => {
        if (!map) return; // 지도 초기화가 안 되었을 때는 실행하지 않음
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(searchKeyword, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                let markers = [];

                for (var i = 0; i < data.length; i++) {
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                        address: data[i].address_name
                    });
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                setMarkers(markers); // 검색된 마커들 설정
                map.setBounds(bounds); // 지도 bounds를 설정하여 마커가 다 보이도록 함
            } else {
                console.error('검색 결과가 없습니다.');
            }
        });
    };

    useEffect(() => {
        if (map) {
            map.setCenter(new kakao.maps.LatLng(lat, lon));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lon, map]);

    return (
        <div className="container">
            <div className="btncontainer">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="xbutton"
                        onClick={() => props.setShowModal(false)}
                    />
                </div>

                <div className="eventcolor">
                    <div style={{ marginBottom: '3px' }}>
                        <img src={`/img/CalendarImg/Rainbow.jpg`} alt="Rainbow" className="rainbow" />
                    </div>
                    <div style={{ margin: '0' }}>
                        <label className="eventcolorlabel"> 이벤트 색상 </label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                        <button
                            className={`colorbtn ${eventColor === 'red' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'red', margin: '0' }}
                            onClick={redBtn}
                        ></button>
                        &nbsp;&nbsp;
                        <button
                            className={`colorbtn ${eventColor === 'orange' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'orange', margin: '0' }}
                            onClick={orangeBtn}
                        ></button>
                        &nbsp;&nbsp;
                        <button
                            className={`colorbtn ${eventColor === 'green' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'green', margin: '0' }}
                            onClick={greenBtn}
                        ></button>
                        &nbsp;&nbsp;
                        <button
                            className={`colorbtn ${eventColor === 'blue' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'blue', margin: '0' }}
                            onClick={blueBtn}
                        ></button>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCalendar} className="titleicon" style={{ color: eventColor, borderColor: eventColor }} />
                    <input
                        type="text"
                        className="content"
                        style={{ height: '25px' }}
                        value={title}
                        placeholder="제목"
                        onChange={titleHandler}
                    />
                </div>

                <div style={{ display: 'flex' }}>
                    <FontAwesomeIcon icon={faPenToSquare} className="titleicon" style={{ marginTop: '8px', color: '#f5f5f5' }} />
                    <input
                        type="text"
                        className="content"
                        style={{ height: '100px' }}
                        value={content}
                        placeholder="내용"
                        onChange={contentHandler}
                    />
                </div>

                <div style={{ display: 'flex' }}>
                    <FontAwesomeIcon icon={faLocationDot} className="titleicon" style={{ marginTop: '8px', color: '#f5f5f5' }} />
                    <input
                        type="text"
                        className="content"
                        style={{ height: '40px' }}
                        placeholder="주소"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();  // Enter 키가 눌리면 검색 실행
                            }
                        }}
                    />
                </div>

                <div style={{ width: '420px', height: '200px', borderRadius: '14px', marginLeft: '72px' }}>
                    <Map
                        center={{ lat: lat, lng: lon }}
                        style={{ width: '100%', height: '100%' }}
                        level={3}
                        onCreate={setMap}
                    >
                        {markers.map((marker) => (
                            <MapMarker
                                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng},${marker.address}`}
                                position={marker.position}
                                clickable={true}
                                image={{
                                    src: selectedMarker && selectedMarker.content === marker.content
                                        ? CUSTOM_CLICK_IMAGE_URL
                                        : DEFAULT_IMAGE_URL,
                                    size: {
                                        width: 24,
                                        height: 35,
                                    },
                                    options: {
                                        offset: {
                                            x: 12,
                                            y: 35,
                                        },
                                    },
                                }}
                                onClick={() => {
                                    setInfo(marker);
                                    setSelectedMarker(marker); // 클릭된 마커 설정
                                }}
                            >
                                {selectedMarker && selectedMarker.content === marker.content && (
                                    <div style={{ width: '150px', maxWidth: '300px' }}>
                                        {info && info.content === marker.content && (
                                            <div style={{width: '100%', color: 'black' ,display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>{marker.content}</div>
                                        )}
                                    </div>
                                )}
                            </MapMarker>
                        ))}
                    </Map>
                </div>

                <div>
                    <button
                        title="저장"
                        style={{cursor: 'pointer'}}
                        disabled={!title.trim()}
                        className="TodoButton"
                        onClick={onSubmit}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoWritePage;
