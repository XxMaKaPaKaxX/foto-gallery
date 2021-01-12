import '../sass/style.scss';



class DogBreeds {
  constructor() {
    this.apiUrl = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog img');
    this.backgroundEl = document.querySelector('.featured-dog__background');

    this.init();
  }

  getListBreeds = () => fetch(`${this.apiUrl}/breeds/list/all`)
  .then((resp) => resp.json())
  .then((data) => data.message);

  getRandomImage = () => fetch(`${this.apiUrl}/breeds/image/random`)
  .then((resp) => resp.json())
  .then((data) => data.message);

 getRandomImageByBreed = (breed) => fetch(`${this.apiUrl}/breed/${breed}/images/random`)
  .then((resp) => resp.json())
  .then((data) => data.message);

  init = () => {
    this.getRandomImage()
      .then(src => {
        console.log(src);
        this.imgEl.setAttribute('src', src);
        this.backgroundEl.style.background = `url('${src}')`
      })
    this.getListBreeds()
      .then(list => console.log(list))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dogs = new DogBreeds;
})


