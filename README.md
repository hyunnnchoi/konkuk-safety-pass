# 건국대학교 연구실안전교육 스킵 스크립트

이 스크립트는 건국대학교 연구실안전교육 페이지에서 강의 수강을 자동으로 완료할 수 있도록 도와줍니다. 

### 2024년 9월 3일 기준으로 정상 작동이 확인되었습니다.

## 기능

- **자동 페이지 이동**: 강의의 모든 페이지를 자동으로 이동하여 수강을 완료합니다.
- **강의 완료 알림**: 모든 강의를 완료한 후 자동으로 창을 닫습니다.
- **에러 핸들링**: 강의 수강 중 오류가 발생할 경우 적절한 오류 메시지를 출력합니다.

## 사용법

1. 스크립트를 복사하여 브라우저의 개발자 도구(콘솔)에 붙여넣습니다.
2. 스크립트가 자동으로 강의 페이지를 탐색하며 수강을 완료합니다.
3. 모든 페이지 수강이 완료되면, 자동으로 창이 닫힙니다.

### 스크립트

```javascript
// IMGTECH 2019년 이후 버전 재생시 차시 업데이트 - START
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

var path = window.location.pathname;

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

// IMGTECH 2019년 이후 버전 재생시 차시 업데이트 -END
