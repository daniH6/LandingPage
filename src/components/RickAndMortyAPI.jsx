import { useEffect, useState } from "react";
import styled from 'styled-components';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            "https://dog.ceo/api/breeds/image/random"
          );
          if (response.ok) {
            const dog = await response.json();
            setImageUrl(dog.message);
            setError(null);
            setIsLoading(false);
          } else {
            setError("Hubo un error al obtener el perrito");
          }
        } catch (error) {
          setError("No pudimos hacer la solicitud para obtener el perrito");
        }
      }
      fetchData();
    }
  }, [isLoading]);

  const randomDog = () => {
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (error) { // ⬅️ mostramos el error (si es que existe)
    return (
      <div className="App">
        <h1>{error}</h1>
        <button onClick={randomDog}>Volver a intentarlo</button>
      </div>
    );
  }

  return (
    <div className="App">
      <DogPic>
        <div className="img-content">
          <img
            className="dogs"
            src={imageUrl}
            alt="Imagen de perrito aleatoria"
          />

          <button button onClick={randomDog}>
            ¡Otro!{" "}
            <span role="img" aria-label="corazón">
              ❤️
            </span>
          </button>
        </div>
      </DogPic>
    </div>
  );
};

export default App;

const DogPic = styled.div`
  .img-content {
    display: grid;
    justify-content: center;
    align-items:center;
    width: 700px;
    height: 500px; 
  }

  .dogs {
    width: 75%;
    height: 75%;
    object-fit: cover;
    border: 1px solid;
    padding: 5px;
  }

  button {
    background: #28a745;
    font-weight: 500px;
    border: 1px solid #
  }
`;