const ZombieFactory = artifacts.require('./ZombieFactory.sol')
const truffleAssert = require('truffle-assertions')


contract('ZombieFactory', function (accounts) {
 
// predefine the contract instance
  let ZombieFactoryInstance

  // before each test, create a new contract instance
  beforeEach(async function () {
    ZombieFactoryInstance = await ZombieFactory.new()
  })

  // first test: define what it should do in the string
  it('One zombie can be created per address', async function () {
    // Get createRandomZombieFunction
    await ZombieFactoryInstance.createRandomZombie("Test")
    let ownerCount = await ZombieFactoryInstance.ownerZombieCount(accounts[0])
    // check whether only one zombie was created
    assert.equal(ownerCount.toNumber(), 1, "Only one zombie can be created per address")
  })

  // second test: define what it should do in the string
  it('A second zombie cannot be created using the same address', async function () {
    // Get createRandomZombieFunction
    await ZombieFactoryInstance.createRandomZombie("Test")
    await truffleAssert.reverts(ZombieFactoryInstance.createRandomZombie("Test_Two"))
    let ownerCount = await ZombieFactoryInstance.ownerZombieCount(accounts[0])
    // check whether only one zombie was created
    assert.equal(ownerCount.toNumber(), 1, "Only one zombie can be created per address")
  })


})