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

  var moment = require('moment');

  var J2000 = moment('1/1/2000 11:58:55.816 +0', 'D/M/YYYY H:m:s.SSS Z'),
      k = 1361.5, // watts/meter²
      au = 149597870700, // meters;
      π = Math.PI,
      r_d = π / 180;

  module.exports = {

    // stellar constants
    J2000: J2000,
    au: au,

    stars: {

      sol: {
        output: 4 * π * k * au * au // ≈ 3.8289e26 watts
        // TODO: color (…spectrum?)
      }

    },

    planets: {

      earth: {
        radius: 6371000, // in meters
        epoch: J2000,
        rotation: {
          north: { // heliocentric spherical coordinates of the planet's north pole
            l: 90.00004 * r_d, // relative longitude
            b: 66.30478 * r_d // relative latitude
          },
          period: 23*60*60 + 56*60 + 4.0916 // sidereal day in seconds
        },
        orbit: {
          period: 365.256363004 * 24 * 60 * 60, // sidereal year in seconds
          α: 1.00000011 * au, // semimajor axis in meters
          e: 0.01671022, // eccentricity
          i: 0.00005 * r_d, // inclination to ecliptic in radians
          Ω: -11.26064 * r_d, // longitude of the ascending node in radians
          ϖ: 102.94719 * r_d, // longitude of periapsis in radians
          L0: 100.46435 * r_d // mean longitude at epoch in radians
        }
      },

      saturn: {
        radius: 58232000,
        epoch: J2000,
        rotation: {
          north: {
            l: 79.61667 * r_d,
            b: 61.69638 * r_d
          },
          period: 10.656 * 60 * 60
        },
        orbit: {
          period: 10759.22 * 24 * 60 * 60,
          α: 9.53707032 * au,
          e: 0.05415060,
          i: 2.48446 * r_d,
          Ω: 113.71504 * r_d,
          ϖ: 92.43194 * r_d,
          L0: 49.94432 * r_d
        }
      }

    }

  };

}(module));