export class Pokemon {
    id;
    name;
    url;
    image;
  
    constructor(data) {
      this.id = data.url.substring(34, data.url.length - 1)
      this.name = data.name;
      this.url = data.url;
      this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.url.substring(34, data.url.length - 1)}.png`
    }
  
    static fromArray(data) {
      return data.map(d => new Pokemon(d));
    }
  }
  