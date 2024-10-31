import PostItem from "./PostItem";

import { Pagination } from '@mui/material';
import { useState } from 'react';

import '../../ui/FindBestRes/FindBestResPage.css';

function PostList({ data = [] }) {
    const itemsPerPage = 5; // 한 페이지당 아이템 수
    const [activePage, setActivePage] = useState(1); // 기본 활성화된 페이지 1로 설정

    // 현재 페이지에 해당하는 데이터 필터링
    const startIndex = (activePage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, value) => {
        setActivePage(value);
    };

    return (
        <div className="post-list">

            <div className="post-items">
            {currentItems.map((item) => (
                <PostItem key={item.id} data={item} />
            ))}
            </div>
            <div className="pagination-container">
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

export default PostList;