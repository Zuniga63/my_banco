window.addEventListener('load', ()=>{
  document.getElementById('preload').classList.remove('show');
})

/**
 * Instancia para controlar el estado de los campos
 * y el estado de los procesos
 */
class State{
  constructor(){
    this.hasError = false;
    this.message = "";
  }
}

/**
 * Instancia para controlar el estado del loby
 */
class Loby{
  constructor(){
    this.visibility = false;
    this.bankerName = '';
    this.bankerNameState = new State();
    this.password = "";
    this.passwordState = new State();
  }
}

const vm = new Vue({
  el: '#app',
  data:{
    author: "Andrés Felipe Zúñiga",
    version: '1.0',
    loby: new Loby(),
    bank: new Bank(),
  },//Fin de data
  methods:{
    /**
     * Intenta crear al banquero para dar inicio al proceso de juego
     */
    startNewGame(){
      if(this.lobyCorrect){
        let bankerName = this.loby.bankerName;
        let password = this.loby.password;
        let process = this.bank.createTheBanker(bankerName, password);

        //Si el proceso de creacion fue sactifactorio se actualizan los datos
        if(process.result){
          this.loby.bankerName = '';
          this.loby.password = '';
          this.loby.visibility = false;
        }
      }//Fin de if
    },//Fin del metodo
    /**
     * Verifica que el nombre del banquero sea minimo de tres letras
     * y actualiza el estado del campo
     */
    validateBankerName(){
      let bankerName = this.loby.bankerName;
      bankerName = bankerName.trim();
      let error = false;
      let message = '';

      if(bankerName){
        if(bankerName.length < 3){
          error = true;
          message = "El nombre es demasiado corto";
        }
      }else{
        error = true;
        message = "Este campo es obligatorio";
      }

      this.loby.bankerNameState.hasError = error;
      this.loby.bankerNameState.message = message;
    },//Fin del metodo
    validateBankerPassword(){
      let password = this.loby.password;
      let error = false;
      let message = "";

      if(password && password.length > 0){
        if(password.length < 4){
          error = true;
          message = "La contraseña es demasiado corta";
        }
      }else{
        error = true;
        message = "Este campo es obligatorio";
      }

      this.loby.passwordState.hasError = error;
      this.loby.passwordState.message = message;
    }

  },//Fin de methods
  computed:{
    /**
     * Verifica que los dos campos del loby esten debidamente diligenciados
     */
    lobyCorrect(){
      let bankerName = this.loby.bankerName;
      let password = this.loby.password;
      let result = false;

      if(bankerName && bankerName.length >= 3 && password && password.length >= 4){
        result = true;
      }

      return result;
    },//Fin del metodo
    
  },//Fin de computed
  created(){
    this.loby.visibility = true;
    //El siguiente codigo es para que se salte el loby
    this.loby.bankerName = "Andrés Felipe";
    this.loby.password = "0000";
    this.startNewGame();
  },//Fin de create
})