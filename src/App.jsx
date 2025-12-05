import { useState, useEffect } from "react"; // Import useEffect
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // Initialize state by reading from localStorage immediately using the useState initializer function
  const [redFinalScoreCookieTest, setRedFinalScore] = useState(() => {
    const savedScore = localStorage.getItem("redFinalScore");
    // Parse the saved string into an integer, defaulting to 0 if null
    return savedScore !== null ? parseInt(savedScore, 10) : 0;
  });

  const [blueBot1, setBlueBot1] = useState(
    new Map([
      ["autoArtifacts", 0],
      ["teleArtifacts", 0],
    ])
  );
  const [redBot1, setRedBot1] = useState(
    new Map([
      ["autoArtifacts", 0],
      ["teleArtifacts", 0],
    ])
  );

  const [blueBot2, setBlueBot2] = useState(
    new Map([
      ["autoArtifacts", 0],
      ["teleArtifacts", 0],
    ])
  );

  const [redBot2, setRedBot2] = useState(
    new Map([
      ["autoArtifacts", 0],
      ["teleArtifacts", 0],
    ])
  );

  const [redAutoPattern, setRedAutoPattern] = useState(0);
  const [blueAutoPattern, setBlueAutoPattern] = useState(0);

  // --- Start of Update Functions (Standardized logic using Math.max) ---

  const updateRedAutoPattern = (change) => {
    const proposed = redAutoPattern + change;
    // Clamp the value between 0 and 9
    setRedAutoPattern(Math.max(0, Math.min(9, proposed)));
  };

  const updateBlueAutoPattern = (change) => {
    const proposed = blueAutoPattern + change;
    // Clamp the value between 0 and 9
    setBlueAutoPattern(Math.max(0, Math.min(9, proposed)));
  };

  const updateBotState = (botMap, setBotState, id, change) => {
    const current = botMap.get(id) || 0;
    // Ensures the value never drops below 0
    const proposed = Math.max(0, current + change); 
    const newMap = new Map(botMap);
    newMap.set(id, proposed);
    setBotState(newMap);
  };

  const updateBlue1 = (id, change) => updateBotState(blueBot1, setBlueBot1, id, change);
  const updateRed1 = (id, change) => updateBotState(redBot1, setRedBot1, id, change);
  const updateBlue2 = (id, change) => updateBotState(blueBot2, setBlueBot2, id, change);
  const updateRed2 = (id, change) => updateBotState(redBot2, setRedBot2, id, change);

  // --- End of Update Functions ---


  // Use useEffect to calculate and save the total score whenever relevant state changes
  useEffect(() => {
    const totalRedScore = 
      (redBot1.get("autoArtifacts") + redBot2.get("autoArtifacts")) * 3 +
      redAutoPattern * 2;
      
    // Update the local react state used for display
    setRedFinalScore(totalRedScore); 
    
    // Save the latest score to localStorage every time the score changes
    localStorage.setItem("redFinalScore", totalRedScore.toString());
    
  }, [redBot1, redBot2, redAutoPattern]); // Dependencies array

  // The window.addEventListener is handled by the useEffect above and is removed for simplicity.


  return (
    <>
      <div>
        <a href="https://pedropathing.com" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://bionicdutch.club" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PedroPathing x Bionic Dutch</h1>
      {/* UI structure maintained as requested, though CSS is recommended for spacing */}
      <div className="blueBot1">
        <h3>Autonomous</h3>

        {/*BLUE BOT 1*/}
        <button
          id="Auto_BlueBot1_Artifact_DOWN"
          onClick={() => updateBlue1("autoArtifacts", -1)}
        >
          -
        </button>
        <label id="Auto_BlueBot1_Artifact_LABEL">
          Blue Bot 1 Artifacts: {blueBot1.get("autoArtifacts")}
        </label>
        <button
          id="Auto_BlueBot1_Artifact_UP"
          onClick={() => updateBlue1("autoArtifacts", 1)}
        >
          +
        </button>

        <tab></tab>

        {/*RED BOT 1*/}
        <button
          id="Auto_RedBot1_Artifact_DOWN"
          onClick={() => updateRed1("autoArtifacts", -1)}
        >
          -
        </button>
        <label id="Auto_RedBot1_Artifact_LABEL">
          Red Bot 1 Artifacts: {redBot1.get("autoArtifacts")}
        </label>
        <button
          id="Auto_RedBot1_Artifact_UP"
          onClick={() => updateRed1("autoArtifacts", 1)}
        >
          +
        </button>
        <br></br>

        {/*BLUE BOT 2*/}
        <button
          id="Auto_BlueBot2_Artifact_DOWN"
          onClick={() => updateBlue2("autoArtifacts", -1)}
        >
          -
        </button>
        <label id="Auto_BlueBot2_Artifact_LABEL">
          Blue Bot 2 Artifacts: {blueBot2.get("autoArtifacts")}
        </label>
        <button
          id="Auto_BlueBot2_Artifact_UP"
          onClick={() => updateBlue2("autoArtifacts", 1)}
        >
          +
        </button>

        {/*RED BOT 2*/}
        <button
          id="Auto_RedBot2_Artifact_DOWN"
          onClick={() => updateRed2("autoArtifacts", -1)}
        >
          -
        </button>
        <label id="Auto_RedBot2_Artifact_LABEL">
          Red Bot 2 Artifacts: {redBot2.get("autoArtifacts")}
        </label>
        <button
          id="Auto_RedBot2_Artifact_UP"
          onClick={() => updateRed2("autoArtifacts", 1)}
        >
          +
        </button>

        <br></br>

        {/*PATTERN BLUE*/}

        <button
          id="Auto_BlueAlliance_PatternDOWN"
          onClick={() => updateBlueAutoPattern(-1)}
        >
          -
        </button>
        <label>Blue Alliance Pattern: {blueAutoPattern}</label>

        <button
          id="Auto_BlueAlliance_PatternUP"
          onClick={() => updateBlueAutoPattern(1)}
        >
          +
        </button>
        <button
          id="Auto_RedAlliance_PatternDOWN"
          onClick={() => updateRedAutoPattern(-1)}
        >
          -
        </button>
        <label>Red Alliance Pattern: {redAutoPattern}</label>

        <button
          id="Auto_RedAlliance_PatternUP"
          onClick={() => updateRedAutoPattern(1)}
        >
          +
        </button>
        <br></br>
        <label>
          Blue Alliance:
          {(blueBot1.get("autoArtifacts") + blueBot2.get("autoArtifacts")) * 3 +
            blueAutoPattern * 2}
        </label>
        <tab></tab>
        <label>
          Red Alliance:{" "}
          {(redBot1.get("autoArtifacts") + redBot2.get("autoArtifacts")) * 3 +
            redAutoPattern * 2}
        </label>
        <label>{redFinalScoreCookieTest}</label>
      </div>
    </>
  );
}

export default App;
