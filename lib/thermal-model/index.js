/*
 * Copyright (c) 2014 Will Shown. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (module) {

  var π = Math.PI;

  var moment = require('moment');

  var constants = require('../constants'),
      motion = require('../motion'),
      horizontal = require('./horizontal');

  /**
   * @param [options]
   * @param [options[planet]] - the planet for this model
   * @param [options[star]] - the star for this model
   * @param [options[fields]] - number of fields in the spherical model
   * @param momentArgs - the remaining arguments are the time
   * @constructor
   */
  function ThermalModel() {

    var args = Array.prototype.slice.call(arguments),
        opts = args.shift();

    this.planet = opts.planet || constants.planets.earth;
    this.star = opts.star || constants.stars.sol;

    var fields = opts.fields || 642; // a peels sphere with 8 divisions, the default, has 642 fields.

    this.time = null;
    this.pos = null;
    this._flux = null;
    this._fieldArea = 4 * π * Math.pow(this.planet.radius, 2) / fields;

  }

  ThermalModel.prototype._getFlux = function(){

    var P = this.star.output, // in watts
        α = this.pos.r; // in meters

    return P / (4 * π * α * α); // in watts/meter²

  };

  ThermalModel.prototype.setTime = function(){
    this.time = moment.apply(null, arguments);
    this.pos = motion(this.planet, this.time);
    this._flux = this._getFlux();
  };

  ThermalModel.prototype.get = function(fieldPos){
    var sun = horizontal(
          this.planet.rotation.north,
          this.pos,
          fieldPos
        ),
        energy = 0,
        k = Math.sin(sun.a);

    if(sun.a > 0 && this._flux > 0){
      energy = k * this._fieldArea * this._flux;
    }

    return {
      gross: energy,
      k: k
    };
  };

  module.exports = ThermalModel;

}(module));
