const environment = 'DEV'

const configDev = {
    host: "https://shadowstockapi.azurewebsites.net"
};

const configProd = {
    host: "hostedurl"
};
console.log("cofig env")
if (environment === 'PROD') {
    console.log('***PROD environment')
    module.exports = configProd;
} else if (environment === 'DEV') {
    console.log('***DEV environment')
    module.exports = configDev;
}