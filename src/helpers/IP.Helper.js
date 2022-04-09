const getPublicIP = async () => {

  const fetchData = await fetch(
    `https://api.ipify.org/?format=json`
  );

  const response = await fetchData.json();
  console.log(response)
  return response.ip;
};

const IPHelper = {
  getPublicIP,
};

export default IPHelper;
