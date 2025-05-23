import database from "infra/database";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseConnectionsActiveResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseConnectionsActiveValue =
    databaseConnectionsActiveResult.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseConnectionsActiveValue,
      },
    },
  });
}
