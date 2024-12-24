// pages/404.js
import Link from "next/link";

const page = () => {
  return (
    <div style={styles.container}>
      <div className='container border border-2 p-5'>
        <h1 style={styles.errorCode}>404</h1>
        <p style={styles.message}>
          Oops! The page you're looking for cannot be found.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorCode: {
    fontSize: "100px",
    color: "#f00",
  },
  message: {
    fontSize: "18px",
    color: "#555",
  },
  homeLink: {
    color: "#1a73e8",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default page;
