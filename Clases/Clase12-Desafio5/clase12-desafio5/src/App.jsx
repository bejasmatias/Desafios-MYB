import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFetch = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
          throw new Error("An error occurred while loading. Please try again");
        }

        const data = await response.json();
        const transformedData = data.map((post) => ({
          ...post,
          title: capitalizeFirstLetter(post.title)
        }));
        
        setData(transformedData);
      } catch (error) {
        console.error("ERROR REQUEST", error);
        setError("An error occurred while loading. Please try again");
      } finally {
        setIsLoading(false);
      }
    };

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    setTimeout(() => {
      getFetch();
    }, 3000);
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
                <h1 className="title">Lorem information</h1>
              </header>
              <div className="list-container">
                <ul className="list">
                  {data.map((post) => (
                    <li className="items" key={post.id}>
                      {post.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
