export const serverIp = window.location.href.split('/')[2].split(':')[0];
export const server = `http://${serverIp}:8180`;