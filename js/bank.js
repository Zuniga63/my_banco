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

/**
 * @enum Nombres de los premios
 */
const AwardList = {
  pinocchio: "Premio Pinocho",
  daisy: "Premio Daisy",
  bambi: "Premio Bambi",
  cinderella: "Premio Cenicienta",
}

const AssetType = {
  title: 'Titulo',
  customPost: 'Paso',
  line: 'Linea',
  house: 'Casa',
  castle: 'Castillo'
}

const TaxType = {
  bank: 'Banco',
  landOfTheFuture: 'Tierra del futuro',
  landOfTheBorder: 'Tierra de la frontera',
  adventureLand: 'Tierra de la aventura'
}

Object.freeze(AwardList);
Object.freeze(AssetType);
Object.freeze(TaxType);

//-------------------------------------------------------------------------------
//    OBJETOS
//-------------------------------------------------------------------------------

/**
 * Es una transaccion en efectivo, con importe mayor o menor a cero
 */
class Transacction {
  /**
   * @constructor
   * @param {Date} date Instancia de Date con una fecha
   * @param {string} description es la informacion de la transaccion
   * @param {number} amount Es el importe de la transaccion
   */
  constructor(date, description, amount) {
    this.date = date;
    this.description = description,
      this.amount = amount;
  }
}

/**
 * Instancia de un premio
 */
class Award {
  /**
   * @constructor
   * @param {string} name Nombre del premio
   * @param {number} score Puntos obtenidos
   */
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
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
  constructor() {
    this.pinocchio = new Award(AwardList.pinocchio);
    this.bambi = new Award(AwardList.bambi);
    this.daisy = new Award(AwardList.daisy);
    this.cinderella = new Award(AwardList.cinderella);
  }
}

class Result {
  constructor(result = false, message = "", alert = "") {
    this.result = result;
    this.message = message;
    this.alert = alert;
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
  constructor(id, money = 0) {
    this.id = id;
    this.money = money;
    this.transacctions = [];
  }

  /**
   * Verifica que el importe a agregar sea un valor valido y actualiza el 
   * parametro dinero del jugador o banco
   * @param {number} amount Dinero a depositar en la cuenta
   */
  cashDeposit(amount) {
    let res = new Result()

    if (typeof amount === 'number' && amount > 0) {
      this.money += amount;
      res.result = true;
      this.__addTransacction("Consignacion", amount);
    } else {
      res.message = "No es un numero valido o es menor o igual que cero"
    }

    return res;
  }

  /**
   * Debita el dinero de la cuenta si este tiene los fondos suficientes
   * @param {number} amount Dinero a retirar de la cuenta
   */
  cashWhitdrawal(amount) {
    let res = new Result();

    if (typeof amount === 'number' && amount > 0) {
      if (this.money >= amount) {
        this.money -= amount;
        res.result = true;
        this.__addTransacction("Retiro", -amount);
      } else {
        res.message = "Saldo insuficiente";
      }
    } else {
      res.message = "No es un numero valido";
    }

    return res;
  }

  /**
   * Crea un registro para el arreglo de transacciones
   * @param {string} description Informacion del tipo de transasccion
   * @param {number} amount Importe de la transaccion
   */
  __addTransacction(description, amount) {
    let date = new Date();
    if (typeof description === 'string' && description.length > 0) {
      if (typeof amount === 'number' && amount !== 0) {
        let transacction = new Transacction(date, description, amount);
        this.transacctions.push(transacction);
      } else {
        console.log("El importe en la transaccion es inadecuado");
      }
    } else {
      console.log("La description no es del tipo adecuado o su longitud es cero")
    }
  }
}

/**
 * Cuenta especial para los terrenos del banco que cobran impuestos
 */
class Land extends Acount {
  /**
   * @constructor
   * @param {string} name Nombre de la tierra en español
   */
  constructor(id, name) {
    super(id);
    this.name = name;
  }
}

/**
 * Objeto con la informacion de las tieras que cobran impuestos
 */
class Lands {
  constructor() {
    this.landOfTheFuture = new Land(1, TaxType.landOfTheFuture);
    this.landOfTheBorder = new Land(2, TaxType.landOfTheBorder);
    this.aventureLand = new Land(3, TaxType.adventureLand);
  }
}

/**
 * Cuenta especial para los jugadores
 */
class Player extends Acount {
  /**
   * @constructor
   * @param {number} id Identificador numerico Unico
   * @param {string} name Nombre del jugador
   * @param {string} password Contraseña del jugador
   */
  constructor(id, name, password) {
    super(id);
    this.name = name;
    this.password = password;
    this.awards = new Awards();
    this.awardsCount = 0;
  }

  /**
   * Actualiza el score de los premios recibidos por el jugador
   * @param {string} awardName Nombre del premio para actualizar el score
   */
  updateAwardScore(awardName) {
    switch (awardName) {
      case AwardList.pinocchio:
        this.awards.pinocchio.score++;
        break;
      case AwardList.daisy:
        this.awards.daisy.score++;
        break;
      case AwardList.cinderella:
        this.awards.cinderella.score++;
        break;
      case AwardList.bambi:
        this.awards.bambi.score++;
        break;
    }
  }
}

class Bank extends Acount {
  constructor(id) {
    super(id, MONEY);
    this.banker = null;
    this.players = [];
    this.lands = new Lands();
    this.lastID = 0;
    this.awards = new Awards();
  }

  /**
   * Crea una inatacnia de player y lo designa como banquero
   * @param {string} bankerName Nombre del banquero
   * @param {string} password Contraseña del banquero
   */
  createTheBanker(bankerName, password) {
    let res = new Result();

    if (!this.banker) {
      let process = this.newPlayer(bankerName, password);
      if (process.result) {
        this.banker = process.player;
        res.result = true;
      } else {
        res.message = process.message;
      }
    } else {
      res.message = "El banquero ya fue establecido";
    }

    return res;
  }//Fin del metodo

  /**
   * Crea una instancia de 
   * @param {string} playerName Nombre del nuevo jugador
   * @param {string} password Contraseña del nuevo jugador
   */
  newPlayer(playerName, password) {
    let res = new Result();
    //Los dos parametros deben ser cadena de texto
    if (typeof playerName === 'string' && typeof password === 'string') {
      playerName = playerName.trim();
      password = password.trim();

      if (playerName.length >= 3 && password.length >= 4) {
        if (this.uniquePlayerName(playerName)) {
          this.lastID++;
          let player = new Player(this.lastID, playerName, password);

          //Ahora se hace el flujo de dinero
          if (this.money >= INITIAL_BALANCE) {
            player.cashDeposit(INITIAL_BALANCE);
            super.cashWhitdrawal(INITIAL_BALANCE);
            this.players.push(player);
            res.result = true;
            res.player = player;
          } else {
            res.message = "No se pueden agregar nuevos jugadores";
          }
        } else {
          res.message = "Nombre repetido";
        }//Fin de if-else
      } else {
        res.message = "Contraseña o nombre erroneos";
      }//Fin de if-else
    }//Fin de if-else

    return res;
  }//Fin del metodo

  /**
   * Retorna true cuando el nombre es unico
   * @param {string} playerName Nombre del jugador a buscar
   */
  uniquePlayerName(playerName) {
    playerName = playerName.trim();
    let coincidence = this.players.some(p => p.name.toUpperCase() === playerName.toUpperCase())

    return !coincidence;
  }

  /**
   * Debita de la cuenta del banco el salario y se lo acredita al jugador
   * @param {number} playerID Identificador del jugador al que se la pagará
   */
  paySalary(playerID) {
    let res = new Result();
    let playerExist = this.players.some(p => p.id === playerID);

    if (playerExist) {
      let player = this.players.filter(p => p.id === playerID)[0];

      //Ahora se hacen los movimientos financieros
      if (this.money >= SALARY) {
        //Acredito el dinero en la cuenta del juugador
        player.cashDeposit(SALARY);
        //Debito el dinero en la cuenta del banco
        super.cashWhitdrawal(SALARY);

        res.result = true;
      } else {
        res.message = "Saldo insuficiente para pagar sueldo";
      }
    } else {
      res.message = "El id del jugador no existe"
    }

    return res;
  }

  /**
   * Debita de la cuenta del remitente el monto y se lo acredita en la cuenta del
   * destinatario despues de validar si tiene fondos y la contaraseña es correcta
   * @param {number} senderID Identificador del jugador que hace la transferencia
   * @param {string} senderPassword Contraseña deñ jugador que hace la transferencia
   * @param {number} amount Importe a transferir
   * @param {number} addressedID Identificador del jugador que recibe la transferencia
   */
  moneyTransfer(senderID, senderPassword, amount, addressedID) {
    let res = new Result();
    let senderExist = this.players.some(p => p.id === senderID);
    let addressedExist = this.players.some(p => p.id === senderID);

    if (senderExist && addressedExist) {
      let sender = this.players.filter(p => p.id === senderID)[0];
      let addressed = this.players.filter(p => p.id === addressedID)[0];

      if (sender.password === senderPassword) {
        if (typeof amount === "number" && amount > 0) {
          if (sender.money >= amount) {
            //Se retira el dinero del remitente
            sender.cashWhitdrawal(amount);
            //se abona el dinero al destinatario
            addressed.cashDeposit(amount);

            res.result = true;
          } else {
            res.message = "Saldo insuficiente";
          }//Fin de if-else
        } else {
          res.message = "No es un importe valido";
        }
      } else {
        res.message = "Contraseña incorrecta";
      }

    } else {
      res.message = "Destinatario o remintente no existen";
    }

    return res;
  }//Fin del metodo

  /**
   * Hace los depositos a la cuenta del jugador
   * @param {number} playerID Identificador del jugador que hace el deposito
   * @param {number} amount Importe mayor que cero a depositar
   */
  cashDeposit(playerID, amount) {
    let res = new Result();

    if (playerID && typeof playerID === 'number' && amount && typeof amount === 'number' && amount > 0) {
      let playerExist = this.players.some(p => p.id === playerID);

      if (playerExist) {
        let player = this.players.filter(p => p.id === playerID)[0];
        player.cashDeposit(amount);
        res.result = true;
      } else {
        res.message = "El jugador no existe";
      }//Fin de if-else

    }//Fin de if

    return res;
  }//Fin del metodo

  /**
   * Debita el dinero del jugador cuando este tiene fondos suficientes y los datos son
   * correctos
   * @param {number} playerID Identificador del jugador que desea hacer elretiro de efectivo
   * @param {string} password Contraseña
   * @param {number} amount Importe a retirar
   */
  cashWhitdrawal(playerID, password, amount) {
    let res = new Result();

    if (
      playerID
      && typeof playerID === 'number'
      && password
      && amount
      && typeof amount === 'number'
      && amount > 0) {
      let playerExist = this.players.some(p => p.id === playerID);

      if (playerExist) {
        let player = this.players.filter(p => p.id === playerID)[0];
        if (player.password === password) {
          if (player.money >= amount) {
            player.cashWhitdrawal(amount);
            res.result = true;
            res.message = "Proceso satisfactorio";
          } else {
            res.message = "Saldo insuficiente";
          }
        } else {
          res.message = "Contraseña Incorrecta";
        }
      } else {
        res.message = "El jugador no existe";
      }
    }

    return res;
  }

  /**
   * Metodo para vnder activos pertenecientes al banco
   * @param {umber} playerID Identificador del jugador que compra
   * @param {sting} password Contraseña para validar la transaccion
   * @param {string} assetType Nombre del tipo de activo
   * @param {number} value El valor del activo vendido
   */
  sellAsset(playerID, password, assetType, value) {
    let res = new Result();

    if (playerID && typeof playerID === "number" && password && assetType && value && typeof value === 'number' && value > 0) {
      let playerExist = this.players.some(p => p.id === playerID);

      if (playerExist) {
        let player = this.players.filter(p => p.id === playerID);

        if (player.password === password) {
          if (player.money >= value) {
            //descuento el dinero de la cuenta del jugador
            player.cashWhitdrawal(value);
            //Deposito el dinero en la cuenta del banco
            super.cashDeposit(value);

            res.result = true;
          } else {
            res.message = "Fondos insuficientes";
          }
        } else {
          res.message('Contraseña incorrecta');
        }
      } else {
        res.message = "El jugador no existe";
      }

    }//Fin de if

    return res;
  }//Fin del metodo

  /**
   * Permite al banco hacerse con activos vendidos por los jugadores
   * @param {number} playerID Identificador del jugador que vende
   * @param {string} assetType Nombre del activo a vender
   * @param {number} value Valor neto del activo comprado
   */
  buyAsset(playerID, assetType, value) {
    let res = new Result();

    if (playerID && typeof playerID === 'number' && assetType && value && typeof value === 'number' && value > 0) {

      if (this.money >= value) {
        let playerExist = this.players.some(p => p.id === playerID);

        if (playerExist) {
          let player = this.players.filter(p => p.id === playerID);

          //Debito el dinero de la cuenta del banco
          super.cashWhitdrawal(value);
          //Se hace el doposito en la cuenta del jugador
          player.cashDeposit(value);
          res.result = true;
        } else {
          res.message = "El jugador no existe";
        }
      } else {
        res.message = "Fondos insuficientes";
      }
    }

    return res;
  }

  /**
   * Se encarga de debitar el dinero del banco correspodiente al premio
   * y de acreditarlo al jugador
   * @param {number} playerID Identificador del jugador que recibe el premio
   * @param {string} awardName Nombre del premio que recibe
   */
  awardPrize(playerID, awardName) {
    let res = new Result();
    let amountAward = 0;

    if (playerID && typeof playerID === 'number' && awardName) {
      let player = this.players.filter(p => p.id === playerID);
      if (player.length > 0) {
        player = player[0];


        switch (awardName) {
          case AwardList.bambi:
            amountAward = BAMBI_AWARD;
            this.awards.bambi.score++;
            break;
          case AwardList.cinderella:
            amountAward = CINDERELLA_AWARD;
            this.awards.cinderella.score++;
            break;
          case AwardList.daisy:
            amountAward = DAISY_AWARD;
            this.awards.daisy.score++;
            break;
          case AwardList.pinocchio:
            amountAward = PINOCCHIO_AWARD;
            this.awards.pinocchio.score++;
            break;
        }


        if (amountAward > 0) {
          if (this.money >= amountAward) {
            //Descuento el dinero del banco
            super.cashWhitdrawal(amountAward);
            //Se abona el dinero al jugador
            player.cashDeposit(amountAward);
            //Se actualiza el score de premios del jugador
            player.updateAwardScore(awardName);

            res.result = true;
          } else {
            res.message = "Saldo insuficiente";
          }
        } else {
          res.message = "No se selecciono un premio valido";
        }
      } else {
        res.message = "El jugador no existe";
      }
    }

    return res;
  }//Fin del metodo

  /**
   * Se encarga de realizar los cobros de impuestos, de las tierras, banco, sopresas
   * y loterías
   * @param {number} playerID Identificador del jugador
   * @param {string} taxName Nombre del impuesto
   * @param {number} amount Valor del impuesto
   */
  colletTax(playerID, taxName, amount) {
    let res = new Result();

    if (playerID && typeof playerID === 'number' && taxName && amount && typeof amount === 'number' && amount > 0) {
      let playerExist = this.players.some(p => p.id === playerID);

      if (playerExist) {
        let player = this.players.filter(p => p.id === playerID)[0];
        if (player.money >= amount) {
          if (taxName === TaxType.bank || taxName === TaxType.landOfTheBorder
            || taxName === TaxType.landOfTheFuture || taxName === TaxType.adventureLand) {
            //Decuento el dinero del jugador
            player.cashWhitdrawal(amount);

            //Abono el dinero segun el tipo de impuesto
            switch (taxName) {
              case TaxType.bank:
                super.cashDeposit(amount);
                break;
              case TaxType.landOfTheFuture:
                this.lands.landOfTheFuture.cashDeposit(amount);
                break;
              case TaxType.landOfTheBorder:
                this.lands.landOfTheBorder.cashDeposit(amount);
                break;
              case TaxType.adventureLand:
                this.lands.adventureLand.cashDeposit(amount);
                break;
            }//Fin de swith

            res.result = true;
          } else {
            res.message = "No se seleccionó impuesto";
          }
        } else {
          res.message = "Saldo insuficiente";
        }
      } else {
        res.message = "El jugador no existe";
      }
    }//Fin de if

    return res;
  }//Fin del metodo

  /**
   * Gestiona los botines obtenidos por las tarjetas de sorpresa y fantansía
   * @param {number} playerID Identificador del jugador que recibe el botín
   * @param {string} landName Tierra o banco
   * @param {number} amount Valor del botin recibido
   */
  loot(playerID, landName, amount) {
    let res = new Result();

    if (playerID && typeof playerID === 'number' && landName && amount && typeof amount === 'number' && amount > 0) {
      let playerExist = this.players.some(p => p.id === playerID);

      if (playerExist) {
        let player = this.players.filter(p => p.id === playerID)[0];
        if (this.money >= amount) {
          if (landName === TaxType.bank || landName === TaxType.landOfTheBorder
            || landName === TaxType.landOfTheFuture || landName === TaxType.adventureLand) {
            //Abono el dinero al jugador
            player.cashDeposit(amount);

            //Descuento el dinero segun el tipo de impuesto
            switch (landName) {
              case TaxType.bank:
                super.cashWhitdrawal(amount);
                break;
              case TaxType.landOfTheFuture:
                this.lands.landOfTheFuture.cashWhitdrawal(amount);
                break;
              case TaxType.landOfTheBorder:
                this.lands.landOfTheBorder.cashWhitdrawal(amount);
                break;
              case TaxType.adventureLand:
                this.lands.adventureLand.cashWhitdrawal(amount);
                break;
            }//Fin de swith

            res.result = true;
          } else {
            res.message = "No se seleccionó impuesto";
          }
        } else {
          res.message = "Saldo insuficiente";
        }
      } else {
        res.message = "El jugador no existe";
      }
    }//Fin de if

    return res;
  }
}