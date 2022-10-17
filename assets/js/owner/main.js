// funciones del sitio 
function btnSliders(a, t, n, b){
	if(n == null || b == null){ return; }
	if(a >= t){
		n.style.opacity = .3;
	} else{
		n.style.opacity = 1;
	}

	if(a <= 0){
		b.style.opacity = .3;
	} else{
		b.style.opacity = 1;
	}
}


function sliderRun(slider){
	const btnNext = slider.querySelector('.nextSlider');
	const btnBack = slider.querySelector('.backSlider');
	const boxBullets = slider.querySelector('.bulletSlider');
	let slide = slider.querySelectorAll('.slider');
	let slideNum = slide.length - 1;
	slider.activo = 0;
	slider.sentido = "normal";
	slider.timer = "";
	slider.timeTransition = 5000;
	slider.w = slide[0].clientWidth;
	slider.limite = 0;

	if(slider.getAttribute('data-time')){
		slider.timeTransition = parseInt(slider.getAttribute('data-time'));
	}

	if(slider.getAttribute('data-show')){
		slider.limite = parseInt(slider.getAttribute('data-show')) - 1;
	}

	function funNext(){
		slider.activo++;
		const margen = (slider.w * slider.activo);
		slide[0].style['margin-left'] = `-${margen}px`;
	}
	function funBack(){
		slider.activo--;
		const margen = (slider.w * slider.activo);
		slide[0].style['margin-left'] = `-${margen}px`;
	}
	function runInterval(){
		slider.timer = setInterval(() => {
		
			if(slider.sentido == "normal"){
				if(slider.activo < (slideNum - slider.limite)){
					slider.sentido = "normal";
					funNext();
					btnSliders(slider.activo, slideNum, btnNext, btnBack);
				} else{
					slider.sentido = "reversa";
					funBack();
					btnSliders(slider.activo, slideNum, btnNext, btnBack);
				}
				
			} else{
				if(slider.activo > 0){
					slider.sentido = "reversa";
					funBack();
					btnSliders(slider.activo, slideNum, btnNext, btnBack);
				} else{
					slider.sentido = "normal";
					funNext();
					btnSliders(slider.activo, slideNum, btnNext, btnBack);
				}
				
			}
		}, slider.timeTransition);
	}
	
	if(btnNext != null){
		btnNext.addEventListener('click', function(){
			if(slider.activo < (slideNum - slider.limite)){
				clearTimeout(slider.timer);
				funNext();
				runInterval();
			}
			btnSliders(slider.activo, slideNum, btnNext, btnBack);
		})
	}

	if(btnBack != null){
		btnBack.addEventListener('click', function(){
			if(slider.activo > 0){
				clearTimeout(slider.timer);
				funBack();
				runInterval();
			}
			btnSliders(slider.activo, slideNum, btnNext, btnBack);
		})
	}

	runInterval();
}

function cambioSliderSize(){
	setTimeout(function(){
		const winSize = window.innerWidth;
		if(winSize <= 860){
			document.getElementById('slideServiHome').setAttribute('data-show', 2);
		} else{
			document.getElementById('slideServiHome').setAttribute('data-show', 4);
		}

		sliders.forEach( s => {
			if(s.getAttribute('data-show')){
				s.limite = parseInt(s.getAttribute('data-show')) - 1;
			}

			let slide = s.querySelectorAll('.slider');
			s.w = slide[0].clientWidth;
			const margen = (s.w * s.activo);
			slide[0].style['margin-left'] = `-${margen}px`;
		} );
	}, 100);
}





let sliders = "";
function iniciar() {
	if(filtro == "home"){
		const winSize = window.innerWidth;
		if(winSize <= 860){
			document.getElementById('slideServiHome').setAttribute('data-show', 2);
		}
	}

	sliders = document.querySelectorAll('.boxSliders');
	sliders.forEach( s => sliderRun(s) );
	window.addEventListener('resize', cambioSliderSize);

	const menu = document.getElementById('menu');
		const btnMenuMobile = document.querySelector('#btnMenuMobile .btnMenuIcon');
		btnMenuMobile.addEventListener('click', function(){
			menu.classList.toggle('hide');
			this.classList.toggle('close');
		});
	

}





// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules"},
});
requirejs(["l/modernizr", "l/precarga", "validaciones", "alertas", "peticiones"], iniciar);

