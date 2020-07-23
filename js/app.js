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

  reset() {
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

class Transfer {
  constructor() {
    this.visible = true;
    this.senderID = '';
    this.senderState = new State();
    this.addressedID = '';
    this.addresseState = new State();
    this.transferAmount = '';
    this.transferAmountState = new State();
    this.processState = new State();
  }

  reset() {
    this.visible = true;
    this.senderID = '';
    this.senderState.hasError = false;
    this.addressedID = '';
    this.addresseState.hasError = false;
    this.transferAmount = '';
    this.transferAmountState.hasError = false;
    // this.processState = new State();
  }
}

class PlayerTransaction {
  constructor() {
    this.visible = true;
    this.type = 'deposit';
    this.acountID = '';
    this.acountState = new State();
    this.amount = '';
    this.amountState = new State();
    this.process = new State();
    this.showAlert = false;
    this.password = '';
  }

  reset() {
    this.type = 'deposit';
    this.acountID = '';
    this.acountState.reset();
    this.amount = '';
    this.amountState.reset();
    this.password = ''
  }
}

class SaleAndBuy {
  constructor() {
    this.visible = true;
    this.operationType = 'sale';
    this.acountID = '';
    this.acountState = new State();
    this.assetType = 'title';
    this.amount = '';
    this.amountState = new State();
    this.processState = new State();
    this.showAlert = false;
    this.password = '';
  }

  reset() {
    this.visible = true;
    this.operationType = 'sale';
    this.acountID = '';
    this.acountState.reset();
    this.assetType = 'title';
    this.amount = '';
    this.amountState.reset();
    // this.processState.reset();
    // this.showAlert = false;
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

/**
 * Entidad que cotrola los datos del modal para
 * pagar salario
 */
class PaySalaryModal {
  constructor() {
    this.visible = false;
    this.player = null;
  }

  show(player) {
    this.visible = true;
    this.player = player;
  }

  hidden() {
    this.visible = false;
    this.player = null;
  }
}

class TransferModal {
  constructor() {
    this.visible = false;
    this.senderID = '';
    this.senderName = '';
    this.addressedID = '';
    this.addressedName = '';
    this.senderPassword = '';
    this.amount = '';
    this.showAlert = false;
    this.processState = new State();
  }

  /**
   * Cambia el estado del modal y carga los datos de la transaccion
   * @param {number} senderId Identificador del remitente
   * @param {string} senderName Nombre del remitente
   * @param {number} addressedID Identificador del destinatario
   * @param {string} addressedName Nombre del destinatario
   * @param {number} amount Importe a transferrir
   */
  show(senderId, senderName, addressedID, addressedName, amount) {
    this.visible = true;
    this.senderID = senderId;
    this.senderName = senderName;
    this.addressedID = addressedID;
    this.addressedName = addressedName;
    this.amount = amount;
  }

  hidden() {
    this.visible = false;
    this.senderID = '';
    this.senderName = '';
    this.addressedID = '';
    this.addressedName = '';
    this.senderPassword = '';
    this.amount = '';
    this.showAlert = false;
    this.processState.hasError = false;
  }
}

Vue.component('input-money', {
  props: ['value'],
  template: `
  <input
    type="text"
    class="form__input text-right"
    :value="value"
    @input="$emit('input', formatCurrencyInput($event.target.value))"
    @blur="$emit('blur')"
    placeholder="$0"
    style="letter-spacing: 5px; margin-bottom: 1em;"
  />`,
  methods: {
    formatCurrencyInput(value) {
      value = this.deleteCurrencyFormater(value);
      value = parseFloat(value);
      if (!isNaN(value)) {
        value = this.formatCurrency(value);
      } else {
        value = '';
      }

      return value;
    },
    deleteCurrencyFormater(text) {
      let value = text.replace('$', '');
      value = value.split(".");
      value = value.join('');

      return value;
    },
    formatCurrency(value) {
      var formatted = new Intl.NumberFormat('es-Co', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(value);
      return formatted;
    },//Fin del metodo, 
  }
})

const vm = new Vue({
  el: '#app',
  data: {
    author: "Andrés Felipe Zúñiga",
    version: '1.0',
    bank: new Bank(),
    loby: new Loby(),
    dashBoard: new DashBoard(),
    transfer: new Transfer(),
    transaction: new PlayerTransaction(),
    saleAndBuy: new SaleAndBuy(),
    modals: {
      newPlayer: new NewPlayerModal(),
      paySalary: new PaySalaryModal(),
      transfer: new TransferModal(),
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
    paySalary() {
      //Para empesar recupero los datos del jugador
      let player = this.modals.paySalary.player;
      if (player && player.id) {
        let process = this.bank.paySalary(player.id);
        if (process.result) {
          this.modals.paySalary.hidden();
        }
      }
    },//Fin del metodo
    //------------------------------------------------------------
    //METODOS PARA VALIDAR LAS TRANSFERENCIA DE DINERO
    //------------------------------------------------------------
    validateSenderID() {
      let senderID = this.transfer.senderID;
      let result = false;

      senderID = parseFloat(senderID);

      if (!isNaN(senderID)) {
        this.transfer.senderState.hasError = false;
        this.transfer.senderState.message = "";
        result = true;
      } else {
        this.transfer.senderState.hasError = true;
        this.transfer.senderState.message = "Se debe seleccionar un remitente";
      }

      return result;
    },
    validateAddressedID() {
      let addressedID = this.transfer.addressedID;
      let state = this.transfer.addresseState;
      let result = false;

      addressedID = parseFloat(addressedID);
      if (!isNaN(addressedID)) {
        state.hasError = false;
        state.message = "";
        result = true;
      } else if (this.playersAdressed.length > 0) {
        state.hasError = true;
        state.message = "Se debe seleccionar un destinatario";
      }

      return result;
    },
    validateTransferAmount() {
      let amount = this.transfer.transferAmount;
      let state = this.transfer.transferAmountState;
      let result = false;

      //Elimino el formateado
      amount = amount.replace('$', '');
      amount = amount.split(".");
      amount = amount.join('');
      amount = parseFloat(amount);

      if (!isNaN(amount) && amount > 0) {
        state.hasError = false;
        state.message = '';
        result = true;
      } else {
        state.hasError = true;
        state.message = 'Ingresa un valor valido';
      }

      return result;
    },
    validateTransfer() {
      let senderVal = this.validateSenderID();
      let addressedVal = this.validateAddressedID();
      let amountValidation = this.validateTransferAmount();

      if (senderVal && addressedVal && amountValidation) {
        let senderID = this.transfer.senderID;
        let addressedID = this.transfer.addressedID;
        let amount = this.transfer.transferAmount;
        //Elimino el formateado
        amount = amount.replace('$', '');
        amount = amount.split(".");
        amount = amount.join('');
        amount = parseFloat(amount);

        let senderName = this.bank.players.filter(p => p.id === senderID)[0].name;
        let addressedName = this.bank.players.filter(p => p.id === addressedID)[0].name;

        this.modals.transfer.show(senderID, senderName, addressedID, addressedName, amount);
      }
    },
    makeTransfer() {
      let modal = this.modals.transfer;
      let senderID = modal.senderID;
      let addressedID = modal.addressedID;
      let amount = modal.amount;
      let password = modal.senderPassword;

      let process = this.bank.moneyTransfer(senderID, password, amount, addressedID);

      if (process.result) {
        modal.showAlert = true;
        modal.processState.hasError = false;

        //Ahora reinicio los campos
        this.transfer.reset();
      } else {
        modal.showAlert = true;
        modal.processState.hasError = true;
        modal.processState.message = process.message;
      }
    },
    //------------------------------------------------------------
    //METODOS PARA VALIDAR LAS TRANSACCIONES
    //------------------------------------------------------------
    validateTransactionType() {
      let result = false;
      let type = this.transaction.type;
      if (type === 'deposit' || type === 'whitdrawal') {
        result = true;
      }
      return result;
    },
    validateTransactionAcount() {
      let result = this.bank.players.some(p => p.id === this.transaction.acountID);
      let state = this.transaction.acountState;
      if (!result) {
        state.hasError = true;
        state.message = "Se debe seleccionar un titular";
      } else {
        state.reset();
      }

      return result;
    },
    validateTransactionAmount() {
      let result = false;
      let amount = this.transaction.amount;
      let state = this.transaction.amountState;

      //Ahora retiro el formateado demoneda y convierto en numero
      amount = amount.replace('$', '');
      amount = amount.split(".");
      amount = amount.join('');
      amount = parseFloat(amount);

      if (!isNaN(amount) && amount > 0) {
        state.reset();
        result = true;
      } else {
        state.hasError = true;
        state.message = 'Ingresa un valor valido';
      }

      return result;
    },
    makeTransaction() {
      let typeVal = this.validateTransactionType();
      let acountVal = this.validateTransactionAcount();
      let amountVal = this.validateTransactionAmount();

      if (typeVal && acountVal && amountVal) {
        let type = this.transaction.type;
        let acountID = this.transaction.acountID;
        let password = this.transaction.password;
        let amount = this.transaction.amount;


        amount = amount.replace('$', '');
        amount = amount.split(".");
        amount = amount.join('');
        amount = parseFloat(amount);

        switch (type) {
          case 'deposit': {
            let process = this.bank.cashDeposit(acountID, amount);
            if (process.result) {
              this.transaction.reset();

              //Ahora se muestra la alerta
              this.transaction.showAlert = true;
              this.transaction.process.hasError = false;
              this.transaction.process.message = "Se realizó el deposito"
            } else {
              //Ahora se muestra la alerta
              this.transaction.showAlert = true;
              this.transaction.process.hasError = true;
              this.transaction.process.message = process.message;
            }

            setTimeout(() => {
              this.transaction.showAlert = false;
              this.transaction.process.reset();
            }, 5000);

          } break;
          case 'whitdrawal': {
            let process = this.bank.cashWhitdrawal(acountID, password, amount);

            if (process.result) {
              this.transaction.reset();

              //Ahora se muestra la alerta
              this.transaction.showAlert = true;
              this.transaction.process.hasError = false;
              this.transaction.process.message = "Transacción Exitosa!"
            } else {
              //Ahora se muestra la alerta
              this.transaction.showAlert = true;
              this.transaction.process.hasError = true;
              this.transaction.process.message = process.message;
            }

            setTimeout(() => {
              this.transaction.showAlert = false;
              this.transaction.process.reset();
            }, 5000);
          } break;
        }

      }

    },
    //------------------------------------------------------------
    //METODOS PARA LA COMPRA Y VENTA DE ACTIVOS
    //------------------------------------------------------------
    validateSaleBuyAcount() {
      let result = false;
      let acountID = this.saleAndBuy.acountID;
      let state = this.saleAndBuy.acountState;

      //Primero verifico que es una cuenta exsitente
      let acountExist = this.bank.players.some(p => p.id === acountID);

      if (acountExist) {
        state.reset();
        result = true;
      } else {
        state.hasError = true;
      }

      return result;
    },
    validateSaleBuyAmount() {
      let result = false;
      let amount = this.deleteCurrencyFormater(this.saleAndBuy.amount);
      let state = this.saleAndBuy.amountState;

      if(!isNaN(amount) && amount > 0){
        state.reset();
        result = true;
      }else{
        state.hasError = true;
      }

      return result;
    },
    makeSaleOrBuy(){
      let acountVal = this.validateSaleBuyAcount();
      let amountVal = this.validateSaleBuyAmount();

      if(acountVal && amountVal){
        //Recupero los datos de la operacion
        let acountID = this.saleAndBuy.acountID;
        let password = this.saleAndBuy.password;
        let assetType = this.saleAndBuy.assetType;
        let amount = this.deleteCurrencyFormater(this.saleAndBuy.amount);
        let operationType = this.saleAndBuy.operationType;
        let process = null;

        switch(operationType){
          case 'sale':{
            process = this.bank.sellAsset(acountID, password, assetType, amount);
            this.saleAndBuy.showAlert = true;
            if(process.result){
              this.saleAndBuy.reset();
              this.saleAndBuy.processState.hasError = false;
              this.saleAndBuy.processState.message = "Venta realizada!";
            }else{
              this.saleAndBuy.processState.hasError = true;
              this.saleAndBuy.processState.message = process.message;
            }
          }break;
          case 'buy':{
            process = this.bank.buyAsset(acountID, assetType, amount);
            this.saleAndBuy.showAlert = true;
            if(process.result){
              this.saleAndBuy.reset();
              this.saleAndBuy.processState.hasError = false;
              this.saleAndBuy.processState.message = "Compra realizada!";
            }else{
              this.saleAndBuy.processState.hasError = true;
              this.saleAndBuy.processState.message = process.message;
            }
          }
        }

        //Despues de 5 segundos se elimina la alerta
        setTimeout(() => {
          this.saleAndBuy.showAlert = false;
          this.saleAndBuy.processState.reset();
        }, 5000);
      }
    },
    //------------------------------------------------------------
    //UTILIDADES
    //------------------------------------------------------------
    deleteCurrencyFormater(value) {
      value = value.replace('$', '');
      value = value.split(".");
      value = value.join('');
      value = parseFloat(value);
      return value;
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
    /**
     * Retorna una lista de jugadores ordenadas alfabeticamnete si incluir 
     * al jugador encargado de hacer la transferencia
     */
    playersAdressed() {
      let senderID = parseFloat(this.transfer.senderID);
      let players = [];
      if (!isNaN(senderID)) {
        players = this.bank.players.filter(p => p.id !== senderID);
      }

      return players.sort((a, b) => a.name.localeCompare(b.name));
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