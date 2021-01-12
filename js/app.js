import '../sass/style.scss';

class DogBreeds {
  constructor() {
    this.apiUrl = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog img');
    this.backgroundEl = document.querySelector('.featured-dog__background');
    this.tilesEl = document.querySelector('.tiles');
    this.spiner = document.querySelector('.spinner');
    this.description = document.querySelector('.featured-dog__description__content');

    this.init();
  }

  scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  showLoading = () => {
    this.spiner.classList.add('spiner--visible');
  }

  hideLoading = () => {
    this.spiner.classList.remove('spiner--visible');
  }

  showImageWhenReady= (image) => {
    this.imgEl.setAttribute('src', image);
    this.backgroundEl.style.background = `url('${image}')`;
    this.hideLoading();   
  }

  showDescription = (name,type) => {
    this.description.textContent = `Here you can see ${name}`;

    const pRefresh = document.createElement('p');
    pRefresh.textContent = 'see more photos';
    pRefresh.classList.add('featured-dog__description__refresh');

    this.actualDogBreed = type;
    
    pRefresh.addEventListener('click', () => {
      this.showLoading;
      this.getRandomImageByBreed(this.actualDogBreed)
        .then((src) => this.showImageWhenReady(src));
    })


    this.description.append(pRefresh);
  }

  addBreed = (breed, subBreed) => {
    let name;
    let type;
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
      this.scrollUp();
      this.showLoading
      this.getRandomImageByBreed(type)
        .then((src) => this.showImageWhenReady(src));
      this.showDescription(name,type);
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
    .then((src) => this.showImageWhenReady(src));
    this.showAllBreeds()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dogs = new DogBreeds;
})


