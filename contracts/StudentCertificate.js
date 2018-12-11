import web3 from '../web3';
import StudCert from '../build/contracts/StudCert.json';

export default (address) => {
    return new web3.eth.Contract( JSON.parse(StudCert.abi), address);
}