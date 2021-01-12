import '../sass/style.scss';



class DogBreeds {
  constructor() {
    this.apiUrl = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog img');
    this.backgroundEl = document.querySelector('.featured-dog__background');
    this.tilesEl = document.querySelector('.tiles');
    this.spiner = document.querySelector('.spinner');

    this.init();
  }

  showLoading = () => {
    this.spiner.classList.add('spiner--visible');
  }

  hideLoading = () => {
    this.spiner.classList.remove('spiner--visible');
  }

  addBreed = (breed, subBreed) => {
    let name;
    let type;
    console.log(subBreed)
    console.log(subBreed === undefined)
    if (subBreed === undefined) {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }
    const newTile = document.createElement('div');
    newTile.classList.add('tiles__tile');

    const newDivContent = document.createElement('div');
    newDivContent.classList.add('tiles__tile__content');

    newDivContent.textContent = name;
    newDivContent.addEventListener('click', () => {
      this.showLoading
      this.getRandomImageByBreed(type)
        .then((src) => {
          this.imgEl.setAttribute('src', src);
          this.backgroundEl.style.background = `url('${src}')`;
          this.hideLoading();
        })
    })

    newTile.append(newDivContent);
    this.tilesEl.append(newTile);    
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

  showAllBreeds = () => {
    this.getListBreeds()
      .then((breeds) => {
        for(const breed in breeds) {
          if(breeds[breed].length === 0) {
            this.addBreed(breed)
          } else {
            for (const subBreed of breeds[breed]) {
              this.addBreed(breed, subBreed)
            }
          }
        }
      })
  }

  init = () => {
    this.showLoading();
    this.getRandomImage()
      .then(src => {
        console.log(src);
        this.imgEl.setAttribute('src', src);
        this.backgroundEl.style.background = `url('${src}')`;
        this.hideLoading();
      })
    this.getListBreeds()
      .then(list => console.log(list));

    this.showAllBreeds()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dogs = new DogBreeds;
})


