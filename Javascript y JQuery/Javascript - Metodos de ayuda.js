/**
	Metodos de ayuda versión: 3
	© Copyright 2058, JuanLu Corp.
	
	• error()		necesita mínimo versión 3 (cambio parametros)
	• aleatorio()	necesita mínimo versión 3 (cambio de nombre)
*/
// Math.* w3schools		→ w3schools.com/js/js_math.asp
// Typeof				→ developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/typeof

/* ╔═══♦ Acciones con ratón y teclas ♦═══╗

	✪ No seleccionar	→ <body onselectstart="return false"  ondragstart="return false">

	✪ Saber el botón pulsado: event.which
		event.which == 1 → Botón Izquierdo
		event.which == 2 → Botón Central
		event.which == 3 → Botón Derecho

	✪ Detectar tecla w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2
		event.which = 13

*/

/* ╔═══♦ INFO: Metodos ♦═══╗

__Metodos__
 	✪ alinearImagen_Horizontal│alinearImagen_Horizontal│alinearImagen = function( imagen )
		► imagen	▬ (<etiqueta/>)	debe pasarse un tag de imagen de Jquery.

		📖 Ejemplo:	 activarDesactivar_Forzar( $("#cabecera img") );

		NOTA:
			1. Horizontal:	Centra la imagen en Horizontal.
			2. Vertical:	Centra la imagen Verticalmente.
			2. Normal:		Centra la imagen Vertical y Horizontalmente.
 */
 
// ╔═══♦ Ejecutar ♦═══╗
/**
	Inicializa Jquery
*/
$(document).ready(function(){
	// Comentar: DesActivar
	// DesComentar: Activar
	
	/* Iniciar el Gif de carga (imagen)
		// Metodos para usarlo
			// • imagenCarga(); para mostrar/ocultar el gif.
		iniciarConfiguraciónGIFCarga();
	// */
});


// ╔═══♦ Variables (html) ♦═══╗

	// Crea una tabulación
	TAB = "<span style=\"padding-left:2em;\"></span>";
	
	// Crea un nuevo espacio de línea
	ENTER = "<br/>";


// ╔═══♦ Metodos ♦═══╗


/* ✪ remCookie( "variable" )
		► "variable"	▬ (String)	Nombre de la variable cookie a eliminar.
	
	INFO: Elimina una variable cookie del navegador;
*/
remCookie = function( variable ){
	// Comprueba: variable
	if( this.comprobarVariable(variable, "string") == false ){
		this.error("remCookie(<u>variable</u>)",
			"variable", variable,
			"El parametro debe ser de tipo string (texto)");}
	
	// Se actualizará la cookie con una fecha caducada para eliminarla.
	else {
		document.cookie = variable +"=; expires=Thu, 11 Jan 1992 00:00:00 UTC";
	}
}

/* ✪ setCookie( "variable", texto )
		► "variable"	▬ (String)			Nombre de la variable.
		► texto			▬ (texto a String)	Valor de la variable.

		📖 Ejemplo:	setCookie( "usuario", "Juan Luis" );
	
	INFO: Añade una nueva cookie al navegador;
*/
setCookie = function( variable, texto ){
	// Comprueba: variable
	if( this.comprobarVariable(variable, "string") == false ){
		this.error("setCookie(<u>variable</u>, texto)",
			"variable", variable,
			"El parametro debe ser de tipo string (texto)");}
	
	// Se almacenará la nueva cookie
	else {
		document.cookie = variable +"="+ texto;
	}
}

/* ✪ getCookie( "variable" )
		► "variable"	▬ (String)	nombre de la variable almacenada.
		◄ return		▬ (String)	Devuelve el valor de la variable.

		📖 Ejemplo:	getCookie( "usuario" )
	
	INFO: Obtiene una cookie del navegador que esté creada;
*/
getCookie = function( variable ){
	// Comprueba: variable
	if( this.comprobarVariable(variable, "string") == false ){
		this.error("getCookie(<u>variable</u>)",
			"variable", variable,
			"El parametro debe ser de tipo string (texto)");}
	
	// Se procederá a encontrar la cookie
	else {
		var nombre = variable + "=";
		var cookieArray = document.cookie.split(';');
		for( var i=0 ; i<cookieArray.length ; i++ ) {
			var c = cookieArray[i];
			
			while( c.charAt(0)==' ' ){
				c = c.substring(1);
			}
			if( c.indexOf(nombre) == 0 ) {
				return c.substring(nombre.length, c.length);
			}
		}
		// Si no se encuentra la cookie lanzará un error
		this.error("getCookie", "", variable, "La cookie no existe.");
	}
}

/* ✪ comprobarVariable( variable, "tipoVariable" )
		► variable			▬ (Variable)	Valor de la variable
		► "tipoVariable"	▬ (String)		"boolean", "number", "string", "Array", "null" o "undefined"
		◄ return			▬ true / false

		📖 Ejemplo:	comprobarVariable( miVariable, "string" )
	
	INFO: Comprobará si la variable coincide con el "tipoVariable"
	
	✪ Sobrecarga: comprobarVariable( variable )
		► variable			▬ (variable)	Valor de la variable.
		◄ return			▬ (String)		"boolean", "number", "string", "Array", "null" o "undefined"
		
		📖 Ejemplo:	comprobarVariable( miVariable )
*/
comprobarVariable = function(variable, tipoVariable){
	
	// Sobrecarga function(variable)
	if( tipoVariable === undefined ){
		var resultado;
		
		if( variable === undefined ){
			return "undefined";
		} else if( variable === null ){
			return "null";
		} else if( variable instanceof Array ){
			return "Array";
		} else {
			return typeof variable + "";
		}
	}
	
	// Comprueba: "tipoVariable"
	if( typeof tipoVariable != "string" ){
		this.error("comprobarVariable(variable, <u>tipoVariable</u>)",
			"tipoVariable", tipoVariable,
			"Necesita ser de tipo texto: \"boolean\", \"number\", \"string\", \"Array\", \"null\" o \"undefined\".");}
	
	// Parametros correctos
	else {
		if( variable === null && tipoVariable == "null"){
			return true;
		
		} else if( variable instanceof Array && tipoVariable == "Array"){
			return true;
		}
		
		if( typeof variable != tipoVariable ) {
			if(tipoVariable != "boolean" && tipoVariable != "number"
				&& tipoVariable != "string" && tipoVariable != "Array"
				&& tipoVariable != "null" && tipoVariable != "undefined"){
				this.error("comprobarVariable(variable, <u>tipoVariable</u>)",
					"tipoVariable", tipoVariable,
					"Necesita ser de tipo texto: \"boolean\", \"number\", \"string\", \"Array\", \"null\" o \"undefined\".");
			}
			return false;
		} else {
			return true;
		}
	}
};

/* ✪ error( mensaje, cabecera, nombreVariable, valorVariable )
		► mensaje			▬ 			Mensaje para el error.
		► cabecera			▬ 			Cabecera del error.
		► nombreVariable	▬ 			Nombre de la variable que da error.
		► valorVariable		▬ 			Mostrará el dato que ha creado el error.
		return				▬ (html)	Muestra una caja con el error.

		📖 Ejemplo 1 parametro:	error("Conexión fallida a base de datos");
		📖 Ejemplo 2 parametro:	error("Conexión fallida a base de datos", "Conexión fallida");
		📖 Ejemplo 4 parametro:	error("Conexión fallida a base de datos", "Conexión fallida", "puerto", puerto);
	
	INFO:
		• Mostrará al inicio del contenido una caja html con el error personalizado.
		• Solo se admiten 1, 2 o 4 parametros
			· 0 y 3 parametros dan error y 5 o más se ommiten.
*/
error = function(mensaje, cabecera, nombreVariable, valorVariable){
	
	 // 0 Parametros
	if( comprobarVariable(mensaje, "undefined") ){
		this.error("Debes pasar como mínimo un mensaje. Parametros necesarios: 1, 2 o 4",
			"error(<u>mensa</u>j<u>e</u>, cabecera, nombreVariable, valorVariable)",
			"mensaje", "vacío");
	
	 // 1 Parametro: Mensaje
	} else if( comprobarVariable(cabecera, "undefined") )  {
		$("body").prepend(
			"<p style=\"border: dashed 2px red; background-color: whitesmoke;\">"
				+"<b>• Error:</b> <i>"+ mensaje +"</i>"
			+"</p>"
		);
	
	 // 2 Parametros: Mensaje y Cabecera
	} else if( comprobarVariable(nombreVariable, "undefined") ){
		$("body").prepend(
			"<p style=\"border: dashed 2px red; background-color: whitesmoke;\">"
			+"<b>• Error:</b> "+ cabecera + this.ENTER
				+ this.TAB + "<i>"+ mensaje +"</i>"
			+"</p>"
		);
	
	 // 3 Parametros: Error (solo 1, 2 y 4 parametros)
	} else if( comprobarVariable(valorVariable, "undefined") ){
		this.error("Has pasado 3 parametros. Parametros necesarios: 1, 2 o 4",
			"error(mensaje, cabecera, <u>nombreVariable</u>, valorVariable)",
			"3r parametro", nombreVariable);
	} else {
		$("body").prepend(
			"<p style=\"border: dashed 2px red; background-color: whitesmoke;\">"
			+"<b>• Error:</b> "+ cabecera + this.ENTER
				+ this.TAB +"Variable: "+ nombreVariable +" = '"+ valorVariable +"' ("+ this.comprobarVariable(valorVariable) +")"+ this.ENTER
				+ this.TAB + "<i>"+ mensaje +"</i>"
			+"</p>"
		);
	}
};

/* ✪ aleatorio( ale1, ale2 )
		► ale1		▬ Admite cualquier dato.
		► ale2		▬ Admite cualquier dato y es opcional (+info en ejemplos).
		◄ return	▬ Devuelve el aleatorio (boolean, number, string).

		📖 Ejemplo boleano:	aleatorio(true)					(true / false);
		📖 Ejemplo numerico:	aleatorio(8);						(0 → 8)
				  numerico:	aleatorio(8, -3);					(8 → -3)
		📖 Ejemplo string:	aleatorio("esta es mi frase")		(palabra aleatoria);
		          string:	aleatorio("esta es mi frase", 5)	(5 caracteres consecutivos. 1r caracter aleatorio);
		📖 Ejemplo Array:	aleatorio([1, true, undefined, "hola", 8, Math.PI]) (1 valor aleatorio);
		📖 Ejemplo null:		aleatorio(null)					(1 → 50);
		📖 Ejemplo undefined: aleatorio(null)					(1 → 100);
	
	INFO: Boleano: devolverá true o false;
*/
aleatorio = function(ale1, ale2){
	var tipoAle1	= this.comprobarVariable(ale1);
	var tipoAle2	= this.comprobarVariable(ale2);
	
	// Quita los espacios extra si me pasan un string
	if( tipoAle1 == "string" ){
		// crea un array con las palabras
		var palabras	= ale1.split(" ");
		
		// Elimina los huecos vacíos del array creados por los espacios
		for( var i=(palabras.length -1) ; i>=0 ; i-- ){
			// Si hay un hueco vacío lo elimina
			if( palabras[i] == "" ){ palabras.splice(i, 1)};
		}
		
		// restaura la frase
		ale1	= palabras.join(" ");
	}
	
	if( tipoAle2 == "boolean" ){ ale2	= 2; }
	
	else if( tipoAle2 == "string"
		|| tipoAle2 == "Array" ){
		ale2	= ale2.length; }
	
	else if( tipoAle2 == "null" ) { ale2	= 50; }
	
	else if( tipoAle2 == "undefined" ) { ale2	= 100; }
	
	// aleatorio de boleanos
	if( tipoAle1 == "boolean" ){
		var aleatorio	= parseInt(Math.round(Math.random() * ((2 - 1 +1) - 1) + 1));
		return (aleatorio == 1) ? true : false; }
	
	// aleatorio de palabras
	else if( tipoAle1 == "string"
		&& tipoAle2 == "undefined" ) {
		
		// crea un array con las palabras
		var palabras	= ale1.split(" ");
		var aleatorio	= parseInt(Math.round(Math.random() * (((palabras.length -1) - 0 +1) - 1) + 0));
		
		// devuelve la palabra aleatoria
		return palabras[aleatorio]; }
	
	 // aleatorio de caracteres
	else if( tipoAle1 == "string" ) {
		var aleatorio	= parseInt(Math.round(Math.random() * (((ale1.length -1) - 0 +1) - 1) + 0));
		return ale1.substr(aleatorio, ale2); }
	
	 // Aleatorio de números
	else if( tipoAle1 == "number" ) {
		 // 1 parametro (0 → x)
		if( this.comprobarVariable(ale2, "undefined") ){
			return parseInt(Math.round(Math.random() * ((ale1 - 0 +1) - 1) + 0)); }
		
		 // 2 parametros (ale1 → ale2)
		else if( this.comprobarVariable(ale2, "number") ){
			return parseInt(Math.round(Math.random() * ((ale2 - ale1 +1) - 1) + ale1)); }
		
		 // error parametro 2 numerico
		else {
			this.error(
				"El parametro 2 debe ser numerico (2º parametro opcional)",
				"aleatorio(ale1, <u>ale2</u>)"
			); }
	}
	
	 // Aleatorio de Array
	else if( tipoAle1 == "Array" ) {
		var aleatorio	= parseInt(Math.round(Math.random() * (((ale1.length -1) - 0 +1) - 1) + 0));
		return ale1[aleatorio]; }
	
	 // Aleatorio de null (1 → 50) y de undefined (1 → 100)
	else if( tipoAle1 == "null"
		|| tipoAle1 == "undefined" ) {
		var aleatorio	= parseInt(Math.round(Math.random() * ((ale2 - 1 +1) - 1) + 1));
		return aleatorio; }
	
	else {
		this.error(
			"Se necesita 1 parametro",
			"aleatorio(<u>ale1</u>, ale2)"
		);
	}
};

/* Este metodo debe activarse arriba en Ejecutar JQuery
	Inicializa el gif de carga para poder usarse.
	• Usa el método imagenCarga(); para mostrar u ocultar el gif.
	
	Requisitos:
		• Carpeta Imgs al lado del html.
		• cargando.gif dentro de la carpeta Imgs
*/
iniciarConfiguraciónGIFCarga = function(){
// HTML
	// Añade el div donde se almacenará la imagen (no molesta al codigo)
	$("body").prepend(
			"<div id=\"imagenCarga\">"
			+"<img src=\"./Imgs/cargando.gif\"/>"
			+"</div>"
		)

		// Añade su código CSS
		// Aquí se cambia el CSS del gif de carga
		.append(
			"<style>"
			+"#imagenCarga {"
			+"width: 100%;"
			+"height: 100%;"
			+"background-color: rgba(255, 255, 255, 0.3);"

			+"position: absolute;"
			+"z-index: 100;"
			+"animation: blinker 1s linear infinite; }"

			+"@keyframes blinker{ 50% { opacity: 0.5; } }"

			+"#imagenCarga img{"
			+"width: 20%;"
			+"min-width: 0px;"
			+"max-width: 200px;"
			+"position: absolute;"

			+"top: 40%;"
			+"left: 40%;"
			+"border-radius: 100%; }"
			+"</style>"
		);

// Ocultar
	$("#imagenCarga, #imagenCarga img").css("opacity", "0");
	cargando = $("#imagenCarga");

// Añadir estado para ocultar
	cargando.data("estado", false)
		.css("width", "0%")
		.css("height", "0%");
};

/* ✪ imagenCarga()
		►◄ Sin parametros de entrada o salida

		📖 Ejemplo:	imagenCarga();
		
		Requisitos:
			• Es necesario activar antes la función iniciarConfiguraciónGIFCarga()
				en la parte de Iniciar Jquery (arriba).

		NOTA:
			1. (1 vez) Requiere ejecutar antes la función iniciarConfiguraciónGIFCarga().
	
	INFO: Usa esta función para Activar o DesActivar la imagen gif de carga.
*/
imagenCarga = function(){
	// Obtención de datos
	var cargando	= $("#imagenCarga");
	var cargandoImg	= $("#ImagenCarga img")
	var estado		= $("#imagenCarga").data("estado");

	// Comprobar: Si se ha iniciado antes iniciarConfiguraciónGIFCarga()
	if( estado != true && estado != false){
		this.error("imagenCarga()", "", "", "Se requiere iniciar antes el método <u> iniciarConfi</u>g<u>uraciónGIFCar</u>g<u>a() </u>");}

	else {
		// Desactivar cargando
		if(estado) {
			cargando.data("estado", false);
			// apagando
			$("#imagenCarga, #imagenCarga img").animate({
				opacity: 0
			}, 1000, function() {
				cargando.css("width", "0%")
					.css("height", "0%");
				cargandoImg.css("min-width", "0px");
			});}
		
		// Activar cargando
		else {
			cargando.data("estado", true);
			cargando.css("width", "100%")
				.css("height", "100%");
			cargandoImg.css("min-width", "100px");
			// iniciando
			$("#imagenCarga, #imagenCarga img").animate({
				opacity: 1
			}, 1500, function() {
			});
		}
	}
};

/* ✪ alertArray( [arrayDatos], titulo )
		► [arrayDatos]	▬ (Array)	Array de los datos (no es una matriz).
		return			▬ (Alert)	Devuelve el Array en un alert().

		📖 Ejemplo:	imagenCarga( [0, "valor2", true, -2.3] );
	
	INFO: Muestra en un alert() la información que contiene la array.
	
	✪ Sobrecarga: alertArray( [arrayDatos], titulo )
		► [arrayDatos]	▬ (Array)	Array de los datos (no es una matriz).
		► titulo		▬ (String)	Título para el array.
		return			▬ (Alert)	Devuelve el Array en un alert().
		
		📖 Ejemplo:	imagenCarga( [0, "valor2", true, -2.3], "miTitulo" );
		
*/
alertArray	= function( arrayDatos, titulo ){
	
	// Sobrecarga function(arrayDatos)
	if( comprobarVariable(titulo, "undefined") ){
		titulo		= "";
	}
	
	// Comprobar: arrayDatos
	if( comprobarVariable(arrayDatos, "Array") == false ){
		this.error("alertArray(titulo, <u>arrayDatos</u>)",
			"arrayDatos", arrayDatos,
			"La variable no es un Array.");}
	
	// Parametros correctos
	else {
		// titulo
		var imprimir = titulo + "\n┌";
		
		// línea 1
		for( var x=1 ; x<titulo.length ; x++ ){
			imprimir = imprimir + "─";
		}
		
		// array
		if( arrayDatos.length>0 ){
			for( var x=0 ; x<arrayDatos.length ; x++ ){
				imprimir = imprimir +"\n│ "+ x +" [►"+ arrayDatos[x] +"◄]";
			}
		}
		
		// línea 2
		imprimir = imprimir +"\n└";
		for( var x=1 ; x<titulo.length ; x++ ){
			imprimir = imprimir + "─";
		}
		
		// alert final
		alert(imprimir);
	}
};

/* ✪ regla3( num, otroNum, maxOtroNum )
		► num			▬ (Número)	Numero que se quiere obtener el máximo.
		► otroNum		▬ (Número)	El otro numero que sabes el máximo.
		► maxOtroNum	▬ (Número)	El máximo del otro numero.
		◄ return		▬ (Número)	Devuelve el máximo del numero objetivo.

		📖 Ejemplo:	regla3(50, 500, 200);

		NOTA:
			• Si el máximo de 500 es 200.
				el máximo de 50 es 20.
	
	INFO: Formula de la regla de 3.
*/
regla3 = function(num, otroNum, maxOtroNum){
	// Comprobar: num
	if( comprobarVariable(num, "number") == false ){
		this.error("regla3(<u>num</u>, otroNum, maxOtroNum)",
			"num", num,
			"El primer parametro no es numérico.");}
	
	// Comprobar: otroNum
	else if( comprobarVariable(otroNum, "number") == false ){
		this.error("regla3(num, <u>otroNum</u>, maxOtroNum)",
			"otroNum", otroNum,
			"El segundo parametro no es numérico.");}
	
	// Comprobar: maxOtroNum
	else if( comprobarVariable(maxOtroNum, "number") == false ){
		this.error("regla3(num, otroNum, <u>maxOtroNum</u>)",
			"maxOtroNum", maxOtroNum,
			"El tercer parametro no es numérico.");}
	
	// Parametros correctos
	else {
		return num * maxOtroNum / otroNum;
	}
}

/* ✪ regla3_100( numero, numMax )
		► numero	▬ (Número)	Numero a comprobar.
		► numMax	▬ (Número)	Número maximo que sería el 100.
		◄ return	▬ (Número)	Resultado.

		📖 Ejemplo:	regla3_100(15, 30);

		NOTA:
			1. Solo dará el número y no el signo de porcentaje(%).
			2. regla_100(15, 30) dará 50%.
	
	INFO: Es la regla de 3 pero el resultado se dará a escala de 0 a 100.
*/
regla3_100 = function(numero, numMax){
	// Comprobar: numero
	if( comprobarVariable(numero, "number") == false ){
		this.error("regla3_100(<u>numero</u>, maximo)",
		"numero", numero,
		"El primer parametro no es numérico.");}
	
	else if( comprobarVariable(numMax, "number") == false ){
		this.error("regla3Porciento(<u>numMax</u>, numero)",
		"numMax", numMax,
		"El segundo no es numérico.");}
	
	else { return numero * 100 / numMax;}
};

// !! En proceso de mejora
alinearImagen = function(tagImagen){
	alinearImagen_Horizontal(tagImagen);
	alinearImagen_Vertical(tagImagen);
};

// !! En proceso de mejora
alinearImagen_Horizontal = function(tagImagen){
	var anchoImagen = tagImagen.outerWidth();
	var anchoPadre = tagImagen.parent().width();

	// Imagen más pequeña que el padre pequeña
	if( anchoPadre > anchoImagen ){
		var margenH = ((anchoPadre - anchoImagen) /2);

		tagImagen.css("margin-left", margenH +"px");
		tagImagen.css("margin-right", margenH +"px");
	}
};

// !! En proceso de mejora
alinearImagen_Vertical = function(tagImagen){
	var altoImagen = tagImagen.height();
	var altoPadre = tagImagen.parent().height();

	// Imagen más pequeña que el padre pequeña
	if( altoPadre > altoImagen ){
		var margenV = ((altoPadre - altoImagen) /2);

		tagImagen.css("margin-top", margenV +"px");
		tagImagen.css("margin-bottom", margenV +"px");
	}
};

/** Datos de Versiones

►	Versión: 3
	• Metodos actualizados:
		· comprobarVariable → Ahora tiene sobrecarga.
			1 parametro: devuelve de que tipo es "number", "string", etc.
			2 parametros: devuelve true o false.
			Los parametros han cambiado de lugar (no genera errores de anteriores versiones)
		
		· alertArray → Ahora tiene sobrecarga.
			1 parametro: imprime el array.
			2 parametros: imprime el array con un título.
		
		· error → Ahora tiene sobrecarga.
			Se ha cambiado el orden de los parametros.
			1 parametro: devuelve un mensaje.
			2 parametro: devuelve un mensaje y cabecera.
			4 parametro: devuelve un mensaje y cabecera + errores del valor.
		
		· nuevoAleatorio → renombrado a aleatorio()
	
	• Metodos creados:
		· aleatorio
			Cualquiera de los 2 parametros admite cualquier tipo de valor (numerico, boleano, etc.)
			El parametro 2 es opcional.
			Puede dar aleatorios de:
				1. Booleanos		(true / false)
				2. Numerico:
					1 parametro		(valor de 0 al parametro)
					2 parametros	(valor de parametro 1 al 2)
				3. String
					1 parametro		(devuelve 1 palabra)
					2 parametros	(devuelve un caracter y el parametro 2 será la longitud)
				4. Array			(valor del array aleatorio)
				5. null				(valor de 1 a 4)
				6. undefined		(valor de 1 a 9)

►	Versión: 2.4.1
	• Metodos eliminados:
		· activarDesactivar( etiqueta );
		· activarDesactivar_Forzar( etiqueta );
			· Pensaré una mejor forma para evitar
				que el parametro sea solo con JQuery.
	
	• Metodos actualizados:
		· imprimirArray → renombrado a alertArray.
	
	• Se ha cambiado la estructura de comentarios
		· Ahora se ponen encima de cada metodo

►	Versión: 2.3.2
	• Metodos creados:
		· getCookie.
		· setCookie.
		· remCookie.

►	Versión: 2.3.1
	• Mejorada la "interfaz" del documento.

►	Versión: 2.3
	• Metodos creados:
		· alinearImagen.
		· alinearImagen_Horizontal.
		· alinearImagen_Vertical.

◄	Versión: 2.2
	• Metodos creados:
		· activarDesactivar.
		· activarDesactivar_Forzar.

◄	Versión: 2.1
	• Control de errores.
	• Eliminada lafución error(param1, param2):
	No se pueden tener 2 con diferentes parametros

◄	Versión: 2.0
	• Control de errores.
	• añadidas las funciónes:
		1. imprimirArray
		2. error version reducida
		3. regla3 y regla3Porciento
		4. Nuevo gif de carga: Ahora solo es necesario activar y usar el metodo
	(ya se incluye el CSS y HTML necesarios)
	• Añadida la funcionalidad de Array a la función comprobarVariable
*/