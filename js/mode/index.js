
// 电影 数据----切换

function listTab() {
  // 原生js版本
  let list_header = my$("list-header").children;
  let list_center = my$("con").children;
  for (let i = 0; i < list_header.length; i++) {
    addEventListener(list_header[i], 'click', function () {
      for (var j = 0; j < list_header.length; j++) {
        list_header[j].className = "tit"
        list_center[j].className = "mode hidden"
      }
      this.className = "active tit"
      list_center[i].className = "mode"
    })
  }
}
listTab();
movieAjax(0);

function movieAjax(i) {
  $.ajax({
    type: "GET",
    url: base + "/movie/getByType.do",
    dataType: 'json',
    data: {
      type: i + 1
    },
    success: function (response) {
      if (response.code == 100) {
        weekendList(response.data);
      }
    }
  });
}

function weekendList(data) {
  let reping1 = '';
  let reping2 = '';
  let reping3 = '';
  $.each(data, function (index, data) {
    reping1 += ' <a href="detail.html?id=' + data.movieId + '" class="list-con">' +
      '<div class="list-hidden" >' +
      '<img src=' + data.movieManPicture + ' alt=""> </div>' +
      '<div class="list-title">' +
      '<h3>' + data.movieName + '</h3>' +
      '<p><span>主演：</span>' + data.moviePerformer + '</p>' +
      '<p><span>上映时间：</span>' + data.movieReleaseDate + '</p>' +
      '<p><span>评分：</span>' + data.movieExpectationValue + '</p>' +
      '</div>' +
      '</a>'
  })
  $.each(data, function (index, data) {
    reping2 += ' <a href="detail.html?id=' + data.movieId + '" class="list-con">' +
      '<div class="list-hidden" >' +
      '<img src=' + data.movieManPicture + ' alt=""> </div>' +
      '<div class="list-title">' +
      '<h3>' + data.movieName + '</h3>' +
      '<p><span>主演：</span>' + data.moviePerformer + '</p>' +
      '<p><span>上映时间：</span>' + data.movieReleaseDate + '</p>' +
      '<p><span>评分：</span>' + data.movieExpectationValue + '</p>' +
      '</div>' +
      '</a>'
  })
  $.each(data, function (index, data) {
    reping3 += ' <a href="detail.html?id=' + data.movieId + '" class="list-con">' +
      '<div class="list-hidden" >' +
      '<img src=' + data.movieManPicture + ' alt=""> </div>' +
      '<div class="list-title">' +
      '<h3>' + data.movieName + '</h3>' +
      '<p><span>主演：</span>' + data.moviePerformer + '</p>' +
      '<p><span>上映时间：</span>' + data.movieReleaseDate + '</p>' +
      '<p><span>评分：</span>' + data.movieExpectationValue + '</p>' +
      '</div>' +
      '</a>'
  })
  $("#con1").html(reping1);
  $("#con2").html(reping2);
  $("#con3").html(reping3);
}

// 轮播图 金刚图 页脚  数据------切换
function otherAjax(i) {
  // 获取轮播图
  if (i == 1) {
    console.log(i)
    $.ajax({
      type: "GET",
      url: base + "/img/getImg.do",
      dataType: 'json',
      success: function (response) {
        if (response.code == '100') {
          // '0轮播；1金刚区；2页脚导航栏；'
          siperList(response.data["0"])
          iconList(response.data["1"])
          footerList(response.data["2"])
        }
      }
    });
  }
}
otherAjax(1)
function siperList(data) {
  let siwp = '';
  $.each(data, function (index, data) {
    siwp += '<div class="swiper-slide"><img src=' + data.imgBasePath + ' alert=' + data.imgTit + ' /></div>';
  })
  $("#swiper-w").html(siwp)
  Swiper1("#swiper-1")

}

function iconList(data) {
  let icon = '';
  $.each(data, function (index, data) {
    icon += '<li><a href="#"><img src=' + data.imgBasePath + '> <span>' + data.imgTit + '</span ></a> ' +
      '</li > '
  })
  $("#fastnav-icon").html(icon)
}

function footerList(data) {
  let foot = ''
  $.each(data, function (index, data) {
    foot += '<li>'
      + '<a href="#">'
      + '<img src=' + data.imgBasePath + ' alt="">'
      + '<p>' + data.imgTit + '</p>'
      + ' </a>'
      + '</li>'
  })
  $("#footer").html(foot)
  footerTab(data);

}
function footerTab(data) {
  // 底部footer tab
  let footers = my$("footer").children;
  let foot_cents = my$("center1").children;
  // 第一次进来默认样式
  getFirstElement(footers[0]).className = "active";
  getFirstElement(getFirstElement(footers[0])).src = data[0].imgSelectedPath;
  for (let i = 0; i < footers.length; i++) {
    addEventListener(footers[i], 'click', function () {
      for (var j = 0; j < footers.length; j++) {
        getFirstElement(footers[j]).className = "";
        getFirstElement(getFirstElement(footers[j])).src = data[j].imgBasePath;
        foot_cents[j].className = "hidden";
      }
      otherAjax(i + 1)
      getFirstElement(this).className = "active";
      getFirstElement(getFirstElement(this)).src = data[i].imgSelectedPath;
      foot_cents[i].className = "";

    })
  }
}

//  电影院切换
$(".cin_title li").click(function () {
  $(this).addClass("active")
  $(this).siblings().removeClass("active")
  $(".cin_content .cin_c_item").eq($(this).index()).removeClass("hidden")
  $(".cin_content .cin_c_item").eq($(this).index()).siblings().addClass("cin_c_item hidden")
})



// 头像设置
// var x = document.getElementById("con2");
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }
//   else { x.innerHTML = "Geolocation is not supported by this browser."; }
// }
// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//     "<br />Longitude: " + position.coords.longitude;
// }




function Swiper1(id) {
  var mySwiper = new Swiper(id, {
    loop: true,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper 
    observeParents: true,//修改swiper的父元素时，自动初始化swiper 
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      stopOnLastSlide: false,
      disableOnInteraction: true
    },
  });
}


