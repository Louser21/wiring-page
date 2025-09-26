import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [wires, setWires] = useState([
    { id: 1, color: 'pink', connected: false },
    { id: 2, color: 'blue', connected: false },
    { id: 3, color: 'green', connected: false },
    { id: 4, color: 'yellow', connected: false },
    { id: 5, color: 'red', connected: false },
  ]);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleBoxClick = () => {
    setShowPuzzle(true);
  };

  const handleWireClick = (id) => {
    setWires((prevWires) =>
      prevWires.map((wire) =>
        wire.id === id ? { ...wire, connected: !wire.connected } : wire
      )
    );
  };

  const isSuccess =
    wires.find((wire) => wire.color === 'red')?.connected &&
    wires.find((wire) => wire.color === 'pink')?.connected &&
    wires
      .filter((wire) => wire.color !== 'red' && wire.color !== 'pink')
      .every((wire) => !wire.connected);

  useEffect(() => {
    if (isSuccess) {
      window.location.href = 'https://sdc-jwt.vercel.app';
    }
  }, [isSuccess]);

  return (
    <div className="game-container" onMouseMove={handleMouseMove}>
      <div
        className="visible-region"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
      <div
        className="electrical-box"
        style={{
          position: 'absolute',
          left: '300px',
          bottom: '100px',
          width: '30px',
          height: '30px',
          backgroundColor: 'black',
        }}
        onClick={handleBoxClick}
      />

      {showPuzzle && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h3>connect certain, disconnect certain</h3>
          <p>
            hint 1 : A young scientist is studying stars and notices a spectral
            line that corresponds to the energy released when an electron drops
            from the first excited state to the ground state. She remembers that
            the energy of this transition depends on the square of the nucleus’
            charge 𝑍 ^ 2 . From her measurements, she finds that this star’s
            atom produces the lowest possible energy for such a transition in
            the visible spectrum. Using this hint, she writes down the atomic
            number of the element responsible. What number did she write?
          </p>
          <p>
            hint 2 : In physics, this color corresponds to the longest
            wavelength of visible light. In art and culture, it is associated
            with love, danger, and energy. In optics, mixing this color with
            green yields yellow in additive color theory. what colour am I?
          </p>
          {wires.map((wire) => (
            <div
              key={wire.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px 0',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '10px',
                  backgroundColor: wire.color,
                  marginRight: '10px',
                }}
              />
              <button onClick={() => handleWireClick(wire.id)}>
                {wire.connected ? 'Connected' : 'Disconnected'}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="Hint 3 :A moment brief, yet laced with fire, A spark that sets the soul afire.">
        ?
      </div>
    </div>
  );
}

export default App;
