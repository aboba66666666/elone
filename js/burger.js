$(document).ready(function() {
	$('.header_burger').click(function(event){
		$('.header_burger,.header_button,.header_menu,.header_language,.language').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

