interface Ricetta {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}
interface Chef {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
}

async function getChefBirthday(id: number): Promise<string> {
  try {
    const ricettaRes = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!ricettaRes.ok) throw new Error("Errore nel recupero della ricetta");

    const ricettaData: Ricetta = await ricettaRes.json();

    const chefRes = await fetch(`https://dummyjson.com/users/${ricettaData.userId}`);
    if (!chefRes.ok) throw new Error("Errore nel recupero dello chef");

    const chefData: Chef = await chefRes.json();

    return chefData.birthDate;
  } catch (error) {
    throw new Error(`Errore: ${(error as Error).message}`);
  } finally {
    console.log("Operazione completata");
  }
}

getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));

function App() {
  return (
    <>
      <h1>Ricette e Chef</h1>
      <p>Controlla la console per i risultati della chiamata API.</p>
      <p>Questa applicazione recupera la data di nascita dello chef associato alla ricetta con ID 1.</p>
      <p>Utilizza le API di DummyJSON per ottenere i dati.</p>
    </>
  )
}

export default App
