let regs = [];
let favs = [];
let colores = ["#7d8aff", "#fbff00", "#ff6161", "#ffc800", "#fc7474", "#5ff378", "#ff8080"];
let pass = "";
let editarFavoritos = false;
let registroActual = null;
let relojDivDetallado;
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const clasesDias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const root = document.getElementById("root");
cargar();
function crearDivMenu() {
	crearElemento("divMenu", root, "div", undefined, ["divmenu"]);
	crearElemento("botonMenu", divMenu, "button", "Menu", ["botonmenu"], toggleMenu);
	crearElemento("contenidoMenu", divMenu, "div", undefined, ["oculto", "contenidomenu"]);
	function toggleMenu() {
		contenidoMenu.classList.toggle("oculto");
	}
	crearElemento("opcionExportar", contenidoMenu, "button", "Exportar", ["opcion"], crearDivExportar);
	crearElemento("opcionImportar", contenidoMenu, "button", "Importar", ["opcion"], crearDivImportar);
	crearElemento("opcionPersonalizar", contenidoMenu, "button", "Personalizar", ["opcion"], crearDivPersonalizar);
}
function crearDivPersonalizar() {
	//este código es una chapuza pero hará el trabajo

	root.innerHTML = "";

	//crear boton de volver
	crearElemento("volver", root, "button", "Volver", ["boton", "volver"], function () {
		inicio();
	});
	crearElemento("labellunes", root, "div", "lunes", ["divtitulocolordiasemana"]);
	crearElemento("colorlunes", root, "input", undefined, ["inputcolor"]);
	colorlunes.type = "color";
	colorlunes.value = colores[1];
	labellunes.style = "background-color: " + colores[1];
	colorlunes.addEventListener("change", () => {
		colores[1] = colorlunes.value;
		labellunes.style = "background-color: " + colores[1];
		guardar();
	});

	crearElemento("labelmartes", root, "div", "martes", ["divtitulocolordiasemana"]);
	crearElemento("colormartes", root, "input", undefined, ["inputcolor"]);
	colormartes.type = "color";
	colormartes.value = colores[2];
	labelmartes.style = "background-color: " + colores[2];
	colormartes.addEventListener("change", () => {
		colores[2] = colormartes.value;
		labelmartes.style = "background-color: " + colores[2];
		guardar();
	});

	crearElemento("labelmiercoles", root, "div", "miercoles", ["divtitulocolordiasemana"]);
	crearElemento("colormiercoles", root, "input", undefined, ["inputcolor"]);
	colormiercoles.type = "color";
	colormiercoles.value = colores[3];
	labelmiercoles.style = "background-color: " + colores[3];
	colormiercoles.addEventListener("change", () => {
		colores[3] = colormiercoles.value;
		labelmiercoles.style = "background-color: " + colores[3];
		guardar();
	});

	crearElemento("labeljueves", root, "div", "jueves", ["divtitulocolordiasemana"]);
	crearElemento("colorjueves", root, "input", undefined, ["inputcolor"]);
	colorjueves.type = "color";
	colorjueves.value = colores[4];
	labeljueves.style = "background-color: " + colores[4];
	colorjueves.addEventListener("change", () => {
		colores[4] = colorjueves.value;
		labeljueves.style = "background-color: " + colores[4];
		guardar();
	});

	crearElemento("labelviernes", root, "div", "viernes", ["divtitulocolordiasemana"]);
	crearElemento("colorviernes", root, "input", undefined, ["inputcolor"]);
	colorviernes.type = "color";
	colorviernes.value = colores[5];
	labelviernes.style = "background-color: " + colores[5];
	colorviernes.addEventListener("change", () => {
		colores[5] = colorviernes.value;
		labelviernes.style = "background-color: " + colores[5];
		guardar();
	});

	crearElemento("labelsabado", root, "div", "sabado", ["divtitulocolordiasemana"]);
	crearElemento("colorsabado", root, "input", undefined, ["inputcolor"]);
	colorsabado.type = "color";
	colorsabado.value = colores[6];
	labelsabado.style = "background-color: " + colores[6];
	colorsabado.addEventListener("change", () => {
		colores[6] = colorsabado.value;
		labelsabado.style = "background-color: " + colores[6];
		guardar();
	});

	crearElemento("labeldomingo", root, "div", "domingo", ["divtitulocolordiasemana"]);
	crearElemento("colordomingo", root, "input", undefined, ["inputcolor"]);
	colordomingo.type = "color";
	colordomingo.value = colores[0];
	labeldomingo.style = "background-color: " + colores[0];
	colordomingo.addEventListener("change", () => {
		colores[0] = colordomingo.value;
		labeldomingo.style = "background-color: " + colores[0];
		guardar();
	});

	crearElemento("agradecimientos", root, "div", "Agradecimientos a Arturo porque inspiró está sección porque decía que él veía los colores de la semana de otra manera, lo cual me obligó a modificar la aplicación haciendo que sean personalizables para que cada persona vea las semanas del color que quiera");
}
function crearDivImportar() {
	root.innerHTML = "";
	crearElemento("divImportar", root, "div", undefined, ["divimportar"]);
	//crear boton de volver
	crearElemento("volver", divImportar, "button", "Volver", ["boton", "volver"], function () {
		inicio();
	});
	crearElemento("botonImportar", divImportar, "div", "Importar", ["boton", "importar"], importar);
	function importar() {
		if (comprobarJSON(textoImportar.value)) {
			let importar = JSON.parse(textoImportar.value);
			console.log(importar);
			for (let i = 0; i < importar.registros.length; i++) {
				importar.registros[i].fecha = new Date(importar.registros[i].fecha);
			}
			regs = regs.concat(importar.registros);
			favs = favs.concat(importar.favoritos);
			colores = importar.colores;
			duplicados();
			guardar();
			alert("Datos importados");
		} else if (textoImportar.value == "") {
			console.log("vacio");
		} else {
			alert("Los datos no están bien formados");
		}
	}
	crearElemento("textoImportar", divImportar, "textarea", "Pega aquí tus datos", ["textoimportar"]);
	textoImportar.addEventListener("input", function () {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + 5 + "px";
	});
}
function crearDivExportar() {
	root.innerHTML = "";
	crearElemento("divExportar", root, "div", undefined, ["divexportar"]);
	crearElemento("volver", divExportar, "div", "Volver", ["boton", "volver"], inicio);
	const exportar = {};
	exportar.registros = regs;
	exportar.favoritos = favs;
	exportar.colores = colores;
	crearElemento("botonCopiar", divExportar, "div", "Copiar", ["boton", "copiar"], function () {
		portapapeles(textoExportar);
		alert("Datos copiados al portapapeles");
		inicio();
	});
	crearElemento("textoExportar", divExportar, "div", JSON.stringify(exportar), ["textoexportar"]);
}

function crearDivRegistrar() {
	crearElemento("divRegistrar", root, "div", undefined, ["divregistrar"]);
	//crear input registrar
	crearElemento("textoRegistrar", divRegistrar, "input", "texto", ["textoregistrar"], nuevoRegistro);
	crearElemento("botonDesplegarCuadro", divRegistrar, "button", undefined, ["fa", "fa-chevron-down", "boton"], function () {
		cuadroTextoLargo.classList.toggle("oculto");
	});
	crearElemento("botonRegistrar", divRegistrar, "button", "Registrar", ["botonregistrar", "boton"], nuevoRegistro);
	crearElemento("cuadroTextoLargo", divRegistrar, "textarea", "texto largo", ["cuadrotextolargo", "oculto"]);
	cuadroTextoLargo.addEventListener("input", function () {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + 5 + "px";
	});

	function nuevoRegistro() {
		if (textoRegistrar.value) {
			let regNuevo = {};
			regNuevo.fecha = new Date();
			regNuevo.texto = textoRegistrar.value;
			regNuevo.textoLargo = cuadroTextoLargo.value;

			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						const latitud = position.coords.latitude;
						const longitud = position.coords.longitude;
						regNuevo.latitud = latitud;
						regNuevo.longitud = longitud;
					},
					function (error) {
						regNuevo.latitud = "0";
						regNuevo.longitud = "0";
					}
				);
			} else {
				console.log("La geolocalización no está disponible en este navegador.");
				regNuevo.latitud = "0";
				regNuevo.longitud = "0";
			}
			regs.unshift(regNuevo);
			registroActual = null;
			guardar();
			inicio();
		}
	}
}
function crearDivFavoritos() {
	crearElemento("divFavoritos", root, "div", undefined, ["divfavoritos"]);
	crearElemento("editarFavs", divFavoritos, "button", "Editar", ["editarfavs", "boton"], function () {
		editarFavoritos = true;
		inicio();
	});
	//botones de favoritos guardados
	for (let i = 0; i < favs.length; i++) {
		//añadir un botón al cuadro
		crearElemento("favHtml", divFavoritos, "div", favs[i], ["fav", "boton"], function (e) {
			console.log(e.srcElement.innerText);
			textoRegistrar.value = e.srcElement.innerText;
		});
	}
}
function crearEditarFavs() {
	crearElemento("divEditarFavoritos", root, "div", undefined, ["divfavoritos"]);
	crearElemento("noEditarFavs", divEditarFavoritos, "button", "No editar", ["boton", "noeditarfavs"], function () {
		editarFavoritos = false;
		inicio();
	});
	//botones de favoritos guardados
	for (let i = 0; i < favs.length; i++) {
		crearElemento("favHtml", divEditarFavoritos, "button", favs[i], ["faveliminar", "boton"], function () {
			eliminarFav(i);
		});
	}
	function eliminarFav(indiceFav) {
		favs.splice(indiceFav, 1);
		guardar();
		inicio();
	}
	crearElemento("inputNuevoFav", divEditarFavoritos, "div", undefined, ["inputnuevofav"]);
	crearElemento("textoNuevoFav", inputNuevoFav, "input", "Añadir", ["textonuevofav"], nuevoFav);
	crearElemento("botonNuevoFav", inputNuevoFav, "button", "Ok", ["submitfav", "boton"], nuevoFav);
	function nuevoFav() {
		if (textoNuevoFav.value) {
			favs.unshift(textoNuevoFav.value);
			duplicados();
			guardar();
			inicio();
		}
	}
}
function crearDivDetallado(i) {
	crearElemento("divDetallado", root, "div", undefined, ["divdetallado"]);
	registroActual = i;
	//crear div de la información del registro
	crearElemento("tituloRegistro", divDetallado, "h3", `Registro: ${regs[i].texto}`, ["tituloregistro"]);
	crearElemento(
		"fechaHoraRegistro",
		divDetallado,
		"div",
		`${nombresDias[regs[i].fecha.getDay()]} ${regs[i].fecha.getFullYear()}-${regs[i].fecha.getMonth() + 1}-${regs[i].fecha.getDate()}
    ${regs[i].fecha.getHours().toString().padStart(2, "0")}:${regs[i].fecha.getMinutes().toString().padStart(2, "0")}:${regs[i].fecha.getSeconds().toString().padStart(2, "0")}`,
		["fecha"]
	);
	//crear un contador de tiempo
	crearElemento("contadorTiempo", divDetallado, "div", mostrarTiempo(i), ["contadorTiempo"]);

	relojDivDetallado = setInterval(function () {
		contadorTiempo.innerHTML = mostrarTiempo(i);
	}, 200);

	//div texto largo
	let modoEdicion = false;
	crearElemento("divTextoLargo", divDetallado, "div");
	crearDivTextoLargo();
	function crearDivTextoLargo() {
		divTextoLargo.innerHTML = "";
		crearElemento("textoEditable", divTextoLargo, "div", regs[i].textoLargo, ["textolargo"]);
		let textoOriginal = textoEditable.textContent;
		let vacio = textoOriginal == "";
		console.log("textoOriginal asignado");

		if (modoEdicion == false) {
			if (vacio) {
				textoEditable.classList.add("oculto");
			}
			crearElemento("botonEditarTexto", divTextoLargo, "div", vacio ? "Añadir texto largo" : "Editar", ["boton", "botoneditartexto"], function () {
				modoEdicion = true;
				crearDivTextoLargo();
			});
		} else {
			textoEditable.contentEditable = true;
			textoEditable.classList.add("textoeditable");
			crearElemento("divBotonesEditar", divTextoLargo, "div");
			crearBotonesEditar();
			textoEditable.addEventListener("input", crearBotonesEditar);
			function crearBotonesEditar() {
				console.log("crear botones editar");
				divBotonesEditar.innerHTML = "";
				if (textoOriginal == textoEditable.textContent) {
					crearElemento("botonNoEditarTexto", divBotonesEditar, "div", "No editar", ["botonnoeditartexto", "boton"], function () {
						modoEdicion = false;
						crearDivTextoLargo();
					});
				} else {
					console.log("ha cambiado");
					crearElemento("botonGuardarTexto", divBotonesEditar, "div", "Guardar", ["boton", "botonguardartexto"], function () {
						regs[i].textoLargo = textoEditable.textContent;
						guardar();
						modoEdicion = false;
						crearDivTextoLargo();
					});
					crearElemento("botonNoGuardarTexto", divBotonesEditar, "div", "No guardar", ["boton", "botonnoguardartexto"], function () {
						textoEditable.textContent = textoOriginal;
						modoEdicion = false;
						crearDivTextoLargo();
					});
				}
			}
		}
	}
	crearElemento("mapa", divDetallado, "div", undefined, "mapa");
	mapa.style = "height: 500px;";
	let map = L.map("map").setView([37.6058348, -0.9899902], 12);
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);
	let marker = L.marker([regs[i].latitud, regs[i].longitud]).addTo(map);
	let popupContent = `
            <h3>${evento.nombre}</h3>
            <p>${evento.fechaHora}</p>
        `;
	marker.bindPopup(popupContent);
	marcador.openPopup();

	//div boton volver
	crearElemento("volver", divDetallado, "button", "Volver", ["boton", "volver"], () => {
		registroActual = null;
		inicio();
	});
	//div boton favoritos
	let esFav = false;
	for (let f = 0; f < favs.length && esFav == false; f++) {
		if (regs[i].texto == favs[f]) {
			esFav = true;
			indiceFav = f;
		}
	}
	crearElemento("toggleFav", divDetallado, "button", esFav ? "Favorito" : "Añadir", ["boton", esFav ? "esfav" : "noesfav"], function () {
		esFav ? favs.splice(indiceFav, 1) : favs.unshift(regs[i].texto);
		guardar();
		inicio();
	});
	//div boton eliminar
	crearElemento("eliminar", divDetallado, "button", "Eliminar", ["eliminar", "boton"], function () {
		if (window.confirm('Eliminar el registro "' + regs[i].texto + '"?')) {
			eliminarRegistro(i);
		}
	});
	function mostrarTiempo(indice) {
		let fechaContador = regs[indice].fecha;
		let ahora = new Date();
		let diferencia = ahora.getTime() - fechaContador.getTime();
		let segundos = Math.floor(diferencia / 1000);
		let minutos = Math.floor(segundos / 60);
		let horas = Math.floor(minutos / 60);
		let dias = Math.floor(horas / 24);
		segundos %= 60;
		minutos %= 60;
		horas %= 24;
		return "Hace " + dias + (dias == 1 ? " día " : " días ") + horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
	}
	function eliminarRegistro(indiceRegistro) {
		regs.splice(indiceRegistro, 1);
		guardar();
		registroActual = null;
		inicio();
	}
}
function crearDivRegistros() {
	crearElemento("divRegistros", root, "div");
	let dias = [];
	function getFechaString(fechaHora) {
		return `${fechaHora.getFullYear()}-${fechaHora.getMonth() + 1}-${fechaHora.getDate()}`;
	}
	//añadir los registros al html
	//este bucle recorre todos los registros y mete todas sus fechas diferentes en el array dias
	/* for (let i = 0; i < regs.length; i++) {
    let existe = false;
    for (let j = 0; j < dias.length && existe == false; j++) {
      if (dias[j] === getFechaString(regs[i].fecha)) {
        existe = true;
      }
    }
    if (!existe) {
      dias.push(getFechaString(regs[i].fecha));
    }
  } */

	//voy a hacerlo a lo loco y en vez de obtener solo los días que tienen registros
	// o un calendario desde el primer registro hasta hoy voy a hacerlo en plan hard code
	// para que se muestre un calendario de colores desde 2022 por ejemplo

	let diaInicio = new Date("2022");
	let diaFin = new Date();
	let diaBucle = diaFin;
	while (diaBucle >= diaInicio) {
		dias.push(getFechaString(diaBucle));
		diaBucle.setDate(diaBucle.getDate() - 1);
	}

	//recorro el array de días
	for (let i = 0; i < dias.length; i++) {
		//obtengo el objeto date del día en cuestion
		let diaObj = new Date(dias[i]);
		crearElemento("dia", divRegistros, "div", undefined, ["dia", clasesDias[diaObj.getDay()], dias[i]]);
		dia.style = "background-color:" + colores[diaObj.getDay()];
		crearElemento("tituloDia", dia, "h2", `${nombresDias[diaObj.getDay()]} ${diaObj.getDate()}-${diaObj.getMonth() + 1}`, ["tituloDia"]);
	}
	//recorro todos los registros y los meto en su día correspondiente
	for (let i = 0; i < regs.length; i++) {
		//obtener el elemento día correpondiente
		let diaHtml = document.getElementsByClassName(getFechaString(regs[i].fecha));
		//añadir el registro al día
		crearElemento("registro", diaHtml[0], "div", `${regs[i].fecha.getHours().toString().padStart(2, "0")}:${regs[i].fecha.getMinutes().toString().padStart(2, "0")}: ${regs[i].texto}`, ["registro"], function () {
			registroActual = i;
			inicio();
		});
		crearElemento("textoLargoRegistro", registro, "span", typeof regs[i].textoLargo == "undefined" || regs[i].textoLargo == "" ? "" : ` - ${regs[i].textoLargo}`, ["textolargoregistros"]);
	}
}
function duplicados() {
	const uniqueArr = [];
	const uniqueObj = {};

	for (let i = 0; i < regs.length; i++) {
		const key = `${regs[i].fecha}_${regs[i].texto}`;

		if (!uniqueObj[key]) {
			uniqueObj[key] = true;
			uniqueArr.unshift(regs[i]);
		}
	}
	regs = uniqueArr;

	const uniqueArrF = [];
	const uniqueObjF = {};

	for (let i = 0; i < favs.length; i++) {
		const key = favs[i];

		if (!uniqueObjF[key]) {
			uniqueObjF[key] = true;
			uniqueArrF.unshift(favs[i]);
		}
	}

	favs = uniqueArrF;

	ordenar();
	function ordenar() {
		regs = regs.sort(function (a, b) {
			return b.fecha - a.fecha;
		});
	}
}

function comprobarJSON(entrada) {
	try {
		JSON.parse(entrada);
		return true;
	} catch (error) {
		return false;
	}
}

function comprobarPass(p) {
	if (Decrypt(localStorage.getItem("favoritos"), p) && Decrypt(localStorage.getItem("registros"), p)) {
		console.log("la contraseña está bien");
		return true;
	} else {
		console.log("la contraseña está mal :(");
		return false;
	}
}
function cargar() {
	regs = JSON.parse(localStorage.getItem("registros"));
	favs = JSON.parse(localStorage.getItem("favoritos"));
	colores = JSON.parse(localStorage.getItem("colores"));
	if (regs) {
		for (let i = 0; i < regs.length; i++) {
			regs[i].fecha = new Date(regs[i].fecha);
		}
	}
	console.log("se ha cargado");
	inicio();
	return true;
}
function guardar() {
	localStorage.setItem("favoritos", JSON.stringify(favs));
	localStorage.setItem("registros", JSON.stringify(regs));
	localStorage.setItem("colores", JSON.stringify(colores));

	console.log("guardado en texto plano");
	const datos = {};
	datos.favs = localStorage.getItem("favoritos");
	datos.regs = localStorage.getItem("registros");
	datos.colores = localStorage.getItem("colores");
	const url = "http://192.168.1.32/index.php?" + JSON.stringify(datos);

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("La solicitud no fue exitosa");
			}
			return response.json(); // o response.text() si esperas una respuesta de texto en lugar de JSON
		})
		.then((data) => {
			console.log("Respuesta del servidor:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function crearElemento(nombreVariable, padre, tipoElemento, texto, clases, funcionElemento) {
	const newElement = document.createElement(tipoElemento);

	if (tipoElemento === "input" || tipoElemento === "textarea") {
		if (texto !== undefined) {
			newElement.placeholder = texto;
		}
		if (typeof funcionElemento === "function") {
			newElement.addEventListener("keypress", function (e) {
				if (e.key === "Enter") {
					funcionElemento();
				}
			});
		}
	} else {
		if (texto !== undefined) {
			newElement.textContent = texto;
		}
		if (typeof funcionElemento === "function") {
			newElement.addEventListener("click", funcionElemento);
		}
	}

	if (clases !== undefined) {
		if (!Array.isArray(clases)) {
			clases = [clases];
		}
		newElement.classList.add(...clases);
	}
	padre.appendChild(newElement);

	window[nombreVariable] = newElement;
}
function inicio() {
	clearInterval(relojDivDetallado);
	root.innerHTML = "";
	crearDivMenu();
	crearDivRegistrar();
	if (editarFavoritos) {
		crearEditarFavs();
	} else {
		crearDivFavoritos();
	}
	if (registroActual !== null) {
		crearDivDetallado(registroActual);
	} else {
		crearDivRegistros();
	}
}
