                                                    //    Jeb&Dev
// VARIABLES   
const carrito = document.querySelector("#carrito");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

const listaCursos = document.querySelector("#lista-cursos");

let articulosCarrito = [];



cargarEventListeners();

function cargarEventListeners(){
    //Cuando Agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        // console.log("desde vaciar carrito....");
        articulosCarrito = []; //reseteamos el arreglo

                limpiarHTML();// eliminamos todo el html.

    })
    
}

// FUNCIONES
function agregarCurso(e){//Añade curso al carrito.
    e.preventDefault()
    //delegation para agregar-carrito
    if(e.target.classList.contains("agregar-carrito")){
        const curso  = e.target.parentElement.parentElement;
        //Enviamos el curso selecionado para tomar sus datos.
        leerDatosCurso(curso)
    }
}

//Eliminar cursos del carrito.
function eliminarCurso(e){
// console.log(e.target.classList);
    e.preventDefault();
if(e.target.classList.contains('borrar-curso')){
console.log(e.target.getAttribute('data-id'));
    const cursoId = e.target.getAttribute('data-id');

// Elimmina del arreglo de articulosCarrito por el data-id
articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
console.log(articulosCarrito);

    carritoHTML();//Iterarr sobre el carrito y mostrarlo en el HTML
}
}


//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso.
function leerDatosCurso(curso){
    //Crear un objeto con el contenido del curso actual.
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito.
    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()

}

//Muestra el carrito de compras en el html.
function carritoHTML(){
   //Limpiar el HTML
   limpiarHTML();

   //Recorre el carrito y genera HTML
   articulosCarrito.forEach(curso => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
        <img src="${curso.imagen}" width=100> 
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        //Agregar el hTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    });
} 

//Elimina los cursos de tbody.
function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = "";  //string vacio

    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }//Este codigo se ejecuta mientras haya un elemneto dentro, una vez limpiado todo ya no se ejecuta.
}

//Jeb&Dev















                                                                                                                            // Jeb&Dev