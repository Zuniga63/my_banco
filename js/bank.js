/******************************************************
 * Logica de control de transacciones entre jugadores 
 * @author Andrés Zuñiga                              
 * Fecha de creacion: 18/07/2020 10:00:pm             
 * Ultima Actualizacion: 18/07/2020
 * @version 1.0
 * Historial:
 *  -La primera version fue escrita con Andres
*******************************************************/

//-------------------------------------------------------------------------------
//    CONSTANTES
//-------------------------------------------------------------------------------

/**
 * Es la maxima cantidad dedinero que puede estar en circulacion
 */
const MONEY = 300000;

/**
 * Es lo que se le paga a un jugador cuando llega a la estacion
 */
const SALARY = 2000;

/**
 * Es el saldo inicial con el que empieza el jugador
 */
const INITIAL_BALANCE = 26400;

/**
 * El impuesto que se debe pagar por caer tierra del futuro
 */
const TAX_OF_LAND_OF_THE_FUTURE = 1500;

/**
 * Es la tarifa adicional que se paga por cada castillo que posea el jugador
 */
const TAX_OF_LAND_OF_THE_FUTURE_PER_CASTLE = 200;

/**
 * Es el impuesto que se debe pagar por caer en tierra de la aventura
 */
const TAX_OF_AVENTURE_LAND = 1800;

/**
 * Es el impuesto que se debe pagar por caer en tiera de la frontera
 */
const TAX_OF_LAND_OF_THE_BORDER = 2000;

/**
 * Es el premio entregado por pasar de lotería a sorpresa
 */
const BAMBI_AWARD = 3000;

/**
 * Es el premio por construir un castillo en cada propiedad
 */
const PINOCCHIO_AWARD = 6000;

/**
 * Es el premio por sacar tres pares consecutivos
 */
const DAISY_AWARD = 4000;

/**
 * Es el pemio por construir dos casas en cada propieded del mismo color
 */
const CINDERELLA_AWARD = 5000;

//-------------------------------------------------------------------------------
//    OBJETOS
//-------------------------------------------------------------------------------

/**
 * Es una transaccion en efectivo, con importe mayor o menor a cero
 */
class Transacction{
  /**
   * @constructor
   * @param {Date} date Instancia de Date con una fecha
   * @param {string} description es la informacion de la transaccion
   * @param {number} amount Es el importe de la transaccion
   */
  constructor(date, description, amount){
    this.date = date;
    this.description = description,
    this.amount = amount;
  }
}

/**
 * Es un objeto que agrupa los cuatro tipos de premios
 * pinocho, bambi, daysi y cenicienta
 */
class Awards {
  /**
   * @constructor solo crea las propieddes
   */
  constructor(){
    this.pinocchio = 0;
    this.bambi = 0;
    this.daisy = 0;
    this.cinderella = 0;
  }
}

/**
 * La funcionalidad basica de una cuenta
 */
class Acount {
  /**
   * @constructor
   * @param {number} money Dinero de partida
   */
  constructor(id, money = 0){
    this.id = id;
    this.money = money;
    this.transacctions = [];
  }

  /**
   * Verifica que el importe a agregar sea un valor valido y actualiza el 
   * parametro dinero del jugador o banco
   * @param {number} amount Dinero a depositar en la cuenta
   */
  cashDeposit(amount){
    //TODO
    console.log("En la clase basica");
  }

  /**
   * Debita el dinero de la cuenta si este tiene los fondos suficientes
   * @param {number} amount Dinero a retirar de la cuenta
   */
  cashWhitdrawal(amount){
    //TODO
  }

  /**
   * Crea un registro para el arreglo de transacciones
   * @param {string} description Informacion del tipo de transasccion
   * @param {number} amount Importe de la transaccion
   */
  __addTransacction(description, amount){
    //TODO
  }

  /**
   * Verifica que el parametro sea un numero
   * @param {*} amount Parametro a evaluar
   */
  validateAmount(amount){
    //TODO
  }
}

/**
 * Cuenta especial para los terrenos del banco que cobran impuestos
 */
class Land extends Acount{
  /**
   * @constructor
   * @param {string} name Nombre de la tierra en español
   */
  constructor(id, name){
    super(id);
    this.name = name;
  }
}

/**
 * Objeto con la informacion de las tieras que cobran impuestos
 */
class Lands {
  constructor(){
    this.landOfTheFuture = new Land(1, "Tierra del futuro");
    this.landOfTheBorder = new Land(2, "Tierra de la frontera");
    this.aventureLand = new Land(3, "Tierra de la aventura");
  }
}

/**
 * Cuenta especial para los jugadores
 */
class Player extends Acount{
  /**
   * @constructor
   * @param {number} id Identificador numerico Unico
   * @param {string} name Nombre del jugador
   * @param {string} password Contraseña del jugador
   */
  constructor(id,name, password){
    super(id);
    this.name = name;
    this.password = password;
    this.awards = new Awards();
  }

  /**
   * Actualiza el score de los premios recibidos por el jugador
   * @param {string} awardName Nombre del premio para actualizar el score
   */
  updateAwardScore(awardName){
    //TODO
  }
}

class Bank extends Acount{
  constructor(id){
    super(id, MONEY);
    this.banker = null;
    this.players = [];
    this.lands = new Lands();
  }

  /**
   * Crea una inatacnia de player y lo designa como banquero
   * @param {string} bankerName Nombre del banquero
   * @param {string} password Contraseña del banquero
   */
  createTheBanker(bankerName, password){
    //TODO
  }

  /**
   * Crea una instancia de 
   * @param {string} playerName Nombre del nuevo jugador
   * @param {string} password Contraseña del nuevo jugador
   */
  newPlayer(playerName, password){
    //TODO
  }

  /**
   * Debita de la cuenta del banco el salario y se lo acredita al jugador
   * @param {number} playerID Identificador del jugador al que se la pagará
   */
  paySalary(playerID){
    //TODO
  }

  /**
   * Debita de la cuenta del remitente el monto y se lo acredita en la cuenta del
   * destinatario despues de validar si tiene fondos y la contaraseña es correcta
   * @param {number} senderID Identificador del jugador que hace la transferencia
   * @param {string} senderPassword Contraseña deñ jugador que hace la transferencia
   * @param {number} amount Importe a transferir
   * @param {number} addressedID Identificador del jugador que recibe la transferencia
   */
  moneyTransfer(senderID, senderPassword, amount, addressedID){
    //TODO
  }

  /**
   * Hace los depositos a la cuenta del jugador
   * @param {number} playerID Identificador del jugador que hace el deposito
   * @param {number} amount Importe mayor que cero a depositar
   */
  cashDeposit(playerID, amount){
    //TODO
    console.log("En la clase banco");
    super.cashDeposit();
  }

  /**
   * Debita el dinero del jugador cuando este tiene fondos suficientes y los datos son
   * correctos
   * @param {number} playerID Identificador del jugador que desea hacer elretiro de efectivo
   * @param {string} password Contraseña
   * @param {number} amount Importe a retirar
   */
  cashWhitdrawal(playerID, password, amount){
    //TODO
  }

  /**
   * Metodo para vnder activos pertenecientes al banco
   * @param {umber} playerID Identificador del jugador que compra
   * @param {sting} password Contraseña para validar la transaccion
   * @param {string} assetType Nombre del tipo de activo
   * @param {number} value El valor del activo vendido
   */
  sellAsset(playerID, password, assetType, value){
    //TODO
  }

  /**
   * Permite al banco hacerse con activos vendidos por los jugadores
   * @param {number} playerID Identificador del jugador que vende
   * @param {string} assetType Nombre del activo a vender
   * @param {number} value Valor neto del activo comprado
   */
  buyAsset(playerID, assetType, value){
    //TODO
  }

  /**
   * Se encarga de debitar el dinero del banco correspodiente al premio
   * y de acreditarlo al jugador
   * @param {number} playerID Identificador del jugador que recibe el premio
   * @param {string} awardName Nombre del premio que recibe
   */
  awardPrize(playerID, awardName){
    //TODO
  }

  /**
   * Se encarga de realizar los cobros de impuestos, de las tierras, banco, sopresas
   * y loterías
   * @param {number} playerID Identificador del jugador
   * @param {string} taxName Nombre del impuesto
   * @param {number} amount Valor del impuesto
   */
  colletTax(playerID, taxName, amount){
    //TODO
  }

  /**
   * Gestiona los botines obtenidos por las tarjetas de sorpresa y fantansía
   * @param {number} playerID Identificador del jugador que recibe el botín
   * @param {string} landName Tierra o banco
   * @param {number} amount Valor del botin recibido
   */
  loot(playerID, landName, amount){
    //TODO
  }
}