﻿/**
	Metodos de ayuda versión: 5.3
	© Copyright 2061, JuanLu Corp.
*/
/* IMPORTANTE
	Existe una palabra clave "_i" que se puede pasar como primer parámetro para obtener una ayuda sobre esa función.
	Esta palabra clave puede ser modificada y cambiada a cualquier otra.
	IMPORTANTE: Cuidado al cambiar la palabra clave para que no coincida con el lenguaje de javaScript,
		jQuery o palabras clave de este script pués podrían distorsionar su funcionalidad.
		Ejemplo: si cambiar la palabra clave de información de "_i" a true no podrás usar ayuda.variables(true)
		Esto es debido al primer if que comprueva si has puesto la palabra clave y por ello evita pasar con normalidad por la función.
	
	La clase ayuda se llama abajo de este script: Es una variable cualquiera llamando a una clase;
*/
/* Propiedades
	_parametroInfo       : Argumento para pedir información sobre la función (puede cambiar) (predeterminado: _i)
	_resultado           : Almacena el último resultado.
	_error               : Almacena el último error.
	_errorTiempo         : Tiempo que tarda el error, mostrado por html, antes de desvanecerse.
	_errorTiempoOpacidad : Tiempo que tarda el error, mostrado por html, en desvanecerse.
	_errorEstilo         : Estilo CSS que tendrá el error al mostrarse.
	_cargandoImg         : ubicación de la imagen de carga.
*/
/* Get (obtener), Set (insertar), Rem (Eliminar)
Get:
	get_resultado            : Obtiene el resultado almacenado.
	get_error                : Obtiene el error almacenado.
	get_errorEstilo          : Obtiene el CSS del error o con un argumento se obtiene la busqueda.
	get_errorEstilo_toString : Obtiene el CSS del error en formato String.
	get_cookie               : Obtiene una cookie.
	get_cargandoImg          : Obtiene la dirección de la imagen cargando.
	get_parametroInfo        : Obtiene el argumento para obtener información sobre la función.

Set:
	set_resultado     : Inserta el resultado.
	set_error         : Inserta el error.
	set_errorEstilo   : Inserta o modifica un estilo de error HTML.
	set_cookie        : Inserta una cookie.
	set_cargandoImg   : Cambia la dirección de la imagen de carga.
	set_parametroInfo : Cambia la forma en la que se pide la información a la función.

Rem
	rem_errorEstilo : Elimina un estilo CSS del error HTML.
	rem_cookie      : Elimina un acookie añadiendo una fecha atrasada.
*/

/* Funciones
	NOTA: Si quieres saber como funciona la función llama a la función con el argumento "_i".
		Se mostrará la información por consola del navegador.
		La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
	
	Todas las funciones requieren de la versión 5.0
	error()
	variables()
	aleatorio()
	cargando()
	c()
	regla3()
*/

/* Datos y direcciones web
	Math.*	→ w3schools.com/js/js_math.asp
	Typeof	→ developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/typeof
	
	✪ No seleccionar HTML	→ <body onselectstart="return false"  ondragstart="return false">
	
	✪ Saber el botón pulsado del mouse: event.which (function(event))
		event.which == 1 → Botón Izquierdo
		event.which == 2 → Botón Central
		event.which == 3 → Botón Derecho
	
	✪ Detectar tecla	→ w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2
		event.which = 13	(Tecla Enter)
*/

// Si jQuery no existe: Se añade
if(typeof jQuery == "undefined"){
	var addJQuery	= document.createElement("script");
	addJQuery.src	= "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
	var cabeza = document.getElementsByTagName("head")[0].appendChild(addJQuery);
}

class Ayuda{
	constructor(){
		this._resultado				= "";	// Almacena el último resultado
		this._error					= "";	// Almacena el último error
		this._errorTiempo			= 3000;	// Siempo en milSegundos
		this._errorTiempoOpacidad	= 500;	// Tiempo en miliSegundos
		this._errorEstilo = {			// Estilos para el error por html
				"position"			: "fixed",
				"top"				: "0px",
				"right"				: "0px",
				
				"width"				: "auto",
				"max-width"			: "50%",
				
				"color"				: "rgba(169, 68, 66, 0.7)",
				"background-color"	: "rgba(242, 222, 222, 0.8)",
				"opacity"			: "0",
				
				"border"			: "solid 1px rgba(235, 205, 209, 0.8)",
				"padding"			: "15px",
				"margin"			: "15px 20px",
				
				"border-radius"		: "4px",
				
				"text-align"		: "justify",
				"font-family"		: "sans-serif",
				
				"transition"		: "linear opacity "+ (this._errorTiempoOpacidad / 1000) +"s"
		};
		this._cargandoImg			= "./Imgs/cargando.gif";
		this._parametroInfo			= "_i";
		this._ventanas = {
			"grande"	: 1200,
			"normal"	: 992,
			"pequeña"	: 768,
			"enana"		: 480,
			"diminuta"	: 0
		};
	}
	
	get_resultado()	{ return this._resultado; }
	get_error()		{ return this._error; }
	get_errorEstilo(){
		if( arguments.length == 0 ){
			return this._errorEstilo;
		} else {
			return this._errorEstilo[arguments[0]];
		}
	}
	get_errorEstilo_toString(){
		var estilos	= this._errorEstilo;
		var css	= "";
		for(var estilo in estilos){
			css	+= estilo +":"+ estilos[estilo] +";"
		}
		return css;
	}
	get_cookie(nombreCookie){
		if( this.variables(nombreCookie, "string") ){
			var nombre = nombreCookie +"=";
			var cookieArray = document.cookie.split(";");
			for( var i=0, c ; i<cookieArray[i] ; i++ ){
				c = cookieArray[i];
				
				while( c.charAt(0)==" " ){
					c = c.substring(1);
				}
				if( c.indexOf(nombre) == 0 ){
					return c.substring(nombre.length, c.length);
				}
			}
			// Si no encuentra la cookie lanzará un error
			this.error("La cookie \""+ nombreCookie +"\" no existe");
		}
	}
	get_cargandoImg()	{ return this._cargandoImg; }
	get_parametroInfo()	{ return this._parametroInfo; }
	get_ventanas()		{ return this._ventanas; }
	
	set_resultado(resultado)			{ this._resultado	= resultado;			return this; }
	set_error(error)					{ this._error		= error;				return this; }
	set_errorEstilo(estilo, propiedad)	{ this._errorEstilo[estilo] = propiedad;	return this; }
	set_cookie(nombre, valor){
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.set_cookie(nombre, valor)\n"+
				"\n"+
				"▼ Información:\n"+
				"Esta función sirve para almacenar cookies en el navegador web.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"Es necesario 1 argumento.\n"+
				"1r Argumento	: Es el nombre que recibirá la nueva cookie\n"+
				"2º Argumento	: Es el valor que tendrá la cookie.\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"ayuda.set_cookie(\"miCookie\", \"valorCookie\").\n"+
				"ayuda.set_cookie(\"miCookie\", 14)."
			);
		} else {
			if( this.variables(nombre, "string") ){
				document.cookie = nombre +"="+ valor;
			} else {
				this.error("La primera variable debe ser de tipo string", "set_cookie("+ arguments[0] +"("+ this.variables(arguments[0]) +"), "+ arguments[1] +"("+ this.variables(arguments[1]) +"))", "html");
			}
			return this;
		}
	}
	set_cargandoImg(ruta){
		if( this.variables(ruta, "string") ){
			this._cargandoImg = ruta;
		} else {
			this.error("Para cambiar la ruta de la imagen debes añadir una dirección en formato String. Detectado: "+ this.variables(ruta), "set_cargandoImg("+ ruta +")");
		}
		return this;
	}
	set_parametroInfo(){ this._parametroInfo = arguments[0]; return this; }
	set_ventana(){
		if( arguments[0] == this.get_parametroInfo() ){
			console.clear();
			this.c(
				"Información sobre: ayuda.ventana(nuevaVentana, anchura)\n"+
				"\n"+
				"▼ Información:\n"+
				"Esta función sirve para añadir más ventanas y asignarle un ancho.\n"+
				"Cada ventana tiene su número.\n"+
				"get_ventana() Te dará una ventana igual o mayor a la anchura que cumpla con el ancho de la ventana actual del navegador.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"2 Argumentos.\n"+
				"Primer argumento (String): Será el nombre que se le dará a la nueva ventana o sustituirá la existente.\n"+
				"Segundo argumento (Number): Se asignará este ancho de ventana al nombre que se haya puesto en el primer argumento.\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"Ejemplo	: Resultado\n"+
				"ayuda.set_ventana(\"grande\", 1000)	: La ventana \"grande\" ahora tiene asignado 1000px.\n"+
				"ayuda.set_ventana(\"muy grande\", 1500)	: La ventana \"muy grande\" ahora tiene asignado 1500px."
			);
		} else {
			// Parametros: String y Number
			if( this.variables(arguments[0], "texto") && this.variables(arguments[1], "number") ){
				this._ventanas[arguments[0]] = arguments[1];
			
			// Tipo de los parámetros incorrecto
			} else {
				this.error("Para insertar una nueva ventana se necesitan 2 parámetros: Nombre de la ventana(String) y tamaño(Number)", "set_ventana(String, Number)");
			}
		}
		return this;
	}
	
	rem_errorEstilo(estilo)	{ delete this._errorEstilo[estilo];	return this;}
	rem_cookie(){
		if( arguments[0] == this.get_parametroInfo() ){
			console.clear();
			this.c(
				"Información sobre: ayuda.rem_cookie(nombre)\n"+
				"\n"+
				"▼ Información:\n"+
				"Elimina las cookies que se hayan solicitado.\n"+
				"Añade tantos parametros como cookies quieras eliminar.\n"+
				"Si la cookie no se ha podido eliminar se motrará un mensaje por la consola del navegador.\n"+
				"Para eliminarla a la cookie se le inserta una fecha de caducidad antigua.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"0 Argumentis: No eliminará nada\n"+
				"1 a infinitos argumentos: Elimina las cookies que se le hayan pedido.\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"Ejemplo	: Resultado\n"+
				"ayuda.rem_cookie(\"miCookie\", \"miCookie2\", \"mi cookie3\", \"micookie4\")	: Eliminará las cookies miCookie, miCookie2, mi cookie3 y micookie4."
			);
		} else {
			var todosStrings = true;
			for( var i=0 ; i<arguments.length ; i++ ){
				if( this.variables(arguments[i], "string") ){
					document.cookie = arguments[i] +"=; expires=Thu, 11 Jan 1992 00:00:00 UTC";
				} else {
					this.error("Para eliminar la cookie '"+ arguments[i] +"' pon el nombre de la cookie en formato string", "Se necesita el nombre de la cookie");
				}
			}
		}
		return this;
	}
	rem_ventana(){ delete this._ventanas[arguments[0]]; return this; }
	
	error(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if( arguments[0] == this.get_parametroInfo() ){
			console.clear();
			this.c(
				"Información sobre: ayuda.error(medio, titulo, mensaje)\n"+
				"\n"+
				"▼ Información:\n"+
				"Esta función sirve para informar sobre un error.\n"+
				"Puede mostrar el error por 3 medios: HTML, Alert, Cosole.\n"+
				"HTML: Mostrará un mensaje por html que luego se irá.\n"+
				"Alert: Mostrará el error mediante alert().\n"+
				"Console: Mostrará un error mediante la consola del navegador console.error().\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"Admite de 0 hasta 3 argumentos.\n"+
				"Puede ser cualquier tipo de dato para el Mensaje y el Título.\n"+
				"Palabras clave: \"html\", \"alert\", \"console\".\n"+
				"Las palabras clave son de tipo String y no importa si es mayúsculas y minúsculas\n"+
				"Las palabras clave pueden estár en cualquiera de las 3 posiciones.\n"+
				"0 Argumentos	: Error simple.\n"+
				"1 Argumento	: Mensaje personalizado por consola o Mensaje simple mediante una palabra clave.\n"+
				"2 Argumentos	: Título y mensaje del error o Mensaje y palabra clave\n"+
				"3 Argumentos	: Título, Mensaje y palabra clave\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"Ejemplo	: Resultado\n"+
				"ayuda.error()	: Error simple por consola.\n"+
				"ayuda.error(\"console\")	: Error simple por consola.\n"+
				"ayuda.error(\"alert\")	: Error simple mediante Alert.\n"+
				"ayuda.error(\"html\")	: Error simple por HTML.\n"+
				"ayuda.error(Mensaje)	: Mensaje de error porsonalizado por consola.\n"+
				"ayuda.error(\"HtMl\", Mensaje)	: Error personalizado y donde se mostrará.\n"+
				"ayuda.error(Titulo, Mensaje)	: Título + Mensaje Personalizados.\n"+
				"ayuda.error(Título, \"conSole\", Mensaje)	: Título + Mensaje + Palabra clave."
			);
		} else {
			// 0 Argumentos: Predeterminado
			if( arguments.length == 0 ){
				console.error("%c¡Error! Encontrado un error. ",
				"color:#bf0202;border-radius:3px 8px 5px 3px;border-right: solid 1px #fe4040;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
				this.set_error("¡Error! Encontrado un error.");
			
			// 1 Argumento: Mensaje
			} else if( arguments.length == 1 ){
				
				if( this.variables(arguments[0], "string") ){
					var argumMinus = arguments[0].toLowerCase();
					
					// Console
					if( argumMinus == "console" ){
						console.error("%c¡Error! Encontrado un error. ",
						"color:#bf0202;border-radius:3px 8px 5px 3px;border-right: solid 1px #fe4040;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
						this.set_error("¡Error! Encontrado un error.");
					
					// Alert
					} else if( argumMinus == "alert" ){
						alert("¡Error! Encontrado un error.");
						this.set_error("¡Error! Encontrado un error.");
					
					// HTML
					} else if( argumMinus == "html" ){
						// Añadir HTML
						$("body").append(
							"<p class=\"ayuda_error\" style=\""+ this.get_errorEstilo_toString() +"\">"
							+	"<span style=\"font-weight:bold;\">¡Error!</span> Encontrado un error."
							+"</p>"
						);
						this.set_error("¡Error! Encontrado un error.");
						
						// Añadir estado
						$("body .ayuda_error:last-of-type").data("estado", "mostrar");
						
						// Mostrar mensaje
						setTimeout(function(){
							$(".ayuda_error:last-of-type").css("opacity", "1");
						}, 0);
						
						// Ocultar mensaje
						setTimeout(function(){
							var encontrado = "no";	// Evita modificar los coincidentes
							
							$(".ayuda_error").each(function(){
								if( $(this).data("estado") == "mostrar" && encontrado == "no" ){
									encontrado = "si";
									$(this)
										.data("estado", "ocultar")
										.css("opacity", "0");
								}
							});
						}, (this._errorTiempoOpacidad + this._errorTiempo));
						
						// Elimina el html cuando acaba la transición (css)
						// Por defecto 1s
						setTimeout(function(){
							var encontrado = "no";
							$(".ayuda_error").each(function(){
								if( $(this).data("estado") == "ocultar" && encontrado == "no" ){
									encontrado = "no";
									$(this).remove();
								}
							});
						}, (this._errorTiempoOpacidad + 100 + this._errorTiempo + this._errorTiempoOpacidad));
						this.set_error("¡Error! Encontrado un error.");
					
					// Mensaje - String
					} else {
						console.error("%c¡Error! "+ arguments[0] +". ",
						"color:#bf0202;border-radius:3px 8px 5px 3px;border-right: solid 1px #fe4040;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
						this.set_error("¡Error! "+ arguments[0] +".");
					}
				
				// Mensaje - No String
				} else {
					console.error("%c¡Error! "+ arguments[0] +". ",
					"color:#bf0202;border-radius:3px 8px 5px 3px;border-right: solid 1px #fe4040;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
					this.set_error("¡Error! "+ arguments[0] +".");
				}
			
			// 2 Argumentos: Mensaje y Título|Tipo
			} else if( arguments.length == 2 ){
				// Saber el tipo de salida
				var salida = {
					"tipo"		: "predeterminado",
					"mensaje"	: ""
				};
				
				// Saber si ha puesto una salida
				for( var i=0 ; i<arguments.length ; i++ ){
					if( this.variables(arguments[i], "string") ){
						switch(arguments[i].toLowerCase()){
							case "html":
							case "console":
							case "alert":
							salida["tipo"] = arguments[i].toLowerCase();
						}
						if( salida["tipo"] != "predeterminado" ){
							salida["mensaje"] = ( i == 0 )? arguments[1] : arguments[0];
							break;
						}
					}
				}
				
				// Mensaje + Console
				if( salida["tipo"] == "console"  ){
					console.error("%c¡Error! "+ salida["mensaje"] +". ",
					"color:#bf0202;border-radius:3px 8px 5px 3px;border-right: solid 1px #fe4040;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
					this.set_error("¡Error! "+ salida["mensaje"] +".");
				
				// Mensaje + Alert
				} else if( salida["tipo"] == "alert" ){
					alert("¡Error! "+ salida["mensaje"]);
					this.set_error("¡Error! "+ salida["mensaje"] +".");
				
				// Mensaje + HTML
				} else if( salida["tipo"] == "html" ){
					// Añadir HTML
					$("body").append(
						"<p class=\"ayuda_error\" style=\""+ this.get_errorEstilo_toString() +"\">"
						+	"<span style=\"font-weight:bold;\">¡Error!</span> "+ salida["mensaje"] +"."
						+"</p>"
					);
					this.set_error("¡Error! "+ salida["mensaje"] +".");
					
					// Añadir estado
					$("body .ayuda_error:last-of-type").data("estado", "mostrar");
					
					// Mostrar mensaje
					setTimeout(function(){
						$(".ayuda_error:last-of-type").css("opacity", "1");
					}, 0);
					
					// Ocultar mensaje
					setTimeout(function(){
						var encontrado = "no";	// Evita modificar los coincidentes
						
						$(".ayuda_error").each(function(){
							if( $(this).data("estado") == "mostrar" && encontrado == "no" ){
								encontrado = "si";
								$(this)
									.data("estado", "ocultar")
									.css("opacity", "0");
							}
						});
					}, (this._errorTiempoOpacidad + this._errorTiempo));
					
					// Elimina el html cuando acaba la transición (css)
					// Por defecto 1s
					setTimeout(function(){
						var encontrado = "no";
						$(".ayuda_error").each(function(){
							if( $(this).data("estado") == "ocultar" && encontrado == "no" ){
								encontrado = "si";
								$(this).remove();
							}
						});
					}, (this._errorTiempoOpacidad + 100 + this._errorTiempo + this._errorTiempoOpacidad));
				
				// Título + Mensaje
				} else {
					console.error("%c"+ arguments[0] +"\n"+ arguments[1] +". ",
					"color:#bf0202;border-radius:3px 8px 5px 3px;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
					this.set_error(arguments[0] +": "+ arguments[1] +".");
				}
			
			// 3 Argumentos: Tipo + Título + Mensaje
			} else if( arguments.length == 3 ){
				var datos = [arguments[0], arguments[1], arguments[2]];
				// Saber el tipo de salida
				var salida = "predeterminado";
				
				// Saber si ha puesto una salida
				for( var i=0 ; i<datos.length ; i++ ){
					if( this.variables(arguments[i], "string") ){
						switch( datos[i].toLowerCase() ){
							case "html":
							case "console":
							case "alert":
							salida = datos[i].toLowerCase();
							datos.splice(i, 1);
						}
					}
				}
				
				// Alert + Título + Mensaje
				if( salida == "alert" ){
					alert("¡"+ datos[0] +"!\n"+ datos[1] +".");
				
				// HTML + Título + Mensaje
				} else if( salida == "html" ){
					// Añadir HTML
					$("body").append(
						"<div class=\"ayuda_error\" style=\""+ this.get_errorEstilo_toString() +"\">"
						+	"<div style=\"font-weight:bold;width:100%;border-bottom:"+ this.get_errorEstilo("border") +";padding-bottom:5px;margin-bottom:5px;text-align:center;\">¡"+ datos[0] +"!</div> "+ datos[1] +"."
						+"</div>"
					);
					
					// Añadir estado
					$("body .ayuda_error:last-of-type").data("estado", "mostrar");
					
					// Mostrar mensaje
					setTimeout(function(){
						$(".ayuda_error:last-of-type").css("opacity", 1);
					}, 0);
					
					// Ocultar mensaje
					setTimeout(function(){
						var encontrado = "no";	// Evita modificar los coincidentes
						
						$(".ayuda_error").each(function(){
							if( $(this).data("estado") == "mostrar" && encontrado == "no" ){
								encontrado = "si";
								$(this)
									.data("estado", "ocultar")
									.css("opacity", "0");
							}
						});
					}, (this._errorTiempoOpacidad + this._errorTiempo));
					
					// Elimina el html cuando acaba la transición (css)
					// Por defecto 1s
					setTimeout(function(){
						var encontrado = "no";
						$(".ayuda_error").each(function(){
							if( $(this).data("estado") == "ocultar" && encontrado == "no" ){
								encontrado = "si";
								$(this).remove();
							}
						});
					}, (this._errorTiempoOpacidad + 100 + this._errorTiempo + this._errorTiempoOpacidad));
					
				// Console + Título + Mensaje
				} else {
					console.error("%c¡"+ datos[0] +"!\n"+ datos[1] +". ",
					"color:#bf0202;border-radius:3px 8px 5px 3px;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
				}
				
				this.set_error(datos[0] +": "+ datos[1]);
			}
			
		}
		return this;
	}
	
	variables(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.variables()\n"+
				"\n"+
				"▼ Información:\n"+
				"Esta función sirve para comprovar variables.\n"+
				"Puede devolver el tipo de la variable o comparar variables\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"Admite de 0 a infinitos argumentos.\n"+
				"Admite cualquier tipo de dato.\n"+
				"0 Argumentos	: Es como si pusieses undefined.\n"+
				"1 Argumento	: Obtiene el tipo del argumento en formato String y minúscula.\n"+
				"2 Argumentos o más	: Devuelve true si todos los argumentos son del mismo tipo.\n"+
				"Las Palabras clave son el tipo de variables pero en formato String.\n"+
				"Aunque las palabras clave son String emularán su tipo: La palabra clave \"number\" se usará como un número cualquiera.\n"+
				"Palabras clave: \"Undefined\", \"Null\", \"Boolean\", \"String\", \"Number\", \"NaN\", \"Infinity\", \"Array\\n"+
				+", \"Object\", \"Function\" y \"Class\".\n"+
				"Las palabras clave deben ser de tipo String, no impoerta si es mayúsculas o minúsculas o combinado de ellas.\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"Ejemplo	: Resultado\n"+
				"ayuda.variables()	: \"undefined\".\n"+
				"ayuda.variables(false)	: \"boolean\".\n"+
				"ayuda.variables(0/5)	: \"infinity\".\n"+
				"ayuda.variables({\"myObject\":13})	: \"object\".\n"+
				"ayuda.variables(ayuda)	: \"class\".\n"+
				"ayuda.variables(\"number\")	: \"number\".\n"+
				"ayuda.variables(\"funCtioN\")	: \"function\".\n"+
				"ayuda.variables(\"nAn\")	: \"nan\".\n"+
				"ayuda.variables(true, \"boolean\")	: true.\n"+
				"ayuda.variables(Math.PI, \"Number\", -302)	: true.\n"+
				"ayuda.variables(13, \"13\")	: \"false\".\n"+
				"ayuda.variables(\"strING\", \"13\")	: true.\n"+
				"ayuda.variables(\"strING\", \"13\", \"String\", \"Lorem Ipsum\")	: true.\n"+
				"ayuda.variables(\"strING\", \"13\", \"String\", \"Lorem Ipsum\", \"boolean\")	: false."
			);
		} else {
			// 0 Argumentos: Undefined
			if( arguments.length == 0 ){
				this.set_resultado(undefined);
				return "undefined";
			
			// 1 Argumento: Saber el tipo de variable
			} else if(arguments.length == 1){
				// String
				if( typeof arguments[0] == "string" ){
					// Palabras clave
					switch(arguments[0].toLowerCase()){
						case "string"		: this.set_resultado("string");		return "string";
						case "boolean"		: this.set_resultado("boolean");	return "boolean";
						case "undefined"	: this.set_resultado("undefined");	return "undefined";
						case "null"			: this.set_resultado("null");		return "null";
						case "nan"			: this.set_resultado("nan");		return "nan";
						case "infinity"		: this.set_resultado("infinity");	return "infinity";
						case "number"		: this.set_resultado("number");		return "number";
						case "array"		: this.set_resultado("array");		return "array";
						case "object"		: this.set_resultado("object");		return "object";
						case "function"		: this.set_resultado("function");	return "function";
						case "class"		: this.set_resultado("class");		return "class";
					}
					
					this.set_resultado("string");	return "string";
				
				// Boolean
				}
				else if( typeof arguments[0] == "boolean" ){
					this.set_resultado("boolean");	return "boolean";
				
				// Undefined
				} else if( arguments[0] === undefined ){
					this.set_resultado("undefined");	return "undefined";
				
				// Null
				} else if( arguments[0] === null ){
					this.set_resultado("null");	return "null";
				
				// Array
				} else if( (arguments[0] instanceof Array) ){
					this.set_resultado("array");	return "array";
				
				// Class
				} else if( arguments[0].constructor.toString().substr(0, 5) == "class" ){
					this.set_resultado("class");	return "class";
				
				// Object
				} else if( typeof arguments[0] == "object" ){
					this.set_resultado("object");	return "object";
				
				// Function
				} else if( typeof arguments[0] == "function" ){
					this.set_resultado("function");	return "function";
				
				// NaN
				} else if( isNaN(arguments[0]) ){
					this.set_resultado("nan");	return "nan";
				
				// Infinity
				} else if( arguments[0] == Infinity ){
					this.set_resultado("infinity");	return "infinity";
				
				// Number
				} else if( typeof arguments[0] == "number" ){
					this.set_resultado("number");	return "number";
				}
			
			// 2 o más Argumentos
			} else {
				for( var i=0 ; i<(arguments.length - 1) ; i++ ){
					for( var j=(i+1) ; j<arguments.length ; j++ ){
						if( this.variables(arguments[i]) !== this.variables(arguments[j]) ){
							this.set_resultado(false);	return false;
						}
					}
				}
				this.set_resultado(true);	return true;
			}
			this.error("Se ha recibido alguna variable que no está en la lista, por favor informa de la nueva variable", "ayuda.variables(dato no encontrado)", "html");
			this.set_resultado("[► XXX ◄]");	return "[► XXX ◄]";
		}
	}
	
	aleatorio(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.aleatorio()\n"+
				"\n"+
				"▼ Información:\n"+
				"Esta función sirve para obtener un aleatorio.\n"+
				"Esta función devuelve un aleatorio dependiendo de lo recibido como argumentos.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"Admite de 0 a infinitos argumentos.\n"+
				"Admite cualquier tipo de dato.\n"+
				"0 Argumentos	: Devuelve un número del 0 al 100.\n"+
				"1 Argumento	: Obtiene un aleatorio según el tipo del argumento.\n"+
				"2 Argumentos (especiales): Es si los 2 argumentos són numéricos o si uno es string y el otro numérico.\n"+
				"Si son 2 argumentos numéricos devolverá un número entre esos 2 números (incluyen los negativos).\n"+
				"Si el primer argumento es String y el otro numérico devolverá un String y su longitud del string será el número obtenido.\n"+
				"2 Argumentos o más (sin especiales): Se obtendrá un argumento aleatorio\n"+
				"\n"+
				"▼ Ejemplos teóricos:\n"+
				"Ejemplo	: Resultado\n"+
				"1 Argumento\n"+
				"Undefined devolverá un número entre 0 y 100 (1 argumento undefined o sin argumentos)\n"+
				"null, NaN, Infinity, function y class devolverán un número entre 0 y 10\n"+
				"Boolean	: true o false\n"+
				"Number	: 0 al numero\n"+
				"Array	: Devolverá un dato del array.\n"+
				"String	: Devolverá una palabra del String.\n"+
				"Object	: Devolverá un dato del objeto\n"+
				"2 Argumentos (especiales)\n"+
				"2 Números: ayuda.aleatorio(16, -17)	: Devuelve un número entr -17 y 16\n"+
				"String y Number: ayuda.aleatorio(\"Frase de prueba\", 5)	: Devolverá una cadena de la frase con longitud máxima de 5 carácteres.\n"+
				"Ejemplos: \"rase \", \"prueb\", \"eba\", \"se de\", \"ueba\"\n"+
				"2 Argumentos o más (no especiales)\n"+
				"Devuelve un argumento aleatorio"
			);
		} else {
			// Recorrer los argumentos pasados
			for( var i=0 ; i<arguments.length ; i++ ){
				// Quitar los espacios extra si me pasan un string
				if( this.variables(arguments[i], "string") ){
					// Crea un array con las palabras
					var palabras = arguments[i].split(" ");
					
					// Elimina los huecos vacíos extra del array
					for( var j=(palabras.length -1) ; j>=0 ; j-- ){
						// Si hay un hueco vacío lo elimina
						if( palabras[j] == "" ){ palabras.splice(j, 1); }
					}
					
					// restaura la frase
					arguments[i] = palabras.join(" ");
				}
			}
			
			// 0 Argumento e Indefinido
			if( arguments.length == 0
				|| arguments.length == 1 && this.variables(arguments[0], undefined) ){
					this.set_resultado(parseInt(Math.round(Math.random() * ((100 - 0 +1) - 1) + 0)));
				return this.get_resultado();
			
			// 1 Argumento
			} else if( arguments.length == 1 ){
				// Null, NaN, Infinity, function, class
				if( this.variables(arguments[0],	null)
					|| this.variables(arguments[0],	NaN)
					|| this.variables(arguments[0],	Infinity)
					|| this.variables(arguments[0],	"function")
					|| this.variables(arguments[0],	"class")
				){
					this.set_resultado(parseInt(Math.round(Math.random() * ((10 - 0 +1) - 1) + 0)));
					return this.get_resultado();
				
				// Boolean
				} else if( this.variables(arguments[0], "boolean") ){
					this.set_resultado((parseInt(Math.round(Math.random() * ((2 - 1 +1) - 1) + 1)) == 1) ? true : false);
					return this.get_resultado();
				
				// Number
				} else if( this.variables(arguments[0], "number") ){
					this.set_resultado(parseInt(Math.round(Math.random() * ((arguments[0] - 0 +1) - 1) + 0)));
					return this.get_resultado();
				
				// Array
				} else if( this.variables(arguments[0], "array") ){
					var aleatorio	= parseInt(Math.round(Math.random() * (((arguments[0].length -1) - 0 +1) - 1) + 0));
					this.set_resultado(arguments[0][aleatorio]);
					return this.get_resultado();
				
				// String
				} else if( this.variables(arguments[0], "string") ){
					// Crea un array con las palabras
					var palabras	= arguments[0].split(" ");
					var aleatorio	= parseInt(Math.round(Math.random() * (((palabras.length -1) - 0 +1) - 1) + 0));
					
					// Devuelve la palabra aleatoria
					this.set_resultado(palabras[aleatorio]);
					return this.get_resultado();
				
				// Object
				} else if( this.variables(arguments[0], "object") ){
					// obtiene la cantidad de datos dentro del objeto
					var arr	= [];
					
					// Itera el objeto
					for( var dato in arguments[0] ){
						arr.push(arguments[0][dato]);
					}
					
					// se llama a si mismo (this.aleatorio) pero esta vez es un array de objetos por lo que irá al aleatorio de array y no de objeto
					return this.aleatorio(arr);
				}
			
			// 2 Argumentos (especiales)
			} else if( arguments.length == 2 ){
				// Number
				if( this.variables("number", arguments[0], arguments[1]) ){
					this.set_resultado(parseInt(Math.round(Math.random() * ((arguments[1] - arguments[0] +1) - 1) + arguments[0])));
					return this.get_resultado();
				
				// String y Number
				} else if( this.variables(arguments[0], "string") && this.variables(arguments[1], "number") ){
					var aleatorio;
					aleatorio	= parseInt(Math.round(Math.random() * (((arguments[0].length -1) - 0 +1) - 1) + 0));
					this.set_resultado(arguments[0].substr(aleatorio, arguments[1]));
					return this.get_resultado();
				}
			
			}
			// Devuelve el aleatorio de un argumento aleatorio
			this.set_resultado(this.aleatorio(arguments[this.aleatorio(0, arguments.length)]));
			return this.get_resultado();
		}
	}
	
	cargando(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.cargando()\n\n"+
				"\n\n"+
				"▼ Información:\n\n"+
				"Cada vez que se llama a la función muestra una imagen de carga o la quita.\n\n"+
				"\n\n"+
				"▼ Argumentos: No se usan argumentos exceptuando la información de la función\n\n"+
				"\n\n"+
				"▼ Ejemplos: Simplemente llama a ayuda.cargando()"
			);
		} else {
			// Cargar el html
			if( $("body #ayuda_cargando_estilo").length == 0 ){
				// Estilo
				$("body").append(
					"<style id=\"ayuda_cargando_estilo\">"
					+	"#ayuda_cargando{"
					+		"position:fixed;"
					+		"z-index:100;"
							
					+		"width:100%;"
					+		"height:100%;"
							
					+		"background-color:rgba(255, 255, 255, 0.3);"
							
					+		"animation:blinker 1s linear infinite;"
					+	"}"
					+	"@keyframes blinker{50%{opacity:0.5;}}"
					+	"#ayuda_cargando img{"
					+		"position:fixed;"
					+		"top:40%;"
					+		"left:40%;"
					+		"border-radius:100%;"
							
					+		"width:20%;"
					+		"min-width:0px;"
					+		"max-width:200px;"
					+	"}"
					+"</style>"
				)
				.prepend(
					"<div id=\"ayuda_cargando\">"
					+	"<img src=\""+ this.get_cargandoImg() +"\"/>"
					+"</div>"
				);
				
				$("body #ayuda_cargando").data("estado", false);
			}
			
			var cargando	= $("#ayuda_cargando");
			var cargandoIMG	= $("#ayuda_cargando img");
			var estado = cargando.data("estado");
			
			// Activado → desactivar
			if(estado){
				cargando.data("estado", false);
				
				// Apagando
				$("#ayuda_cargando, ayuda_cargando img").animate({
					opacity: 0
				}, 1000, function(){
					cargando
						.css("width",	"0%")
						.css("height",	"0%")
					;
					cargandoIMG
						.css("min-width", "0px")
						.css("width", "0%")
					;
				});
				
			// Desactivado → activando
			} else {
				cargando
					.data("estado",	true)
					.css("width",	"100%")
					.css("height",	"100%")
				;
				cargandoIMG
					.css("min-width", "100px")
					.css("width", "40%")
				;
				// Encendiendo
				$("#ayuda_cargando, ayuda_cargando img").animate({
					opacity: 1
				}, 1500, function(){});
			}
		}
		return this;
	}
	
	c(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.c()\n"+
				"\n"+
				"▼ Información:\n"+
				"Es lo mismo que console.log() pero con un estilo de colores diferente.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"Admite de 0 a infinitos argumentos de cualquier tipo.\n"+
				"Si es solo 1 argumento tendrá un color de fuente diferente según el tipo argumento (no afecta a los valores).\n"+
				"Si es solo 1 array se mostrará de forma diferente\n"+
				"Si es true mostrará el true de color verde\n"+
				"Si es false mostrará el false de color rojo, etc."
			);
		} else {
			// Sin argumento
			if( arguments.length == 0 ){
				console.log("%c ",
				"color:black;background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-left: solid 5px #1616bc;margin-left: 3px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
				
			// 1 Argumento
			} else if( arguments.length == 1 ){
				tipo = this.variables(arguments[0]);
				
				// Array
				if( tipo == "array" ){
					var imprimir	= "Array ";
					var espacio		= " ";
					
					// Array
					if( arguments[0].length>0 ){
						for( var x=0 ; x<arguments[0].length ; x++ ){
							imprimir += "\n" +"│ ";
							
							for( var y=0 ; y<(((arguments[0].length -1) +"").length - (x +"").length) ; y++ ){
								imprimir += espacio;
							}
							
							imprimir += x +" [►"+ arguments[0][x] +"◄]";
						}
					}
					
					// Línea final
					imprimir += "\n" +"└────────";
					console.log("%c"+ imprimir +" ",
					"background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-right: solid 1px #1616bc;border-left: solid 5px #1616bc;margin-left: 3px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
				
				// Object
				} else if(tipo == "object"){
					var imprimir	= "Object ";
					var espacio		= " ";
					
					// Calcular longitud
					var longitud = 0;
					for( var dato in arguments[0] ){
						longitud++;
					}
					// Objeto
					if( longitud > 0 ){
						var x=-1;
						for( var dato in arguments[0] ){
							x++;
							imprimir += "\n" +"│ ";
							
							for( var y=0 ; y<(((longitud -1) +"").length - (x +"").length) ; y++ ){
								imprimir += espacio;
							}
							
							imprimir += x +" [►{\""+ dato +"\": "+ arguments[0][dato] +"}◄]";
						}
					}
					
					// Línea final
					imprimir += "\n" +"└────────";
					console.log("%c"+ imprimir +" ",
					"background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-right: solid 1px #1616bc;border-left: solid 5px #1616bc;margin-left: 3px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
					
				} else {
					extra = "";
					// Actualizar color según el tipo de dato
					var color =	(tipo	== "undefined")?	"gray"
						:	(tipo	== "boolean")?		((arguments[0])? "green": "red")
						:	(tipo	== "null")?			"darkmagenta"
						:	(tipo	== "number")?		"blue"
						:	(tipo	== "nan")?			"blueviolet"
						:	(tipo	== "infinity")?		"darkblue"
						:	"black";
					
					// Actualizar negrita según el tipo de dato
					switch(tipo){
						case "undefined":;
						case "boolean":;
						case "null":;
						case "number":;
						case "nan":;
						case "infinity": extra = "font-weight:bold;";
					}
					console.log("%c"+ arguments[0] +" ",
					"color:"+ color +";"+ extra +"background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-right: solid 1px #1616bc;border-left: solid 5px #1616bc;margin-left: 3px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
				}
			
			// 2 o más Argumentos
			} else {
				for( var i=0, extra, color, tipo ; i<arguments.length ; i++ ){
					// Obtener el tipo de dato
					tipo = this.variables(arguments[i]);
					extra = "";
					
					// Actualizar color según el tipo de dato
					color =	(tipo	== "undefined")?	"gray"
						:	(tipo	== "boolean")?		((arguments[i])? "green": "red")
						:	(tipo	== "null")?			"darkmagenta"
						:	(tipo	== "number")?		"blue"
						:	(tipo	== "nan")?			"blueviolet"
						:	(tipo	== "infinity")?		"darkblue"
						:	"black";
					
					// Actualizar negrita según el tipo de dato
					switch(tipo){
						case "undefined":;
						case "boolean":;
						case "null":;
						case "number":;
						case "nan":;
						case "infinity": extra = "font-weight:bold;";
					}
					
					// Imprimir
					if( i == 0 ){
						console.log("%c"+ arguments[i] +" ",
						"color:"+ color +";"+ extra +"background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-left: solid 5px #1616bc;margin-left: 3px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
					} else if( i == arguments.length - 1 ){
						console.log("%c"+ arguments[i] +" ",
						"color:"+ color +";"+ extra +"background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-right: solid 1px #1616bc;margin-left: 8px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
					} else {
						console.log("%c"+ arguments[i] +" ",
						"color:"+ color +";"+ extra +"background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;margin-left: 8px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
					}
				}
			}
		}
		return this;
	}
	
	regla3(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.regla3()\n"+
				"\n"+
				"▼ Información:\n"+
				"Es la típica regla de 3.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"Admite de 2 a 3 argumentos, todos de tipo numérico.\n"+
				"Supongamos esta estratégia:\n"+
				"x1 → y1\n"+
				"x2 → ?\n"+
				"Si x1 es y1 cuanto será x2\n"+
				"Y la regla de 3 sería x2 * y1 / x1 y el resultado sería ?\n"+
				"2 Argumentos\n"+
				"Con la extrategia anterior y1 sería el número 100\n"+
				"el primer argumento es x1 y el segundo argumento es x2\n"+
				"3 Argumentos\n"+
				"Si cogemos el ejemplo anterior el número anterior es modificable\n"+
				"Primer argumento: x1\n"+
				"Segundo argumento: y1\n"+
				"Tercer argumento: x2\n"+
				"▼ Ejemplos:\n"+
				"Ejemplo	: Resultado\n"+
				"ayuda.regla3(100, 50)	: 50.\n"+
				"ayuda.regla3(750, 50)	: 6.66666....\n"+
				"ayuda.regla3(200, 400)	: 200. Si 200 es el máximo 400 es el doble\n"+
				"ayuda.regla3(200, 400, 100)	:200\n"+
				"ayuda.regla3(13, 130, 7)	:70\n"+
				"ayuda.regla3(400, 50, 100)	:12.5\n"+
				"ayuda.regla3(100, 120, 50)	:60"
			);
		
		// 2 Argumentos numéricos
		} else if( arguments.length == 2 && this.variables(arguments[0], arguments[1], "Number") ){
			this.set_resultado((arguments[1] * 100) / arguments[0]);
			return this.get_resultado();
		
		// 3 Argumentos numéricos
		} else if( arguments.length == 3 && this.variables(arguments[0], arguments[1], arguments[2], "Number") ){
			this.set_resultado((arguments[2] * arguments[1]) / arguments[0]);
			return this.get_resultado();
		
		// Algún error en la cantidad de parámetros o tipos de los argumentos
		} else {
			this.error("Es necesario 2 o 3 parámetros y todos ellos de tipo numérico", "Cantidad de parámetros incorrecta");
		}
	}
	
	ventana(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.get_ventana()\n"+
				"\n"+
				"▼ Información:\n"+
				"Esta función te dará una anchura de ventana según la hayas configurado.\n"+
				"Si la ventana actual es más grande o igual te dará un resultado.\n"+
				"Si no hay ventanas más grandes o iguales te dará un Sting vacío.\n"+
				"Recomiendo cambiar las ventanas manualmente pero también se pueden llamar a metodos para ello.\n"+
				"Configura las ventanas que quieras con las funciónes:\n"+
				"set_ventana(\"nombre\", tamaño)	Añade una nueva ventana.\n"+
				"rem_ventana(\"nombre\")	Elimina una ventana mediante el nombre.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"No necesita argumentos.\n"+
				"\n"+
				"▼ Mejor uso:\n"+
				"Recomiendo su uso en estas líneas de código jQuery:\n"+
				"// Añade un atributo al body y lo actualiza al cambiar de tamaño\n"+
				"$(document).ready(function(){\n"+
				"	$(\"body\").attr(\"ayuda_ventana\", ayuda.ventana());\n"+
				"	$(window).resize(function(){\n"+
				"		$(\"body\").attr(\"ayuda_ventana\", ayuda.ventana());\n"+
				"	});\n"+
				"});"
			);
		} else {
			var ventanaActual = $(document).outerWidth(true);	// Anchura de la ventana actual
			var ventanaMasCercana = "sinDatos";					// Cuanto más cerca esté de 0 más se acercará a la ventana actual
			
			var longitud = "SinLongitud";
			var minimoUno = false;
			
			// Itera sobre las anchuras disponibles y obtiene la anchura más próxima a la actual ventana y que encaje
			for( var dato in this.get_ventanas() ){
				longitud = ventanaActual - this.get_ventanas()[dato];
				if( longitud >= 0 ){
					
					if( ventanaMasCercana == "sinDatos" ){
						minimoUno = true;
						ventanaMasCercana = [dato, longitud];
					
					} else if( longitud < ventanaMasCercana[1] ){
						ventanaMasCercana = [dato, longitud];
					}
				}
			}
			
			return ( minimoUno )? ventanaMasCercana[0] : "";
		}
	}
	
	esMovil(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.esMovil()\n"+
				"\n"+
				"▼ Información:\n"+
				"Comprobará si se está usando un movil (smartphone).\n"+
				"Devolverá true si es un movil o false si no lo es.\n"+
				"\n"+
				"▼ Argumentos:\n"+
				"No necesita argumentos."
			);
		} else {
			var info = navigator.userAgent;
			this.set_resultado(
				( info.match(/Android/i)
					|| info.match(/BlackBerry/i)
					|| info.match(/iPhone|iPad|iPod/i)
					|| info.match(/Opera Mini/i)
					|| info.match(/IEMobile|Windows Phone/i)
					|| info.match(/Mobile/i)
				)? true
				: false
			);
			
			return this.get_resultado();
		}
	}
	
	// 1 Argumento: Formateará el texto
	formatearTexto(){
		// La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if( arguments[0] == this.get_parametroInfo() ){
			console.clear();
			this.c(
				"Información sobre: ayuda.formatearTexto(string, \" \", \"	\", \"\\n\")\n"+
				"\n"+
				"▼ Información:\n"+
				"Eliminará los huecos extra, las tabulaciones y los saltos de línea\n"+
				"Si usas palabras clave solo se modificará la frase quitando las palabras clave que hayas elegido\n"+
				"\n"+
				"▼ Argumentos\n"+
				"Admite 1 a 4 argumentos.\n"+
				"Solo admite Strings.\n"+
				"Palabras clave: \" \"(espacio), \"	\"(tabulación), \"\\n\"(salto de línea)\n"+
				"Las palabras clave sirven para indicar que solo se formatee la frase con la palabra clave indicada\n"+
				"1 Argumento		: Transforma a una frase de una sola línea.\n"+
				"2 a 4 Argumentos	: Puedes especificar que quiere que haga la función mediante las palabras clave.\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"Ejemplo	: Resultado\n"+
				"ayuda.formatearTexto(\"mi      frase\")	: \"mi frase\".\n"+
				"ayuda.formatearTexto(\"mi\nfrase\")	: \"mi frase\".\n"+
				"ayuda.formatearTexto(\"mi\ngran      frase\", \"\\n\")	: \"mi gran      frase\".\n"+
				"ayuda.formatearTexto(\"mi\ngran      frase\", \" \")	: \"mi\ngran frase\"."
			);
		
		// Error - 0 argumentos
		} else if( arguments.length == 0 ){
			this.error("formatearTexto()", "Todos los argumentos deben ser de tipo String y mínimo 1 String");
		
		// Existen argumentos
		} else {
			// Comprobar argumentos
			var argumentosSonString = true;
			for( var i=0 ; i<arguments.length ; i++ ){
				if( ! this.variables(arguments[i], "string") ){
					argumentosSonString = false;
				}
			}
			
			if( argumentosSonString ){
				var palabrasClave = [
					{
						"palabra"	: "	",
						"usar"		: false
					},{
						"palabra"	: "\n",
						"usar"		: false
					},{
						"palabra"	: " ",
						"usar"		: false
					}
				];
				
				
				// Buscando la frase
				var frase = "";
				var existeClave = false;
				var fraseEncontrada = false;
				// Argumentos
				for( var i=(arguments.length -1) ; i>-1 ; i-- ){
					var palabraEncontrada = false;
					
					
					// Palabras clave
					for( var j=0 ; j<palabrasClave.length ; j++ ){
						if( arguments[i] == palabrasClave[j].palabra ){
							palabraEncontrada = true;
							palabrasClave[j].usar = true;
							existeClave = true;
						}
					}
					
					if( ! palabraEncontrada ){
						fraseEncontrada = true;
						frase = arguments[i];
					}
				}
				
				// Error - Frase no encontrada.
				if( ! fraseEncontrada ){
					this.error("formatearTexto()", "Se necesita una frase aparte de la/s palabra/s clave");
				
				// Existe una frase
				} else {
					// Si todas las palabras clave es false quiere decir que las usará todas (algo un poco absurdo que luego se cambiará la lógica)
					if( ! existeClave ){
						// Activar todas las palabras clave
						for( var i=0 ; i<palabrasClave.length ; i++ ){
							palabrasClave[i].usar = true;
						}
					}
				}
				
				for( var p=0, reconstruir="" ; p<palabrasClave.length ; p++, reconstruir="" ){
					// Si se ha indicado usar la palabra clave
					if( palabrasClave[p].usar ){
						// Eliminar: Tabulaciones, saltos de línea, espacios extra
						frase = frase.split(palabrasClave[p].palabra);
						for( var i=(frase.length -1) ; i>-1 ; i-- ){
							if( frase[i] == "" ){
								frase.splice(i, 1);
							}
						}
						
						// Reestructurar (Array → String)
						for( var i=0 ; i<frase.length ; i++ ){ reconstruir += " "+ frase[i]; }
						frase = reconstruir.substr(1)
					}
				}
				
				this.set_resultado(frase);
				
				return frase;
			}
		}
	}
	
	reemplazar(frase, texto1, texto2){
		if( arguments[0] == this.get_parametroInfo() ){
			console.clear();
			this.c(
				"Información sobre: ayuda.reemplazar(\"frase\", \"texto a reemplazar\", \"texto reemplazado\")\n"+
				"\n"+
				"▼ Información:\n"+
				"Dado una frase, reemplaza el primer texto por el segundo texto.\n"+
				"Orden: \"Frase\" \"texto a reemplazar\" \"texto reemplazado\"\n"+
				"\n"+
				"▼ Argumentos\n"+
				"Son necesarios 3 argumentos.\n"+
				"Solo admite Strings.\n"+
				"El primer argumento es la frase que será modificada\n"+
				"\n"+
				"▼ Ejemplos:\n"+
				"ayuda.reemplazar(\"Los textos son diferentes a los teXtos que se encontraron en las pirámides horcas.\", \"textos\", \"libros\")\n"+
				"Los libros son diferentes a los teXtos que se encontraron en las pirámides horcas.\n"+
				"\n"+
				"NOTA: Ten encuenta que solo reemplazará los textos iguales."
			);
		} else if( this.variables("string", frase, texto1, texto2) ){
			var fraseA = frase.split(texto1);	// Frase partida a array sesgún encuentra la palabra del argumento texto1
			var fraseN = fraseA[0];			// Almacena la nueva frase
			for( var i=1 ; i<fraseA.length ; i++ ){
				fraseN += texto2 + fraseA[i];
			}
			
			this.set_resultado(fraseN);
			
			return fraseN;
			
		} else {
			this.error("Los argumentos deben de ser de tipo string"
				+"\n("+ ayuda.variables(frase)	+") "+ frase
				+"\n("+ ayuda.variables(texto1)	+") "+ texto1
				+"\n("+ ayuda.variables(texto2)	+") "+ texto2
			);
		}
	}
}

// Llamada a la clase Ayuda
ayuda = new Ayuda();

/** Datos de Versiones

►	Versión: 5.3
	• Metodos creados:
		· reemplazar()
			◄ String.
			
			Reemplaza el trozo de texto de una frase a otro texto.
			
	• Metodos modificados:
		Se han modificado todos los metodos.
			El texto que se muestra cuando se llama a la ayuda de un metodo se ve mejor.
				Esto es debido a que es mejor usar \n que , al cambiar de línea.

►	Versión: 5.2.2
	• Metodos corregidos:
		· variables()
			Ahora ayuda.variables() devuelve "undefined" y no undefined debido a que la salida debe ser de tipo string sin importar el resultado.
			
		· cargando()
			La imagen no desaparecía. En un futuro se mejorará.
		
	• Metodos modificados:
		· set_ventana()
			Ahora contiene una explicación de su uso.
		
		· set_ventana()
			Ahora contiene una explicación de su uso.

►	Versión: 5.2.1
	• Metodos creados:
		· formatearTexto()
			◄ String.
			
			1 Parametro (frase): Te devolverá la frase sin tabulaciones, sin saltos de línea y sin espacios extra.
			2 o más parametros (frase + palabras clave): Añade como argumento que quieres modificar de la frase
	
	• Metodos modificados:
		· error()
			Ahora se escribe primero el título y luego el mensaje para una mejor lógica de escritura.
		
		· aleatorio(objeto)
			Ahora el aleatorio de los objetos te devuelve un objeto de dentro y no el resultado de uno de los objetos.
				Ejemplo: ayuda.aleatorio({"uno":1, "dos":2, "tres":3});
					Antes: Devuelve 1, 2 o 3.
					Ahora: Devuelve {"uno":1}, {"dos":2} o {"tres":3}.
		
		· c(objeto)
			Ahora los objetos de pueden ver como un array.

►	Versión: 5.2
	• Metodos corregidos:
		· c()
			Ahora ayuda.c(true) devuelve true con el color verde.
	
	• Metodos modificados:
		· set_cookie()
			Ahora este metodo contiene una ayuda de uso.
			
		· cargando()
			Se ha cambiado el CSS a "position:fixed;".
		

►	Versión: 5.1
	• atributos creados:
		this._ventanas()	Almacena las ventanas disponibles.
	
	• Metodos creados:
		· ventana()
			◄ String	: Ventana actual
			
			Sin parametros
			Obtiene un string con el tamaño de la ventana actual.
			Se pueden modificar los tamaños a gusto.
		
		· get_ventanas()
			◄ Object
			
			Obtiene las ventanas almacenadas.
		
		· rem_ventana(String, Number)
			► String	: Nombre para la nueva ventana.
			► Number	: Tamaño para la nueva ventana.
			
			Te dará la ventana actual si es mayor o igual a la anchura de la ventana actual.
		

►	Versión: 5.0
	• Metodos actualizados:
		todos
	
	- Algunas funciones requieren de jQuery
	
	+ jQuery se añade si no lo encuentra pero solo añade su dirección web.
		(Si se detecta jQuery no se añadirá la dirección).
		La dirección referente es se ha obtenido de w3scools.com
	+ Ahora todos los métodos son llamados mediante la plase Ayuda.
	+ Se ha añadido parametros a la clase Ayuda para obtener el último error y el último resultado.
	+ La función error muestra los mensajes por html y luego los quita para no molestar.
	+ Se puede modifiar completamente el estilo de los errores mediente getters y setters (get y set).
	+ Los atributos empiezan don barra baja "_" _error, _resultado, etc.
	+ Grán modificación en la función de variables
	+ Se ha añadido una función personalizada para el console.log() y console.error().
	+ Todas las funciones cuentan con una ayuda.
		Esta ayuda aparece por consola si a la función se le pone como argumento el _parámetroInfo que por defecto es "_i"
		Ejemplo ayuda.error("_i"), ayuda.variables("_i");
		El parámetro de información se puede cambiar (precaución con las variables del sistema o palabras claves de este script)
	+ La función cargando() solo es una que muestra u oculta la imagen.
	+ La función regla3() y regla3_100() se han unido en una: regla3()

►	Versión: 4.0 u 4.1
	• Se han perdido los datos debido al impacto del disco duro.
	• Se permitía multiples parametros a la función y grán mejora en comprobación de variables.

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

►	Versión: 2.2
	• Metodos creados:
		· activarDesactivar.
		· activarDesactivar_Forzar.

►	Versión: 2.1
	• Control de errores.
	• Eliminada lafución error(param1, param2):
	No se pueden tener 2 con diferentes parametros

►	Versión: 2.0
	• Control de errores.
	• añadidas las funciónes:
		1. imprimirArray
		2. error version reducida
		3. regla3 y regla3Porciento
		4. Nuevo gif de carga: Ahora solo es necesario activar y usar el metodo
	(ya se incluye el CSS y HTML necesarios)
	• Añadida la funcionalidad de Array a la función comprobarVariable
*/