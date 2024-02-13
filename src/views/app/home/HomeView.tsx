import Navbar from "../../../components/NavBar/Navbar";
import Button from "../../../components/button/Button";
import background from "../../../assets/images/Homebackground-home.png";
import { Link } from "react-router-dom";

export default function HomeView() {
  return (
    <div
      style={{
        height: "100vh",
        margin: "-8px",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          padding: "60px",
        }}
      >
        <Navbar />
        <div
          style={{
            width: "601px",
            height: "469px",
            padding: "70px, 0px, 40px, 0px",
            gap: "40px",
          }}
        >
          <h1
            style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "48px",
              lineHeight: "72px",
              color: "#6A6369",
            }}
          >
            Et si vos dossiers avaient la tête dans Le Nuage ?
          </h1>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 400,
              lineHeight: "31px",
              textAlign: "justify",
              color: "#6A6369",
            }}
          >
            Laissez vos données voguer vers de nouveaux horizons avec notre
            système de cloud!
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/login">
              <Button label={"Connectez-vous"} variant="contained" />
            </Link>
            <Link to="/signin">
              <Button label={"Inscrivez-vous"} variant="outlined" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
