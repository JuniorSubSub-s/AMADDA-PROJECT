import { useState, useEffect } from "react";  // useEffect를 추가
import api from "../../api/axios";
import { format } from 'date-fns';
import "./TodoWrite.css";  // CSS 파일로 변경
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function DragDropEventpage(props) {

    console.log(props.dropEventData);
    console.log("받아온 currentMonth : " + format(props.currentMonth, 'yyyy-MM'));
    
    

    const [title, setTitle] = useState('');
    const [content, setcCntent] = useState('');
    const [eventColor, setEvnetColor] = useState("red");

    const { kakao } = window;

    const [lat] = useState(37.5665);
    const [lon] = useState(126.9780);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [alarmIndex, setAlarmIndex] = useState(null);
    const [userId, setUserId] = useState("");
    const [day, setDay] = useState("");


    // 원하는 클릭 이미지 URL 설정
    const CUSTOM_CLICK_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const DEFAULT_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';

    // props.dropEventData가 변할 때마다 상태 업데이트
    useEffect(() => {
        if (props.dropEventData) {
            setTitle(props.dropEventData.title);
            setcCntent(props.dropEventData.content);
            setEvnetColor(props.dropEventData.color || "red");  // 색상이 없으면 기본값으로 red
            setSearchKeyword(props.dropEventData.address || "");
            setAlarmIndex(props.dropEventData.index);
            setUserId(props.dropEventData.userId);
            setDay(props.dropEventData.DropDay); // 내가 원하는 날짜에 드랍한 해당 날짜를 가져와야함 그걸 day넣어줘야함
            console.log(props.dropEventData.index); // 드랍한 인덱스 번호를 저장해둿다가 완료 버튼을 눌렀을때 

        }
    }, [props.dropEventData]);

    useEffect(() => {
        console.log(selectedMarker);

    }, [selectedMarker]);

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const contentHandler = (e) => {
        setcCntent(e.target.value);
    }

    const redBtn = () => {
        setEvnetColor("red");
    }

    const orangeBtn = () => {
        setEvnetColor("orange");
    }

    const greenBtn = () => {
        setEvnetColor("green");
    }

    const blueBtn = () => {
        setEvnetColor("blue");
    }

    const onsubmit = async () => {
        if (title.trim()) {
            const data = {
                day: day,
                title: title.trim(),
                content: content.trim(),
                color: eventColor,
                address: searchKeyword,
                userId: userId  // userId 추가
            };

            console.log("완성된 데이터 : " + data);
            

            try {
                const response = await api.post(`/events/save`, data);
                console.log(response);
                alert("글 작성을 완료");
                props.getEventData(format(props.currentMonth, 'yyyy-MM'));              
                props.getData(day);
                props.setShowDropModal(false);

                // 데이터를 성공적으로 저장한 후, 해당 인덱스의 이벤트를 LastEvents에서 삭제
                if (typeof alarmIndex === "number") {
                    props.updateLastEvents(alarmIndex);
                }



                // 해당 인덱스 알림을 LastEents안에있는 sortedEvents배열에서 삭제


            } catch (err) {
                console.log(err);
            }
        }
    }

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
                    <FontAwesomeIcon icon={faXmark} className="xbutton"
                        onClick={() => {
                            props.setShowDropModal(false)
                        }} />
                </div>
                <div className="eventcolor">
                    <div style={{ marginBottom: '3px' }}>
                        <img src={'/img/CalendarImg/Rainbow.jpg'} alt="Rainbow" className="rainbow" />
                    </div>
                    <div style={{ margin: '0' }}>
                        <label className="eventcolorlabel"> 이벤트 색상 </label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                        <button className={`colorbtn ${eventColor === 'red' ? 'selected' : ''}`} style={{ backgroundColor: 'red', margin: '0' }} onClick={redBtn}></button>
                        &nbsp;&nbsp;
                        <button className={`colorbtn ${eventColor === 'orange' ? 'selected' : ''}`} style={{ backgroundColor: 'orange', margin: '0' }} onClick={orangeBtn}></button>
                        &nbsp;&nbsp;
                        <button className={`colorbtn ${eventColor === 'green' ? 'selected' : ''}`} style={{ backgroundColor: 'green', margin: '0' }} onClick={greenBtn}></button>
                        &nbsp;&nbsp;
                        <button className={`colorbtn ${eventColor === 'blue' ? 'selected' : ''}`} style={{ backgroundColor: 'blue', margin: '0' }} onClick={blueBtn}></button>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faCalendar} className="titleicon" style={{ color: eventColor, borderColor: eventColor }} />
                    <input type="text"
                        className="content"
                        style={{ height: '25px' }}
                        value={title}
                        placeholder="제목"
                        onChange={titleHandler} />
                </div>

                <div style={{ display: 'flex' }}>
                    <FontAwesomeIcon icon={faPenToSquare} className="titleicon" style={{ marginTop: '8px', color: '#f5f5f5' }} />
                    <input type="text"
                        className="content"
                        style={{ height: '100px' }}
                        value={content}
                        placeholder="내용"
                        onChange={contentHandler} />
                </div>
                <div style={{ display: 'flex' }}>
                    <FontAwesomeIcon icon={faLocationDot} className="titleicon" style={{ marginTop: '8px', color: '#f5f5f5' }} />
                    <input type="text"
                        className="content"
                        style={{ height: '40px' }}
                        value={searchKeyword}
                        placeholder="주소"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();  // Enter 키가 눌리면 검색 실행
                            }
                        }} />
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
                                    <div style={{ minWidth: "150px" }}>
                                        {info && info.content === marker.content && (
                                            <div style={{ color: 'black', display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>{marker.content}</div>
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
                        style={{ cursor: 'pointer' }}
                        disabled={!title.trim()}
                        className="TodoButton"
                        onClick={onsubmit}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DragDropEventpage;
