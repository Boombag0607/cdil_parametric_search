import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Container } from "@mui/material";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <Container sx={{ width:"90%",  mt: 12 }}>{children}</Container>
      <Footer />
    </>
  );
}
