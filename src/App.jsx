import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="spacer">
        <p className="text-brand-primary">hello</p>
      </section>
    </>
  );
}

export default App;
