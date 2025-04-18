const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('DAO', () => {
  let token, dao
  let deployer,
    funder

  beforeEach(async () => {
    // Set up accounts
    let accounts = await ethers.getSigners()
    deployer = accounts[0]
    funder = accounts[1]
    investor1 = accounts[2]
    recipient = accounts[3]

    //Deploy Token
    const Token = await ethers.getContractFactory('Token')
    token = await Token.deploy('Dapp University', 'DAPP', '1000000')
   
    // Deploy DAO
    const DAO = await ethers.getContractFactory('DAO')
    dao = await DAO.deploy(token.address, '500000000000000000000001')

    // Funder sends 100Ether to DAO treasury for Governance
    await funder.sendTransaction({ to: dao.address, value: ether(100) })    
  })

  describe('Deployment', () => {
    
    it('sends ether to the DAO treasury', async () => {
      expect(await ethers.provider.getBalance(dao.address)).to.equal(ether(100))
    })

    it('returns token address', async () => {
      expect(await dao.token()).to.equal(token.address)
    })
    
    it('returns quorum', async () => {
      expect(await dao.quorum()).to.equal('500000000000000000000001')
    })

  })

  describe('Proposal creation', () => {
    let transaction, result

    describe('Success', () => {
      
      beforeEach(async () => {
        transaction = await dao. connect(investor1).createProposal('Proposal eins', ether(100), recipient.address)
        result = await transaction.wait()
      })

      it('updates proposal count', async () => {
        expect(await dao.proposalCount()).to.equal(1)
      })

      it('', async () => {

      })

    })

  })

    describe('Failure', () => {

    })

  


})
