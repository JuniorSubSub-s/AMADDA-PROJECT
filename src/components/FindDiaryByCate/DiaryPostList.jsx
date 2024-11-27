import { Pagination } from '@mui/material';
import { useState } from 'react';
import PostItem from "../DiaryViewPage/DisaryPostItem/DiaryPostItem";

import '../../ui/FindDiaryByCate/FindDiaryByCate.css';

function DiaryPostList({ data = [] }) {
    const itemsPerPage = 8; // 한 페이지당 아이템 수
    const [activePage, setActivePage] = useState(1); 

    // 현재 페이지에 해당하는 데이터 필터링
    const startIndex = (activePage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, value) => {
        setActivePage(value);
    };

    return (
        <div className="diary-post-list">
            <div className="diary-post-items">
                {currentItems.map((item) => (
                    <PostItem key={item.id} data={item} />
                ))}
            </div>
            <div className="diary-pagination-container">
                <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={activePage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
}

export default DiaryPostList;
