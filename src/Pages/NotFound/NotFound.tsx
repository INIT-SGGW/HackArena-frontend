import "./NotFound.css";
import { useNavigate } from "react-router";

import { Button, Page } from "../../Library";

import text from "../../Library/Assets/Text/main.json";
import { PageText } from "./types";

function NotFound() {
  const pageText: PageText = text.notFound;
  const navigation = useNavigate();

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      <div className="notfound pagewidth">
        <h2 className="header__yellow">{pageText.title}</h2>
        <h6>{pageText.description}</h6>
        <div>
          <Button className="btn btn__primary btn__primary-border" onClick={() => navigation("/")}>{pageText.buttons.home}</Button>
          <Button className="btn btn__secondary" onClick={() => navigation(-1)}>{pageText.buttons.goBack}</Button>
        </div>
      </div>
    </Page>
  )
}

export default NotFound;
