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