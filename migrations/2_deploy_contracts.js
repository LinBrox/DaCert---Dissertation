const CertNotary = artifacts.require("CertNotary")

module.exports = function (deployer) {
 deployer.deploy(CertNotary);
};