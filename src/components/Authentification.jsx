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
        <button class="button is-small is-ghost" onClick={() => setVisible(!visible)}>
          {visible ? "Zuklappen" : "Aufklappen"}
        </button>
      </h2>
      {visible && (
        <form action="#" onSubmit={handleSubmit}>
          <div class="field">
            <label class="label">Server</label>
            <div class="control">
              <input
                class="input"
                type="text"
                value={server}
                onInput={(e) => {
                  setServer(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Benutzername</label>
            <div class="control">
              <input
                class="input"
                type="text"
                value={username}
                onInput={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Passwort</label>
            <div class="control">
              <input
                class="input"
                type="password"
                value={password}
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button class="button is-primary" type="submit">
            Authentifizieren
          </button>
        </form>
      )}
    </>
  );
}
