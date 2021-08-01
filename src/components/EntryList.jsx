import { useState, useEffect } from "preact/hooks";

export function EntryList(props) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 20;

  useEffect(async () => {
    if (props.resource.length === 0) {
      return;
    }
    const { olymp } = window;
    const listOfEntries = await olymp.entriesList(props.resource);
    setList([
      ...listOfEntries.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ]);
    setPage(1);
  }, [props.resource]);

  const totalPages = () => {
    if (list.length < PAGE_SIZE) {
      return 1;
    }
    return Math.ceil(list.length / PAGE_SIZE);
  };

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
      <table className="table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Identifikation</th>
            <th>Erstellt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((entry) => {
            return (
              <tr key={entry.entryUid}>
                <td>
                  <code>{entry.entryUid}</code>
                </td>
                <td>{entry.identification || <code>empty/hidden</code>}</td>
                <td>{entry.timestamp}</td>
                <td>
                  <button
                    className="button is-small"
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
      {totalPages() > 1 && (
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <a
            className="pagination-previous"
            disabled={page === 1}
            onClick={() => {
              if (page <= 1) {
                return;
              }
              setPage(page - 1);
            }}
          >
            Zurück
          </a>
          <a
            className="pagination-next"
            disabled={page === totalPages()}
            onClick={() => {
              if (page >= totalPages()) {
                return;
              }
              setPage(page + 1);
            }}
          >
            Vorwärts
          </a>
          <ul className="pagination-list">
            <li>
              {"Seite " +
                page +
                " von " +
                totalPages() +
                " / " +
                list.length +
                " Einträge"}
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
