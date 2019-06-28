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
  DELETE FROM ${tableName};
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

export {createInsertSql};
