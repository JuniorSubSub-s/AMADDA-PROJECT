import Header from "./Header";
import '../css/imagelistpage.css';
import UserProfile from "./UserProfile";

function UserImageListPage() {

    return(
        <div>
            <Header/>
            <UserProfile/>
            <div className="image-list-main">
                <div className="calender-top-line">
                </div>
                {/* api연동시 자리 */}
                <div className="calender">
                </div>
                <div className="calender-bottom-line">
                </div>
                <div className="image-card">
                    <div className="calender-image"></div>
                    <div className="calender-image"></div>
                    <div className="calender-image"></div>
                    <div className="calender-image"></div>
                    <div className="calender-image"></div>
                    <div className="calender-image"></div>

                </div>
            </div>
        </div>

    )
}

export default UserImageListPage;