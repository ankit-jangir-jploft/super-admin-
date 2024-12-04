import Image from "next/image";
import styles from "./page.module.css";
import Login from "./Components/Login/Login";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
