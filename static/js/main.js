(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.fetchCategories();
      this.fetchYears();
      this.fetchAtelierPostsHome();
      this.fetchAtelierPosts();
      this.fetchPressPosts();
      this.generateButtonBackToTop();
    },
    cacheElements() {
      /* PAGE: HOME */
      this.$articlesList = document.querySelector('.articles');
      this.$articlesAtelierList = document.querySelector('.articles-atelier');
      this.$backToTopBtn = document.querySelector('.to-top-btn');

      /* PAGE: ART & EXHIBITIONS */
      this.$listOfCategories = document.querySelector('.list-of-categories');
      this.$listOfYears = document.querySelector('.list-of-years');
      this.$artsAndExhibitionsPageListOfArticles = document.querySelector('.arts-and-exhibitions-page-list-of-articles');

      /* PAGE: ATELIER/STUDIO */
      this.$atelierPageListOfArticles = document.querySelector('.atelier-page-list-of-articles');

      /* PAGE: PRESS */
      this.$pressPageListOfArticles = document.querySelector('.press-page-list-of-articles');
    },
    async fetchCategories() {
      const categoriesApi = new CategoriesApi();
      const data = await categoriesApi.getCategories();
      if (this.$listOfCategories !== null){
        this.updateCategories(data);
      }
    },
    async fetchYears() {
      const yearsApi = new YearsApi();
      const data = await yearsApi.getYears();
      this.dataYears = data

      if (this.$listOfYears !== null){
        this.updateYears(data);
      }

      this.fetchArts();
    },
    async fetchArts() {
      const artAndExhibitionsApi = new ArtAndExhibitionsApi();
      const data = await artAndExhibitionsApi.getExhibitions();
      this.dataArts = data

      if ( this.$articlesList !== null){
        this.updateExhibitionsHome(data);
      }

      this.updateImagesArtAndExhibitions(data)

      this.populateHTMLArts();
    },
    populateHTMLArts() {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const urlParam = params.get('category');

      if (urlParam !== null) {
        // When you hava a parameter => only show the items of this parameter
        const parameterForCategory = this.dataArts.filter((data) => {
          for (let i = 0; i < data.tags.length; i++) {
            return data.tags[i] === urlParam;
          }
        });

        const html = this.dataYears.map((year) => {
          const filteredYears = parameterForCategory.filter((data) => {
            return data.year.indexOf(year.year) > -1;
          });
  
          const listItem = filteredYears.map((data) => {
            return `
            <div class="article__flex-container">
              <div class="article__text">
                <h2 class="article__title">${data.title}</h2>
                <span class="article__subtitle">${data.subtitle}</span>
                <span class="article__location">${data.tags} &#8212 ${data.location !== null ? data.location : 'Geen plaats gevonden'}</span>
              </div>
              <ul class="article__images-list">
                ${this.updateImagesArtAndExhibitions(data.images)}
              </ul>
            </div>
          `;
          }).join('')
  
          return `
          <li>
            <h2 id="${filteredYears.length === 0 ? '' : year.year}" class="article__year">${filteredYears.length === 0 ? '' : year.year}</h2>
            ${listItem}
          </li>
          `
        }).join('');
  
        this.$artsAndExhibitionsPageListOfArticles.innerHTML = html

      } else {
        // When you don't hava a parameter => show them all
        const html = this.dataYears.map((year) => {
          const filteredYears = this.dataArts.filter((data) => {
            return data.year.indexOf(year.year) > -1;
          });
  
          const listItem = filteredYears.map((data) => {
            return `
            <div class="article__flex-container">
              <div class="article__text">
                <h2 class="article__title">${data.title}</h2>
                <span class="article__subtitle">${data.subtitle}</span>
                <span class="article__location">${data.tags} &#8212 ${data.location !== null ? data.location : 'Geen plaats gevonden'}</span>
              </div>
              <ul class="article__images-list">
                ${this.updateImagesArtAndExhibitions(data.images)}
              </ul>
            </div>
          `;
          }).join('')
  
          return `
          <li>
            <h2 id="${filteredYears.length === 0 ? '' : year.year}" class="article__year">${filteredYears.length === 0 ? '' : year.year}</h2>
            ${listItem}
          </li>
          `
        }).join('');
  
        this.$artsAndExhibitionsPageListOfArticles.innerHTML = html
  
      }
    },
     updateCategories(categories) {
      this.$listOfCategories.innerHTML = categories.map((data) => {
        return `
        <li>
          <a href="index.html?category=${data.cat}">${data.cat}</a>
        </li>
        `
      }).join('')
    },
     categorieParams() {
      const search = window.location.search;
      const params = new URLSearchParams(search);

      const urlType = params.get('category');

      if (urlType !== null) {
        return params.get('category');
      } else {
      return null;
      }    
    },
    updateYears(years) {
      this.$listOfYears.innerHTML = years.map((year) => {
        return `
        <li>
          <a href="#${year.year}">${year.year}</a>
        </li>
        `
      }).join('')
    },
    updateExhibitionsHome(exhibitions) {
      const exhibitionsHome = exhibitions.filter((event) => {
        if (event.highlight === true){
          return true;
        } else {
          return false;
        }
      });

      this.$articlesList.innerHTML = exhibitionsHome.map((data) => {
        return `
        <li>
          <a href="./art-and-exhibitions/in-dialogue-with-calatrava/index.html">
            <div class="article">
              <img src="./static/img/${data.cover !== null ? data.cover : '841cfc614b75fcd69d7f6e5641c0515c.jpg'}" alt="image">
              <span class="subtitle">${data.tags} &#8212 ${data.location !== null ? data.location : 'Geen plaats gevonden'}</span>
              <h2>${data.title}</h2>
              <p>${data.description !== null ? data.description : 'Geen beschrijving gevonden'}</p>
              <a href="./art-and-exhibitions/index.html">
                <span class="learn-more learn-more--article">Learn more</span>
              </a>
            </div>
          </a>
        </li>
        `
      }).join('')
    },
    updateImagesArtAndExhibitions (images) {
    let tempStr = images.map (image => {
      return `
      <li>
        <a href="./in-dialogue-with-calatrava/index.html">
          <img class="art-img" src="../static/img/${image !== null ? image : '13f91bf308dbc6e41707c12ed5f0149c.jpg'}" alt="art image">
        </a>
      </li>
      `;
    }).join('');
    return tempStr;
    },
    async fetchAtelierPostsHome () {
      const atelierApi = new AtelierApiHome();
      const data = await atelierApi.getPosts();
      if (this.$articlesAtelierList !== null){
        this.updateAtelierPostsHome(data);
      }
    },
    updateAtelierPostsHome(posts) {
      const threePosts = posts.slice(0, 3)
      this.$articlesAtelierList.innerHTML = threePosts.map((data) => {
        return `
        <li>
          <a href="./atelier-studio/visiting-mons-again/index.html">
            <div class="article">
              <img src="./static/img/${data.cover !== null ? data.cover : '841cfc614b75fcd69d7f6e5641c0515c.jpg'}" alt="image">
              <span class="subtitle">${data.subtitle}</span>
              <h2>${data.title}</h2>
              <p>${data.description !== null ? data.description : 'Geen beschrijving gevonden'}</p>
              <a href="./atelier-studio/visiting-mons-again/index.html">
                <span class="learn-more learn-more--article">Learn more</span>
              </a>
            </div>
          </a>
        </li>
        `
      }).join('')
    },
    async fetchAtelierPosts () {
      const atelierApi = new AtelierApi();
      const data = await atelierApi.getPosts();
      if (this.$atelierPageListOfArticles !== null){
        this.updateAtelierPageArticles(data);
      }
    },
    updateAtelierPageArticles(articles) {
      this.$atelierPageListOfArticles.innerHTML = articles.map((data) => {
        return `
        <li>
          <a href="../atelier-studio/visiting-mons-again/index.html">
            <div class="article">
              <img src="../static/img/${data.cover !== null ? data.cover : '841cfc614b75fcd69d7f6e5641c0515c.jpg'}" alt="image">
              <span class="subtitle">${data.subtitle}</span>
              <h2>${data.title}</h2>
              <p>${data.description !== null ? data.description : 'Geen beschrijving gevonden'}</p>
              <a href="../atelier-studio/visiting-mons-again/index.html">
                <span class="learn-more learn-more--article">Learn more</span>
              </a>
            </div>
          </a>
        </li>
        `
      }).join('')
    },
    async fetchPressPosts () {
      const pressApi = new PressApi();
      const data = await pressApi.getPosts();
      if (this.$pressPageListOfArticles !== null){
        this.updatePressPageArticles(data);
      }
    },
    updatePressPageArticles(articles) {
      this.$pressPageListOfArticles.innerHTML = articles.map((data) => {
        return `
        <li>
          <a href="../press/my-secret-garden-valencia/index.html">
            <div class="article">
              <img src="../static/img/${data.cover !== null ? data.cover : '841cfc614b75fcd69d7f6e5641c0515c.jpg'}" alt="image">
              <span class="subtitle">${data.subtitle}</span>
              <h2>${data.title}</h2>
              <p>${data.description !== null ? data.description : 'Geen beschrijving gevonden'}</p>
              <a href="../press/my-secret-garden-valencia/index.html">
                <span class="learn-more learn-more--article">Learn more</span>
              </a>
            </div>
          </a>
        </li>
        `
      }).join('')
    },
    generateButtonBackToTop() {
      var rootElement = document.documentElement
      this.$backToTopBtn.addEventListener('click', (event) => {
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
      });
    },
  };
  app.initialize();
})()