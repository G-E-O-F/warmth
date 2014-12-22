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

  /**
   * Takes the position of a planet and the position of
   * a field on that planet and returns the horizontal
   * position of the origin of the planet's coordinate
   * system (hopefully the planet's star).
   *
   * @param north - spherical coordinates of the planet's north pole
   * @param pp - planet position
   * @param pp[l] - planet longitude in radians
   * @param pp[b] - planet latitude in radians
   * @param pp[r] - planet distance from star in meters
   * @param pp[θ] - planet sidereal time in radians
   * @param fp - field position
   * @param fp[λ] - field longitude in radians
   * @param fp[φ] - field latitude in radians
   * @returns altazimuth - horizontal coordinates
   * @returns altazimuth[A] - standard azimuth in radians
   * @returns altazimuth[a] - altitude in radians
   */

  var π = Math.PI,
      atan = Math.atan2,
      asin = Math.asin,
      sin = Math.sin,
      cos = Math.cos,
      tan = Math.tan;

  module.exports = function(north, pp, fp){

    // find planet obliquity
    var ε = (π/2) - north.b;

    // reverse the spherical coordinates
    var λ = (π + pp.l) % (2*π),
        β = -pp.b;

    // find the equatorial coordinates (α,δ) of the sun
    // TODO: this does not account for the longitude of the north pole, which for earth is conveniently 90º.
    var α = atan(
            sin(λ) * cos(ε) - tan(β) * sin(ε),
            cos(λ)
        ),
        δ = asin(
            sin(β) * cos(ε) + cos(β) * sin(ε) * sin(λ)
        );

    // find the hour angle (h)
    var h = pp.θ - fp.λ - α;

    // find the altazimuth coordinates (A,a) of the sun
    var A = atan(
            sin(h),
            cos(h) * sin(fp.φ) - tan(δ) * cos(fp.φ)
        ),
        a = asin(
            sin(fp.φ) * sin(δ) + cos(fp.φ) * cos(δ) * cos(h)
        );

    return {
      A: A,
      a: a
    };

  };

}(module));