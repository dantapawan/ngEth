import web3 from '../web3';
import StudCertRegistry from '../build/contracts/StudCertRegistry.json';

export default (address) => {
    return new web3.eth.Contract(JSON.parse(StudCertRegistry.abi), address);
}