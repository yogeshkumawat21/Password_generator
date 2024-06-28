import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [nuAllow, setNuAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPass = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (nuAllow) {
      str += "0123456789";
    }

    if (charAllow) {
      str += "!@#$%^&*()_+";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, nuAllow, charAllow]);

  useEffect(() => {
    passGenerator();
  }, [length, nuAllow, charAllow, passGenerator]);

  return (
    <>
      <div id="section">
        <div id="card">
          <h5>Password Generator</h5>
          <input type="text" id='display' value={password} placeholder="Generate Password" ref={passwordRef} readOnly />
          <label id='lengthh'>Length: {length}</label>
          <input id='length' type="range" min={6} max={100} value={length} onChange={(e) => setLength(e.target.value)} />

          <div className="checkbox-container">
            <input type="checkbox" checked={nuAllow} onChange={() => setNuAllow(prev => !prev)} />
            <label>Include Numbers</label>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" checked={charAllow} onChange={() => setCharAllow(prev => !prev)} />
            <label>Include Character</label>
          </div>

          <button onClick={copyPass}>Copy</button>
        </div>
      </div>
    </>
  );
}

export default App;
