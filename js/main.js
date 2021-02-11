/* ===================================================================
 * TypeRite - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* Pretty Print
    * -------------------------------------------------- */
    var ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };

   
   /* search
    * ------------------------------------------------------ */
    var ssSearch = function() {
            
        var searchWrap = $('.header__search'),
            searchField = searchWrap.find('.header__search-field'),
            closeSearch = searchWrap.find('.header__search-close'),
            searchTrigger = $('.header__search-trigger'),
            siteBody = $('body');


        searchTrigger.on('click', function(e) {
            
            e.preventDefault();
            e.stopPropagation();
        
            var $this = $(this);
        
            siteBody.addClass('search-is-visible');
            setTimeout(function(){
                searchWrap.find('.search-field').focus();
            }, 100);
        
        });

        closeSearch.on('click', function(e) {

            var $this = $(this);
        
            e.stopPropagation(); 
        
            if(siteBody.hasClass('search-is-visible')){
                siteBody.removeClass('search-is-visible');
                setTimeout(function(){
                    searchWrap.find('.search-field').blur();
                }, 100);
            }
        });

        searchWrap.on('click',  function(e) {
            if( !$(e.target).is('.search-field') ) {
                closeSearch.trigger('click');
            }
        });
            
        searchField.on('click', function(e){
            e.stopPropagation();
        });
            
        searchField.attr({placeholder: 'Type Keywords', autocomplete: 'off'});

    };


   /* menu
    * ------------------------------------------------------ */
    var ssMenu = function() {

        var menuToggle = $('.header__menu-toggle'),
            siteBody = $('body');
    
        menuToggle.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.toggleClass('is-clicked');
            siteBody.toggleClass('nav-wrap-is-visible');
        });

        $('.header__nav .has-children').children('a').on('click', function (e) {
            
            e.preventDefault();

            $(this).toggleClass('sub-menu-is-open')
                .next('ul')
                .slideToggle(200)
                .end()
                .parent('.has-children')
                .siblings('.has-children')
                .children('a')
                .removeClass('sub-menu-is-open')
                .next('ul')
                .slideUp(200);

        });
    };


   /* masonry
    * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.masonry({
            itemSelector: '.masonry__brick',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            resize: true
        });

        // layout Masonry after each image loads
        containerBricks.imagesLoaded().progress( function() {
            containerBricks.masonry('layout');
        });

    };

   /* animate bricks
    * ------------------------------------------------------ */
    var ssBricksAnimate = function() {

        var animateEl = $('.animate-this');

        $WIN.on('load', function() {

            setTimeout(function() {
                animateEl.each(function(ctr) {
                    var el = $(this);
                    
                    setTimeout(function() {
                        el.addClass('animated');
                    }, ctr * 200);
                });
            }, 300);

        });

        $WIN.on('resize', function() {
            // remove animation classes
            animateEl.removeClass('animate-this animated');
        });

    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {

        var $gallery = $('.slider__slides').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            fade: true,
            cssEase: 'linear'
        });
        
        $('.slider__slide').on('click', function() {
            $gallery.slick('slickGoTo', parseInt($gallery.slick('slickCurrentSlide'))+1);
        });

    };


   /* smooth scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* alert boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var ssBackToTop = function() {
        
        var pxShow      = 500,
            goTopButton = $(".go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };

    var footer = function() {
        var x = document.getElementById('footer');
        if (x != null){

            x.innerHTML = `
            <footer class="s-footer">
                <div class="row">
                    <div class="column large-full footer__content">
                        <div class="footer__copyright">
                            <span>© Copyright AboutAll.Tech 2021</span> 
                            <span>Design by <a href="https://www.styleshout.com/">StyleShout</a></span>
                        </div>
                    </div>
                </div>

                <div class="go-top">
                    <a class="smoothscroll" title="Back to Top" href="#top"></a>
                </div>
            </footer>
            `
        }
    }

    var leftNav = function() {
        var x = document.getElementById('site-header');
        if (x != null){

            x.innerHTML = `
            <header class="s-header header">

                <div class="header__top">
                    <div class="header__logo">
                        <a class="site-logo" href="index.html">
                            <span class="logo-text">About All. Tech</span>
                        </a>
                    </div>

                    <div class="header__search">
        
                        <form role="search" method="get" class="header__search-form" action="#">
                            <label>
                                <span class="hide-content">Search for:</span>
                                <input type="search" class="header__search-field" placeholder="Type Keywords" value="" name="s" title="Search for:" autocomplete="off">
                            </label>
                            <input type="submit" class="header__search-submit" value="Search">
                        </form>
            
                        <a href="#0" title="Close Search" class="header__search-close">Close</a>
            
                    </div>  <!-- end header__search -->

                    <!-- toggles -->
                    <!--<a href="#0" class="header__search-trigger"></a>
                    <a href="#0" class="header__menu-toggle"><span>Menu</span></a> -->

                </div>
                <nav class="header__nav-wrap">

                        <ul class="header__nav">
                            <li class="current"><a href="index.html" title="">Home</a></li>
                            <li class="has-children">
                                <a href="#0" title="">Blog Posts</a>
                                <ul class="sub-menu">
                                <li><a href="hystrix-redis.html">Hystrix Redis</a></li>
                                <li><a href="consensus-algorithms.html">Consensus</a></li>
                                <li><a href="xss.html">SQL Injecion</a></li>
                                <li><a href="browser-storage.html">Browser Storage</a></li>
                                </ul>
                            </li>
                            <li><a href="page-about.html" title="">About</a></li>
                            <li><a href="page-contact.html" title="">Contact</a></li>
                        </ul> <!-- end header__nav -->

                        <ul class="header__social">
                            <li class="ss-facebook">
                                <a href="https://facebook.com/">
                                    <span class="screen-reader-text">Facebook</span>
                                </a>
                            </li>
                            <li class="ss-twitter">
                                <a href="#0">
                                    <span class="screen-reader-text">Twitter</span>
                                </a>
                            </li>
                            <li class="ss-dribbble">
                                <a href="#0">
                                    <span class="screen-reader-text">Dribbble</span>
                                </a>
                            </li>
                            <li class="ss-pinterest">
                                <a href="#0">
                                    <span class="screen-reader-text">Behance</span>
                                </a>
                            </li>
                        </ul>

                    </nav> <!-- end header__nav-wrap -->
                </header>

            `;
        }
    };

    var contactSubmit = function() {
        $('#contactForm').on('submit', function (e) {

            // if the validator does not prevent form submit
            if (!e.isDefaultPrevented()) {
                var url = "contact.php";

                // POST values in the background the the script URL
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data)
                    {
                        // data = JSON object that contact.php returns

                        // we recieve the type of the message: success x danger and apply it to the 
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        // let's compose Bootstrap alert box HTML
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        
                        // If we have messageAlert and messageText
                        if (messageAlert && messageText) {
                            // inject the alert to .messages div in our form
                            $('#contact-form').find('.messages').html(alertBox);
                            // empty the form
                            $('#contact-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        })
    };



   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        leftNav();
        footer();
        ssPreloader();
        ssPrettyPrint();
        // ssSearch();
        ssMenu();
        contactSubmit();
        ssMasonryFolio();
        ssBricksAnimate();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssBackToTop();

    })();

})(jQuery);