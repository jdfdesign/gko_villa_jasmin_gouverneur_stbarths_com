init_navigation = function() {
  // mobile side-menu slide toggler
  var $menu = $(".sidebar-nav");
  $("body").click(function () {
    if ($(this).hasClass("sidebar-open")) {
      $(this).removeClass("sidebar-open");
    }
  });
  $menu.click(function(e) {
    e.stopPropagation();
  });
  $("#sidebar-toggler").click(function (e) {
    e.stopPropagation();
    $("body").toggleClass("sidebar-open");
  });
  $(window).resize(function() { 
    if($(this).width() > 769) {
      $("body").addClass("sidebar-open");
    } else {
      $("body").removeClass("sidebar-open");
    }
  })
} 