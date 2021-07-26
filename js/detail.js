
let id = '';
let value = '';
let a = GetRequest();
for (const key in a) {
  id = key
  value = a[key];
}

$.ajax({
  type: "POST",
  url: base + "/movie/getMovieImagesById.do",
  data: {
    'id': value
  },
  dataType: 'json',
  success: function (response) {
    if (response.code == 100) {
      Str(response.data["4"])
      noswiper(response.data["3"])
      pinglunAjax(value, false);
    } else {
      layer.open({
        content: '正在加载中'
        , style: 'background-color:#09C1FF; color:#0f0; border:none;' //自定风格
        , time: 3
      });
    }
  }
});

function Str(data) {
  let hotStr = '<h3>' + data.movieName + '</h3>'
    + '<p><span>主演:</span>' + data.movieStar + '</p>'
    + '<p><span>上映时间:</span>' + newDate(data.movieReleaseDate) + '</p>'
    + '<div class="ping" id="ping"><p class="score"><span>评分:</span></p>'
    + '<div class="rate"><div class="rating" id="rating">'
    + '<div class="rating-item"></div>'
    + '<div class="rating-item"></div>'
    + '<div class="rating-item"></div>'
    + '<div class="rating-item"></div>'
    + '<div class="rating-item"></div>'
    + '</div>'
    + '</div></div>'
    + '<div><span>演员介绍:</span><p class="duohang1">' + data.moviePerformer + '</p></div>'
    + '<div><span>电影详情:</span><p class="duohang2">' + data.movieDetailProfile + '</p></div>'
    + '<div id="yanyuan"><p><span>演员介绍:</span></p>'
    + '<div class="picMarquee-left" >'
    + '<div class="bd">'
    + '<ul class="picList" id="picListDemo">'
    + '</ul></div>'
    + '</div>'
  let bannerStr = '<img src=' + data.movieManPicture + ' alt="">'
  $("#detaiBanner").append(bannerStr)
  $("#content").append(hotStr)

  pingfen(data.movieExpectationValue)
  // 动态实现评论（事件委托）
  // $("#rating").on('mouseover', '.rating-item', function () {
  //   pingfen($(this).index() + 1)
  // }).on('mouseout', '.rating-item', function () {
  //   pingfen(data.movieExpectationValue)
  // }).on('click', '.rating-item', function () {
  //   data.movieExpectationValue = $(this).index() + 1
  // })
}



// pinglun
function pinglunAjax(value, isAll) {
  $.ajax({
    type: "get",
    url: base + "/comment/getCommentByMovieId.do",
    data: {
      movie_id: value,
      is_all: isAll
    },
    dataType: "json",
    success: function (response) {
      if (response.code == 100) {
        pingjia(response.data || 0)
      }
    }
  });
}
//  无缝链接图片
function noswiper(data) {
  if (data == null) {
    $("#yanyuan").css({
      'display': 'none'
    });
  }
  let picStr = '';
  $.each(data, function (index, data) {
    picStr += '<li>'
      + '<div class="pic"><a href="#" target="_blank"><img style="width:100px;" src=' + data.imgBasePath + ' /></a>'
      + '</div>'
      // + '<div class="title"><a href="#" target="_blank">' + data.title + '</a></div>'
      + '</li>'
  })
  $("#picListDemo").append(picStr);
  $(".picMarquee-left").slide({
    mainCell: ".bd ul",
    autoPlay: true,
    effect: "leftMarquee",
    vis: 3,
    interTime: 50
  });
}
$("#back").click(function () {
  window.history.back()
})
// 评分
function pingfen(num) {
  var num1 = num / 2
  $("#rating").find(".rating-item").each(function (index, data) {
    $('#rating').find('.rating-item').each(function (index) {
      if (index < Math.floor(num1)) {
        $(this).css('background-position', '0 0')
      } else {
        $(this).css('background-position', '-21px 0')
      }
    })
  })
}
// 评价
function pingjia(data) {
  let speakStr = '';
  $.each(data, function (index, data) {
    speakStr += `
         <li>
      <div class="commetn-item">
        <div class="all-item">
          <div class="avater"><img src="${data.userHeadPicture}" alt=""></div>
          <div>
            <p class="c_i_a">${data.username}</p>
            <p class="c_i_b">${newDate(data.commentDate)}</p>
          </div>
        </div>
        <span class="iconfont c_genduo  icon-gengduo"></span>
      </div>
      <div class="pinglun">
        <p>${data.commentContent}</p>
      </div>
      <div class="goods">
        <p> <span class="iconfont icon-dianzan-ash"></span> 336</p>
        <p> <span class="iconfont icon-pinglun"></span> </p>
      </div>
      <div class="c_more_dv">
        <p>投诉</p>
        <p>不感兴趣</p>
      </div>
    </li>`
  })
  $("#comment").html(speakStr);
  var genduo = $(".c_genduo")
  $.each(genduo, function (index, data) {
    $(this).click(function () {
      $(".c_more_dv").eq(index).show(2);
    }).mouseleave(function () {
      $(".c_more_dv").eq(index).hide(1);
    })
  });
  $("#comment").click(function () {
    pinglunAjax(value, true);
    $("#comment").html(speakStr);
    $("#comment").removeClass("comment123")
  })

}
$(".demo-3").click(function () {
  if (localStorage.token) {
    $(".add_pinglun").show(500);
    $(".modal-open1 ").show(300)
    $(this).addClass("hidden")
    pinglun2(10);
  } else {
    layer.open({
      type: 2
      , content: '请先登录'
    })
    $(".add_pinglun").hide(200);
    $(".modal-open1").hide(300);
    $(".demo-3").removeClass("hidden");
  }

})
$(".modal-open1").click(function () {
  $(".add_pinglun").hide(200);
  $(".modal-open1").hide(300);
  $(".demo-3").removeClass("hidden");
  $("#add_comment").val('')
})


// 评分2
function pinglun2(num2) {
  var num = Math.floor(num2 / 2)
  var lightOn = function (num) {
    $('#rating2').find('.rating-item').each(function (index) {
      if (index < num) {
        $(this).css('background-position', '0 0')
      } else {
        $(this).css('background-position', '-21px 0')
      }
    })
  }
  lightOn(num)
  $('#rating2').on('mouseover', '.rating-item', function () {
    lightOn($(this).index() + 1);
  }).on('click', '.rating-item', function () {
    num = $(this).index() + 1;
  }).on('mouseout', '.rating-item', function () {
    lightOn(num);
  })

  $("#tijiao").click(function () {
    let text = $("#add_comment").val();
    $.ajax({
      url: base + '/comment/addComment.do',
      type: "get",
      dataType: 'JSON',
      data: {
        commentContent: text,
        commentScore: num * 2,
        movieId: value,
        Authorization: localStorage.token
      },
      success: function (result) {
        if (result.code == 100) {
          //loading带文字
          $(".add_pinglun").hide(200);
          $(".modal-open1").hide(300);
          $(".demo-3").removeClass("hidden");
          $("#add_comment").val('')
        } else {
          layer.open({
            type: 2
            , content: '添加失败'
          })
          $(".add_pinglun").hide(200);
          $(".modal-open1").hide(300);
          $(".demo-3").removeClass("hidden");
          $("#add_comment").val('')
        }
      }

    })
  })
}



