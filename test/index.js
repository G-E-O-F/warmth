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

var assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

var ThermalModel = require('../index.js'),
    constants = require('../lib/thermal-model/constants');

describe('Motion', function(){

    it('should accurately calculate the position of a planet', function(){

        var tol = 0.015, // AU
            π = Math.PI,
            r_d = π / 180,
            motion = require('../lib/motion'),
            Saturn = {
                orbital_period: 10759.22 * 24 * 60 * 60,
                α: 9.53707032,
                e: 0.05415060,
                i: 2.48446 * r_d,
                Ω: 113.71504 * r_d,
                ϖ: 92.43194 * r_d,
                epoch: {
                    time: constants.J2000,
                    L: 49.94432 * r_d
                }
            },
            ref = {
                x: -6.884205705777835E+00, // AU
                y: -7.077756036947432E+00, // AU
                z:  3.970425522809785E-01  // AU
            };

        var pos = motion(Saturn, '2014-Jan-01 00:00:00 +0000', 'YYYY-MMM-DD HH:mm:ss ZZ');

        return pos.x.should.be.closeTo(ref.x, tol) && pos.y.should.be.closeTo(ref.y, tol) && pos.z.should.be.closeTo(ref.z, tol);

    });

});

describe('Thermal model', function(){

    var model = new ThermalModel();

    it('should have an accurate default value for solar output.', function(){

        var o = (3.8289e26).toPrecision(5);

        return model.star.output.toPrecision(5).should.equal(o);

    });

});