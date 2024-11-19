import { format } from 'date-fns';
import { useState } from 'react';
import LastEvnets from './LastEvnets'; // LastEvents 컴포넌트를 import
import "./Event.css"
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

function EventView(props) {
    const { currentMonth, currentDay, currentMonthFormatted, currentYear, currentWeekday, toggleEventView, getUserAlarmDatas } = props;
    const [alarmModal, setAlarmModal] = useState(false); // 모달 표시 여부 상태

    const alarmbtnHandler = () => {
        setAlarmModal(!alarmModal);

    }

    return (
        <div>
            <div className="header">
                <div className="col col-end">
                    <div className="alarmbtn-container">
                        <HistoryOutlinedIcon className='history-icon' onClick={alarmbtnHandler}/>
                        {alarmModal && (
                            <LastEvnets userAlarmDatas={props.userAlarmDatas} />
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
