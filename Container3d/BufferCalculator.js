var CILINDRO;
CILINDRO = "cilindro";
var CUBO;
CUBO = "cubo";
var ESFERA;
ESFERA = "esfera";


class BufferCalculator{

    constructor(figura, rows, colms, radio = 0){
    /*recibe el tipo de figura como string
    y las dimensiones como columnas y filas*/
    this.figura = figura;
    this.rows = rows;
    this.colms = colms;
    this.radio = radio;

    this.posBuffer = [];
    this.colorBuffer = [];
    this.normalBuffer = [];
    this.indexBuffer = [];
    }

    calculateBuffer(){

      if(this.figura == CILINDRO){
        this.calcBuffersCil();
      }
      if(this.figura == ESFERA){
        this.calcBufferEsfera();
      }
      this.calcIndexBuffer();
    }

    calcBuffersCil(){


      var theta = (2*Math.PI)/(this.colms - 1);

      for (var i = 0.0; i < this.rows; i++){
        for (var j = 0.0; j < this.colms; j++){
            if (i == 0.0 || i == (this.rows-1)){
                //Si el i==0, -cos(0)=-1, si i==rows-1, -cos(pi)=1
                var sentido = -Math.cos(Math.PI*i/(this.rows-1));
                //La variable X es 0, el centro
                this.posBuffer.push(Math.cos(theta*j));
                //Altura Y se mantiene igual en el pasaje de coordenadas
                this.posBuffer.push(i-( (this.rows-1) + (sentido*2))/2.0);
                //La variable Z se define como R*Sen(theta)
                this.posBuffer.push(0);

                this.colorBuffer.push(Math.cos(theta*j) / 2.0);
                this.colorBuffer.push(i-( (this.rows-1) + (sentido*2))/2.0);
                this.colorBuffer.push(0);
              }
              else {
                // Para cada vertice definimos su posicion
                // como coordenada (x, y, z=0)
                //La variable X se define como R*Cos(theta)
                this.posBuffer.push(this.radio*Math.cos(theta*j));
                //Altura Y se mantiene igual en el pasaje de coordenadas
                this.posBuffer.push(i-(this.rows-1)/2.0);
                //La variable Z se define como R*Sen(theta)
                this.posBuffer.push(this.radio*Math.sin(theta*j));

                this.colorBuffer.push(this.radio*Math.cos(theta*j) / 2.0);
                this.colorBuffer.push(i-(this.rows-1)/2.0);
                this.colorBuffer.push(this.radio*Math.sin(theta*j) / 2.0);
              }

        }
      }
    }

    calcBuffersCubo(){
    }

    calcBufferEsfera(){
      var latNumber;
      var longNumber;

      for (latNumber=0; latNumber <= this.rows; latNumber++) {
          var theta = latNumber * Math.PI / this.rows;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta);

          for (longNumber=0; longNumber <= this.colms; longNumber++) {
              var phi = longNumber * 2 * Math.PI / this.colms;
              var sinPhi = Math.sin(phi);
              var cosPhi = Math.cos(phi);

              var x = cosPhi * sinTheta;
              var y = cosTheta;
              var z = sinPhi * sinTheta;
              var u = 1.0 - (longNumber / this.colms);
              var v = 1.0 - (latNumber / this.rows);

              this.normalBuffer.push(x);
              this.normalBuffer.push(y);
              this.normalBuffer.push(z);

              // Mejorar o modificar el algoritmo que inicializa
              // el color de cada vertice
              this.colorBuffer.push(0.0)
              this.colorBuffer.push(0.0)
              this.colorBuffer.push(0.0)

              this.posBuffer.push(x);
              this.posBuffer.push(y);
              this.posBuffer.push(z);
          }
      }
    }

    calcIndexBuffer(){

      for (var i = 0; i < (this.rows - 1); i++){
        //Si las filas son cero o pares se recorre a la derecha y sino a la izquierda
          if ((i % 2) == 0){
              //Recorrido hacia la derecha
              var init = this.colms*i;
              var next = this.colms*(i+1);
              for (var j = 0; j < this.colms; j++){
                  this.indexBuffer.push(init + j);
                  this.indexBuffer.push(next + j);
              }
          }
          else{
              //Recorrido hacia la izquierda
              var init = this.colms*(i+1) - 1;
              var next = this.colms*(i+2) - 1;
              for (var j = 0; j < this.colms; j++){
                  this.indexBuffer.push(init - j);
                  this.indexBuffer.push(next - j);
              }
          }
        }
    }


    getPosBuffer(){
      return this.posBuffer;
    }

    getColorBuffer(){
    return this.colorBuffer;
    }

    getIndexBuffer(){
    return this.indexBuffer;
    }

    getNormalBuffer(){
    return this.normalBuffer;
    }

}
