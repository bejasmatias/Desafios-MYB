const books = [
    { title: 'El Aleph', author: 'Jorge Luis Borges' },
    { title: 'La ciudad y los perros', author: 'Mario Vargas Llosa' },
    { title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
    { title: 'Rayuela', author: 'Julio Cortázar' },
    { title: 'Ficciones', author: 'Jorge Luis Borges' },
    { title: 'El hacedor', author: 'Jorge Luis Borges' },
    { title: 'Los pasos perdidos', author: 'Alejo Carpentier' },
    { title: 'El reino de este mundo', author: 'Alejo Carpentier' },
    { title: 'La fiesta del chivo', author: 'Mario Vargas Llosa' },
    { title: 'La tía Julia y el escribidor', author: 'Mario Vargas Llosa' },
    { title: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez' },
    { title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez' },
    { title: 'Bestiario', author: 'Julio Cortázar' },
    { title: 'Las armas secretas', author: 'Julio Cortázar' }
  ];

// Creo una funcion que filtre los libros segun un termino en el nombre de su autor. 
// Convierto el nombre del autor y el termino de busqueda a minuscula para comparar y llegar a una coincidencia
  
  function filterBooksByAuthor(books, searchTerm) {
    const filteredBooks = books.filter(book => {
      const author = book.author.toLowerCase();
      return author.includes(searchTerm.toLowerCase());
    });

// Valido que lo que estoy por buscar se enecuentre en el array de libros, si hay coincidencia se imprime
  
    if (filteredBooks.length === 0) {
      console.log("No se encontraron libros que coincidan con el término de búsqueda.");
    } else {
      console.log("Libros filtrados según un término en el nombre del autor:", filteredBooks);
    }
    
    return filteredBooks;
  }
  
   // Hago una funcion para modificar el nombre del autor que se filtro en el nuevo array que se creo

  function modifyAuthorName(books, modifiedAuthorName) {
    const modifiedBooks = books.map(book => {
      return { ...book, author: modifiedAuthorName };
    });
  
    return modifiedBooks;
  }
  
 // Declaro el termino a buscar que entrara como parametro en la function filterBooksByAuthor()

  const searchTerm = 'mari';

   // Creo un nuevo array que muestre una nueva lista con el termino que quiero y llamo a la function filterBooksByAuthor()

  const filteredBooks = filterBooksByAuthor(books, searchTerm);

  // Modifico el nombre del autor segun la lista de libros filtrados solo si se encontraron datos
  
  if (filteredBooks.length > 0) {
    const modifiedAuthorName = 'Marito Vargas';
    const modifiedBooks = modifyAuthorName([...filteredBooks], modifiedAuthorName);
    console.log("Nueva lista filtrada y modificada:", modifiedBooks);
  }

// Muestro el array original que no fue modificado

console.log("Array original:", books);