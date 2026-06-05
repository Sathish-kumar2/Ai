import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

function RecipeGenerator() {

    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    const createRecipe = async () => {

        if (!ingredients.trim()) return;

        try {

            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/generate-recipe?ingredients=${ingredients}&dietaryRestrictions=${dietaryRestrictions}&cuisine=${cuisine}`
            );

            const data = await response.text();

            setRecipe(data);

        } catch (error) {

            console.error("Error generating recipe : ", error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="card-container">

            <h2>Create a Recipe</h2>

            <div className="recipe-inputs">

                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Ingredients (comma separated)"
                />

                <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="Cuisine Type"
                />

                <input
                    type="text"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="Dietary Restrictions"
                />

                <button
                    onClick={createRecipe}
                    disabled={loading}
                    className="generate-btn"
                >

                    {loading ? (
                        <>
                            <LoaderCircle
                                size={18}
                                className="spin-icon"
                            />
                            Creating...
                        </>
                    ) : (
                        "Create Recipe"
                    )}

                </button>

            </div>

            <div className="output-box recipe-box">

                {loading ? (

                    <div className="loading-content">

                        <LoaderCircle
                            size={35}
                            className="spin-icon"
                        />

                        <p>Generating recipe...</p>

                    </div>

                ) : (

                    <pre className="recipe-text">
                        {recipe || "Recipe will appear here..."}
                    </pre>

                )}

            </div>

        </div>
    );
}

export default RecipeGenerator;