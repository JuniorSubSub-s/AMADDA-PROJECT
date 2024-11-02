import React from "react";
import "./postcomponent.css";
function PostComponent() {
    return (
        /*게시물칸 프레임*/
        <div className="post-frame">
            {/*제목, 라인 담는 박스*/}
            <div className="title-line-box">
                {/*게시물 제목 서식*/}
              <div className="post-title">게시물</div>
              {/*제목 밑 라인*/}
              <img className="lines" alt="Line" src="/img/MyPage/MainMyPage/line-25-2.svg" />
          </div>
            {/*게시물들*/}
            <div className="post">
                {/*더미 데이터*/}
                <div className="first-post">
                    <div className="posts">
                        
                        <div className="post-text">
                            이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다.
                            이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다.
                            이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다. 이곳에 텍스트가 들어갑니다.
                        
                        </div>
                        <img className="post-lines" alt="Line" src="/img/MyPage/MainMyPage/line-25-2.svg" />
                        <div className="post-images">
                            <div className="post-img-1" />
                            <div className="post-img-1" />
                            <div className="post-img-1" />
                            
                        </div>
                        
                    </div>
                    <div className="posts">
                        
                        <div className="post-text">
                            학교 풍경
                        </div>
                        <img className="post-lines" alt="Line" src="/img/MyPage/MainMyPage/line-25-2.svg" />
                        <div className="post-images">
                            <div className="post-img-1" />
                        </div>
                    </div>
                    <div className="posts">
                        <div className="post-text">
                            학교 풍경
                        </div>
                        <img className="post-lines" alt="Line" src="/img/MyPage/MainMyPage/line-25-2.svg" />
                        <div className="post-images">
                            <div className="post-img-1" />
                            <div className="post-img-1" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostComponent ;

