import { useEffect, useState } from "react";
import "./App.css";
import Background from "./component/Background/Squares/Backgorund";
import BodyComponent from "./component/BodyComponent";
import { Outlet } from "react-router-dom";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (
        /android|iphone|ipad|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(
          userAgent
        )
      ) {
        setIsMobile(true);
      }
    };

    checkMobile();
  }, []);
  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-xl text-center p-4">
        🚫 This website does not open on mobile devices. Please use a desktop.
      </div>
    );
  }
  return (
    <>
      <div className="h-screen w-screen relative">
        <Background />
      </div>
      <div className="absolute inset-0 flex my-16 justify-center z-0">
        <Outlet />
      </div>
    </>
  );
}

export default App;
