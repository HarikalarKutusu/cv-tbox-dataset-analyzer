import intl from "react-intl-universal";

export const BrowsePage = () => {
  return (
    <div>
      <h3>{intl.get("browsepage.title")}</h3>
      <h4>{intl.get("browsepage.subtitle")}</h4>
      <p>{intl.get("browsepage.about.p1")}</p>
    </div>
  );
};
