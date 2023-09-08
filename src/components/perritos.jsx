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
        <Loading >
            <div className="load">
              <h1 className="loading">
                Cargando...
              </h1>
            </div>
        </Loading>
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
          <button className="btn-dog" button onClick={randomDog}>
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

function sum() {
  a = 10
  b= 15
  sum = a+b
}

console.log (sum = a+b)
export default App;

const DogPic = styled.div`
  .img-content {
    display: grid;
    justify-content: center;
    align-items:center;
    width: 700px;
    height: 600px; 
  };
  .dogs {
    width: 75%;
    height: 75%;
    object-fit: cover;
    border: 1px solid;
    padding: 5px;
  };
  .btn-dog {
    background: #28a745;
    font-weight: bold;
    border-radius:3rem;
    border: 1px solid;
    justify-content: center;
  }
`;

const Loading = styled.h1`
  .load{
    color: red;
    font-size: 2rem;
    font-weight:bold;
  }
`