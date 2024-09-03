var href = window.location.href;
var queryString = href.split("?");
var params = queryString[1].split("&");
var passedPage = Number(params[0].split("=")[1]);
var checkurl = Number(params[1].split("=")[1]);
var vPassedPage = passedPage;
var smProgressNo = "";
var smMemberNo = "";

if (params.length > 2) {
  smProgressNo = Number(params[2].split("=")[1]);
  smMemberNo = Number(params[3].split("=")[1]);
}
var prevTime = new Date().getTime();

// 현재 경로를 가져오기 위해 path 변수 정의
var path = window.location.pathname;

// 현재 페이지와 전체 페이지를 변수로 사용
var currentPage = parseInt(path.substring(path.lastIndexOf("/") + 1).split(".")[0]);
var totalPageNum = chapterInfo.length;

function PageMove2019AfterVersionx(pageNo) {
   var gapTime = 3599;

   $.ajax({
      type: "POST",
      async: false,
        url: "/ushm/edu/SetImgtechContents2019AfterVersionProcessUpdate.do",
        data: { "scheduleMemberProgressNo": smProgressNo, "watchedpage": pageNo, "gapTime": gapTime },
      success: function (data) {
         if (data.isSuccess == true) {
            try {
               opener.BindProgressList(smMemberNo);
            }
            catch (e) {
               // 오류 처리
            }            
         }
         else {
            alert("PageMove Msg : " + data.msg);
         }
      },
      error: function (xhr, status, error) {
         alert("PageMove Error : " + JSON.stringify(xhr));
      }
   });
}

function goNextPage() {
    if (currentPage < totalPageNum) {
        PageMove2019AfterVersionx(currentPage);
        console.log(`${currentPage} 페이지를 수강완료했습니다.`);
        currentPage += 1;
        setTimeout(function () {
            goNextPage();
        }, 100);
    } else {
        PageMove2019AfterVersionx(currentPage);
        console.log('강의 수강이 완료되었습니다!');
        setTimeout(function () {
            window.close();
        }, 200);
    }
}

setTimeout(function () {
    goNextPage();
}, 100);
