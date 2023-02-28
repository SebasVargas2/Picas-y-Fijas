// Declaracion de variables

const numPc=[]
let numPlayer=[]
let numPlayer2=0
let picas=0
let fijas=0
let parejas=[]
let cont=1
let contenido=''

const enviar=document.getElementById('enviar') 
enviar.addEventListener('click',envio) //ponemos a la esucha el boton Enviar

while (numPc.length<4){   
    let pc=Math.floor(Math.random()*9)+1
    if (numPc.indexOf(pc)===-1){
        numPc.push(pc)
    }
} 
console.log(numPc)
// Este ciclo genera un numero random y lo agrega al array siempre
// y cuando no se haya ingresado antes y repite el ciclo 


// La siguiente funcion valida el envio del numero del jugador
function envio(){ 
    let numero=document.getElementById('ingreso')
    let recibi=(numero.value).split('').map(i => parseInt(i))

    if (recibi=='' || recibi.length!=4){
        alert('Es necesario digitar 4 numeros')
    }else{
        for (i=0;i<recibi.length;i++){  //Verificamos si esta repetido
            if (numPlayer.includes(recibi[i])){
                alert('Los numeros estas duplicados')
                break;
            }else{
                numPlayer.push(recibi[i]) //Añadimos el numero correcto sin duplicados
            }
        }
        if (numPlayer.length!=4){ //Si el numero no esta completo, damos la opcion de volver a poner los datos
            numero.value=''
            volver()
            cont++
        }else{
            numPlayer2=numPlayer.join('') //Convertimos a str 
            
            funcionalidad() //llamamos la funcion principal
            contenido2() //llamamos la pantalla
            gano() //llamamos la alerta de ganar
            volver() //llamamos a volver
            numero.value=''
            cont++
        }
    }
}


function contenido2(){ //Creacion de la tabla
    contenido=''
    contenido+=`<table style="border: 1px solid black;">`
    contenido+=`<tr>`
    contenido+=`<th>Numero</th>`
    contenido+=`<th>Picas</th>`
    contenido+=`<th>Fijas</th>`
    contenido+=`</tr>`  

    for (k=0;k<parejas.length;k++){ //agregamos la info a la tabla 
        contenido+=`<tr>`
        contenido+=`<td>${parejas[k].numPlayer2}</td>`
        contenido+=`<td>${parejas[k].picas}</td>`
        contenido+=`<td>${parejas[k].fijas}</td>`
        contenido+=`</tr>`
    }

    contenido+=`</table>`
    document.getElementById('pantalla').innerHTML=contenido
    
}


function funcionalidad(){   // funcionamiento del juego
    numPc.forEach(i => {
        for (j=0;j<4;j++){
            if (numPlayer2[j]==i){
                if (numPlayer2[j]==numPc[j]){
                    fijas++
                }else if(numPlayer2[j]!=numPc[j]){
                    picas++
                }
            }
        }
    })
    parejas.push({numPlayer2,picas,fijas}) // agregamos info a un diccionario
}


function gano(){  // Esta funcion muestra mensaje ganador
    let numPc2=parseInt(numPc.join(''))
    let numPlayer3=parseInt(numPlayer2)
    if (numPlayer3==numPc2){
        alert(`Ganaste, solo te tomo ${cont} intentos`)
        alert('Recuerda darle a resetear para volver a jugar')
        document.getElementById('pantalla').innerHTML=''  //limpiamos pantalla
    }
}


function reseteo(){  //esta funcion resetea la pagina completa
    let reset=document.getElementById('reseteo')
    reset.addEventListener('click',()=>{
        location.reload()  //funcion integrada, recarga pagina
    })
}
reseteo()


function volver(){ // Estas funcion resetea los datos obtenidos una vez se envia la info
    recibi=[]
    numPlayer=[]
    picas=0
    fijas=0
}

const acerca=document.getElementById('acerca')  //Nombre del desarrollador
acerca.addEventListener('click',()=>{
    contenido=''
    contenido+='Este proyecto Fue realizado por<br>'
    contenido+='Sebastian Vargas Paez'
    document.getElementById('pantalla').innerHTML=contenido
})