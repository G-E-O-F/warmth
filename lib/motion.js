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

// Technique based upon http://www.stargazing.net/kepler/ellipse.html

var moment = require('moment'),
    constants = require('./constants');

var π    = Math.PI,
    rad  = π * 2,
    cos  = Math.cos,
    sin  = Math.sin,
    atan = Math.atan2,
    sqrt = Math.sqrt,
    pow  = Math.pow;

module.exports = function (/* orbit & rotation, [Date, time String], [format String], [etc] */) {

  var args = Array.prototype.slice.call(arguments),
      planet = args.shift();

  var t = moment.apply(this, args).diff((planet.epoch || constants.J2000), 'seconds'),
      α = planet.orbit.α,
      e = planet.orbit.e,
      i = planet.orbit.i,
      Ω = planet.orbit.Ω,
      ϖ = planet.orbit.ϖ,
      P = planet.orbit.period,
      M0 = (planet.orbit.L0) - ϖ;

  // find the mean motion
  var n = rad / P;

  // find the mean anomaly
  var M = (M0 + n * t);

  // find the true anomaly
  // this is an approximation using equation of the center
  var ν = M + (
        (2 * e - pow(e, 3) / 4) * sin(M)
        + 5 / 4 * pow(e, 2) * sin(2 * M)
        + 13 / 12 * pow(e, 3) * sin(3 * M)
      );

  // find the radius vector
  var R = α * (1 - pow(e, 2)) / (1 + e * cos(ν));

  var λ = (ν + ϖ - Ω);

  var x = R * (cos(Ω) * cos(λ) - sin(Ω) * sin(λ) * cos(i)),
      y = R * (sin(Ω) * cos(λ) + cos(Ω) * sin(λ) * cos(i)),
      z = R * (sin(λ) * sin(i));

  var l = atan(y, x),
      b = atan(z, sqrt(x * x + y * y)),
      r = sqrt(x * x + y * y + z * z);

  return {
    // cartesian coordinates
    x: x, y: y, z: z,
    // spherical coordinates
    l: l, b: b, r: r,
    // longitude of rotation
    sidereal_time: (t % planet.rotation.period) / planet.rotation.period * 2 * π
  };

};