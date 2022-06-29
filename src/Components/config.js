const environment = 'PROD'

const configDev = {
    host: "http://localhost:8000"
};

const configProd = {
    host: "https://shadowstockapi.azurewebsites.net"
};
console.log("cofig env")
if (environment === 'PROD') {
    console.log('***PROD environment')
    module.exports = configProd;
} else if (environment === 'DEV') {
    console.log('***DEV environment')
    module.exports = configDev;
}