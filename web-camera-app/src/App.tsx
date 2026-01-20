import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import './App.css'; 

// Camera settings
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function App() {
  const webcamRef = useRef<Webcam>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Handle permission rejection
  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error("Camera access error:", error);
    setPermissionDenied(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Camera (CRA)</h1>
        
        {permissionDenied ? (
          <div style={{ color: 'red', border: '1px solid red', padding: '20px' }}>
            <h3>Permission Denied</h3>
            <p>Please allow camera access in your browser settings and refresh.</p>
          </div>
        ) : (
          <div style={{ border: '5px solid #61dafb', borderRadius: '10px', overflow: 'hidden' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={720}
              videoConstraints={videoConstraints}
              onUserMediaError={handleUserMediaError}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;