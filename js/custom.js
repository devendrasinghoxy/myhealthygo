(function($) {
	"use strict";
	$('.nav_toggle').on('click', function(){
		$(this).toggleClass("close_menu");
		$(".navigation_menu_wrap").slideToggle(100);
	});
	//dropdown menu
	$(".navigation_menu ul li ul.sub_menu").parents("li").addClass("dropdown_toggle");
	$(".dropdown_toggle").append("<span class='caret_down'></span>");
	$(".navigation_menu ul li").children(".caret_down").on("click",function(){
		$(this).toggleClass("caret_up");
		$(this).prev("ul").slideToggle();
	});
	//mega menu js
	$(".mega_menu").parents("li").addClass("mega_dropdown");
	$(".mega_dropdown").prepend("<span class='mega_toggle'></span>");
	
	//mega menu js script
	var win_w = $(window).outerWidth();
	if(win_w < 992){
		$(".mega_dropdown > a").on('click', function(){
			$(this).next(".mega_menu").slideToggle(300);
			$(this).parents(".mega_dropdown").toggleClass("caret_up");
		});
	}
	//fix header on scroll
	var win_scroll = $(window).scrollTop();
	$(window).on('bind scroll', function(e) {
		if ($(window).scrollTop() > 500) {
			$('.navigation_header').addClass('fixed_menu');
		} else {
			$('.navigation_header').removeClass('fixed_menu');
		}	
	});
	//cart list open close js
	$(".header_cart").on("click", function(){
		$(".cart_overlay_body").addClass("open");
	});
	$(".cart_close").on("click", function(){
		$(".cart_overlay_body").removeClass("open");
	});
	//change product count on click
	$('.minus').on("click",function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val(),10) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.plus').on("click",function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val(),10) + 1);
		$input.change();
		return false;
	});
	//smooth scroll body on click
	$('a.scrool_anchor').click(function(){
		$('html, body').animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 1000);
		return false;
	});
	//payment radio check
	$('.payment_radio input').change(function(){
		if ($(".card_pay_input").is(':checked')) {
			$(".card_pay_form").slideDown(100);	
		}
		else{
			$(".card_pay_form").slideUp(100);
		}
	});
	
	//search bar popup in mobile
	$(".h_search_icon").on("click", function(){
		$(".header_searchbar").slideToggle(200);
	});
	//Home slider
	if ($(".home_slider").length > 0){ 
		$(".home_slider").owlCarousel({
			singleItem:true,
			items:1,
			loop:true,
			margin:0,
			autoplay:false,
			autoplayTimeout:4000,
			autoplaySpeed:1500,
			smartSpeed:1500,
			dots:false,
			nav:true,
			navText:["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
		});
	}
	//scroll carousel
	//Brands slider
	$(".product_slider").owlCarousel({
		items:4,
		loop:true,
		margin:15,
		autoplay:false,
		autoplayHoverPause:true,
		autoplayTimeout:2000,
		autoplaySpeed:1500,
		smartSpeed:1500,
		dots:false,
		nav:true,
		navText:["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
		responsiveClass: true,
		responsive : {
			0 : {
				items: 1,
				margin:10,
			},
			600 : {
				items: 2,
				margin:10,
			},
			768 : {
				items: 2
			},
			992 : {
				items: 3,
				margin:10,
			},
			1200 : {
				items:4
			}
		}
	});
	//product syncronise carousel
	$(document).ready(function() {
	  var sync1 = $(".sync_product");
	  var sync2 = $(".sync_thumbnail");
	  var slidesPerPage = 4;
	  var syncedSecondary = true;

	  sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		autoplay: false,
		loop: true,
		responsiveRefreshRate : 200,
		nav: false,
		dots: false,
		navText: ['<i class="fa fa-angle-left">','<i class="fa fa-angle-right">'],
	  }).on('changed.owl.carousel', syncPosition);

	  sync2
		.on('initialized.owl.carousel', function () {
		  sync2.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
		items : slidesPerPage,
		dots: false,
		nav: true,
		navText: ['<i class="fa fa-angle-left">','<i class="fa fa-angle-right">'],
		smartSpeed: 200,
		slideSpeed : 500,
		slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
		responsiveRefreshRate : 100
	  }).on('changed.owl.carousel', syncPosition2);

	  function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;
		
		//if you disable loop you have to comment this block
		var count = el.item.count-1;
		var current = Math.round(el.item.index - (el.item.count/2) - .5);
		
		if(current < 0) {
		  current = count;
		}
		if(current > count) {
		  current = 0;
		}
		
		//end block

		sync2
		  .find(".owl-item")
		  .removeClass("current")
		  .eq(current)
		  .addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();
		
		if (current > end) {
		  sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
		  sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	  }
	  function syncPosition2(el) {
		if(syncedSecondary) {
		  var number = el.item.index;
		  sync1.data('owl.carousel').to(number, 100, true);
		}
	  }
	  sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	  });
	});
	//Brands slider
	$(".brands_slider").owlCarousel({
		items:6,
		loop:true,
		margin:15,
		autoplay:true,
		autoplayHoverPause:true,
		autoplayTimeout:3000,
		autoplaySpeed:1500,
		smartSpeed:1500,
		dots:false,
		nav:true,
		navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		responsiveClass: true,
		responsive : {
			0 : {
				items: 1
			},
			375 : {
				items: 2
			},
			600 : {
				items: 3
			},
			768 : {
				items: 3
			},
			992 : {
				items: 4
			},
			1200 : {
				items:6
			}
		}
	});
	//popup gallery js
	$('.gallery_popup').magnificPopup({
		delegate: '.gallery_icon',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'my_zoom_in',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: false,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		}
	});
	//load event
	$(window).on('load', function() {
		$(".ayu_loader").delay(600).fadeOut("slow");
		setTimeout(function(){
			$("body").addClass("body_loaded");
		},500);
	});
	//tabs Menu
	$('.tabs_menu > li').on('click', function(){
		var tab_data = $(this).attr("data-tab");
		$('.tabs_menu > li').removeClass("active");
		$(this).addClass("active");	
		$(".tab_content").removeClass("active");
		$("#"+tab_data).addClass("active");
	});
	//product category tabs Menu
	$('.p_category_sidebar ul li').on('click', function(){
		var tab_data = $(this).attr("data-tab");
		$('.p_category_sidebar ul li').removeClass("active");
		$(this).addClass("active");	
		$(".tab_content").removeClass("active");
		$("#"+tab_data).addClass("active");
	});
	//accordion js
	$(".accordion_heading").on("click", function(){
		$(this).toggleClass("active");
		$(this).next(".accordion_content").slideToggle(250);
		//$(".ac_heading").not(this).next().slideUp(100);
		//$(".ac_heading").not(this).removeClass("active");
	});
	//counter js
	if ($('.counter_n').length > 0){
		$('.counter_n').appear(function() {
			$('.counter_n').each(count);
			function count(options) {	
				var $this = $(this);
				options = $.extend({}, options || {}, $this.data('countToOptions') || {});
				$this.countTo(options);
			}
		});
	}
	//Dropfile function
	$('.dropfile_button input[type="file"]').change(function(e){
		var fileName = e.target.files[0].name;
		$(this).prev(".dropfile_label").children(".filepath").text('('+fileName+')');
	});
	//file upload function
	$('.file_upload_button input[type="file"]').change(function(e){
		var fileName = e.target.files[0].name;
		$(this).parents(".file_upload_button").next(".filepath").text(fileName);
	});
	//bootsrape selectpicker
    if ($(".selectpicker").length > 0) {
      $('.selectpicker').selectpicker();
    }
	//product sidebar widget toggle
	$(".p_widget").eq(1).addClass("open_widget");
	$(".p_widget.open_widget").children(".widget_txt").slideDown();
	$(".p_widget_title").on("click", function(){
		$(this).next(".widget_txt").slideToggle(100);
	});
	//open product sidebar
	if(win_w < 992){
		$(".sidebar_open_btn").on('click', function(e){
			$(".product_sidebar").addClass("open");
			e.stopPropagation();
		});
		$("body").on('click', function(){
			$(".product_sidebar").removeClass("open");
		});
		$(".product_sidebar").on("click", function(e){
			e.stopPropagation();
		});
		$(".sidebar_close_btn").on('click', function(){
			$(".product_sidebar").removeClass("open");
		});
	}
	//wow animation js
	new WOW().init();
	//slider img call in bg
	// $(".slide_img").each(function () {
		// var img_path = $(this).attr("src");
		// $(this).parents(".slide_item").css("background-image","url("+img_path+")");
	// });
	//Custom Dropdown
	$(".d_dropdown_toggle").on("click", function(){
		$(this).next(".dropdown_menu").slideToggle(100);
		$(".d_dropdown_toggle").not(this).next().slideUp(100);
	});
	//product mixit js
	if ($('#product_mixit_wrap').length > 0){
		$('#product_mixit_wrap').mixItUp({
		  load: {
			sort: 'order:asc'
		  },
		  selectors: {
			target: '.mix-target',
			filter: '.filter-btn'
		  },
		  callbacks: {
			onMixEnd: function(state){
			  console.log(state)
			}
		  }
		});
	}
})(jQuery);
