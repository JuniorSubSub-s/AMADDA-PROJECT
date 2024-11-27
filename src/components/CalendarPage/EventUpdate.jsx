import React, { useState, useEffect } from "react";
import api from "../../api/axios";

function EventUpdate({ listId, dateId, setShowUpdateModal, getEventData, getData, currentMonth }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [eventColor, setEventColor] = useState('red');

    // 이벤트 데이터 가져오기
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await api.get(`events/gettodo/${listId}`);
                const { title, content, color } = response.data;
                setTitle(title);
                setContent(content);
                setEventColor(color);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEventData();
    }, [listId]);

    // 이벤트 수정 헨들러
    const handleUpdate = async () => {
        if (!title.trim()) return;

        const data = {
            calId: listId,
            title: title.trim(),
            content: content.trim(),
            color: eventColor,
        };

        try {
            await api.put(`/events/update`, data);
            getEventData(currentMonth);
            getData(dateId);
            setShowUpdateModal(false);
        } catch (err) {
            console.error("이벤트 수정 실패 : ", err);
        }
    };

    // 색상 선택 버튼 렌더링
    const renderColorButtons = () => {
        const colors = ["red", "blue", "orange", "green"];
        return colors.map((color) => {
            <button
                key={color}
                className={`color-btn ${eventColor === color ? 'selected' : ''}`}
                onClick={() => setEventColor(color)}
                style={{ backgroundColor: color }}
            />
        });
    };

    return (
        <div className="event-update-container">
            {/* 닫기 버튼 */}
            <button className="close-btn" onClick={() => setShowUpdateModal(false)}>
                X
            </button>

            {/* 제목 입력 */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
            />

            {/* 내용 입력 */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
            />

            {/* 색상 선택 */}
            <div className="color-picker">{renderColorButtons()}</div>

            {/* 수정 버튼 */}
            <button onClick={handleUpdate} disabled={!title.trim()}>
                수정
            </button>
        </div>
    );
}

export default EventUpdate;
