const sha256 = require('crypto-js/sha256');
const {default: axios} = require('axios');
const token = '9b547b4be3c16ea5a3aa45b0e2f4affb851152ce33f70e5135097240922';
const transactionType = 'uniqueCredential';
const subject = 'credencitalStudent'
const async = false;

const getHash = (hash, token) => {
    axios.get('https://api.stamping.io/getstamp/?byHash='+hash+'&token='+token)
    .then(function (response) {
        return (response);
    })
    .catch(function (err) {
        console.log(err);
    })
}

const postCredential = (evidence, data, subject, transactionType, async, token) => {
    let hash;
    hash = axios.post('https://api.stamping.io/stamp/?evidence='+evidence+'&data='+data+'&subject='+subject+'&transactionType='+transactionType+'&async='+async+'&token='+token)
        .then(function (response) {
            const obj = response;
            return obj.data.lacchainId;
        })
        .catch(function (error) {
            console.log(error);
        })
    return hash;
}

const hash = async (data) => {
    const hashEvidence = generateHash(data);
    try{
        const hashLacchain = await postCredential(hashEvidence, data, subject, transactionType, async, token);
        return hashLacchain;
    } catch (error) {
        console.log(error);
    }
}

const validate = async (hash) => {
}

const generateHash = (data) => {
    const hash = sha256(data);
    return hash.toString();
}

exports.hash = hash;