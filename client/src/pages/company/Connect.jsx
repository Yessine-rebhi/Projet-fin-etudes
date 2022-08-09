import React from "react";
import LoadingScreen from 'react-loading-screen';

export default function Connect() {
  
  const user=localStorage.getItem("user");
  setTimeout(() => {
    window.location = "/home";
  }, 2000);
  return (
    <div>
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        text={"Bienvenue "+ user}
      />
    </div>
  );
}
