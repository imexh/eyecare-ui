import React from "react";
import NavbarHome from "../../components/NavbarHome";

export default function Home() {
  return (
    <div>
      <NavbarHome />
      <div style={{
        backgroundImage: 'url("images/homebanner.jpg")', backgroundSize: 'cover', minHeight: '100vh', position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', marginTop: '-50px', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white'
        }}>
          <p style={{ fontSize: "70px", fontWeight: "bold" }}>WELCOME</p>
          <h3>to</h3>
          <img src="images/eyecaresquarelogowithtext.png" alt="Eye Care Logo"
            style={{ maxWidth: '100%', maxHeight: '300px', margin: '20px 0' }} />
        </div>
      </div>
    </div>
  );
}
