import "./HomePage.css";
import { useNavigate } from "react-router";
import { PageText } from "./types";
import text from "../../Library/Assets/Text/main.json";
import WelcomImage from "../../Assets/hackarena_2_0_yellow.jpg"
import { LiveEventHighlight, Sponsors, getEventStatus, EventStatus, Page, Button, HoneyComb } from "../../Library";

function HomePage() {
  const navigate = useNavigate();
  const pageText: PageText = text.home;

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingTop={false} paddingBottom={false}>
      <div className="home">
        <div className="home--welcome">
          <HoneyComb image={WelcomImage} defaultHexagonSize={85} gap={2} componentText={pageText.welcome} />
        </div>
        <LiveEventHighlight />
        <div style={{
          display: "flex",
          flexDirection: getEventStatus() === EventStatus.Default ? "column-reverse" : "column",
        }}>
          <div className="home--about__event">
            <div id="hackarena2" className="home--about pagewidth home--section">
              <h2 className="header__black">{pageText.nextEvent.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: pageText.nextEvent.description }} />
              <Button onClick={() => navigate("/wydarzenia/hackarena2_0")} className="btn btn__primary-b btn__primary-b-border">{pageText.nextEvent.button}</Button>
            </div>
          </div>
          <div id="o_nas" className="home--about pagewidth home--section">
            <h2 className="header__white">{pageText.aboutUs.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: pageText.aboutUs.description }} />
          </div>
        </div>
      </div>
    </Page >
  );
}

export default HomePage;
