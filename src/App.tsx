import "./App.css";

import { Outlet, Link, ScrollRestoration } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import { AuthProvider, NavBar, SocialMedia, useWindowWidth, NavItems } from "./Library";

// Assets
import Logo from "./Assets/logo.svg"
import SGGW from "./Assets/sggw_logo_white.png";
import text from "./Library/Assets/Text/main.json";

const TopBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navItems: NavItems = text.nav;

  return (
    <div className="topbar__wrapper">
      <div className="topbar pagewidth">
        <div style={{ height: '100%' }} className="section--row-1" >
          <Link to="/">
            <img src={Logo} alt="HackArena" />
          </Link>
          <a href="https://www.sggw.edu.pl">
            <img src={SGGW} alt="SGGW" />
          </a>
        </div>
        <NavBar showSideBar={showSidebar} setShowSidebar={setShowSidebar} navItems={navItems} />
      </div>
    </div>
  )
}

const Footer = () => {
  const navItems: NavItems = text.nav;

  return (
    <div className="footer">
      <NavBar navItems={navItems} />
      <div className="divider" />
      <SocialMedia mobileHeight />
    </div>
  )
}

function App() {
  const appContentRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const topBarHeight = document.querySelector('.topbar__wrapper')?.clientHeight || 0;
    if (windowWidth <= 768 && appContentRef.current) {
      appContentRef.current.style.marginTop = `${topBarHeight}px`;
    } else {
      appContentRef.current?.style.removeProperty('margin-top');
    }
  }, [windowWidth])

  return (
    <AuthProvider>
      <div className="app">
        <ScrollRestoration />
        <TopBar />
        <div ref={appContentRef} className="app--content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
