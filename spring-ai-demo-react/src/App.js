import React, { useState } from "react";
import "./App.css";

import ImageGenerator from "./components/ImageGenerator";
import ChatComponent from "./components/ChatComponent";
import RecipeGenerator from "./components/RecipeGenerator";

function App() {

    const [activeTab, setActiveTab] = useState("image-generator");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (

        <div className="app-container">

            <div className="main-card">

                <h1 className="app-title">
                    AI Studio
                </h1>

                <div className="tabs">

                    <button
                        className={activeTab === "image-generator" ? "active" : ""}
                        onClick={() => handleTabChange("image-generator")}
                    >
                        Image Generator
                    </button>

                    <button
                        className={activeTab === "chat" ? "active" : ""}
                        onClick={() => handleTabChange("chat")}
                    >
                        Chat AI
                    </button>

                    <button
                        className={activeTab === "recipe-generator" ? "active" : ""}
                        onClick={() => handleTabChange("recipe-generator")}
                    >
                        Recipe Generator
                    </button>

                </div>

                <div className="content-area">

                    {activeTab === "image-generator" && <ImageGenerator />}

                    {activeTab === "chat" && <ChatComponent />}

                    {activeTab === "recipe-generator" && <RecipeGenerator />}

                </div>

            </div>

        </div>
    );
}

export default App;