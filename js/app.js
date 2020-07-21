window.addEventListener('load', () => {
  document.getElementById('preload').classList.remove('show');
})

/**
 * Instancia para controlar el estado de los campos
 * y el estado de los procesos
 */
class State {
  constructor() {
    this.hasError = false;
    this.message = "";
  }
}

/**
 * Instancia para controlar el estado del loby
 */
class Loby {
  constructor() {
    this.visibility = false;
    this.bankerName = '';
    this.bankerNameState = new State();
    this.password = "";
    this.passwordState = new State();
  }
}

class DashBoard {
  constructor() {
    this.visibility = false;
    this.currentTab = 'Jugadores';
    this.tabs = ['Jugadores', 'Aduanas', 'Estadisticas']
  }
}

class NewPlayerModal {
  constructor() {
    this.visible = false;
    this.playerName = "";
    this.playerNameState = new State();
    this.password = "";
    this.passwordState = new State();
  }

  hidden() {
    this.visible = false;
    this.playerName = "";
    this.password = "";
    this.playerNameState.hasError = false;
    this.playerNameState.message = "";
    this.passwordState.hasError = false;
    this.passwordState.message = '';
  }
}

const vm = new Vue({
  el: '#app',
  data: {
    author: "Andrés Felipe Zúñiga",
    version: '1.0',
    bank: new Bank(),
    loby: new Loby(),
    dashBoard: new DashBoard(),
    modals: {
      newPlayer: new NewPlayerModal(),
    },
  },//Fin de data
  methods: {
    /**
     * Intenta crear al banquero para dar inicio al proceso de juego
     */
    startNewGame() {
      if (this.lobyCorrect) {
        let bankerName = this.loby.bankerName;
        let password = this.loby.password;
        let process = this.bank.createTheBanker(bankerName, password);

        //Si el proceso de creacion fue sactifactorio se actualizan los datos
        if (process.result) {
          this.loby.bankerName = '';
          this.loby.password = '';
          this.loby.visibility = false;
          this.dashBoard.visibility = true;
        }
      }//Fin de if
    },//Fin del metodo
    /**
     * Verifica que el nombre del banquero sea minimo de tres letras
     * y actualiza el estado del campo
     */
    validateBankerName() {
      let bankerName = this.loby.bankerName;
      bankerName = bankerName.trim();
      let error = false;
      let message = '';

      if (bankerName) {
        if (bankerName.length < 3) {
          error = true;
          message = "El nombre es demasiado corto";
        }
      } else {
        error = true;
        message = "Este campo es obligatorio";
      }

      this.loby.bankerNameState.hasError = error;
      this.loby.bankerNameState.message = message;
    },//Fin del metodo
    /**
     * Este metodo verifica que la contraseña sea de minimo 
     * cuatro caracteres para el bankero
     */
    validateBankerPassword() {
      let password = this.loby.password;
      let error = false;
      let message = "";

      if (password && password.length > 0) {
        if (password.length < 4) {
          error = true;
          message = "La contraseña es demasiado corta";
        }
      } else {
        error = true;
        message = "Este campo es obligatorio";
      }

      this.loby.passwordState.hasError = error;
      this.loby.passwordState.message = message;
    },//Fin del metodo

    validatePlayerName() {
      let result = false;
      let modal = this.modals.newPlayer;
      let playerName = modal.playerName;

      if (playerName) {
        if (playerName.length >= 3) {
          let isUnique = this.bank.uniquePlayerName(playerName);
          if (isUnique) {
            result = true;
            modal.playerNameState.hasError = false;
            modal.playerNameState.message = "";
          } else {
            modal.playerNameState.hasError = true;
            modal.playerNameState.message = "Nombre Repetido";
          }
        } else {
          modal.playerNameState.hasError = true;
          modal.playerNameState.message = "Nombre muy corto";
        }
      } else {
        modal.playerNameState.hasError = true;
        modal.playerNameState.message = "Campo obligatorio";
      }

      return result;
    },
    validatePlayerPassword() {
      let result = false;
      let modal = this.modals.newPlayer;
      let password = modal.password;
      if (password) {
        if (password.length >= 4) {
          result = true;
          modal.passwordState.hasError = false;
          modal.passwordState.message = "";
        } else {
          modal.passwordState.hasError = true;
          modal.passwordState.message = "Contraseña muy corta";
        }
      } else {
        modal.passwordState.hasError = true;
        modal.passwordState.message = "Campo obligatorio";
      }

      return result;
    },
    /**
     * Agrega el formato de moneda al valor pasado como parametro
     * @param {number} value Importe numerico
     */
    formatCurrency(value) {
      var formatted = new Intl.NumberFormat('es-Co', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(value);
      return formatted;
    },//Fin del metodo, 
    createNewPlayer() {
      let modal = this.modals.newPlayer;
      let playerName = modal.playerName.trim();
      let password = modal.password.trim();

      process = this.bank.newPlayer(playerName, password);
      if (process.result) {
        modal.hidden();
      }//Fin de if
    },
  },//Fin de methods
  computed: {
    /**
     * Verifica que los dos campos del loby esten debidamente diligenciados
     */
    lobyCorrect() {
      let bankerName = this.loby.bankerName;
      let password = this.loby.password;
      let result = false;

      if (bankerName && bankerName.length >= 3 && password && password.length >= 4) {
        result = true;
      }

      return result;
    },//Fin del metodo
    /**
     * Retoenar el valor del dinero en la caja fuerte del banco
     */
    moneyInSafe() {
      let money = this.bank.money;
      money += this.moneyOfPlayers;

      return money;
    },
    /**
     * Retorna el valor del dinero perteneciente a los juagdores
     */
    moneyOfPlayers() {
      let money = 0;

      this.bank.players.forEach(player => {
        money += player.money;
      });

      return money;
    },
    moneyInCirculation() {
      let money = MONEY;
      money -= this.moneyInSafe;
      return money;
    },
    validateNewPlayer() {
      let result = false;
      let modal = this.modals.newPlayer;
      let playerName = modal.playerName.trim();
      let password = modal.password.trim();

      if (playerName && playerName.length >= 3 && password && password.length >= 4) {
        result = true
      }//Fin de if
      return result;
    },

  },//Fin de computed
  created() {
    this.loby.visibility = true;
    //El siguiente codigo es para que se salte el loby
    this.loby.bankerName = "Andrés Felipe";
    this.loby.password = "0000";
    this.startNewGame();
    //Para estar cerca al maximo numero de jugadores
    this.bank.newPlayer('Julian', '0000');
    this.bank.newPlayer('Juliana', '0000');
    this.bank.newPlayer('Fransika', '0000');
    this.bank.newPlayer('Magnus', '0000');
    this.bank.newPlayer('Mikkel', '0000');
    this.bank.newPlayer('Jhonas', '0000');
    this.bank.newPlayer('Martha', '0000');
    this.bank.newPlayer('Adan', '0000');
    this.bank.newPlayer('Eva', '0000');
  },//Fin de create
})