import { useState, useEffect } from "preact/hooks";

export function EntryList(props) {
  const [list, setList] = useState([]);

  useEffect(async () => {
    if (props.resource.length === 0) {
      return;
    }
    const { olymp } = window;
    const listOfEntries = await olymp.entriesList(props.resource);
    setList([...listOfEntries]);
  }, [props.resource]);

  return (
    <>
      <h2 className="title is-2">Liste aller Einträge</h2>
      <p>
        {props.resource.length === 0 ? (
          "Bitte wähle oben eine Resource aus."
        ) : (
          <span>
            Ressource: <code>{props.resource}</code>
          </span>
        )}
      </p>
      <table class="table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Identifikation</th>
            <th>Erstellt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((entry) => {
            return (
              <tr key={entry.entryUid}>
                <td>
                  <code>{entry.entryUid}</code>
                </td>
                <td>{entry.identification || <code>empty/hidden</code>}</td>
                <td>{entry.timestamp}</td>
                <td>
                  <button
                    class="button is-small"
                    onClick={() => props.loadEntry(entry)}
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
