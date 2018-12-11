var StudCertRegistry = artifacts.require("./StudCertRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(StudCertRegistry);
};