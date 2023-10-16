export const LOGOWIDTH = 100;
export const LANDINGDRAWERWIDTH = 270;
export function Logo() {
  return <img src={"/imgs/logo-yellow.png"} alt={"CDIL"} width={LOGOWIDTH} />;
}
export function NotFoundImage() {
  return (
    <img
      src="/imgs/404.png"
      alt="404.png"
      style={{ width: "100%", height: "auto", position: "relative" }}
    />
  );
}

export const palette = {
  primary: {
    main: "#f0b128",
    contrastText: "#fff",
  },
  secondary: {
    main: "#154f8a",
    contrastText: "#fff",
  },
  links: {
    active: "#27c7ff",
    secondaryNav: "#636363",
  },
  title: {
    main: "#154f8a",
  },
};
