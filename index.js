// oppgave 1
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Elev = /** @class */ (function () {
    function Elev(navn, alder, klassetrinn) {
        this._navn = navn;
        this._alder = alder;
        this._klassetrinn = klassetrinn;
    }
    Object.defineProperty(Elev.prototype, "navn", {
        get: function () { return this._navn; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Elev.prototype, "alder", {
        get: function () { return this._alder; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Elev.prototype, "klassetrinn", {
        get: function () { return this._klassetrinn; },
        enumerable: false,
        configurable: true
    });
    Elev.prototype.toString = function () { return "".concat(this._navn, " er elev i trinn ").concat(this.klassetrinn, " med alder ").concat(this.alder); };
    return Elev;
}());
var rune = new Elev("Rune", 16, 5);
var birger = new Elev("Birger", 15, 5);
console.log(rune.toString());
console.log(birger.toString());
// antar at alle ansatte har en spesifikk rolle og dermed ikke kan være ansatt
var Ansatt = /** @class */ (function () {
    function Ansatt(rolle, avdeling, månedslønn) {
        this._rolle = rolle;
        this._avdeling = avdeling;
        this._månedslønn = månedslønn;
    }
    Object.defineProperty(Ansatt.prototype, "rolle", {
        get: function () { return this._rolle; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ansatt.prototype, "avdeling", {
        get: function () { return this._avdeling; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ansatt.prototype, "m\u00E5nedsl\u00F8nn", {
        get: function () { return this._rolle; },
        enumerable: false,
        configurable: true
    });
    return Ansatt;
}());
var Lærer = /** @class */ (function (_super) {
    __extends(Lærer, _super);
    function Lærer(navn, alder) {
        var _this = _super.call(this, "underviser", "fag", 25000) || this;
        _this._navn = navn;
        _this._alder = alder;
        return _this;
    }
    Object.defineProperty(Lærer.prototype, "navn", {
        get: function () { return this._navn; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lærer.prototype, "alder", {
        get: function () { return this._alder; },
        enumerable: false,
        configurable: true
    });
    Lærer.prototype.toString = function () { return "L\u00E6rer ".concat(this.navn, " med alder ").concat(this._alder, " har rolle som ").concat(this._rolle, " for avdeling ").concat(this._avdeling, " med m\u00E5nedsl\u00F8nn p\u00E5 ").concat(this._månedslønn, "."); };
    return Lærer;
}(Ansatt));
var lars = new Lærer("Lars", 28);
console.log(lars.toString());
var Fag = /** @class */ (function () {
    function Fag(fagnavn, elever, lærere) {
        this._fagnavn = fagnavn;
        this._elever = elever;
        this._lærere = lærere;
    }
    Object.defineProperty(Fag.prototype, "fagnavn", {
        get: function () { return this._fagnavn; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fag.prototype, "elever", {
        get: function () { return this._elever; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fag.prototype, "l\u00E6rere", {
        get: function () { return this._lærere; },
        enumerable: false,
        configurable: true
    });
    return Fag;
}());
var samfunnsfag = new Fag("samfunnsfag", [birger, rune], [lars]);
