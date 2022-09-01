console.log("App Ready");

/////////// global varibales ////////

let selectBox1 = document.getElementById("selectBox1");
let selectBox2 = document.getElementById("selectBox2");
let checkboxes1 = document.getElementById("checkboxes1");
let checkboxes2 = document.getElementById("checkboxes2");
let select = document.getElementsByTagName('select');
const header = document.getElementById("header-container");
const test = document.getElementById("test");

const getMovies = () => {
    // fetch('https://dog.ceo/api/breeds/image/random',
    fetch("https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json")
        .then((res) => res.json())
        .then((data) => {
            let output = ``;

            const moviedatabase = data.media.map((object) => {
                const genre = object.genre.join(", ");

                data.media[9].poster = "https://images.moviesanywhere.com/127cba05ac878f599d31426050b4b47a/42b29b75-cdd3-4ea0-b148-6eaaba889c6b.jpg"

                output += `  
                <li><img class="responsive" src="${object.poster}">
                <p> ${object.title} <span>(${object.year})</span></p>
                <p> ${genre}</p>
                </li>`;

                
            });

            document.getElementById("output").innerHTML = output;

        });

    
};

window.addEventListener("load", getMovies);


let expanded = false;

const selectGenre = () => {

    if (!expanded) {
        checkboxes1.style.display = "block";
        expanded = true;
    } else if (expanded == true) {
        checkboxes1.style.display = "none";
        expanded = false;
    }

    fetch("https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json")
        .then((res) => res.json())
        .then((data) => {


            let arr = data.media.genre;

            let checkboxOptions = '';

            const genre = data.media.map((object) => {

                const genreSpace = object.genre.join(", ");

                checkboxOptions += ` 
                    <label for="one">
                    <input type="checkbox" id="one" />${genreSpace}</label>
                    `;

            });

            let chooseMovieGenre =[];
 
            // looping through the data
            
            for(let i=0; i < data.length; i++) {
         
               const genreSearched = `${data[i].media.genre.toLowerCase()}`;
               
               if(genreSearched.includes(searchInput.value.toLowerCase())){
                chooseMovieGenre.push(data[i]);
               }     
            }

            document.getElementById("checkboxes1").innerHTML = checkboxOptions;
        });
};

selectBox1.addEventListener("mouseover", () => {
    selectGenre();
});


const selectYear = () => {

    if (!expanded) {
        checkboxes2.style.display = "block";
        expanded = true;
    } else {
        checkboxes2.style.display = "none";
        expanded = false;
    }

    fetch("https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json")
        .then((res) => res.json())
        .then((data) => {

            let checkboxOptions = '';
            
            const genre = data.media.map((object) => {

                checkboxOptions += ` 
                    <label for="two">
                    <input type="checkbox" id="checkbox" />${object.year}</label>
                    `;

            });
            document.getElementById("checkboxes2").innerHTML = checkboxOptions;
        });
};

selectBox2.addEventListener("mouseover", () => {
    selectYear();
});



//////  dynamic search


const showSearch = () => {

    let html = document.createElement('div'); 
 
    html.innerHTML = `
       <label for="search" class="movie__search">
          <input id="search" type="text" placeholder=" Search by title &#xF002;" style="font-family:Arial, FontAwesome" />
       </label>`;  
    header.appendChild(html);
 
 }
 showSearch()


 
 /* const performSearch = (searchInput, list) => {
 
    // creates a new array with searched names
 
    let searchedMovieList =[];
 
    // looping through the data
    
    for(let i=0; i < list.length; i++) {
 
       const titlesSearched = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
       
       if(titlesSearched.includes(searchInput.value.toLowerCase())){
        searchedMovieList.push(list[i]);
       }     
    }
 
    // adding the pages and pagination numbers congruent with data
 
    getMovies(searchedMovieList, 1);
 
 }
 
  // Call functions
 showSearch()
 
 
 // event variables initializers
 
 const search = document.querySelector('#search');
 const submit = document.querySelector('#submit'); 
 
 // event listeners for search and returning specific data
 
 submit.addEventListener('click', (event) => {
    event.preventDefault();
    performSearch(search, data);
   
  });
  
  submit listener 
  search.addEventListener('keyup', () => {
    performSearch(search, data);
  
  }); */
 
