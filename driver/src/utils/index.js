import { isNumber, isBoolean } from 'util';

/**
 * Truncate and seed table data
 * @param { Array } items 
 * @param { string } tableName 
 */
function createInsertSql(items, tableName) {
  const fields = Object.keys(items[0]).join(",");
  const values = items.reduce((result, currentItem, currentIndex) => result + '(' + toCommaSepList(currentItem) +
    (currentIndex == items.length - 1 ? ')\n' : '),\n'), '');
  return `
  TRUNCATE TABLE ${tableName} CASCADE;
  ALTER SEQUENCE seq_${tableName}_id RESTART WITH 1;
  INSERT INTO ${tableName} 
    (${fields})
    VALUES ${values};
  ALTER SEQUENCE seq_${tableName}_id RESTART WITH ${items.length + 1};`;
}

function toCommaSepList(jsonObj) {
  return Object.values(jsonObj)
    .map(it => {
      if (it == null)
        return 'NULL';
      if (isNumber(it) || isBoolean(it))
        return it;
      return `'${it}'`;
    })
    .join(",");
}


const prettyJson = (json) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "\x1b[36m";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "\x1b[34m";
        } else {
          cls = "\x1b[32m";
        }
      } else if (/true|false/.test(match)) {
        cls = "\x1b[35m";
      } else if (/null/.test(match)) {
        cls = "\x1b[31m";
      }
      return cls + match + "\x1b[0m";
    }
  );
}
export { createInsertSql, prettyJson };
