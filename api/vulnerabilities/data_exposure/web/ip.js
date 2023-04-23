import fetch from 'node-fetch';

const getPublicIPAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.log(error);
  }
}
export default getPublicIPAddress;