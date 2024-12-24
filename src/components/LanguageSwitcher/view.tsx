import { useLanguageSwitcherModel } from "./model";

export const LanguageSwitcherView = ({
  t,
  changeLanguage,
  languages,
}: ReturnType<typeof useLanguageSwitcherModel>) => {
  const languagesComponent = languages.map(({ code, label }) => {
    return (
      <button
        key={code + "_language_button"}
        onClick={() => changeLanguage(code)}
      >
        {label}
      </button>
    );
  });
  return (
    <div>
      {t("changeLanguage")}
      {languagesComponent}
    </div>
  );
};
