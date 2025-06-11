// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, bases) => {
  return {
    specimenNum: number,
    dna: bases,
    mutate() {
      let pickedBase = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      if (this.dna[pickedBase] != newBase) {
        this.dna[pickedBase] = newBase;
        return this.dna;
      } else {
        this.mutate();
      }
    },
    compareDNA (pAequor) {
      let same = 0;
      for (i=0; i<pAequor.dna.length;i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          same++;
        }
      }
      let samePercentage = (same / this.dna.length) * 100;
      console.log('Specimen #' + this.specimenNum + ' and specimen #' + pAequor.specimenNum + ' have ' + samePercentage.toFixed(2) + '% DNA in common');
    },
    willLikelySurvive() {
      survivalChance = 0;
      for (i=0; i<this.dna.length;i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          survivalChance++;
        }
      }
      if ((survivalChance / this.dna.length) > 0.6) {
        return true;
      } else {
        return false;
      }
    }
  }
};


let surviving = [];
idCounter = 0;

while (surviving.length < 30) {
  let paq = pAequorFactory(idCounter, mockUpStrand());
  if (paq.willLikelySurvive()) {
    surviving.push(paq);
  }
  idCounter++;
}


