jQuery(function ($) {
  var hotItem_slide = function () {
    timer = setTimeout(function () {
      $("#hotItem_slide li:first").animate(
        { marginTop: "-72.5px" },
        400,
        function () {
          $(this).detach().appendTo("ul#hotItem_slide").removeAttr("style");
        }
      );
      hotItem_slide();
    }, 2000);
  };

  // 1. 클릭하면 다음 요소 보여주기... 클릭할 경우 setTimeout 을 clearTimeout 해줘야 하는데 어떻게 하지..
  $(document).on("click", ".next", function () {
    $("#hotItem_slide li:first").animate(
      { marginTop: "-20px" },
      400,
      function () {
        $(this).detach().appendTo("ul#hotItem_slide").removeAttr("style");
      }
    );
    clearTimeout(timer);
    hotItem_slide();
    //3 함수와 연계 시작
    if ($("#pause").text() == "Unpause") {
      $("#pause").text("Pause");
    } //3 함수와 연계
  }); // next 끝. timer 를 전연변수보다 지역변수 사용하는게 나을 것 같은데 방법을 모르겠네요.

  //2. 재생정지기능 시작, 아직 다음 기능과 연동은 안됨...그래서 3을 만듦
  var autoplay = true;
  $(document).on("click", ".pause", function () {
    if (autoplay == true) {
      clearTimeout(timer);
      $(this).text("재생");
      autoplay = false;
    } else {
      autoplay = true;
      $(this).text("정지");
      hotItem_slide();
    }
  }); // 재생정지기능 끝
  // 3. 재생정지 함수 시작. 2와 기능 동일함.
  var tickerpause = function () {
    $("#pause").click(function () {
      $this = $(this);
      if ($this.text() == "Pause") {
        $this.text("Unpause");
        clearTimeout(timer);
      } else {
        hotItem_slide();
        $this.text("Pause");
      }
    });
  };
  tickerpause();
  //3 재생정지 함수 끝
  //4 마우스를 올렸을 때 기능 정지
  var tickerover = function () {
    $("#hotItem_slide").mouseover(function () {
      clearTimeout(timer);
    });
    $("#hotItem_slide").mouseout(function () {
      hotItem_slide();
    });
  };
  tickerover();
  // 4 끝
  hotItem_slide();
});
