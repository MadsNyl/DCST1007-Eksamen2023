// oppgave 1

// Siden det ikke er noen konstruktør i klassen, og det er ingen metoder som endrer på objektets tilstand, så er det ikke nødvendig å lage en ny instans av klassen. Det er dermed en abstrakt klasse.
abstract class Figur {
    
    beregnAreal(): number {
        return 0;
    };

    beregnOmkrets(): number {
        return 0;
    };

    beregnOverflate(): number {
        return 0;
    };

    beregnVolum(): number {
        return 0;
    };
}

class Rektangel extends Figur {

    protected _hoyde: number;
    protected _bredde: number;

    constructor(hoyde: number, bredde: number) {
        super();
        this.validate(hoyde, bredde);
        this._hoyde = hoyde;
        this._bredde = bredde;
    }

    validate(hoyde: number, bredde: number) {
        if (hoyde <= 0 || bredde <= 0) throw new Error("Høyde og bredde må være større enn 0");
    };

    get hoyde(): number {
        return this._hoyde;
    };

    get bredde(): number {
        return this._bredde;
    };

    set hoyde(hoyde: number) {
        this._hoyde = hoyde;
    };

    set bredde(bredde: number) {
        this._bredde = bredde;
    };

    beregnAreal(): number {
        return this._hoyde * this._bredde;
    };

    beregnOmkrets(): number {
        return 2 * this._hoyde + 2 * this._bredde;
    };
}


class Sirkel extends Figur {

    protected _radius: number;

    constructor(radius: number) {
        super();
        this.validate(radius);
        this._radius = radius;
    }

    validate(radius: number) {
        if (radius <= 0) throw new Error("Radius må være større enn 0");
    };

    get radius(): number {
        return this._radius;
    };

    set radius(radius: number) {
        this._radius = radius;
    };

    beregnAreal(): number {
        return Math.PI * this._radius ** 2;
    };

    beregnOmkrets(): number {
        return 2 * Math.PI * this._radius;
    };
}

class Boks extends Rektangel {
    private _lengde: number;

    constructor(hoyde: number, bredde: number, lengde: number) {
        super(hoyde, bredde);
        this.validate(lengde);
        this._lengde = lengde;
    }

    validate(lengde: number) {
        if (lengde <= 0) throw new Error("Lengde må være større enn 0");
    }

    get lengde(): number {
        return this._lengde;
    };

    set lengde(lengde: number) {
        this._lengde = lengde;
    };

    beregnOverflate(): number {
        return 2 * this._hoyde * this._bredde + 2 * this._hoyde * this._lengde + 2 * this._bredde * this._lengde;
    }

    beregnVolum(): number {
        return this._hoyde * this._bredde * this._lengde;
    }
}

class Sylinder extends Sirkel {
    private _lengde: number;

    constructor(radius: number, lengde: number) {
        super(radius);
        this.validate(lengde);
        this._lengde = lengde;
    }

    validate(lengde: number) {
        if (lengde <= 0) throw new Error("Lengde må være større enn 0");
    }

    get lengde(): number {
        return this._lengde;
    };

    set lengde(lengde: number) {
        this._lengde = lengde;
    };

    beregnOverflate(): number {
        return 2 * Math.PI * this._radius * (this._radius + this._lengde);
    };

    beregnVolum(): number {
        return Math.PI * this._radius ** 2 * this._lengde;
    };
}


const myBox = new Boks(2, 3, 4);
const omkrets = myBox.beregnOmkrets();
const overflate = myBox.beregnOverflate();

const mySylinder = new Sylinder(2, 4);
const sOmkrets = mySylinder.beregnOmkrets();
const sOverflate = mySylinder.beregnOverflate();






// Oppgave 2

class BankKonto{
    private _saldo: number;
    private _kontoNr: string; // String for å validere lengden
    private _eier: string;

    constructor(saldo: number, kontoNr: string, eier: string) {
        this.validate(saldo, kontoNr, eier);
        this._saldo = saldo;
        this._kontoNr = kontoNr;
        this._eier = eier;
    }

    validate(saldo: number, kontoNr: string, eier: string) {
        if (saldo < 0) throw new Error("Saldo kan ikke være negativ");
        if (kontoNr.length !== 11) throw new Error("Kontonummer må være 11 siffer");
        if (eier.length < 2) throw new Error("Eier må ha minst 2 tegn");
    };

    get saldo(): number {
        return this._saldo;
    };

    set saldo(saldo: number) {
        this._saldo = saldo;
    };

    get kontoNr(): string {
        return this._kontoNr;
    };

    set kontoNr(kontoNr: string) {
        this._kontoNr = kontoNr;
    };

    get eier(): string {
        return this._eier;
    };

    set eier(eier: string) {
        this._eier = eier;
    };

    settInn(penger: number) {
        if (penger <= 0) throw new Error("Beløpet må være større enn 0");
        this._saldo += penger;
    };

    taUt(penger: number) {
        if (penger <= 0) throw new Error("Beløpet må være større enn 0");
        if (penger > this._saldo) throw new Error("Ikke nok penger på konto");
        this._saldo -= penger;
    };

    // transfer(amount, toAccount)
    overfør(beløp: number, tilKonto: BankKonto, bank: Bank) {
        // Sjekk om konto du skal sende penger til, eksisterer i banken.
        if (!bank.bankKontoEksisterer(tilKonto.kontoNr)) throw new Error("Kontoen eksisterer ikke");

        // Ta ut beløpet fra din konto
        this.taUt(beløp);

        // Sett inn beløpet på mottakerkontoen
        tilKonto.settInn(beløp);
    }
}


class Bank {
    private _navn: string;
    private _konti: BankKonto[];

    constructor(navn: string, konti: BankKonto[]) {
        this._navn = navn;
        this._konti = konti;
    };

    get navn(): string {
        return this._navn;
    };

    set navn(navn: string) {
        this._navn = navn;
    };

    get konti(): BankKonto[] {
        return this._konti;
    };

    set konti(konti: BankKonto[]) {
        this._konti = konti;
    };

    bankKontoEksisterer(kontoNr: string): boolean {
        for (const konto of this._konti) {
            if (konto.kontoNr === kontoNr) {
                return true;
            }
        };

        return false;
        
        // funksjonell algoritme
        // return this._konti.some(konto => konto.kontoNr === kontoNr);
    };

    lagNyKonto(saldo: number, kontoNr: string, eier: string) {
        if (this.bankKontoEksisterer(kontoNr)) throw new Error("Kontoen eksisterer allerede");
        this._konti.push(new BankKonto(saldo, kontoNr, eier));
    }
}