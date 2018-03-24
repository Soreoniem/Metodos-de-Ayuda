/**
	Metodos de ayuda versión: 5.2
	© Copyright 2059, JuanLu Corp.
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
	_parametroInfo			: Argumento para pedir información sobre la función (puede cambiar) (predeterminado: _i)
	_resultado				: Almacena el último resultado.
	_error					: Almacena el último error.
	_errorTiempo			: Tiempo que tarda el error, mostrado por html, antes de desvanecerse.
	_errorTiempoOpacidad	: Tiempo que tarda el error, mostrado por html, en desvanecerse.
	_errorEstilo			: Estilo CSS que tendrá el error al mostrarse.
	_cargandoImg			: ubicación de la imagen de carga.
*/
/* Get (obtener), Set (insertar), Rem (Eliminar)
Get:
	get_resultado				: Obtiene el resultado almacenado.
	get_error					: Obtiene el error almacenado.
	get_errorEstilo				: Obtiene el CSS del error o con un argumento se obtiene la busqueda.
	get_errorEstilo_toString	: Obtiene el CSS del error en formato String.
	get_cookie					: Obtiene una cookie.
	get_cargandoImg				: Obtiene la dirección de la imagen cargando.
	get_parametroInfo			: Obtiene el argumento para obtener información sobre la función.

Set:
	set_resultado		: Inserta el resultado.
	set_error			: Inserta el error.
	set_errorEstilo		: Inserta o modifica un estilo de error HTML.
	set_cookie			: Inserta una cookie.
	set_cargandoImg		: Cambia la dirección de la imagen de carga.
	set_parametroInfo	: Cambia la forma en la que se pide la información a la función.

Rem
	rem_errorEstilo	: Elimina un estilo CSS del error HTML.
	rem_cookie		: Elimina un acookie añadiendo una fecha atrasada.
*/

/* Funciones
	NOTA: Si quieres saber como funciona la función llama a la función con el argumento "_i".
		Se mostrará la información por consola del navegador.
		La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
	
	Todas las funciones requieren de la versión 5.0 (esta versión)
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
				"Información sobre: ayuda.set_cookie(nombre, valor)",
				"",
				"▼ Información:",
				"Esta función sirve para almacenar cookies en el navegador web.",
				"",
				"▼ Argumentos:",
				"Es necesario 1 argumento.",
				"1r Argumento	: Es el nombre que recibirá la nueva cookie",
				"2º Argumento	: Es el valor que tendrá la cookie.",
				"",
				"▼ Ejemplos:",
				"ayuda.set_cookie(\"miCookie\", \"valorCookie\").",
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
		if( this.variables(arguments[0], "texto") && this.variables(arguments[1], "number") ){
			this._ventanas[arguments[0]] = arguments[1];
		} else {
			this.error("Para insertar una nueva ventana se necesitan 2 parámetros: Nombre de la ventana(String) y tamaño(Number)", "set_ventana(String, Number)");
		}
		return this;
	}
	
	rem_errorEstilo(estilo)	{ delete this._errorEstilo[estilo];	return this;}
	rem_cookie(){
		var todosStrings = true;
		for( var i=0 ; i<arguments.length ; i++ ){
			if( this.variables(arguments[i], "string") ){
				document.cookie = arguments[i] +"=; expires=Thu, 11 Jan 1992 00:00:00 UTC";
			} else {
				this.error("Para eliminar la cookie '"+ arguments[i] +"' pon el nombre de la cookie en formato string", "Se necesita el nombre de la cookie");
			}
		}
		return this;
	}
	rem_ventana(){ delete this._ventanas[arguments[0]]; return this; }
	
	error(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.error()",
				"",
				"▼ Información:",
				"Esta función sirve para informar sobre un error.",
				"Puede mostrar el error por 3 medios: HTML, Alert, Cosole.",
				"HTML: Mostrará un mensaje por html que luego se irá.",
				"Alert: Mostrará el error mediante alert().",
				"Console: Mostrará un error mediante la consola del navegador console.error().",
				"",
				"▼ Argumentos:",
				"Admite hasta 3 argumentos.",
				"Puede ser cualquier tipo de dato para el Mensaje y el Título.",
				"Palabras clave: \"html\", \"alert\", \"console\".",
				"Las palabras clave son de tipo String y no importa si es mayúsculas y minúsculas",
				"Las palabras clave pueden estár en cualquiera de las 3 posiciones.",
				"0 Argumentos	: Error simple.",
				"1 Argumento	: Mensaje personalizado por consola o Mensaje simple con una palabra clave.",
				"2 Argumentos	: Mensaje y título del error o Mensaje y palabra clave",
				"3 Argumentos	: Mensaje, Título y palabra clave",
				"",
				"▼ Ejemplos:",
				"Ejemplo	: Resultado",
				"ayuda.error()	: Error simple por consola.",
				"ayuda.error(\"console\")	: Error simple por consola.",
				"ayuda.error(\"alert\")	: Error simple mediante Alert.",
				"ayuda.error(\"html\")	: Error simple por HTML.",
				"ayuda.error(Mensaje)	: Mensaje de error porsonalizado por consola.",
				"ayuda.error(\"HtMl\", Mensaje)	: Error personalizado y donde se mostrará.",
				"ayuda.error(Mensaje, Titulo)	: Mensaje + Título Personalizados.",
				"ayuda.error(Mensaje, \"conSole\", Titulo)	: Mensaje + Título + Palabra clave. Mensaje y medio personalizado."
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
				
				} else {
					console.error("%c"+ arguments[1] +"\n"+ arguments[0] +". ",
					"color:#bf0202;border-radius:3px 8px 5px 3px;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
					this.set_error(arguments[1] +": "+ arguments[0] +".");
				}
			
			// 3 Argumentos: Mensaje + Título + Tipo
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
				
				// Mensaje + Título + Alert
				if( salida == "alert" ){
					alert("¡"+ datos[1] +"!\n"+ datos[0] +".");
				
				// Mensaje + Título + HTML
				} else if( salida == "html" ){
					// Añadir HTML
					$("body").append(
						"<div class=\"ayuda_error\" style=\""+ this.get_errorEstilo_toString() +"\">"
						+	"<div style=\"font-weight:bold;width:100%;border-bottom:"+ this.get_errorEstilo("border") +";padding-bottom:5px;margin-bottom:5px;text-align:center;\">¡"+ datos[1] +"!</div> "+ datos[0] +"."
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
					
				// Mensaje + Título + Console
				} else {
					console.error("%c¡"+ arguments[1] +"!\n"+ arguments[0] +". ",
					"color:#bf0202;border-radius:3px 8px 5px 3px;border-left: solid 5px #fe4040;margin-left: 3px;padding: 2px 0px;padding-left: 10px; font-size:13px;padding-top:3px;");
				}
				
				this.set_error(datos[1] +": "+ datos[0]);
			}
			
		}
		return this;
	}
	
	variables(){
	//La función explicará para que sirve, mostrará algunos ejemplos y qué argumentos se admiten.
		if(arguments[0] == this.get_parametroInfo()){
			console.clear();
			this.c(
				"Información sobre: ayuda.variables()",
				"",
				"▼ Información:",
				"Esta función sirve para comprovar variables.",
				"Puede devolver el tipo de la variable o comparar variables",
				"",
				"▼ Argumentos:",
				"Admite de 0 a infinitos argumentos.",
				"Admite cualquier tipo de dato.",
				"0 Argumentos	: Es como si pusieses undefined.",
				"1 Argumento	: Obtiene el tipo del argumento en formato String y minúscula.",
				"2 Argumentos o más	: Devuelve true si todos los argumentos son del mismo tipo.",
				"Las Palabras clave son el tipo de variables pero en formato String.",
				"Aunque las palabras clave son String emularán su tipo: La palabra clave \"number\" se usará como un número cualquiera.",
				"Palabras clave: \"Undefined\", \"Null\", \"Boolean\", \"String\", \"Number\", \"NaN\", \"Infinity\", \"Array\""
				+", \"Object\", \"Function\" y \"Class\".",
				"Las palabras clave deben ser de tipo String, no impoerta si es mayúsculas o minúsculas o combinado de ellas.",
				"",
				"▼ Ejemplos:",
				"Ejemplo	: Resultado",
				"ayuda.variables()	: \"undefined\".",
				"ayuda.variables(false)	: \"boolean\".",
				"ayuda.variables(0/5)	: \"infinity\".",
				"ayuda.variables({\"myObject\":13})	: \"object\".",
				"ayuda.variables(ayuda)	: \"class\".",
				"ayuda.variables(\"number\")	: \"number\".",
				"ayuda.variables(\"funCtioN\")	: \"function\".",
				"ayuda.variables(\"nAn\")	: \"nan\".",
				"ayuda.variables(true, \"boolean\")	: true.",
				"ayuda.variables(Math.PI, \"Number\", -302)	: true.",
				"ayuda.variables(13, \"13\")	: \"false\".",
				"ayuda.variables(\"strING\", \"13\")	: true.",
				"ayuda.variables(\"strING\", \"13\", \"String\", \"Lorem Ipsum\")	: true.",
				"ayuda.variables(\"strING\", \"13\", \"String\", \"Lorem Ipsum\", \"boolean\")	: false."
			);
		} else {
			// 0 Argumentos: Undefined
			if( arguments.length == 0 ){
				this.set_resultado(undefined);
				return undefined;
			
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
				"Información sobre: ayuda.aleatorio()",
				"",
				"▼ Información:",
				"Esta función sirve para obtener un aleatorio.",
				"Esta función devuelve un aleatorio dependiendo de lo recibido como argumentos.",
				"",
				"▼ Argumentos:",
				"Admite de 0 a infinitos argumentos.",
				"Admite cualquier tipo de dato.",
				"0 Argumentos	: Devuelve un número del 0 al 100.",
				"1 Argumento	: Obtiene un aleatorio según el tipo del argumento.",
				"2 Argumentos (especiales): Es si los 2 argumentos són numéricos o si uno es string y el otro numérico.",
				"Si son 2 argumentos numéricos devolverá un número entre esos 2 números (incluyen los negativos).",
				"Si el primer argumento es String y el otro numérico devolverá un String y su longitud del string será el número obtenido.",
				"2 Argumentos o más (sin especiales): Se obtendrá un argumento aleatorio",
				"",
				"▼ Ejemplos teóricos:",
				"Ejemplo	: Resultado",
				"1 Argumento",
				"Undefined devolverá un número entre 0 y 100 (1 argumento undefined o sin argumentos)",
				"null, NaN, Infinity, function y class devolverán un número entre 0 y 10",
				"Boolean	: true o false",
				"Number	: 0 al numero",
				"Array	: Devolverá un dato del array.",
				"String	: Devolverá una palabra del String.",
				"Object	: Devolverá un dato del objeto",
				"2 Argumentos (especiales)",
				"2 Números: ayuda.aleatorio(16, -17)	: Devuelve un número entr -17 y 16",
				"String y Number: ayuda.aleatorio(\"Frase de prueba\", 5)	: Devolverá una cadena de la frase con longitud máxima de 5 carácteres.",
				"Ejemplos: \"rase \", \"prueb\", \"eba\", \"se de\", \"ueba\"",
				"2 Argumentos o más (no especiales)",
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
			
			// 0 Argumentos
			// 1 Argumento e Indefinido
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
					var longitud	= -1;
					var nombres		= [];
					for( var dato in arguments[0] ){
						longitud++;
						nombres.push(dato);
					}
					
					// Obtener un aleatorio según la longitud de los nombres
					var aleatorio = parseInt(Math.round(Math.random() * (((nombres.length - 1) - 0 +1) - 1) + 0));
					this.set_resultado(arguments[0][nombres[aleatorio]]);
					return this.get_resultado();
				}
				// Falta: Object
			
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
				"Información sobre: ayuda.cargando()",
				"",
				"▼ Información:",
				"Cada vez que se llama a la función muestra una imagen de carga o la quita.",
				"",
				"▼ Argumentos: No se usan argumentos exceptuando la información de la función",
				"",
				"▼ Ejemplos: Simplemente llama a ayuda.cargando()"
			);
		} else {
			// Cargar el html
			if( $("body #ayuda_cargando_estilo").length == 0 ){
				// Estilo
				$("body").append(
					"<style id=\"ayuda_cargando_estilo\">"
					+	"#ayuda_cargando{"
					+		"position:absolute;"
					+		"z-index:100;"
							
					+		"width:100%;"
					+		"height:100%;"
							
					+		"background-color:rgba(255, 255, 255, 0.3);"
							
					+		"animation:blinker 1s linear infinite;"
					+	"}"
					+	"@keyframes blinker{50%{opacity:0.5;}}"
					+	"#ayuda_cargando img{"
					+		"position:absolute;"
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
					cargandoIMG.css("min-width", "0px");
				});
				
			// Desactivado → activando
			} else {
				cargando
					.data("estado",	true)
					.css("width",	"100%")
					.css("height",	"100%")
				;
				cargandoIMG.css("min-width", "100px");
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
				"Información sobre: ayuda.c()",
				"",
				"▼ Información:",
				"Es lo mismo que console.log() pero con un estilo de colores diferente.",
				"",
				"▼ Argumentos:",
				"Admite de 0 a infinitos argumentos de cualquier tipo.",
				"Si es solo 1 argumento tendrá un color de fuente diferente según el tipo argumento (no afecta a los valores).",
				"Si es solo 1 array se mostrará de forma diferente",
				"Si es true mostrará el true de color verde",
				"Si es false mostrará el false de color rojo, etc."
			);
		} else {
			if( arguments.length == 0 ){
				console.log("%c ",
				"color:black;background-color:rgba(219, 255, 254, 0.4);border-radius:3px 8px 5px 3px;border-left: solid 5px #1616bc;margin-left: 3px;padding: 3px 0px;padding-left: 10px; font-size:	13px;");
			} else if( arguments.length == 1 ){
				tipo = this.variables(arguments[0]);
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
				"Información sobre: ayuda.regla3()",
				"",
				"▼ Información:",
				"Es la típica regla de 3.",
				"",
				"▼ Argumentos:",
				"Admite de 2 a 3 argumentos, todos de tipo numérico.",
				"Supongamos esta estratégia:",
				"x1 → y1",
				"x2 → ?",
				"Si x1 es y1 cuanto será x2",
				"Y la regla de 3 sería x2 * y1 / x1 y el resultado sería ?",
				"2 Argumentos",
				"Con la extrategia anterior y1 sería el número 100",
				"el primer argumento es x1 y el segundo argumento es x2",
				"3 Argumentos",
				"Si cogemos el ejemplo anterior el número anterior es modificable",
				"Primer argumento: x1",
				"Segundo argumento: y1",
				"Tercer argumento: x2",
				"▼ Ejemplos:",
				"Ejemplo	: Resultado",
				"ayuda.regla3(100, 50)	: 50.",
				"ayuda.regla3(750, 50)	: 6.66666....",
				"ayuda.regla3(200, 400)	: 200. Si 200 es el máximo 400 es el doble",
				"ayuda.regla3(200, 400, 100)	:200",
				"ayuda.regla3(13, 130, 7)	:70",
				"ayuda.regla3(400, 50, 100)	:12.5",
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
				"Información sobre: ayuda.get_ventana()",
				"",
				"▼ Información:",
				"Esta función te dará una anchura de ventana según la hayas configurado.",
				"Si la ventana actual es más grande o igual te dará un resultado.",
				"Si no hay ventanas más grandes o iguales te dará un Sting vacío.",
				"Recomiendo cambiar las ventanas manualmente pero también se pueden llamar a metodos para ello.",
				"Configura las ventanas que quieras con las funciónes:",
				"set_ventana(\"nombre\", tamaño)	Añade una nueva ventana.",
				"rem_ventana(\"nombre\")	Elimina una ventana mediante el nombre.",
				"",
				"▼ Argumentos:",
				"No necesita argumentos.",
				"",
				"▼ Mejor uso:",
				"Recomiendo su uso en estas líneas de código jQuery:",
				"// Añade un atributo al body y lo actualiza al cambiar de tamaño",
				"$(document).ready(function(){",
				"	$(\"body\").attr(\"ayuda_ventana\", ayuda.ventana());",
				"	$(window).resize(function(){",
				"		$(\"body\").attr(\"ayuda_ventana\", ayuda.ventana());",
				"	});",
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
				"Información sobre: ayuda.esMovil()",
				"",
				"▼ Información:",
				"Comprobará si se está usando un movil (smartphone).",
				"Devolverá true si es un movil o false si no lo es.",
				"",
				"▼ Argumentos:",
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
}

// Llamada a la clase Ayuda
ayuda = new Ayuda();

/** Datos de Versiones

►	Versión: 5.2
	• Metodos corregidos:
		· c()
			Ahora ayuda.c(true) devuelve true con el color verde.
	
	• Metodos creados:
		· esMovil()
			◄ Boolean.
			
			Sin parametros
			Obtiene booleano dependiendo de si es un movil o no.
	
	• Metodos modificados:
		· set_cookie()
			Ahora este metodo contiene una ayuda de uso.
		

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