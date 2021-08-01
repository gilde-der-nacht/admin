export function EntryDetail(props) {
  const renderObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      return (
        <div className="box">
          <h3 className="title is-3">{key}</h3>
          {Object.entries(value).length === 0 ? (
            <code>empty/hidden</code>
          ) : typeof value === "object" ? (
            renderObject(value)
          ) : (
            value
          )}
        </div>
      );
    });
  };

  return (
    <>
      <h2 className="title is-2">Detail zum Eintrag</h2>
      {Object.entries(props.entry).length === 0 ? (
        "Bitte wähle oben einen Eintrag aus."
      ) : (
        <span>
          Eintrag: <code>{props.entry.entryUid}</code>
        </span>
      )}
      {renderObject(props.entry)}
    </>
  );
}
