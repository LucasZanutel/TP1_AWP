window.onload = function(){
	var ciudadGuardada = JSON.parse(localStorage.getItem('datosCiudad'));
			
	ciudad.innerHTML= ciudadGuardada.ciudad;
	ima.src = ciudadGuardada.imagen;
	temp.innerHTML =  ciudadGuardada.temperatura;
	desc.innerHTML =  ciudadGuardada.descripcion;	
	max.innerHTML = ciudadGuardada.tempMax;
	min.innerHTML = ciudadGuardada.tempMin;
	st.innerHTML = ciudadGuardada.sensacionT;
	hum.innerHTML = ciudadGuardada.humedad;
	vie.innerHTML = ciudadGuardada.viento;
	pres.innerHTML = ciudadGuardada.presion;
	mapa.src = ciudadGuardada.rutaMapa;
		
}

//Aqui debe ingresar su API KEY  de OpenWeatherMap
const API_KEY= 'ea9ebd49acfd1f118922735a4481f30a';
const punto = 'https://api.openweathermap.org/data/2.5/weather';
//Aqui debe ingresar su API KEY  de Google Maps
const KeyMapa = 'AIzaSyBfz72v3Ai-EUFlUAWtVR-5UtMJaSjHjrk';

const button = document.getElementById("sendButton");
const inputElement = document.getElementById("search");
const caja1 = document.getElementById("caja1");
const caja2 = document.getElementById("caja2");

const ciudad = document.querySelector(".ciudad");
const ima = document.querySelector(".ima");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");

const max = document.querySelector(".max");
const min = document.querySelector(".min");
const st = document.querySelector(".st");
const hum = document.querySelector(".hum");
const vie = document.querySelector(".vie");
const pres = document.querySelector(".pres");
const hora = document.querySelector(".hora");

const mapa = document.getElementById("mapa");

button.addEventListener("click", ()=>{
	searchCity(inputElement.value);
});

function searchCity(ciudadABuscar){
	
	const fetchPromise = fetch(`${punto}?q=${ciudadABuscar}&appid=${API_KEY}&lang=Es&units=metric`);
	
	fetchPromise.then(response => {
		return response.json();
	}).then(result => {
		dibujar(result.weather, result.main, result.wind);
		guardarLS(result);
	}).catch(err =>{
		
		ciudad.innerHTML = 'Ciudad no encontrada, vuelva a intentarlo!';
		ciudad.setAttribute('class','noEx');
		
		desc.innerHTML = '';
		ima.src = 'img/default2.png';
		temp.innerHTML =  '--';
		
		max.innerHTML =  '--';
		min.innerHTML =  '--';
		st.innerHTML =  '--';
		hum.innerHTML = '--';
		vie.innerHTML = '--';
		pres.innerHTML = '--';
		mapa.src = '';
	});

}

function dibujar(weather, main, wind){

	switch(weather[0]['icon']){
		
		case '01d':
		r = 'img/sol2.png'
		break;
		case '01n':
		r = 'img/luna2.png'
		break;
		case '02d':
		r = 'img/algNubD2.png'
		break;
		case '02n':
		r = 'img/algNubN2.png'
		break;
		case '03d':
		r = 'img/nubDisD2.png'
		break;
		case '03n':
		r = 'img/nubDisN2.png'
		break;
		case '04d':
		r = 'img/nubRotD2.png'
		break;
		case '04n':
		r = 'img/nubRotN2.png'
		break;
		case '09d':
		r = 'img/aguaceroD2.png'
		break;
		case '09n':
		r = 'img/aguaceroN2.png'
		break;
		case '10d':
		r = 'img/lluviaD2.png'
		break;
		case '10n':
		r = 'img/lluviaN2.png'
		break;
		case '11d':
		r = 'img/tormentaD2.png'
		break;
		case '11n':
		r = 'img/tormentaN2.png'
		break;
		case '13d':
		r = 'img/nieveD2.png'
		break;
		case '13n':
		r = 'img/nieveN2.png'
		break;
		case '50d':
		r = 'img/nieblaD.png'
		break;
		case '50n':
		r = 'img/nieblaN2.png'
		break;
		
		default:
		r = 'img/default2.png';
	}
	
	ciudad.removeAttribute('class');
	const texto = inputElement.value;
	const descripcion = weather[0]['description'];
	
	ciudad.innerHTML = texto.toUpperCase();
	desc.innerHTML = descripcion.toUpperCase();
	//Si se quiere usar los iconos que se obtienen de la API se debe descomentar la linea L.150 y la L.151 comentarla.
	//ima.src = "http://openweathermap.org/img/wn/"+weather[0]['icon']+"@4x.png";
	ima.src = r;
	temp.innerHTML =  parseInt(main['temp']);
	
	max.innerHTML =  parseInt(main['temp_max']);
	min.innerHTML =  parseInt(main['temp_min']);
	st.innerHTML =  parseInt(main['feels_like']);
	hum.innerHTML =  main['humidity'];
	vie.innerHTML =  parseInt(wind['speed'] * 3.6);
	pres.innerHTML =  main['pressure'];
	mapa.src = "https://www.google.com/maps/embed/v1/place?key="+KeyMapa+"&q="+inputElement.value;
}

function guardarLS(result){
	
	const busqueda = inputElement.value;
	const descrip = result.weather[0]['description'];
	
	let datosLS = {
		'ciudad': busqueda.toUpperCase(),
		'imagen':r,
		'temperatura': parseInt(result.main.temp),
		'descripcion': descrip.toUpperCase(),
		'tempMax': parseInt(result.main.temp_max),
		'tempMin': parseInt(result.main.temp_min),
		'sensacionT': parseInt(result.main.feels_like),
		'humedad': parseInt(result.main.humidity),
		'viento': parseInt(result.wind.speed * 3.6),
		'presion': parseInt(result.main.pressure),
		'rutaMapa': mapa.src,
	}
	localStorage.setItem('datosCiudad',JSON.stringify(datosLS));
}
