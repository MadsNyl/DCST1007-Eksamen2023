// oppgave 1

class Elev {
    private _navn: string;
    private _alder: number;
    private _klassetrinn: number;

    constructor(navn: string, alder: number, klassetrinn: number) {
        this._navn = navn;
        this._alder = alder;
        this._klassetrinn = klassetrinn;
    }

    get navn(): string { return this._navn; }
    get alder(): number { return this._alder; }
    get klassetrinn(): number { return this._klassetrinn; }

    toString(): string { return `${this._navn} er elev i trinn ${this.klassetrinn} med alder ${this.alder}`; }
}

const rune = new Elev("Rune", 16, 5);
const birger = new Elev("Birger", 15, 5);

console.log(rune.toString());
console.log(birger.toString());

// antar at alle ansatte har en spesifikk rolle og dermed ikke kan være ansatt
abstract class Ansatt {
    protected _rolle: string;
    protected _avdeling: string;
    protected _månedslønn: number;
    
    constructor(rolle: string, avdeling: string, månedslønn: number) {
        this._rolle = rolle;
        this._avdeling = avdeling;
        this._månedslønn = månedslønn;
    }

    get rolle(): string { return this._rolle; }
    get avdeling(): string { return this._avdeling; }
    get månedslønn(): string { return this._rolle; }

}

class Lærer extends Ansatt {
    private _navn: string;
    private _alder: number;

    constructor(navn: string, alder: number) {
        super("underviser", "fag", 25000);
        this._navn = navn;
        this._alder = alder;
    }

    get navn(): string { return this._navn; }
    get alder(): number { return this._alder; }

    toString(): string { return `Lærer ${this.navn} med alder ${this._alder} har rolle som ${this._rolle} for avdeling ${this._avdeling} med månedslønn på ${this._månedslønn}.`; }
}

const lars = new Lærer("Lars", 28);

console.log(lars.toString());

class Fag {
    private _fagnavn: string;
    private _elever: Elev[];
    private _lærere: Lærer[];

    constructor(fagnavn: string, elever: Elev[], lærere: Lærer[]) {
        this._fagnavn = fagnavn;
        this._elever = elever;
        this._lærere = lærere;
    }

    get fagnavn(): string { return this._fagnavn; }
    get elever(): Elev[] { return this._elever; }
    get lærere(): Lærer[] { return this._lærere; }
}

const samfunnsfag = new Fag("samfunnsfag", [birger, rune], [lars]);