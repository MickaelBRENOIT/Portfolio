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