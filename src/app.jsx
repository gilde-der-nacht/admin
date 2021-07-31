import { Authentification } from "./components/Authentification";
import { useEffect } from "preact/hooks";

export function App(props) {
  const OLYMP_HOST = "https://api.gildedernacht.ch/";

  useEffect(async () => {
    window.olymp = new Olymp({ server: OLYMP_HOST });
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title is-1">
            Admin <span className="tag is-large is-dark">Gilde der Nacht</span>
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Authentification host={OLYMP_HOST}></Authentification>
        </div>
      </section>
    </>
  );
}
