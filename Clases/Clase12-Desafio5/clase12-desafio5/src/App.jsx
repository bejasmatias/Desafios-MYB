import { useEffect, useState } from "react"; //import JUST the hooks I'll use

const App = () => {
  const [fetchData, setFetchData] = useState([]); //declare states for the fetch
  const [error, setError] = useState(""); //use state for the error I need to show
  const [isLoading, setIsLoading] = useState(true); //the text I want to show until the page loads

  useEffect(() => { //I keep everything inside the useEffect, so that the page wont refresh everytime
    const getFetch = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) { //genero un if que verifique si el fetch no generó una respuesta,
          throw new Error( //si fue así, con estas cosas de JS aviso que hubo un error y, según lo que entendí, busca el try/catch más cercano para llevar ese error
            "Error al cargar los datos. Por favor, intenta nuevamente"
          );
        }
        const data = await response.json(); //si todo salió bien, convierto la respuesta en un JSON y la guardo en data
        setFetchData(data); //guardo esa data en fetchData mediante la función setFetchData
      } catch (error) { //ejecuto el error borrando una letra en el link del fetch por ejemplo
        console.error("ERROR AL REALIZAR LA SOLICITUD", error);
        setError("Error al cargar los datos. Por favor, intenta nuevamente"); // este mensaje se enviará al error del useState y se mostrará en el html
      } finally { //entendí que esta es una clausula que permite definir un bloque de código que se va a ejecutar independientemente de el try o el catch (se ejecuta mientras se cargan los datos por ejemplo, una vez que se cargan o no, muestra los datos o muestra el error, es como el intermedio)
        setIsLoading(false); //
      }
    };

    getFetch(); //llamo abajo la función
  }, []);

  return (
    <div className="loading">
      {isLoading ? (
        <p className="loading-message">Cargando datos...</p>
      ) : (
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <div>

            <header className="main-section-father">
              <h1 className="title"> Publicaciones </h1>
            </header>

            <div className="list-container"><ul className="list">
            {fetchData.map(post => ( //aquí decía data pero como yo la declaré como fetchData en el useState cambié eso
              <li key={post.id}>{post.title}</li>
            ))}
          </ul></div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;