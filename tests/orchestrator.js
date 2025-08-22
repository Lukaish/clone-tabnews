import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  //Fica tentado consultar o endpoint do /status, e só quando conseguir com sucesso, irá desprender o script
  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      // const responseBody = await response.json();

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
};
