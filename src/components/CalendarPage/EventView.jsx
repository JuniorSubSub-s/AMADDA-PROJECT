import { format } from 'date-fns';
import { useState } from 'react';
import LastEvnets from './LastEvnets'; // LastEvents 컴포넌트를 import

function EventView(props) {
    const { currentMonth, currentDay, currentMonthFormatted, currentYear, currentWeekday, toggleEventView } = props;
    const [alarmModal, setAlarmModal] = useState(false); // 모달 표시 여부 상태

    const alarmbtnHandler = () => {
        setAlarmModal(!alarmModal);        
    }

    return (
        <div>
            <div className="header">
                <div className="col col-start">
                    <span className="text">
                        <span className="text-month">
                            {format(currentMonth, 'M')}월
                        </span>
                        <span className="text-year">
                            {format(currentMonth, 'yyyy')}
                        </span>
                    </span>
                </div>
                <div className="col col-end">
                    <div className="alarmbtn-container">
                        <button className="alarmbtn" onClick={alarmbtnHandler}>알림</button>
                        {alarmModal && (
                            <LastEvnets eventDatas={props.eventDatas}/>
                        )}
                        
                    </div>
                    <div>
                        <button className="eventViewXbtn" onClick={toggleEventView}>
                            X
                        </button>
                    </div>
                </div>
            </div>
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
