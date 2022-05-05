//div1 
var div1=document.createElement("div");
div1.setAttribute("id","div1");
//Boton para jugar
var btnJugar = document.createElement("button");
btnJugar.setAttribute("id", "btnJugar"); 
btnJugar.innerText="Empezar partida";
btnJugar.addEventListener("click",function(e){
    var nombre=prompt("dime tu nombre");
    //validacion para que le obliguemos a meter el nombre y apellido
    if (nombre!="") {
        var apellido=prompt("dime tu apellido");
        console.log("nombre: "+nombre);
        if (apellido!="") {
            console.log("apellido: "+apellido);
            alert("campos añadidos correctamente "+nombre+" "+apellido);
            alert("mucha suerte,creando tablero...")
            montarTablero();
        }
    }else{
        alert("campos introducidos");
       //zona de la validacion de la fecha 
       crearTablero();//llamamos a la nueva funcion que crea la nueva tarea
       //al pulsar el boton , si ambos inputs tienen datos se creará una nueva tarea
    }});
div1.appendChild(btnJugar);
//para imprimir todo lo que hay dentro del div1
document.body.append(div1);
// montarTablero();
//funcion que monta el tablero decanvas
function montarTablero(){
    console.log("entra en la funcion de montar tablero");
    //eliminamos los otros elementos creados
    document.body.removeChild(div1);
    canvas=document.createElement("canvas");
    canvas.setAttribute("id","mycanvas");
    canvas.setAttribute("width","600");
    canvas.setAttribute("height","400");
    document.body.append(canvas);

    //variables de canvas
    var canvas=document.getElementById("mycanvas");
    var ctx=canvas.getContext("2d");

    //variables para definir la posicion incial donde se dibuja la pelota
    var x=canvas.width/2;
    var y=canvas.height/2;
    var radioPelota=10;//radio de la pelota
    //creamos dos variables para que parezca que la pelota se esta moviendo (para los fotogramas)
    var dx=2;
    var dy=-2;
    //tamaño de la paleta
    var ph=10;
    var pw=80;
    var px=(canvas.width-pw)/2;
    //botones izquierdo y derecho
    var btnIzquierdo=false;
    var btnDerecho=false;
    //variables para los brick
    var brickFilas = 3;//numero de filas
    var brickColumnas = 9;//numero de columnas
    var bw = 50;//ancho
    var bh = 20;//alto
    var bPadding = 5;//hueco entre los ladrillos
    var bMargenTop = 30;//margen superior
    var bMargenIzquierdo = 30;//margen izquierdo
    //guardamos todo en un array cada ladrillos que generemos
    var bricks = [];
    for(c=0; c<=brickColumnas; c++) {
        bricks[c] = [];//brick 00 columna 0 fila 0 que se dibuja en la coordenada 0 0
        for(r=0; r<=brickFilas; r++) {
            bricks[c][r] = { x: 0, y: 0 ,status:1};//si estatus vale 1 , lo dibujamos , si vale 0 no
        }
    }
    //evento cuando pulsa el boton te vas a una funcion u otra
    document.addEventListener("keydown",btnPulsado);//se pulsa la tecla, comienzo de la presión.
    document.addEventListener("keyup",btnSoltado);//La tecla es soltada.
    /**
     * 
     * Flecha arriba: 38
     * Flecha abajo: 40
     * -----------------
     * Flecha izquierda: 37
     * Flecha  derecha: 39
     */
    function btnPulsado(e) {
        console.log("entra en la funcion btnPulsado");
        console.log(e);//para ver como va el evento
        if (e.keyCode==37) {
            console.log(e);
            btnIzquierdo=true;
        }else if (e.keyCode==39) {
            btnDerecho=true;
        }
    }
    
    function btnSoltado(e) {
        console.log("entra en la funcion btnSoltado");
        if (e.keyCode==37) {
            btnIzquierdo=false;
        }else if (e.keyCode==39) {
            btnDerecho=false;
        }
    }
    
    //funcion para dibujar el balon del juego
    function dibujarBalon() {           
        ctx.beginPath();//apertura de pintar
        console.log("valor del radio del circulo: "+r);
        ctx.arc(x,y,radioPelota,0,Math.PI*2);//para el circulo 
        ctx.fillStyle = 'orange';//para ponerlo de color 
        ctx.fill();//relleno 
        ctx.closePath();//cierre al pintar
        
        
    }
    //para pintar la bandeja 
    function dibujarPaleta() {
        ctx.beginPath();
        ctx.rect(px,canvas.height-ph,pw,ph);//para pintar la paleta
        ctx.fill();
        ctx.closePath();
    }
    //funcion para los ladrillos dl juego
    function dibujarLadrillos() {
        // var img = document.createElement("img");
        // img.setAttribute("id","bloque");
        // img.src = "assets/img/bloque.png";
        // var img=document.getElementById("bloque");
        // var pattern=ctx.createPattern(img,"repeat");
        
        for(c=0; c<brickColumnas; c++) {
            for(r=0; r<brickFilas; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (c*(bw+bPadding))+bMargenIzquierdo;
                    var brickY = (r*(bh+bPadding))+bMargenTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    console.log("valor de brick x: "+brickX);
                    console.log("valor de brick y: "+brickY);
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, bw, bh);
                    ctx.fillStyle="pattern";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }    
    //funcion para un contador
    var puntuacion=0;
    function dibujarPuntuacion() {
        ctx.font = "16px Arial";
        ctx.fillText("Puntuacion: "+puntuacion, 8, 20);
    }
    var oportunidades=3;
    //funcion de las oportunidades
    function dibujarOportunidades() {
    ctx.font = "16px Arial";
    ctx.fillText("Oportunidades: "+oportunidades, canvas.width/2+30, 20);
    }
    //funcion que llama a las funciones que dibujan cada parte deljuego
    /**
     * @function clearRect()
     * este metodo lo que hace es borrar el contenido del lienzo entonces cuando 
     * pintemos una pelota nueva como fotograma , no habra problema.
     */
    function dibujar() {   
        ctx.clearRect(0,0,canvas.width,canvas.height);
        dibujarBalon();
        dibujarPaleta();
        dibujarLadrillos();
        dibujarPuntuacion();
        dibujarOportunidades();
        collisionDetection();
        
        x= x + dx;
        y= y + dy;
        //para que no se salga la pelota de los margenes de las paredes
        /**
         * l
         */
        if(x + dx > canvas.width-r || x + dx < radioPelota) {
            dx = -dx;
            console.log("valor de dx: "+dx);
        }
        if(y + dy < r) {
            dy = -dy;
            console.log("valor de dy: "+dy);
        }
        else if(y + dy > canvas.height-radioPelota) {
            if(x > px && x < px + pw) {
                dy = -dy;
                console.log("valor de dy: "+dy);
            }
            else {
                oportunidades--;
                if(!oportunidades) {
                    alert("HAS PERDIDO :( ");
                    document.location.reload();
                }
                else if (oportunidades==2) {
                    x = canvas.width/2;
                    y = canvas.height/2;
                    dx=3;
                    dy=-3;//aumentamos la velocidad
                    px = (canvas.width-pw)/2;
                }else if (oportunidades<=1) {
                    x = canvas.width/2;
                    y = canvas.height/2;
                    dx=4;
                    dy=-4;//aumentamos la velocidad
                    px = (canvas.width-pw)/2;    
                }
            }
        }
        
        if(btnDerecho && px < canvas.width-pw) {
            px += 5;
        }
        else if(btnIzquierdo && px > 0) {
            px -= 5;
        }
        
    }
    setInterval(dibujar,10);
    //funcion para detectar las colisiones
    function collisionDetection() {
        for(c=0; c<brickColumnas; c++) {
            for(r=0; r<brickFilas; r++) {
                var brickes = bricks[c][r];//columna y fila -->lo metemos en una variable para la condicion
                if(brickes.status == 1) {
                    if(x > brickes.x && x < brickes.x+bw && y > brickes.y && y < brickes.y+bh) {
                        dy = -dy;
                        brickes.status = 0;//lo oculta si la elota colisiona con el ladrillo
                        //satus =0 hace que se quede 
                        puntuacion++;
                        //mensaje de que ha gando
                        if(puntuacion == brickFilas*brickColumnas) {
                            alert("HAS GANADO!!!!!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

}
