//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo POST
function registrar() {

    let client_id={
        idClient: $("#client_id").val()
    }

    let costume_id={
        id: $("#costume_id").val()
    }

    //crea un objeto javascript
    let datos={
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client: client_id,
        costume: costume_id
    }

    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);

    if (validar()){
        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://144.22.227.164:8080/api/Reservation/save",
            
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
            data : datosPeticion,
    
            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'POST',
    
            contentType:"application/JSON",
    
            // el tipo de información que se espera de respuesta
            //dataType: 'json',
    
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.log(respuesta);
                $("#mensajes").show(1000);
                $("#mensajes").html("Registro ingresado...");
                $("#mensajes").hide(1000);
                listar();
                estadoInicial();
            },
    
            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                $("#mensajes").show(1000);
                $("#mensajes").html("Error peticion POST..." + status );
                //$("#mensajes").hide(1000);
            }
        });
    }
}

function listarClientes() {
    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://144.22.227.164:8080/api/Client/all",
        
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
        //data : { id : 1, ...},

        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            
            armaListaClientes(respuesta);
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            //$("#mensajes").hide(1000);
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            $("#mensajes").html("Obteniendo listado de ...");
            $("#mensajes").hide(1000);
        }
    });
}

function armaListaClientes(items){
    $("#listado").html("");
    $("#listado").show(500);

    var lista =` <option value="" selected>--Selecciona un cliente--</option>`;

    for (var i=0; i< items.length; i++){
        lista += ` <option value="${items[i].idClient}">${items[i].name}</option> `;
    }

    $("#client_id").html(lista);

}


function listarDisfraces() {
    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://144.22.227.164:8080/api/Costume/all",
        
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
        //data : { id : 1, ...},

        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            
            armaListaDisfraces(respuesta);
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            //$("#mensajes").hide(1000);
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            $("#mensajes").html("Obteniendo listado de ...");
            $("#mensajes").hide(1000);
        }
    });
}

function armaListaDisfraces(items){
    $("#listado").html("");
    $("#listado").show(500);

    var lista =` <option value="" selected>--Selecciona un disfraz --</option>`;

    for (var i=0; i< items.length; i++){
        lista += ` <option value="${items[i].idClient}">${items[i].name}</option> `;
    }

    $("#costume_id").html(lista);

}

/**
 * Configura el aspecto de la página para ingresar un nuevo registro
 */
function activaNuevo(){
    $("#nuevo").show(500);
    $("#id").focus();
    $("#editar").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    listarClientes();
    listarDisfraces();
}