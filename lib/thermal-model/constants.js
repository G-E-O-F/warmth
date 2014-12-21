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

(function(module){

  var k = 1361.5, // watts/meter²
      α = 149597870700, // meters;
      π = Math.PI,
      r_d = π / 180;

  module.exports = {

    stars: {

      sol: {
        mass: 1989100e24,
        output: 4 * π * k * α * α // ≈ 3.8289e26 watts
        // TODO: color (…spectrum?)
      }

    },

    planets: {

      earth: {
        mass: 5.9721986e24,
        radius: 6371000, // in meters
        rotation_period: 86164.100352, // in seconds
        axial_tilt: 0.40909262775014904, // in radians
        orbital_period: 31558149.763545603, // in seconds
        orbit: {
          α: 1.00000011 * α, // semimajor axis in meters
          e: 0.01671022, // eccentricity
          i: 7.155 * r_d, // inclination to ecliptic in radians
          Ω: -11.26064 * r_d, // longitude of the ascending node in radians
          ϖ: 102.94719 * r_d, // longitude of periapsis in radians
          epoch: { // parameters at J2000
            L: 100.46435 * r_d, // mean longitude in radians
            l: 1.5707963267948966, // longitude of north pole on heliocentric ecliptic in radians
            b: 1.1572367208104857 // latitude of north pole on heliocentric ecliptic in radians
          }
        }
      }

    }

  };

}(module));