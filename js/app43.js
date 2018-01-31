 var config = {
    apiKey: "AIzaSyBtIwxxhd-VUEdje1Q8FhHkhWc3-ihsmUQ",
    authDomain: "fotogramashow.firebaseapp.com",
    databaseURL: "https://fotogramashow.firebaseio.com",
    projectId: "fotogramashow",
    storageBucket: "fotogramashow.appspot.com",
    messagingSenderId: "454182483820"
};

firebase.initializeApp(config);

 // Get a reference to the storage service, which is used to create references in your storage bucket
var imagesFBRef = firebase.database().ref().child('fotos').orderByChild("v_p_notW").equalTo("cat_3");
var paginaActual = 1;

$( document ).ready(function() {
    console.log( "ready!" );
    $('.materialboxed').materialbox();
    loadImages();  
    $(".dropdown-button").dropdown();  
    $(".button-collapse").sideNav();     
});

function loadImages(){
  imagesFBRef.on("value",function(snapshot){

    var datos = snapshot.val();
    // load paginador
    var itemPorPagina = 6;

    if (datos == null){
      document.getElementById('addPhoto').innerHTML = `<h4 style="color: #315594;padding: 10px;" > No hay elemetos para mostrar</h4>`;    
    }else {

      var numeroImagenes = Object.keys(datos).length;

      var numeroPaginas = Math.ceil(numeroImagenes/itemPorPagina) ;
      console.log("numeroImagenes",numeroImagenes);
      console.log("itemPorPagina",itemPorPagina);
      console.log("numeroPaginas",numeroPaginas);
       
      paginato(numeroPaginas,paginaActual);
      writeImageDom(datos,itemPorPagina,numeroImagenes,0);
      
      $('.materialboxed').materialbox();

      $('.check').click(function(){
        var codigo =$(this).attr('alt');
        var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
        updateRefFB.update({v_p_notW:"false"});
        updateRefFB.update({v_p_w:"false"});
        console.log("codigo:",codigo);
        
      });

      $('.favoriteBtn').click(function(){
        var codigoTotal =$(this).attr('alt');
        var codigo ="";
        if (codigoTotal.includes("star_border")){
          codigo = codigoTotal.replace("star_border","");
          var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
          updateRefFB.update({v_p_w:"cat_3"});
        }else {
          codigo = codigoTotal.replace("star","");
          var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
          updateRefFB.update({v_p_w:"false"});
        }
        console.log("codigo:",codigo);
        
      });

      $('#btnRight').click(function(){
        if (paginaActual == numeroPaginas){
        }else {
          var aux = `#pag_`+paginaActual;
          $(aux).removeClass("active");
          paginaActual = paginaActual +1;
          var inicioItems = itemPorPagina * (paginaActual-1 )  ;
          console.log("btnRight");
          console.log("paginaActual", paginaActual);
          var aux = `#pag_`+paginaActual;
          $(aux).addClass("active");
          writeImageDom(datos,itemPorPagina,numeroImagenes,inicioItems);
          $('.materialboxed').materialbox();

          $('.check').click(function(){
            var codigo =$(this).attr('alt');
            var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
            updateRefFB.update({v_p_notW:"false"});
            updateRefFB.update({v_p_w:"false"});
            console.log("codigo:",codigo);
         });
          $('.favoriteBtn').click(function(){
            var codigoTotal =$(this).attr('alt');
            var codigo ="";
            if (codigoTotal.includes("star_border")){
              codigo = codigoTotal.replace("star_border","");
              var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
              updateRefFB.update({v_p_w:"cat_3"});
            }else {
              codigo = codigoTotal.replace("star","");
              var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
              updateRefFB.update({v_p_w:"false"});
            }
            console.log("codigo:",codigo);
            
          });
        }
      });

      $('#btnLeft').click(function(){
          if (paginaActual == 1){
          }else {
            var aux = `#pag_`+paginaActual;
            $(aux).removeClass("active");
            paginaActual = paginaActual -1;
            var inicioItems = itemPorPagina * (paginaActual-1 ) ;
            console.log("btnLeft");
            console.log("paginaActual", paginaActual);
            var aux = `#pag_`+paginaActual;
            $(aux).addClass("active");
            writeImageDom(datos,itemPorPagina,numeroImagenes,inicioItems);
            $('.materialboxed').materialbox();

            $('.check').click(function(){
              var codigo =$(this).attr('alt');
              var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
              updateRefFB.update({v_p_notW:"false"});
              updateRefFB.update({v_p_w:"false"});
              console.log("codigo:",codigo);
            });

            $('.favoriteBtn').click(function(){
              var codigoTotal =$(this).attr('alt');
              var codigo ="";
              if (codigoTotal.includes("star_border")){
                codigo = codigoTotal.replace("star_border","");
                var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
                updateRefFB.update({v_p_w:"cat_3"});
              }else {
                codigo = codigoTotal.replace("star","");
                var updateRefFB = firebase.database().ref().child('fotos/'+codigo);
                updateRefFB.update({v_p_w:"false"});
              }
              console.log("codigo:",codigo);
              
            });
          }
      });
    }
  })
}

function paginato(numeroPaginas, paginaActual){
  if(numeroPaginas == 0 | numeroPaginas == 1)
  {
    document.getElementById('paginas').innerHTML = "";
    return 0 ;  
  } else {
    var resultado = "";
    var liPaginas ="";
    console.log("numeroPaginas",numeroPaginas);
    console.log("paginaActual",paginaActual);
    for (var i = 1; i <= numeroPaginas; i++){
      if (i == paginaActual){
        liPaginas += `<li id="pag_`+i+`" class="active"><a >`+i+`</a></li>`;
      }else {
        liPaginas += `<li id="pag_`+i+`" class="waves-effect"><a>`+i+`</a></li>`;
      } 
    }
    resultado = `<ul class="pagination">
                    <li class="waves-effect">
                      <a id="btnLeft"><i class="material-icons">chevron_left</i></a>
                    </li>`
                      + liPaginas+`
                    <li class="waves-effect">
                      <a id="btnRight" ><i class="material-icons">chevron_right</i></a>
                    </li>
                </ul>`;
    document.getElementById('paginas').innerHTML = resultado;
  }
}

function writeImageDom(datos, itemPorPagina,numeroImagenes,inicio){
  if (numeroImagenes == 0){
      document.getElementById('addPhoto').innerHTML = "";
  }else {
    var resultado = "";
    var key ="";
    var i = 0;
    var final = 0;
    if ( (inicio+itemPorPagina)>numeroImagenes){
      final = numeroImagenes; 
    } else {
      final = inicio+itemPorPagina;
    }
    console.log('final', final);
    console.log('inicio', inicio);
    // load cartas
    for (var key in datos){
      if (i >= inicio && i< final){
        if(datos[key].v_p_w == "cat_3"){
          resultado += `<div class="col s6 m3 ">
                      <div id="12ab" class="card">
                        <div class="card-image ">  
                          <a target="_blank" href="`+datos[key].urlImagen+`"> 
                            <img style="min-height=300px;" src="`+datos[key].urlImagen_thumb+`">
                          </a>
                          <a class="btn-floating halfway-fab waves-effect waves-light red" style="left: 24px; right: 0px;">
                            <i alt="`+key+`" class="check material-icons">clear</i>
                          </a>
                           <a class="btn-floating halfway-fab waves-effect waves-light green">
                            <i alt="`+key+"star"+`" class="favoriteBtn material-icons">star</i>
                          </a>

                        </div>
                        <div class="card-content">
                          <p style="text-align:left; font-weight:bolder;">Código</p>
                          <p class="key1" style="text-align:center">`+key+`</p>    
                        </div>
                      </div>
                    </div>`;
        }else if(datos[key].v_p_w == "false") {
          resultado += `<div class="col s6 m3 ">
                      <div id="12ab" class="card">
                        <div class="card-image ">  
                          <a target="_blank" href="`+datos[key].urlImagen+`"> 
                            <img style="min-height=300px;" src="`+datos[key].urlImagen_thumb+`">
                          </a>
                          <a class="btn-floating halfway-fab waves-effect waves-light red" style="left: 24px; right: 0px;">
                            <i alt="`+key+`" class="check material-icons">clear</i>
                          </a>
                          <a class="btn-floating halfway-fab waves-effect waves-light green">
                            <i alt="`+key+"star_border"+`" class="favoriteBtn material-icons">star_border</i>
                          </a>

                        </div>
                        <div class="card-content">
                          <p style="text-align:left; font-weight:bolder;">Código</p>
                          <p class="key1" style="text-align:center">`+key+`</p>
                        </div>
                      </div>
                    </div>`;

        }


        

       console.log("url",key);
      }
      i= i+1;  
    }
    document.getElementById('addPhoto').innerHTML = resultado;
  } 
}
