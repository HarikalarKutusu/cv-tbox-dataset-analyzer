import intl from "react-intl-universal";
import { Button } from "@mui/material";

export const HomePage = () => {

  return (
    <div>
      <h3>{intl.get("app.title")}</h3>
      <h4>{intl.get("app.subtitle")}</h4>
      <p>{intl.get("homepage.about.p1")}</p>
      <p>{intl.get("homepage.about.p2")}</p>
      <p>{intl.getHTML("homepage.about.p3")}</p>
      <p>{intl.get("homepage.about.p4")}</p>
      <ul>
        <li>{intl.getHTML("homepage.about.li1")}</li>
        <li>{intl.getHTML("homepage.about.li2")}</li>
        <li>{intl.getHTML("homepage.about.li3")}</li>
      </ul>
      <p>{intl.get("homepage.about.p5")}</p>
      <p>
        <Button href="/browse" variant="contained" color="primary">
          {intl.get("homepage.button.browse")}
        </Button>
      </p>
    </div>
  );
};