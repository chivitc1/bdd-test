import { createInsertSql as generateInsertSql } from '../../utils';
import { dbClient } from '../../infrastructure';

const seed = (req, res) => {
  const tables = req.body;
  let batchSql = '';
  Object.keys(tables).forEach(tableName => {
    const table = tables[tableName];
    const insertSql = generateInsertSql(table, tableName);
    batchSql += '\n' + insertSql;
  });
  // console.log(batchSql);

  dbClient.tx(t => {
    return t.batch([
      dbClient.none(batchSql)
        .then(() => {
          res.status(200)
            .json({ "message": "OK" });
        })
    ])
  })
    .catch(error => {
      console.log('ERROR:', error);
      res.status(400)
        .json({ "message": error });
    });
}

export default { seed };
