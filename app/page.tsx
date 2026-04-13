import Navbar from "./components/Navbar";
import WorkflowSection from "./components/WorkflowSection";
import Footer from "./components/Footer";
import FlowerBackground from "./components/FlowerBackground";

export default function Home() {
  return (
    <>
      <FlowerBackground />
      <Navbar />
      <WorkflowSection />
      <Footer />
    </>
  );
}
