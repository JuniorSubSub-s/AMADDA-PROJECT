function SearchBar() {
    return (
        <div className="form">
            <div className="form-container">
                <div className="form-input-container">
                    <input
                        type="text"
                        className="text-form"
                        placeholder="검색어를 입력해 주세요."
                    />
                </div>
                <img className="search-img" alt="search icon" src="/img/svg.svg" />
            </div>
        </div>
    );
}

export default SearchBar;