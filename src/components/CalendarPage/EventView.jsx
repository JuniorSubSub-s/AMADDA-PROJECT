import React, { useState } from 'react';
import LastEvnets from './LastEvnets'; // 정확한 컴포넌트 이름으로 유지
import './Event.css';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

function EventView({
    currentYear,
    currentMonthFormatted,
    currentDay,
    currentWeekday,
    toggleEventView,
    userAlarmDatas,
}) {
    const [isAlarmModalVisible, setIsAlarmModalVisible] = useState(false); // 알람 모달 상태

    // 알람 모달 토글 핸들러
    const toggleAlarmModal = () => {
        setIsAlarmModalVisible((prev) => !prev);
    };

    return (
        <div>
            {/* 헤더 */}
            <div className="header">
                <div className="col col-end">
                    <div className="alarmbtn-container">
                        {/* 알람 버튼 */}
                        <HistoryOutlinedIcon
                            className="history-icon"
                            onClick={toggleAlarmModal}
                        />
                        {/* 알람 모달 */}
                        {isAlarmModalVisible && (
                            <LastEvnets userAlarmDatas={userAlarmDatas} />
                        )}
                    </div>
                    {/* 닫기 버튼 */}
                    <div>
                        <button className="eventViewXbtn" onClick={toggleEventView}>
                            X
                        </button>
                    </div>
                </div>
            </div>

            {/* 날짜 정보 */}
            <div className="eventtext">
                <span className="event-text">{currentYear}년</span>
                <span className="event-text">{currentMonthFormatted}월</span>
                <span className="event-text">{currentDay}일</span>
                <span className="event-text">{currentWeekday}</span>
            </div>
        </div>
    );
}

export default EventView;
