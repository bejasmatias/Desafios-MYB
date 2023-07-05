import { useEffect, useState } from "react"; //import JUST the hooks I'll use

const App = () => {
  const [data, setData] = useState([]); //declare states for the fetch
  const [error, setError] = useState(""); //use state for the error I need to show
  const [isLoading, setIsLoading] = useState(true); //for the text I want to show until the page loads

  useEffect(() => { //I keep everything inside the useEffect, so that the page wont refresh everytime

    const getFetch = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) { //check if the fetch geneterated a response
          throw new Error("An error occured while loading. Please try again"
          );
        }

        const data = await response.json(); //save the info in 'data'
        setData(data);
      } catch (error) { //execute the error
        console.error("ERROR REQUEST", error);
        setError("An error occured while loading. Please try again"); // displays the error on screen
      } finally {
        setIsLoading(false);
      }
    };

    getFetch(); //call getFetch
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
                <h1 className="title">Lorem info </h1>
              </header>

              <div className="list-container">

                <ul className="list">
                  {data.map(post => (<li key={post.id}>{post.title}</li>
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