function ArtAndExhibitionsApi () {
  this.getExhibitions = async () => {
    const ARNE_QUINZE_ARTS_AND_EXHIBITIONS_API = 'https://www.pgm.gent/data/arnequinze/art.json';
    console.log(ARNE_QUINZE_ARTS_AND_EXHIBITIONS_API)
    try {
      const response = await fetch(ARNE_QUINZE_ARTS_AND_EXHIBITIONS_API);
      //console.log(response)
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
    console.error(error)
    }
  } 
}

function AtelierApiHome () {
  this.getPosts = async () => {
    const ARNE_QUINZE_ATELIER_API = './data/atelier.json';
    try {
      const response = await fetch(ARNE_QUINZE_ATELIER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error)
    }
  }
}

function AtelierApi () {
  this.getPosts = async () => {
    const ARNE_QUINZE_ATELIER_API = '../data/atelier.json';
    try {
      const response = await fetch(ARNE_QUINZE_ATELIER_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error)
    }
  }
}

function PressApi () {
  this.getPosts = async () => {
    const ARNE_QUINZE_PRESS_API = '../data/press.json';
    try {
      const response = await fetch(ARNE_QUINZE_PRESS_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error)
    }
  }
}

function YearsApi () {
  this.getYears = async () => {
    const YEARS_API = '../data/years.json';
    try {
      const response = await fetch(YEARS_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error)
    }
  }
}

function CategoriesApi () {
  this.getCategories = async () => {
    const CATEGORIES_API = '../data/categories.json';
    try {
      const response = await fetch(CATEGORIES_API);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error)
    }
  }
}
