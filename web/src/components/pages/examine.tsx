import intl from "react-intl-universal";

export const ExaminePage = () => {
  return (
    <div>
      <h3>{intl.get("examinepage.title")}</h3>
      <h4>{intl.get("examinepage.subtitle")}</h4>
      <p>{intl.get("examinepage.about.p1")}</p>
    </div>
  );
};
