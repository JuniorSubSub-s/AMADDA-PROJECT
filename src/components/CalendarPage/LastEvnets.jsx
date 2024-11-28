import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns"; // date-fns의 differenceInDays 함수 import

function LastEvents({ userAlarmDatas }) {

    // 날짜 기준으로 일정 데이터 정렬
    const sortedEvents = [...userAlarmDatas].sort((a, b) => new Date(a.day) - new Date(b.day));

    // 표시할 이벤트 상태: 처음 4개만 표시
    const [visibleEvents, setVisibleEvents] = useState([]);

    // 날짜 차이 계산 함수 (date-fns 사용)
    const calculateDaysAgo = (eventDate) => {
        const today = new Date();
        const eventDateObj = new Date(eventDate);
        const daysDiff = differenceInDays(today, eventDateObj); // date-fns로 일수 차이 계산
        return daysDiff;
    };

    // 드래그 시작 이벤트 핸들러
    const handleDragStart = (e, eventData, index) => {
        // eventData에 index 값을 추가
        const dataToSend = { ...eventData, index: index };

        // 드래그 데이터로 수정된 이벤트 데이터의 JSON 문자열 저장
        console.log(dataToSend);

        // 드래그 데이터에 index를 포함한 eventData를 JSON 문자열로 설정
        e.dataTransfer.setData("application/json", JSON.stringify(dataToSend));
    };

    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 visibleEvents를 초기화
        setVisibleEvents(sortedEvents.slice(0, 4));
    }, [userAlarmDatas]);  // sortedEvents만 의존성으로 설정

    return (
        <div style={{ position: 'absolute', right: '13px', top: '0px', backgroundColor: 'white', width: '300px', marginLeft: '50px', borderRadius: '5px', marginTop: '50px', border: '1px solid black' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'black', paddingTop: '10px', paddingBottom: '10px', borderBottom: '1px solid black' }}>알림</div>
            <div style={{ overflow: 'auto', height: '208px' }}>
                {visibleEvents.map((event, index) => (
                    <div
                        key={event.calId}
                        draggable
                        onDragStart={(e) => handleDragStart(e, event, index)} // 드래그 시작 이벤트 추가
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: "black", border: '1px solid black', paddingLeft: '10px', cursor: 'pointer', height: '50px' }}
                    >
                        <div style={{ width: '220px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ margin: 0, fontWeight: 'bold', width: '160px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{event.title}</div>
                            <div style={{ marginLeft: '5px', fontSize: '11px', color: 'blue', fontWeight: 'bold', alignSelf: 'center' }}>
                                {calculateDaysAgo(event.day)}일 전
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '13px', width: '160px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{event.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LastEvents;