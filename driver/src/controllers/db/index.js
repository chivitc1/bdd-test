/**
 * @author chinv
 * Handle http seed db data request.
 * Run batch sql insert statements base on tables objects in http request body
 * Example: see tables object example in the end of file
 * 
 * Note: seeding will delete all old data. Should be used in testing env only.
 */
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

/** tables inclucde: teams, team_users, users, credentials
 * field name must match column name in db. Try to use only necessary fields for easy maintenance
{
    "teams": [
        {
            "id": 1,
            "name": "Team A",
            "description": "Team A",
            "created_by": 1,
            "updated_by": 1
        }
    ],
    "team_users": [
        {
            "id": 1,
            "team_id": 1,
            "user_id": 1,
            "role": "MEMBER"
        }
    ],
    "users": [
        {
            "id": 1,
            "role_id": 1,
            "username": "member1",
            "email": "member1@example.com",
            "is_active": true
        }
    ],
    "credentials": [
        {
            "id": 1,
            "user_id": 1,
            "password": "$2a$10$HHXwKNtUH1J7HH8CbhgQtuwdhGxjv94sY68ORlJip7ncBq6IzPShi"
        }
    ]
}
 */