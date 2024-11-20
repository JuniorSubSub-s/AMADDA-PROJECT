import _                                      from "lodash";
import api                                    from "../../api/axios";
import { format }                             from 'date-fns';
import { faLocationDot }                      from '@fortawesome/free-solid-svg-icons';
import { Map, MapMarker }                     from 'react-kakao-maps-sdk';
import { FontAwesomeIcon }                    from '@fortawesome/react-fontawesome';
import { useState, useEffect }                from "react";
import { faCalendar, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

function EventUpdate(props) {
    const { kakao } = window;

    const [title, setTitle]           = useState('');
    const [content, setContent]       = useState('');
    const [event, setEvent]           = useState({});
    const [original, setOriginal]     = useState({});
    const [Completed, setCompleted]   = useState(true);
    const [eventColor, setEventColor] = useState("");

    const [lat]                               = useState(37.5665);
    const [lon]                               = useState(126.9780);
    const [map, setMap]                       = useState();
    const [info, setInfo]                     = useState();
    const [markers, setMarkers]               = useState([]);
    const [searchKeyword, setSearchKeyword]   = useState('');
    const [selectedMarker, setSelectedMarker] = useState(null);

    // 원하는 클릭 이미지 URL 설정
    const CUSTOM_CLICK_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const DEFAULT_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';

    console.log(props.listId);
    

    useEffect(() => {
        getEvent(props.listId);
    }, [props.listId]);

    useEffect(() => {
        setEvent({ title, content, eventColor });
    }, [title, content, eventColor]);

    useEffect(() => {
        const eventData = {
            title: event.title ? event.title.trim() : '',
            content: event.content ? event.content.trim() : '',
            color: eventColor
        };
        const originalData = {
            title: original.title ? original.title.trim() : '',
            content: original.content ? original.content.trim() : '',
            color: original.color
        };

        setCompleted(_.isEqual(eventData, originalData));
    }, [event, original, eventColor]);

    const getEvent = async (eventid) => {
        try {
            const response = await api.get(`events/gettodo/${eventid}`);
            const eventData = response.data;
            setEvent(eventData);
            setOriginal(eventData);
            setEventColor(eventData.color);
            setTitle(eventData.title);
            setContent(eventData.content);
            setSearchKeyword(eventData.address);
        } catch (err) {
            console.log(err);
        }
    }

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    const setColor = (color) => {
        setEventColor(color);
    }

    const onsubmit = async () => {
        if (title.trim()) {
            const data = {
                calId: props.listId,
                title: title.trim(),
                content: content.trim() || '',
                color: eventColor,
                address: info?.address || ''
            };
            try {
                await api.put(`/events/update`, data);
                props.getEventData(format(props.currentMonth, 'yyyy-MM'));
                props.getData(props.dateId);
                props.setShowUpdateModal(false);
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
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="xbutton"
                        onClick={() => props.setShowUpdateModal(false)}
                    />
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
                        <button className={`colorbtn ${eventColor === 'red' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'red', margin: '0' }}
                            onClick={() => setColor("red")}>
                        </button>
                        &nbsp;&nbsp;
                        <button className={`colorbtn ${eventColor === 'orange' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'orange', margin: '0' }}
                            onClick={() => setColor("orange")}>
                        </button>
                        &nbsp;&nbsp;
                        <button className={`colorbtn ${eventColor === 'green' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'green', margin: '0' }}
                            onClick={() => setColor("green")}>
                        </button>
                        &nbsp;&nbsp;
                        <button className={`colorbtn ${eventColor === 'blue' ? 'selected' : ''}`}
                            style={{ backgroundColor: 'blue', margin: '0' }}
                            onClick={() => setColor("blue")}>
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        icon={faCalendar}
                        className="titleicon"
                        style={{ color: eventColor, borderColor: eventColor }}
                    />
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
                    <FontAwesomeIcon icon={faPenToSquare} className="titleicon" style={{ marginTop: '8px', color: 'white' }} />
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
                    <FontAwesomeIcon icon={faLocationDot} className="titleicon" style={{ marginTop: '8px', color: 'white' }} />
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
                        title="수정"
                        disabled={Completed || !title.trim()}
                        className="TodoButton"
                        onClick={onsubmit}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventUpdate;
