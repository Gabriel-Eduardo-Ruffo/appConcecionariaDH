/* requerir módulo autos */
const autos= require('./autos');

let concesionaria = {
    autos: autos,
    buscarAuto: function buscarAuto(patente){
      for(let i = 0; i<autos.length; i++){
         if( concesionaria.autos[i].patente==patente){
            return concesionaria.autos[i];
         }
      }
      return null;
    },
    venderAuto: function venderAuto(patente){
       let autoVendido = this.buscarAuto(patente);
       if(autoVendido != null){
          autoVendido.vendido = true;
       }
    },
    autosParaLaVenta : function autosParaLaVenta(){
       let autosPosiblesVender = this.autos.filter(autosTemp => autosTemp.vendido == false );
       return autosPosiblesVender;
    },
    autos0KM: function autos0KM(){
       let autos0KM = this.autosParaLaVenta().filter(autosTemp =>autosTemp.km <100);
       return autos0KM;
    },
    listaDeVentas: function listaDeVentas(){
       let listaPrecioAutosVendidos =[];
       let listaAutosVendidos = this.autos.filter(autosTemp => autosTemp.vendido == true );
       for(let i = 0; i<listaAutosVendidos.length;i++ ){
         listaPrecioAutosVendidos.push(listaAutosVendidos[i].precio);
       }
       return listaPrecioAutosVendidos;
    },
      totalDeVentas: function totalDeVentas(){
         if(this.listaDeVentas().length<1)
         return 0;
         let totalPrecioVentaAutos = this.listaDeVentas().reduce((accumulador, valor) => accumulador + valor);
         return totalPrecioVentaAutos;
      },
         puedeComprar: function puedeComprar(objAuto,objPersona){
            if(objAuto.precio <= objPersona.capacidadDePagoTotal && 
               (objAuto.precio/objAuto.cuotas) < objPersona.capacidadDePagoEnCuotas)
            {
               return true;
            }
            return false;
      },
       autosQuePuedeComprar: function autosQuePuedeComprar(objPersona){
         let listaAutosPuedeComprar =[];
         let listaAutosStock = this.autos.filter(autosTemp => autosTemp.vendido == false );
         for(let i = 0; i<listaAutosStock.length;i++ ){
            if(concesionaria.puedeComprar(listaAutosStock[i],objPersona)){
               listaAutosPuedeComprar.push(listaAutosStock[i]);
            }            
         }
         return listaAutosPuedeComprar;
       }
};
       //console.log(concesionaria.venderAuto('APL123'));
       //console.log(concesionaria.autos);
       //console.log(concesionaria.autosParaLaVenta);
       //console.log(concesionaria.listaDeVentas());
       //console.log(concesionaria.totalDeVentas());
       /*
      console.log(
      concesionaria.puedeComprar
      ({
         marca: 'Toyota',
         modelo: 'Corolla',
         color: 'Blanco',
         anio: 2019,
         km: 0,
         precio: 100000,
         cuotas: 14,
         patente: 'JJK116',
         vendido: false
      },{
         nombre: 'Juan',
         capacidadDePagoEnCuotas: 20000,
         capacidadDePagoTotal:    100000
      })
      )
      */
      console.log(concesionaria.autosQuePuedeComprar(
      {
         nombre: 'Juan',
         capacidadDePagoEnCuotas: 20000,
         capacidadDePagoTotal:    100000
      }
      ));
      