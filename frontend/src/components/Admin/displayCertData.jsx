import { ethers } from 'ethers'

let contract
const GetCertData = async (_id, setData) => {
  const Address = '0x091d7Dd5737f34990B417D048B6f7075FfbBA146'
  const ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"_certificateId","type":"bytes32"}],"name":"certificateGenerated","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"certificates","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint256","name":"expDate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"uint256","name":"_date","type":"uint256"},{"internalType":"uint256","name":"_expDate","type":"uint256"}],"name":"generateCertificate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes","name":"_id","type":"bytes"}],"name":"getData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
  //code to connect the smart contract provider sets the connect - Signer signs messages and sends transactions wallet is signer - contract is the defintion of what contract to use (ABI + ADDRESS + SIGNER)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  contract = new ethers.Contract(Address, ABI, signer)

  // Call the getData function
  const data = await contract.getData(String(_id))
  console.log(data)
  setData(data)
  return data
}


export default GetCertData
