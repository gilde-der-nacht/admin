import { useState, useEffect } from "preact/hooks";

export function EntryList(props) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFilterOn, setIsFilterOn] = useState(false);

  const PAGE_SIZE = 20;

  const filterList = (list, bool = false) => {
    if (bool) {
      list = list.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      const mapped = list.reduce((acc, cur) => {
        return acc.set(cur.identification, cur);
      }, new Map());
      return [...mapped.values()];
    }
    return list;
  };

  useEffect(async () => {
    if (props.resource.length === 0) {
      return;
    }
    const { olymp } = window;
    const listOfEntries = await olymp.entriesList(props.resource);
    const list = filterList([...listOfEntries], isFilterOn).sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : -1
    );
    setList([...list]);
    setPage(1);
  }, [props.resource, isFilterOn]);

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
          <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between">
            <span>
              Ressource: <code>{props.resource}</code>
            </span>
            <label>
              <input
                type="checkbox"
                onChange={(e) => setIsFilterOn(e.target.checked)}
                checked={isFilterOn}
              />{" "}
              Zeige nur den letzten Eintrag pro Identifikation an
            </label>
          </div>
        )}
      </p>
      <div class="table-container">
        <table className="table is-fullwidth">
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
                  <td>{entry.identification || <code>leer/versteckt</code>}</td>
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
      </div>
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
