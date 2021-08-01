import { Authentification } from "./components/Authentification";
import { ResourceList } from "./components/ResourceList";
import { EntryList } from "./components/EntryList";
import { EntryDetail } from "./components/EntryDetail";
import { useEffect, useState } from "preact/hooks";

export function App(props) {
  const OLYMP_HOST = "https://api.gildedernacht.ch";

  useEffect(async () => {
    window.olymp = new Olymp({ server: OLYMP_HOST });
  }, []);

  const [resource, setResource] = useState("");
  const [entry, setEntry] = useState({});

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
      <section className="section">
        <div className="container">
          <ResourceList loadResource={setResource}></ResourceList>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <EntryList resource={resource} loadEntry={setEntry}></EntryList>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <EntryDetail entry={entry} ></EntryDetail>
        </div>
      </section>
    </>
  );
}
