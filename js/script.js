$(function () {
  var $size_room = $('.size_room');
  var $size_wall = $('.size_wall');
  $size_wall.hide();
  $('[name="room"]').on('click', function () {
    var flag = $('[name="room"]:checked').val();

    if (flag == 'size_room') {
      $size_wall.hide();
      $size_room.show();
    }

    if (flag == 'size_wall') {
      $size_room.hide();
      $size_wall.show();
    }
  }); //end on

  //Добавление стены
  var num_wall = 1;
  $('.add_wall').on('click', function () {
    var $div_item = $("#wall");

    if (num_wall == 0) {
      $('[name="length_wall"]').val('4');
      $('[name="height_wall"]').val('2.7');
      $div_item.css('display', 'block');
      num_wall++;
    } else {
      num_wall++;
      var $new_item = $div_item.clone().appendTo(".items_wall");
      $new_item.find('.h_wall').html("<h>Стена " + num_wall + "</h>");
      $new_item.attr("num", num_wall);
    }
  }); //end on

  // Добавление двери
  var num_door = 0;
  $('.add_door').on('click', function () {
    var $div_item = $("#door");

    if (num_door == 0) {
      $div_item.css('display', 'block');
      num_door++;
    } else {
      num_door++;
      var $new_item = $div_item.clone().appendTo(".items_door");
      $new_item.find('.h_door').html("<h>Дверь " + num_door + "</h>");
      $new_item.attr("num", num_door);
    }
  }); //end on
  
  // Добавление окна
  var num_window = 0;
  $('.add_window').on('click', function () {
    var $div_item = $("#window");

    if (num_window == 0) {
      $div_item.css('display', 'block');
      num_window++;
    } else {
      num_window++;
      var $new_item = $div_item.clone().appendTo(".items_window");
      $new_item.find('.h_window').html("<h>Окно " + num_window + "</h>");
      $new_item.attr("num", num_window);
    }
  }); //end on
  
  // Удаление стены
  $('.items_wall').on('click', '.del_wall', function () {
    if (num_wall == 1) {
      $("#wall").css('display', 'none');
      $('[name="length_wall"]').val('');
      $('[name="height_wall"]').val('');
      num_wall--;
    } else {
      var num = Number($(this).closest("#wall").attr('num'));
      $(this).closest("#wall").stop().animate({
        height: "0",
        opacity: 0
      }, 300, function () {
        $(this).remove();
      });

      for (var i = num + 1; i <= num_wall; i++) {
        var j = i - 1;
        $(".wall[num=" + i + "]").find('.h_wall').html("<h>Стена " + j + "</h>");
        $(".wall[num=" + i + "]").attr('num', j);
      }

      num_wall--;
    }
  }); //end on
 
  // Удаление окна
  $('.items_window').on('click', '.del_window', function () {
    if (num_window == 1) {
      $("#window").css('display', 'none');
      $('[name="width_window"]').val('');
      $('[name="height_window"]').val('');
      num_window--;
    } else {
      var num = Number($(this).closest("#window").attr('num'));
      $(this).closest("#window").stop().animate({
        height: "0",
        opacity: 0
      }, 300, function () {
        $(this).remove();
      });

      for (var i = num + 1; i <= num_window; i++) {
        var j = i - 1;
        $(".window[num=" + i + "]").find('.h_window').html("<h>Окно " + j + "</h>");
        $(".window[num=" + i + "]").attr('num', j);
      }

      num_window--;
    }
  }); //end on
  
  // Удаление двери
  $('.items_door').on('click', '.del_door', function () {
    if (num_door == 1) {
      $("#door").css('display', 'none');
      $('[name="width_door"]').val('');
      $('[name="height_door"]').val('');
      num_door--;
    } else {
      var num = Number($(this).closest("#door").attr('num'));
      $(this).closest("#door").stop().animate({
        height: "0",
        opacity: 0
      }, 300, function () {
        $(this).remove();
      });

      for (var i = num + 1; i <= num_door; i++) {
        var j = i - 1;
        $(".door[num=" + i + "]").find('.h_door').html("<h>Дверь " + j + "</h>");
        $(".door[num=" + i + "]").attr('num', j);
      }

      num_door--;
    }
  }); //end on
  
  // Кнопка расчитать
  $('.rez').on('click', function () {
    var flag = $('[name="room"]:checked').val();
    var S = 0; //площадь стен

    var P = 0; //периметр стен

    var H = 0; //высота потолка

    var ch = 0; //флажок на введение некорректных данных
    
    //площадь и периметр стен
    if (flag == 'size_room') {
      var w = Number($('[name="width_room"]').val());
      var l = Number($('[name="length_room"]').val());
      H = Number($('[name="height_room"]').val());
      S = 2 * H * w + 2 * H * l;
      P = 2 * w + 2 * l;

      if (w < 0 || l < 0 || H < 0) {
        ch++;
      }
    }

    if (flag == 'size_wall') {
      //площадь и периметр стен 
      $('[name="length_wall"]').each(function (i, l) {
        $('[name="height_wall"]').each(function (j, h) {
          if (i == j) {
            var _lw = Number($(l).val());

            H = Number($(h).val());
            S = S + _lw * H;
            P = P + _lw;

            if (H < 0 || _lw < 0) {
              ch++;
            }
          }
        });
      });
    } 

    //площадь окон
    var S_window = 0;
    $('[name="width_window"]').each(function (i, l) {
      $('[name="height_window"]').each(function (j, h) {
        if (i == j) {
          var _lw2 = $(l).val();

          var hw = $(h).val();
          S_window = S_window + _lw2 * hw;

          if (hw < 0 || _lw2 < 0) {
            ch++;
          }
        }
      });
    }); 

    //площадь дверей
    var S_door = 0;
    $('[name="width_door"]').each(function (i, l) {
      $('[name="height_door"]').each(function (j, h) {
        if (i == j) {
          var lh = $(l).val();
          var hh = $(h).val();
          S_door = S_door + lh * hh;

          if (lh < 0 || hh < 0) {
            ch++;
          }
        }
      });
    }); 

    //общая площадь
    var S_total = (S - S_window - S_door).toFixed(1);

    if (S_total < 0) {
      ch++;
    }

    var ww = $('[name="width_wallpaper"]').val() / 100;
    var lw = $('[name="length_wallpaper"]').val(); 

    //раппорт
    var rw = Number($('[name="repit_wallpaper"]').val()) / 100;

    if (ww < 0 || lw < 0 || rw < 0) {
      ch++;
    }

    H = H + rw + 0, 1; 

    //если со смещением
    if ($("#bias").prop('checked')) {
      H = H + rw / 2;
    } 

    //N - количество рулонов обоев
    var N = Math.ceil(Math.ceil(P / ww) / Math.floor(lw / H));
    var str = "<hr><center>\u041E\u0431\u0449\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C \u0432\u0441\u0435\u0445 \u0441\u0442\u0435\u043D: <span class=\"big\">".concat(S_total, "</span> \u043C<sup>2</sup><br>\n\t\t\u0422\u0440\u0435\u0431\u0443\u0435\u043C\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0443\u043B\u043E\u043D\u043E\u0432 \u043E\u0431\u043E\u0435\u0432: <span class=\"big\">").concat(N, "</span> \u0448\u0442.");

    if (ch > 0) {
      str = "<hr><center>Некорректно веденные данные</center>";
    }

    $('.result').html(str);
  }); //end on
}); //end ready
//# sourceMappingURL=script.js.map
