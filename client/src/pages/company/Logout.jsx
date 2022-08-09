import React from "react";
import LoadingScreen from 'react-loading-screen';

export default function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user")
  setTimeout(() => {

    window.location = "/";
  }, 1000);
  return (
    <div>
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        text="Vous avez deconnecté .. au-revoir"
      />
    </div>
  );
}
