import { useState } from "preact/hooks";

export function Authentification(props) {
  const [server, setServer] = useState(props.host);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.olymp = new Olymp({
      server,
      username,
      password,
    });
  };

  return (
    <>
      <h2 className="title is-2">
        Authentifizierung
        <button className="button is-small is-ghost" onClick={() => setVisible(!visible)}>
          {visible ? "Zuklappen" : "Aufklappen"}
        </button>
      </h2>
      {visible && (
        <form action="#" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Server</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={server}
                onInput={(e) => {
                  setServer(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Benutzername</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={username}
                onInput={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Passwort</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={password}
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Authentifizieren
          </button>
        </form>
      )}
    </>
  );
}
