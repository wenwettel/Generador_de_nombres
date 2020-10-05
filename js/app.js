document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Llamado a AJAX e imprimir resultado
function cargarNombres(e) {
    e.preventDefault();

    // Leer las variables

    const origen = document.getElementById('origen');
    //para un select tenemos que parsarle un segundo parametro
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;


    // Construir la URL

    let url = '';
    url += 'https://randomuser.me/api/?inc=results,name,gender,nat&';

    //Si hay origen agregarlo a la URL
    if(origenSeleccionado !== '') {
        url += `nat=${origenSeleccionado}&`;
    }
    //Si hay un genero agregarlo a la URL
    if(generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }
    //Si hay una cantidad agregarlo a la URL
    if(cantidad !== '') {
         url += `results=${cantidad}&`;
    }
    
    // Conectar con AJAX 
    // Iniciar XMLHTTPRequest

    const xhr = new XMLHttpRequest();
    // abrimos la conexion
    xhr.open('GET', url, true);
    // Datos e impresion del template
    xhr.onload = function () {
        if(this.status === 200) {

            const resultado = JSON.parse(this.responseText);
            const nombres = resultado.results;

            
            // Generar HTML
            let htmlNombres = '<h2>Nombres Generados</h2>'

            htmlNombres +=  '<ul class="lista">';

            // Imprimir cada nombre
            nombres.forEach(function(nombre) {
                htmlNombres += `
                            <li>${nombre.name.first}
                `;
                
            })

            htmlNombres += '</ul>';

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    // Enviar el Request
    xhr.send(); 

}



