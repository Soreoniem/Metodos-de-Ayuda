var pruebas = new Ayuda();
var datos = [
	{
		"nombre"	: "_resultado",
		"resultado"	: pruebas.variables(pruebas._resultado)?true:false
	},{
		"nombre"	: "_error",
		"resultado"	: pruebas.variables(pruebas._error, "string")
	},{
		"nombre"	: "_errorTiempo",
		"resultado"	: pruebas.variables(pruebas._errorTiempo, "number")
	},{
		"nombre"	: "_errorTiempoOpacidad",
		"resultado"	: pruebas.variables(pruebas._errorTiempoOpacidad, "number")
	},{
		"nombre"	: "_errorEstilo",
		"resultado"	: pruebas.variables(pruebas._errorEstilo, "object")
	},{
		"nombre"	: "_cargandoImg",
		"resultado"	: pruebas.variables(pruebas._cargandoImg, "string")
	},{
		"nombre"	: "_parametroInfo",
		"resultado"	: typeof pruebas._parametroInfo == "string"
	},{
		"nombre"	: "_ventanas",
		"resultado"	: pruebas.variables(pruebas._ventanas, "object")
	},{
		"nombre"	: "get_resultado()",
		"resultado"	: pruebas.get_resultado() == pruebas._resultado
	},{
		"nombre"	: "get_error()",
		"resultado"	: pruebas.get_error() == pruebas._error
	},{
		"nombre"	: "get_errorEstilo()",
		"resultado"	: pruebas.variables(pruebas.get_errorEstilo(), "object")
	},{
		"nombre"	: "get_errorEstilo_toString()",
		"resultado"	: pruebas.variables(pruebas.get_errorEstilo_toString(), "string")
	},{
		"nombre"	: "get_cargandoImg()",
		"resultado"	: pruebas.variables(pruebas.get_cargandoImg(), "string")
	},{
		"nombre"	: "get_cookie()",
		"resultado"	: function(){
			pruebas.set_cookie("pruebas-nombre", "pruebas-valor");
			return pruebas.get_cookie("pruebas-nombre") == "pruebas-valor";
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "get_ventanas()",
		"resultado"	: pruebas.variables(pruebas.get_ventanas(), "object")
	},{
		"nombre"	: "set_resultado()",
		"resultado"	: function(){
			pruebas.set_resultado("pruebas Nº2");
			return pruebas._resultado == "pruebas Nº2";
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "set_error()",
		"resultado"	: function(){
			pruebas.set_error("pruebas Nº3");
			return pruebas._error == "pruebas Nº3";
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "set_errorEstilo()",
		"resultado"	: function(){
			pruebas.set_errorEstilo("pruebas4-estilo", "pruebas4-propiedad");
			return pruebas.get_errorEstilo("pruebas4-estilo") == "pruebas4-propiedad";
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "set_cookie()",
		"resultado"	: function(){
			pruebas.set_cookie("pruebas5-nombre", "pruebas5-valor");
			return pruebas.get_cookie("pruebas5-nombre") == "pruebas5-valor";
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "set_cargandoImg()",
		"resultado"	: function(){
			var backup = pruebas.get_cargandoImg();
			
			pruebas.set_cargandoImg("pruebas Nº6");
			var resultado = pruebas._cargandoImg == "pruebas Nº6";
			
			pruebas.set_cargandoImg(backup);
			return resultado;
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "set_parametroInfo()",
		"resultado"	: function(){
			pruebas.set_parametroInfo("pruebas Nº7");
			var resultado = pruebas._parametroInfo == "pruebas Nº7";
			pruebas.set_parametroInfo("_i");
			return resultado;
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "set_ventana()",
		"resultado"	: function(){
			pruebas.set_ventana("prueba Nº8", 8000);
			return pruebas._ventanas["prueba Nº8"] == 8000;
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "rem_errorEstilo()",
		"resultado"	: function(){
			pruebas.set_errorEstilo("pruebas9-estilo", "pruebas9-propiedad");
			pruebas.rem_errorEstilo("pruebas9-estilo");
			return pruebas.variables(pruebas.get_errorEstilo("pruebas9-estilo"), undefined);
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "rem_cookie()",
		"resultado"	: function(){
			pruebas.set_cookie("pruebas10-nombre", "pruebas10-valor");
			
			var funciona = false;
			try{ pruebas.rem_cookie("pruebas10-nombre");
				funciona = true;
			} catch(err){ funciona = false; }
			
			return funciona;
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "rem_ventana()",
		"resultado"	: function(){
			// Añadir ventana
			pruebas.set_ventana("pruebas Nº11", 11000);
			
			// Comprobar su iserción
			if( pruebas.get_ventanas()["pruebas Nº11"] != 11000 ){
				return false;
			}
			
			// Eliminar ventana
			pruebas.rem_ventana("pruebas Nº11");
			
			// Comprobar su eliminación
			return pruebas.variables(pruebas.get_ventanas()["pruebas Nº11"], undefined);
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "error()",
		"resultado"	: function(){
			try{
				pruebas.error();
				pruebas.error("console");
				pruebas.error("alert");
				pruebas.error("html");
				pruebas.error("prueba Nº12");
				pruebas.error("prueba Nº13", "console");
				pruebas.error("prueba Nº14", "alert");
				pruebas.error("prueba Nº15", "html");
				pruebas.error("prueba Nº16", "Mensaje prueba Nº16");
				pruebas.error("prueba Nº17", "alert", "Mensaje prueba Nº17");
				pruebas.error("prueba Nº18", "Mensaje prueba Nº18", "console");
				pruebas.error("prueba Nº19", "Mensaje prueba Nº19", "html");
				return true;
			}catch(err){
				pruebas.error("¡¡ERROR REAL!!", "Problema en error()"+ err);
			}
			return false; //Si llega hasta aquí significa que no ha llegado al true y alguno falla.
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "variables()",
		"resultado"	: (
			// 0 Argumentos
			pruebas.variables() == "undefined"
			
			// 1 Argumento: Palabras clave
			&& pruebas.variables("String")		== "string"
			&& pruebas.variables("Boolean")		== "boolean"
			&& pruebas.variables("Undefined")	== "undefined"
			&& pruebas.variables("Null")		== "null"
			&& pruebas.variables("NaN")			== "nan"
			&& pruebas.variables("Infinity")	== "infinity"
			&& pruebas.variables("Number")		== "number"
			&& pruebas.variables("Array")		== "array"
			&& pruebas.variables("Object")		== "object"
			&& pruebas.variables("Function")	== "function"
			&& pruebas.variables("Class")		== "class"
			
			// 1 Argumento: String, Boolean, Undefined, Null, Array, Class, Object, Function, NaN, Infinity, Number
			&& pruebas.variables("prueba Nº20")		== "string"
			&& pruebas.variables(false)				== "boolean"
			&& pruebas.variables(undefined)			== "undefined"
			&& pruebas.variables(null)				== "null"
			&& pruebas.variables(["prueba Nº21"])	== "array"
			&& pruebas.variables(new Ayuda())		== "class"
			&& pruebas.variables({"prueba":"Nº22"})	== "object"
			&& pruebas.variables(function(){})		== "function"
			&& pruebas.variables(0/0)				== "nan"
			&& pruebas.variables(1/0)				== "infinity"
			&& pruebas.variables(0)					== "number"
			
			// 2 o más argumentos
			&& pruebas.variables("prueba", "Nº23")
			&& pruebas.variables("prueba", "prueba Nº25", "string")
			&& pruebas.variables("prueba", "prueba Nº26", "texto")
			&& pruebas.variables("prueba", "prueba Nº27", 0)	== false
			&& pruebas.variables("prueba", "prueba Nº28", NaN)	== false
			&& pruebas.variables("prueba", "prueba Nº29", NaN)	== false
			&& pruebas.variables(0,	0/0)						== false
			&& pruebas.variables(0,	0/0, 1/0)					== false
			&& pruebas.variables(0/0,	"NaN")
			&& pruebas.variables(1/0,	"InfInIty")
			&& pruebas.variables(0,	NaN) 							== false
			&& pruebas.variables(0,	NaN) 							== false
			&& pruebas.variables(new Array(), {"prueba":"Nº30"})	== false
		)
	},{
		"nombre"	: "aleatorio()",
		"resultado"	: (
				pruebas.variables("number",
				pruebas.aleatorio(),
				pruebas.aleatorio(undefined),
				pruebas.aleatorio(null),
				pruebas.aleatorio(NaN),
				pruebas.aleatorio(Infinity),
				pruebas.aleatorio(function(){}),
				pruebas.aleatorio(pruebas),
				pruebas.aleatorio(0),
				pruebas.aleatorio([33]),
				pruebas.aleatorio(10,-10),
				
				pruebas.aleatorio(34, undefined, null, [35], pruebas, {"prueba":36}, function(){}, NaN, Infinity, 37)
			)
			&&	pruebas.variables("boolean",
				pruebas.aleatorio(false)
			)
			&&	pruebas.variables("string",
				pruebas.aleatorio("prueba Nº38"),
				pruebas.aleatorio("prueba Nº39", 3)
			)
		)
	},{
		"nombre"	: "cargando()",
		"resultado"	: function(){
			// Iniciar
			pruebas.cargando();
			
			var resultado = $("#ayuda_cargando").data("estado");
			if( resultado == false ){ return false; }
			
			// Apagar
			pruebas.cargando();
			
			pruebas.c("prueba Nº40: "+ $("#ayuda_cargando").data("estado"));
			return ( $("#ayuda_cargando").data("estado") == false )?true:false;
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "c",
		"resultado"	: function(){
			
			try{
				// 0 Argumentos
				pruebas.c()
				
				// 1 Argumento	- Array
					.c(["pueba", "Nº", "41"])
				
				// 1 Argumento	- Object
					.c({"prueba Nº": "42"})
				
				// 1 Argumento	- Undefined
					.c(undefined)
				
				// 1 Argumento	- Boolean
					.c(false)
				
				// 1 Argumento	- Null
					.c(null)
				
				// 1 Argumento	- Number
					.c(43)
				
				// 1 Argumento	- NaN
					.c(0/0)
				
				// 1 Argumento	- Infinity
					.c(1/0)
				
				// 1 Argumento	- String
					.c("prueba Nº43")
				
				// 2 Argumentos
					.c("prueba Nº44", ["prueba", "Nº", "45"])
				;
			
				return true;
			}catch(error){
				pruebas.error("¡¡ERROR REAL!!", "Problema en c()"+ error);
			}
			return false;
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "regla3",
		"resultado"	: pruebas.regla3(300, 201) === 67 && pruebas.regla3(300, 408, 201) === 273.36
	},{
		"nombre"	: "ventana",
		"resultado"	: function(){
			
			return pruebas.variables(pruebas.ventana(), "texto");
		},
		"resultado_esFuncion": true
	},{
		"nombre"	: "esMovil",
		"resultado"	: pruebas.variables(pruebas.esMovil(), "boolean")
	},{
		"nombre"	: "formatearTexto",
		"resultado"	: pruebas.formatearTexto("prueba      Nº46")	== "prueba Nº46"
						&& pruebas.formatearTexto("prueba\nNº47")	== "prueba Nº47"
						&& pruebas.formatearTexto("prueba	Nº48")	== "prueba Nº48"
						&& pruebas.formatearTexto("prueba	Nº49", "\n")	== "prueba	Nº49"
						&& pruebas.formatearTexto("prueba   Nº50", "\n", "	")	== "prueba   Nº50"
	}
];
/*
	},{
		"nombre"	: "",
		"resultado"	:  == 
	}
	},{
		"nombre"	: "",
		"resultado"	: function(){
			pruebas.("");
			return pruebas._ == ;
		},
		"resultado_esFuncion": true
	}
*/

$(document).ready(function(){
	var tabla = $("table");
	var imprimir = "";
	
	// Datos
	
	for( var i=0 ; i<datos.length ; i++ ){
		if( i %10 == 0 ){
			imprimir +="<tr><th>Nombre</th><th>¿Funciona?</th></tr>";
		}
		imprimir += "<tr>";
			imprimir += "<td>"+ datos[i]["nombre"] +"</td>";
			var funciona = comprobarDato(datos[i]);
			imprimir += "<td style=\"color:"+ ( (funciona)?"green":"red" ) +";font-weight:bold;\">"+ ( (funciona)?"Si":"No" ) +"</td>";
		imprimir += "</tr>";
	}
	
	imprimir +="<tr><th>Nombre</th><th>¿Funciona?</th></tr>";
	tabla.append(imprimir);
	
	setTimeout(function(){
		$("body").animate({
			scrollTop: $("#fin").offset().top
		}, 1500, function(){
		});
	}, 500);
});

function comprobarDato(dato){
	return ( dato["resultado_esFuncion"] )
		? dato["resultado"]()
		: dato["resultado"]
	;
}