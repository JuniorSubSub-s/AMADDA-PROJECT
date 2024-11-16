export function isLoggedIn() {
  const jwt = localStorage.getItem("jwt"); // 로컬 스토리지에서 jwt 가져오기
  const accessToken = localStorage.getItem("accessToken"); //로컬에서 accessToken 가져오기
  console.log("isLoggedIn - JWT:", jwt); // 디버깅용 출력
  console.log("isLoggedIn - AccessToken : ", accessToken); // 디버깅용 출력

  return (jwt !== null) || (accessToken !== null); // jwt or accessToken이 null이 아니면 true 반환
}
  
  export function logout() {
    localStorage.clear();
    alert("로그아웃되었습니다.");
    window.location.href = "/amadda/loginPage"; // 로그인 페이지로 이동
  };

