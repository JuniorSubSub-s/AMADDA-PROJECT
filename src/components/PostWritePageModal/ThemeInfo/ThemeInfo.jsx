import "./themeinfo.css";

function ThemeInfo () {
    return (
        <div className="themeinfo-container">
            <div className="theme-img-container">
                <img className="theme-img" src="/img/trans-ssg-8.png" alt="theme" />
            </div>
            <div className="theme-title">
                가을
            </div>
            <div className="theme-date">
                24.10.23
            </div>
        </div>
    )
}

export default ThemeInfo;