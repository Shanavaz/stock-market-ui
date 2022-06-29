const environment = 'PROD'

const configDev = {
    host: "https://shadowstockapi.azurewebsites.net"
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