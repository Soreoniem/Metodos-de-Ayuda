/* ✪ imprimirArray( arrayDatos, modo|titulo, titulo )
	INFO:
		• Permite imprimir un array.
		• Puede imprimir el array por alert(), console.log(), o por html.
		• Se le puede poner un título cuando se imprime.
		
		► (arrayDatos):	Array.
		► (modo):		(opcional) "alert", "console", "html".
		► (titulo):		(opcional) Título.
		Return:	Imprime el array por: alert, console.log o html (alert por defecto)
		
		📖 Ejemplo 1:	imprimirArray( miArray );
		📖 Ejemplo 2:	imprimirArray( miArray, "console" );
						imprimirArray( miArray, "mi título" );
		📖 Ejemplo 3:	imprimirArray( miArray, "html", "mi Título" );
	
	NOTA:
		El 2º parámetro se usa para el modo o el título.
		Si añades un modo puedes añadir tu título en el 3r parámetro.
*/
imprimirArray	= function( arrayDatos, modo, titulo ){
	var saltoLinea	= "\n"
	
	if( modo == "html" ){
		saltoLinea	= "<br/>";
	}
	 // Error: necesario Array
	if( comprobarVariable(arrayDatos) != "Array" ){
		console.log("Error: no array");
		this.error("El primer parametro debe ser de tipo Array",
			"imprimirArray(<u>arra</u>y<u>Datos</u>)",
			"arrayDatos", arrayDatos)
		;
	}
	
	 // 1 parametro (solo array)
	if( comprobarVariable(titulo, "undefined")
	&& comprobarVariable(modo, "undefined") ){
		titulo		= "";
		modo		= "alert";
	
	 // 2 parametros (array y título)
	} else if( comprobarVariable(titulo, "undefined") ){
		 // 2 parametros (array y título)
		 // palabras reservadas: alert, console y html (formas de imprimir)
		if( modo == "alert"
		 || modo == "console"
		 || modo == "html" ){
			titulo	= "";
		
		// 2 parametros (array y modo)
		} else {
			titulo	= modo;
		}
	}
	
	// Comprobar: arrayDatos
	if( comprobarVariable(arrayDatos, "Array") ){
		
		// titulo
		var imprimir = titulo + saltoLinea +"┌";
		
		// línea 1
		for( var x=1 ; x<titulo.length ; x++ ){
			imprimir = imprimir + "─";
		}
		// Espacios a la izquierda de los números
		// este es un caracter y no un espacio (Caracter Ascii 255)
		var espacio = " ";
		// array
		if( arrayDatos.length>0 ){
			for( var x=0 ; x<arrayDatos.length ; x++ ){
				imprimir	= imprimir + saltoLinea +"│ ";
				
				for( var y=0 ; y<(((arrayDatos.length -1) +"").length - (x +"").length)  ; y++ ){
					imprimir	= imprimir + espacio;
				}
				
				imprimir = imprimir + x +" [►"+ arrayDatos[x] +"◄]";
			}
		}
		
		// línea 2
		imprimir = imprimir + saltoLinea +"└";
		for( var x=1 ; x<titulo.length ; x++ ){
			imprimir = imprimir + "─";
		}
		
		// alert final
		if( modo == "alert" ){
			alert(imprimir)
		} else if( modo == "console" ) {
			console.log(imprimir);
		} else if( modo == "html" ) {
			$("body").append(
				"<div class=\"imprimirArray\" style=\"text-align: left;\">"
					+ imprimir
				+"</div>"
			);
			
		} else {
			alert(imprimir);
		}
	}
};