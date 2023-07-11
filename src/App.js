import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import router from "./routes";
import Layout from "./page/Layout";
import LayoutAdmin from "./page/LayoutAdmin";
import GameOffline from "./components/GameOffline";
const App = () => {


  if (navigator.onLine) {
    if (localStorage.getItem('admin')) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'admin') {
          localStorage.removeItem(key);
        }
      }
      return (
        <LayoutAdmin />
      );
    } else {
      return (
        <Layout />
      );
    }
  } else {
    if (window.innerWidth > 700) {
      return (
        <GameOffline />
      )
    } else {
      return (
        <div style={{ width: "100vw", height: "100vh",display:"flex",justifyContent:"center",alignItems:"center" }}>
          <h2>Kết nối mạng để tiếp tục</h2>
        </div>
      )
    }

  }



};

export default App;
