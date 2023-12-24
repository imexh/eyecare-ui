import React from "react";
import NavbarHome from "../../components/NavbarHome";
import FooterHome from "../../components/FooterHome";

export default function Home() {
  return (
    <div>
      <NavbarHome />
      <div style={{ backgroundImage: 'url("images/homebackground.png")', backgroundSize: 'cover', minHeight: '100vh' }}></div>
      <FooterHome />
    </div>
  );
}
