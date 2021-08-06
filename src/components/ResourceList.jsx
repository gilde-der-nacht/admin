import { useState } from "preact/hooks";

export function ResourceList(props) {
  const [list, setList] = useState([]);

  const loadList = async () => {
    const { olymp } = window;
    const listOfResources = await olymp.resourcesList();
    setList([
      ...listOfResources.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ]);
  };

  return (
    <>
      <h2 className="title is-2">Liste aller Ressorcen</h2>
      <button className="button is-primary" onClick={loadList}>
        {list.length === 0 ? "Liste abrufen" : "Liste aktualisieren"}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Bemerkung</th>
            <th>Erstellt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((entry) => {
            return (
              <tr key={entry.resourceUid}>
                <td>
                  <code>{entry.resourceUid}</code>
                </td>
                <td>
                  {entry.publicBody.description || <code>leer/versteckt</code>}
                </td>
                <td>{entry.timestamp}</td>
                <td>
                  <button
                    className="button is-small"
                    onClick={() => props.loadResource(entry.resourceUid)}
                  >
                    Öffnen
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
