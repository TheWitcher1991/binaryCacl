'use strict';

/**
 * @module math/core/in
 */

/**
 * @class In
 * @constructor
 * @private
 */
class In {
    /**
     * @param {String} number 
     * @param {String} sys 
     */
    constructor(number, sys) {
        this.number = number;
        this.sys = sys;
    }

    /**
     * @public
     * @returns {String}
     */
    procession () {
        throw new Error('Метод procession должен быть реализован');
    }

    /**
     * @param {Number} number 
     */
    __bin(number) {
        let out = [];

        for (let i = 1; i <= 10e1 * number; i++) {
            if (number % 2 === 0) {
                if (number === 1)  {
                    out.push('1');
                    break;
                }
                number = number / 2;
                out.push('0');
            } else if (number % 2 !== 0) {
                if (number === 1)  {
                    out.push('1');
                    break;
                }
                number = (number - 1) / 2;
                out.push('1');
            }
        }  

        return out.reverse().join('');
    }

    /**
     * @static
     * @private
     */
    static #in () {
        return this;
    }
}

/**
 * @class Benary
 * @extends In
 */
class Benary extends In {
    /**
     * @param {String} number 
     * @param {String} sys 
     */
    constructor(number, sys) {
        super(number, sys)
    }

    procession () {
        let sNumber = [...this.number + ''].reverse();
    
        if (this.sys !== 16 && this.sys <= 10) {
            sNumber.forEach((el, i) => {
                sNumber[i] = sNumber[i] * this.sys**i;
            });
        } else if (this.sys === 16) {
            sNumber.forEach((el, i) => {  
                switch(sNumber[i]) {
                    case 'A': sNumber[i] = 10; break;
                    case 'B': sNumber[i] = 11; break;
                    case 'C': sNumber[i] = 12; break;
                    case 'D': sNumber[i] = 13; break;
                    case 'E': sNumber[i] = 14; break;
                    case 'F': sNumber[i] = 15; break;
                }
                sNumber[i] = +sNumber[i];
                sNumber[i] = sNumber[i] * this.sys**i;
            });
        }

        return sNumber.reduce((x, y) => x + y);
    }
}

/**
 * @class Binary
 * @extends In
 */
class Binary extends In {
    /**
     * @param {String} number 
     * @param {String} sys 
     */
    constructor(number, sys) {
        super(number, sys);
    }

    procession () {
        let out = [];

        if (this.sys === 16) {
            let sNumber = [...this.number + ''].reverse();

            sNumber.forEach((el, i) => {  
                switch(sNumber[i]) {
                    case 'A': sNumber[i] = 10; break;
                    case 'B': sNumber[i] = 11; break;
                    case 'C': sNumber[i] = 12; break;
                    case 'D': sNumber[i] = 13; break;
                    case 'E': sNumber[i] = 14; break;
                    case 'F': sNumber[i] = 15; break;
                }
                sNumber[i] = +sNumber[i];
                sNumber[i] = sNumber[i] * this.sys**i;
            });

            let resNum = sNumber.reduce((x, y) => x + y);
            return this.__bin(resNum);
        } else if (this.sys === 10) {
            return this.__bin(+this.number)
        } else {
            let benNum = new Benary(this.number, this.sys).procession();
            return this.__bin(benNum);
        }
    }
}

//!-------------------------------------------------------------------------------------

let bth   =  document.querySelector('#bth'),
    out   = document.querySelector('.c-output');

const InBinary = (number, sys) => new Binary(number, sys).procession();
const InBenary = (number, sys) => new Benary(number, sys).procession();

bth.addEventListener('click', e => {
    e.preventDefault();

    let numOn = document.querySelector('#number').value,
        sys1  = +document.querySelector('#sys1').value,
        sys2  = +document.querySelector('#sys2').value;

    if (sys1 && sys2 === 2) {
        out.innerHTML = InBinary(numOn, sys1);
    }
    
    if (sys1 <= 10 && sys2 === 10) {
        out.innerHTML = InBenary(+numOn, sys1);
    }

    if (sys1 === 16 && sys2 === 10) {
        out.innerHTML = InBenary(numOn, sys1);
    }
});