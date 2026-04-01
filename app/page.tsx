import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Smooth gradient bridge from warm cream → sage green */}
      <div
        style={{
          height: "48px",
          background: "linear-gradient(to bottom, #F3E7E0, #BFD7EA80)",
        }}
      />
      <Footer />
    </>
  );
}
