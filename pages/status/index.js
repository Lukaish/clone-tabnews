import useSWR from "swr";

async function fetchAPI(key) {
  const res = await fetch(key);
  const resBody = await res.json();
  return resBody;
}

export default function SatusPage() {
  const res = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <h1>Database</h1>
      <Database />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAtText = "Carregando...";

  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updateAtText}</div>;
}

function Database() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let version = "Carregando...";
  let maxConnections = "Carregando...";
  let openedConnections = "Carregando...";

  if (!isLoading && data) {
    version = data.dependecies.database.version;
    maxConnections = data.dependecies.database.max_connections;
    openedConnections = data.dependecies.database.opened_connections;
  }

  return (
    <>
      <div>Versão: {version}</div>
      <div>Conexões máximas: {maxConnections}</div>
      <div>Conexões abertas: {openedConnections}</div>
    </>
  );
}
