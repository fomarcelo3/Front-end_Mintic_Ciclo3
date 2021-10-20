/*
    Esta función recibe como parametro el id del registro a eliminar,
    ejecuta la petición asincrona al servidor de Oracle enviando dentro de los datos 
    de la petición registro a eliminar. El tipo de petición es DELETE
*/
function borrarRegistro(llaveRegistro) {

    let datos = {
        "id":llaveRegistro
    }

    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        url: "https://g713b8b957367f3-db202109230628.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        data: datosPeticion,
        type: 'DELETE',
        contentType:"application/JSON",

        success: function(respuesta){
            console.log(respuesta);
            $("#mensajes").show(1000);
            $("#mensajes").html("Registro eliminado...");
            $("#mensajes").hide(1000);
            listar();

        },
        error: function(xhr, status){
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            $("#mensajes").hide(1000);
        }
    });
    
}