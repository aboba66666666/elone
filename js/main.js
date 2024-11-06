"use strict"
document.addEventListener('DOMContentLoaded', function () {
		const form = document.getElementById('form');
		form.addEventListener('submit', formSend);

		async function formSend(e) {
			e.preventDefault();


			let error = formValidate(form);

			let formData = new FormData(form);


			if (error === 0) {
				form.classList.add('_sending');
				let response = await fetch('sendmail.php',{
					method: 'POST',
					body: formData
				});
				if (response.ok) {
					let result = await response.json();
					alert(result.message);
					formPreview.innerHTML = '';
					form.reset();
					form.classList.remove('_sending');
				} else {
					alert("Ошибка");
					form.classList.remove('_sending');
				}
			} else {
				alert('Заполините поля');
			}
		}
		function formValidate(form) {
			let error = 0;
			let formReq = document.querySelectorAll('._req');

			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];
				formRemoveError(input);

				if (input.classList.contains('_email')) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
						formAddError(input);
						error++;
					}
				} else {
					if (input.value === '') {
						formAddError(input);
						error++;
					}
				}
			}
			return error;
		}
		function formAddError(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
		}
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}
});

$(document).ready(function(){

	$('.slaider').slick({
		arrows:false,
		slidesToShow:3,
		variableWidth: true,
		centerMode:true,
		swipeToSlide: true,
		edgeFriction:0.15,
		adaptiveHeight:true,
		touchThreshold:25
		
		});
	$('.blog_content').slick({
		arrows:false,
		variableWidth: true,
		centerMode:true,
		slidesToScroll:1,
		edgeFriction:0.15,
		responsive: [
            {
                breakpoint: 2048,
                settings: "unslick"
            },
            {
               breakpoint: 1237,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
            }
        },
    ]
	});
	$('.item_title').click(function(event){
		if($('.slaider_item').hasClass('one')){
			$('.item_title').not($(this)).removeClass('active');
			$('.item_body-slaider').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	})
})
 $('.item_filter').click(function(event){
    $('.item_filter').removeClass('active');
    $(this).addClass('active');
});

let select = function(){
	let selectHeader = document.querySelectorAll('.select_header,.header_language');
	let selectItem = document.querySelectorAll('.select_item,.language_text1,.language_text2,.language_text3');
	selectHeader.forEach(item=>{
		item.addEventListener('click',selectToggle)
	});
		selectItem.forEach(item=>{
		item.addEventListener('click',selectChoose)
	});
		function selectToggle(){
			this.parentElement.classList.toggle('is-active');
		}
		function selectChoose(){
			let text = this.innerText,
			select = this.closest('.select,.language'),
			currentText = select.querySelector('.select_current,.language_current');
			currentText.innerText = text;
			select.classList.remove('is-active');
		}

};
$(document).ready(function() {
	$('.select,.language').click(function(event){
		$('.select_icon,language_img').toggleClass('icon-active');
	});
});
select();


