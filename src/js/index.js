console.log("App Ready");

/////////// global varibales ////////

let data = [];

const output = document.getElementById("output");
const searchBar = document.getElementById("search");

const selectBox1 = document.getElementById("selectBox1");
const selectBox2 = document.getElementById("selectBox2");
const checkboxes1 = document.getElementById("checkboxes1");
const checkboxes2 = document.getElementById("checkboxes2");
const select = document.getElementsByTagName("select");
const movie = document.getElementById("output");
const header = document.getElementById("header-container");
const test = document.getElementById("test");
const filterLink = document.getElementById("clear");
const radioMovie = document.getElementById("radiomovie");
const radioBook = document.getElementById("radiobook");

////////// fetch API data into the page ////////

const getMovieDataBase = async () => {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json"
        );
        data = await response.json();

        data.media.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });

        // getMovies(data.media);
        getMovies(data.media);
        display(data.media);
        selectBox1.addEventListener("mouseover", () => {
            selectGenre(data.media);
        });
        selectBox2.addEventListener("mouseover", () => {
            selectYear(data.media);
        });
        filterGenre(data.media);
        filterYear(data.media);
        search(data.media);
        selectType(data.media);
    } catch (error) {
        console.log(error);
    }
};

///////////// fixing poster broken link /////////

const getMovies = (posterList) => {
    const moviedatabase = posterList.map((object) => {
        const genre = object.genre.join(", ");
        data.media[24].poster =
            "https://images.moviesanywhere.com/127cba05ac878f599d31426050b4b47a/42b29b75-cdd3-4ea0-b148-6eaaba889c6b.jpg";
    });
};

///////////// displaying API database as a list /////////

const display = (data) => {
    const htmlString = data
        .map((object) => {
            return `
        <li><img class="responsive" src="${object.poster}">
        <p> ${object.title} <span>(${object.year})</span></p>
        <p> ${object.genre}</p>
        </li>`;
        })
        .join("");
    output.innerHTML = htmlString;
};

///////////// adding a search feature by title /////////

searchBar.addEventListener("mouseenter", () => {
    document.getElementById("search").placeholder = "Search by title";
});

const search = (data) => {
    searchBar.addEventListener("keyup", (event) => {
        const searchTitle = event.target.value.toLowerCase();
        const filterTitle = data.filter((obj) => {
            return obj.title.toLowerCase().includes(searchTitle);
        });
        display(filterTitle);
    });
};

///////////// displaying API for movie genre type /////////

let expanded = false;
let genreNewList = [];

const selectGenre = (genreList) => {
    if (!expanded) {
        checkboxes1.style.display = "block";
        expanded = true;
    } else if (expanded == true) {
        checkboxes1.style.display = "none";
        expanded = false;
    }
    let checkboxOptions = "";

    for (let i = 0; i < genreList.length; i++) {
        for (let j = 0; j < genreList[i].genre.length; j++) {
            if (genreNewList.indexOf(genreList[i].genre[j]) === -1) {
                genreNewList.push(genreList[i].genre[j]);
            }
        }
    }

    let sortedGenre = genreNewList.sort();

    const genre = sortedGenre.map((genre) => {
        checkboxOptions += ` 
                <label for="genre">
                <input id="checkbox" value="genre" type="checkbox" />${genre}</label>
                `;

        document.getElementById("checkboxes1").innerHTML = checkboxOptions;
    });
};

///////////// adding filtering API for movie selection based on year /////////

let yearList = [];

const selectYear = (yearsList) => {
    if (!expanded) {
        checkboxes2.style.display = "block";
        expanded = true;
    } else {
        checkboxes2.style.display = "none";
        expanded = false;
    }

    let checkboxOptions = "";

    for (let i = 0; i < yearsList.length; i++) {
        if (yearList.indexOf(yearsList[i].year) === -1) {
            yearList.push(yearsList[i].year);
        }
    }

    let sortedYear = yearList.sort().reverse();

    const year = sortedYear.map((year) => {
        checkboxOptions += ` 
                    <label for="two">
                    <input type="checkbox" id="checkbox" />${year}</label>
                    `;
    });
    document.getElementById("checkboxes2").innerHTML = checkboxOptions;
};

///////////// adding filtering API for movie selection based on type/////////

const selectType = (typeList) => {
    radioMovie.checked = true;
    radioMovie.checked = false;
    radioMovie.addEventListener("click", () => {
        const searchType = "movie";

        const movieType = typeList.filter((obj) => {
            return obj.type.includes(searchType);
        });
        display(movieType);
        console.log(movieType);
    });
    radioBook.addEventListener("click", (event) => {
        const searchType = "book";

        const bookType = typeList.filter((obj) => {
            return obj.type.includes(searchType);
        });
        display(bookType);
        console.log(bookType);
    });
    console.log(radioBook);
};

///////////// adding filtering API for movie clear filters and reset page /////////

const clearFilters = () => {
    let link = "";
    link += `
    <input type="reset" role="button" value="clear filters" id="clear">`;

    document.getElementById("filter_link").innerHTML = link;
};

///////////// adding counting of checked genre items /////////

checkboxes1.addEventListener("click", (event) => {
    const checkGenre = event.target.value;

    const uncheckedbox = document.querySelector("#selectBox1>select>option");

    let counterHtml = "";

    const checkedbox = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    if (checkedbox.length < 2 && checkedbox.length > 0) {
        counterHtml += `<span>${
            document.querySelectorAll('input[type="checkbox"]:checked').length
        }  <span><option>Genre</option>`;
    }

    if (checkedbox.length >= 2) {
        counterHtml += `<span>${
            document.querySelectorAll('input[type="checkbox"]:checked').length
        }  <span><option>Genres</option>`;
    } else if (checkedbox.length <= 0) {
        counterHtml += `<option>Genre</option>`;
    }

    uncheckedbox.innerHTML = counterHtml;
});

///////////// adding counting of checked year items /////////

checkboxes2.addEventListener("click", () => {
    const uncheckedbox = document.querySelector("#selectBox2>select>option");

    let counterHtml = "";

    const checkedbox = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    if (checkedbox.length < 2 && checkedbox.length > 0) {
        counterHtml += `<span>${
            document.querySelectorAll('input[type="checkbox"]:checked').length
        }  <span><option>Year</option>`;
    }

    if (checkedbox.length >= 2) {
        counterHtml += `<span>${
            document.querySelectorAll('input[type="checkbox"]:checked').length
        }  <span><option>Years</option>`;
    } else if (checkedbox.length <= 0) {
        counterHtml += `<option>Year</option>`;
    }

    uncheckedbox.innerHTML = counterHtml;
});

///////////// adding filtering page items based on checked items on genre /////////

const filterGenre = (data) => {
    checkboxes1.addEventListener("click", (event) => {
        const eventchecked = event.target.checked;
        const eventtext = event.target.parentNode.textContent;

        const filterGenre = data.filter((obj) => {
            return obj.genre.includes(eventtext);
        });
        display(filterGenre);
        console.log(filterGenre);
    });
};

const filterYear = (data) => {
    checkboxes2.addEventListener("click", (event) => {
        array = event.target.parentNode.textContent;
        const filterYear = data.filter((obj) => {
            return array.includes(obj.year);
        });
        display(filterYear);
    });
};

///////////// Call functions /////////

getMovieDataBase();
clearFilters();
