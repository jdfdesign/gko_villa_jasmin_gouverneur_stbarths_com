init_navigation=function(){$("#sidebar-toggler").click(function(){$("body").toggleClass("sidebar-open")}),$(window).resize(function(){$(this).width()>769?$("body").addClass("sidebar-open"):$("body").removeClass("sidebar-open")})};var $window,$body,Site={init:function(){$body=$("body"),$window=$(window),init_navigation(),Carousel.init(),$("body").fadeIn(3e3).css("display","block"),$(window).trigger("resize")}},Carousel={init:function(){$(".carousel").each(function(){var i=$(this);i.find(".item").length>1?i.carousel({interval:3e3}):(i.find(".carousel-control").each(function(){$(this).css({display:"none"})}),i.find(".carousel-indicators").each(function(){$(this).css({display:"none"})}))})}};$(document).ready(function(){Site.init()});