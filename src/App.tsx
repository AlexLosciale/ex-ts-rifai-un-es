import { useEffect, useState } from 'react';
import './index.css';

enum MealType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Snack = "Snack",
  Dessert = "Dessert",
  Appetizer = "Appetizer",
  Beverage = "Beverage",
  Salad = "Salad"
}

enum Difficulties {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Expert = "Expert"
}


interface Ricetta {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulties;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: MealType;
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

// Funzione per prendere la ricetta
async function getRicetta(id: number): Promise<Ricetta> {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  if (!res.ok) throw new Error("Errore nel recupero della ricetta");
  return await res.json();
}

// Funzione per prendere lo chef
async function getChef(id: number): Promise<Chef> {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  if (!res.ok) throw new Error("Errore nel recupero dello chef");
  return await res.json();
}

function App() {
  const [ricetta, setRicetta] = useState<Ricetta | null>(null);
  const [chef, setChef] = useState<Chef | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const ricettaData = await getRicetta(1);
        setRicetta(ricettaData);

        const chefData = await getChef(ricettaData.userId);
        setChef(chefData);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Informazioni sullo Chef e sulla Ricetta</h1>
      {error && <p className="error">Errore: {error}</p>}

      {ricetta && (
        <div className="ricetta-card">
          <h2>{ricetta.name}</h2>
          <p><strong>Ingredienti:</strong> {ricetta.ingredients.join(', ')}</p>
          <p><strong>Istruzioni:</strong> {ricetta.instructions.join(' ')}</p>
          <p><strong>Tempo di preparazione:</strong> {ricetta.prepTimeMinutes} minuti</p>
          <p><strong>Tempo di cottura:</strong> {ricetta.cookTimeMinutes} minuti</p>
          <p><strong>Porzioni:</strong> {ricetta.servings}</p>
          <p><strong>Difficoltà:</strong> {ricetta.difficulty}</p>
          <p><strong>Cucina:</strong> {ricetta.cuisine}</p>
          <p><strong>Calorie per porzione:</strong> {ricetta.caloriesPerServing}</p>
          <p><strong>Tag:</strong> {ricetta.tags.join(', ')}</p>
          <img className="recipe-image" src={ricetta.image} alt={ricetta.name} />
          <p><strong>Valutazione:</strong> {ricetta.rating} ({ricetta.reviewCount} recensioni)</p>
          <p><strong>Tipo di pasto:</strong> {ricetta.mealType}</p>
        </div>
      )}

      {chef && (
        <div className="chef-card">
          <img className="chef-image" src={chef.image} alt={chef.firstName} />
          <h2>{chef.firstName} {chef.lastName}</h2>
          <p><strong>Età:</strong> {chef.age}</p>
          <p><strong>Data di nascita:</strong> {new Date(chef.birthDate).toLocaleDateString('it-IT', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</p>
          <p><strong>Email:</strong> {chef.email}</p>
          <p><strong>Telefono:</strong> {chef.phone}</p>
          <p><strong>Username:</strong> @{chef.username}</p>
        </div>
      )}
    </div>
  );
}

export default App;
