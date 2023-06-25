// document.getElementById('search-form').addEventListener('submit', function(event) {
//   event.preventDefault(); // Evita el envío del formulario

//   // Variables para almacenar los datos de películas y usuarios
//   let watchedMoviesData, usersData;

//   // Promesa para obtener los datos de las películas
//   const getWatchedMoviesData = fetch('movies-watched.json')
//     .then(response => response.json())
//     .then(data => {
//       watchedMoviesData = data;
//     })
//     .catch(error => {
//       console.error('Error al obtener los datos de las películas:', error);
//     });

//   // Promesa para obtener los datos de los usuarios
//   const getUsersData = fetch('users.json')
//     .then(response => response.json())
//     .then(data => {
//       usersData = data;
//     })
//     .catch(error => {
//       console.error('Error al obtener los datos de los usuarios:', error);
//     });

//   // Promesa para esperar a que se completen las dos solicitudes anteriores
//   Promise.all([getWatchedMoviesData, getUsersData])
//     .then(() => {
//       const movieList = document.getElementById('movieList');
//       const userList = document.getElementById('userList');

//       // Limpiar listas previas
//       movieList.innerHTML = '';
//       userList.innerHTML = '';

//       const userId = parseInt(document.getElementById('userId-input').value);

//       if (!userId) {
//         // Mostrar todas las películas si no se ingresa un User ID
//         displayMovies(watchedMoviesData, movieList);
//       } else {
//         const user = usersData.find(user => user.id === userId);

//         if (user) {
//           displayUser(user, userList);

//           const userMovies = watchedMoviesData.filter(movie => movie.userId === user.id);
//           displayMovies(userMovies, movieList);
//         } else {
//           // Mostrar mensaje si no se encuentra ningún usuario con el User ID ingresado
//           const noUserMessage = document.createElement('p');
//           noUserMessage.textContent = "No user found with ID: " + userId;
//           userList.appendChild(noUserMessage);
//         }
//       }
//     })
//     .catch(error => {
//       console.error('Error al obtener los datos:', error);
//     });
// });

// function displayMovies(movies, container) {
//   movies.forEach(movie => {
//     const movieItem = document.createElement('li');
//     const movieTitle = document.createElement('h3');
//     const movieImage = document.createElement('img');
//     const movieRate = document.createElement('p');

//     movieTitle.textContent = movie.title;
//     movieImage.src = movie.image;
//     movieRate.textContent = "Rate: " + movie.rate;

//     movieItem.appendChild(movieTitle);
//     movieItem.appendChild(movieImage);
//     movieItem.appendChild(movieRate);
//     container.appendChild(movieItem);
//   });
// }

// function displayUser(user, container) {
//   const userItem = document.createElement('li');
//   const id = document.createElement('h4');
//   const username = document.createElement('h3');
//   const email = document.createElement('p');
//   const address = document.createElement('p');
//   const company = document.createElement('p');

//   id.textContent = "ID: " + user.id;
//   username.textContent = "Username: " + user.username;
//   email.textContent = "Email: " + user.email;
//   address.textContent = "Address: " + user.address.street + ", " + user.address.city + ", " + user.address.state + ", " + user.address.zipcode;
//   company.textContent = "Company: " + user.company.name;

//   userItem.appendChild(id);
//   userItem.appendChild(username);
//   userItem.appendChild(email);
//   userItem.appendChild(address);
//   userItem.appendChild(company);
//   container.appendChild(userItem);
// }

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Variables para almacenar los datos de películas y usuarios
  let watchedMoviesData, usersData;

  // Promesa para obtener los datos de las películas
  const getWatchedMoviesData = fetch('movies-watched.json')
    .then(response => response.json())
    .then(data => {
      watchedMoviesData = data;
    })
    .catch(error => {
      console.error('Error al obtener los datos de las películas:', error);
    });

  // Promesa para obtener los datos de los usuarios
  const getUsersData = fetch('users.json')
    .then(response => response.json())
    .then(data => {
      usersData = data;
    })
    .catch(error => {
      console.error('Error al obtener los datos de los usuarios:', error);
    });

  // Promesa para esperar a que se completen las dos solicitudes anteriores
  Promise.all([getWatchedMoviesData, getUsersData])
    .then(() => {
      const movieList = document.getElementById('movieList');
      const userList = document.getElementById('userList');

      // Limpiar listas previas
      movieList.innerHTML = '';
      userList.innerHTML = '';

      const userId = parseInt(document.getElementById('userId-input').value);
      const fromDateInput = document.getElementById('from-date-input').value;
      const toDateInput = document.getElementById('to-date-input').value;

      const fromDate = new Date(fromDateInput); // Convertir fecha "desde" a objeto Date
      const toDate = new Date(toDateInput); // Convertir fecha "hasta" a objeto Date

      const fromSeconds = fromDate.getTime() / 1000; // Convertir fecha "desde" a segundos
      const toSeconds = toDate.getTime() / 1000; // Convertir fecha "hasta" a segundos

      if (!userId) {
        // Mostrar todas las películas si no se ingresa un User ID
        const filteredMovies = watchedMoviesData.filter(movie => {
          const watchedDate = new Date(movie.watched);
          const watchedSeconds = watchedDate.getTime() / 1000;
          return watchedSeconds >= fromSeconds && watchedSeconds <= toSeconds;
        });
        displayMovies(filteredMovies, movieList);
      } else {
        const user = usersData.find(user => user.id === userId);

        if (user) {
          displayUser(user, userList);

          const userMovies = watchedMoviesData.filter(movie => {
            return movie.userId === user.id;
          });

          const filteredMovies = userMovies.filter(movie => {
            const watchedDate = new Date(movie.watched);
            const watchedSeconds = watchedDate.getTime() / 1000;
            return watchedSeconds >= fromSeconds && watchedSeconds <= toSeconds;
          });

          displayMovies(filteredMovies, movieList);
        } else {
          // Mostrar mensaje si no se encuentra ningún usuario con el User ID ingresado
          const noUserMessage = document.createElement('p');
          noUserMessage.textContent = "No user found with ID: " + userId;
          userList.appendChild(noUserMessage);
        }
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
});

function displayMovies(movies, container) {
  movies.forEach(movie => {
    const movieItem = document.createElement('li');
    const movieTitle = document.createElement('h3');
    const movieImage = document.createElement('img');
    const movieRate = document.createElement('p');

    movieTitle.textContent = movie.title;
    movieImage.src = movie.image;
    movieRate.textContent = "Rate: " + movie.rate;

    const watchedDate = new Date(movie.watched); // Convertir fecha a objeto Date
    const watchedSeconds = watchedDate.getTime() / 1000; // Convertir a segundos

    // Aquí puedes utilizar la variable watchedSeconds para comparar las fechas

    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieRate);
    container.appendChild(movieItem);
  });
}

function displayUser(user, container) {
  const userItem = document.createElement('li');
  const id = document.createElement('h4');
  const username = document.createElement('h3');
  const email = document.createElement('p');
  const address = document.createElement('p');
  const company = document.createElement('p');

  id.textContent = "ID: " + user.id;
  username.textContent = "Username: " + user.username;
  email.textContent = "Email: " + user.email;
  address.textContent = "Address: " + user.address.street +", " + user.address.city + ", " + user.address.state + ", " + user.address.zipcode;
  company.textContent = "Company: " + user.company.name;


  userItem.appendChild(id);
  userItem.appendChild(username);
  userItem.appendChild(email);
  userItem.appendChild(address);
  userItem.appendChild(company);
  container.appendChild(userItem);
}
