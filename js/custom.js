/*=================================================================
                        INIT WOW JS
==================================================================*/

$(function(){
   new WOW().init(); 
});

/*=================================================================
                        SCHOOL CAREER
==================================================================*/

$(function () {
    $("#schools").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 700,
        loop: true,
        autoplayHoverPause: true
    });
});

/*=================================================================
                        SKILLS
==================================================================*/

$(function () {
    $("#skills").magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});

/*=================================================================
                        MY PROJECTS
==================================================================*/

$(function(){
   $(".project-description").twentytwenty({
       default_offset_pct: 0.9,
       no_overlay: true
   }); 
});

/*=================================================================
                        HEADER
==================================================================*/

/* HANDLING SCROLL EVENT NAVIGATION */

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() < 50) {
            $("nav").removeClass("portfolio-top-nav");
            $("#back-to-top").fadeOut();
        } else {
            $("nav").addClass("portfolio-top-nav");
            $("#back-to-top").fadeIn();
        }
    });
});

/* SMOOTH SCROLLING */
$(function () {
    $("a.smooth-scroll").click(function (event) {
        event.preventDefault();
        var section = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(section).offset().top - 64
        }, 1250, "easeInOutExpo");
    });
});

/* CLOSE MOBILE MENU ON CLICK */
$(function(){
    $(".navbar-collapse ul li a").on("click touch", function(){
        $(".navbar-toggle").click(); 
    });
});

/*=================================================================
                        LOADING
==================================================================*/

$(function(){
  function id(v){ return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("overlay"),
        prog = id("progress"),
        stat = id("progstat"),
        img = document.images,
        c = 0,
        tot = img.length;
    //console.log("Number of images : " + tot);
    if(tot == 0) return doneLoading();

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0) +"%";
      prog.style.width = perc;
      stat.innerHTML = "Loading "+ perc;
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      ovrl.style.opacity = 0;
      setTimeout(function(){ 
        ovrl.style.display = "none";
      }, 1200);
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Image();
      tImg.onload  = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src     = img[i].src;
    }    
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());