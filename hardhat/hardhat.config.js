require('dotenv').config()

const isForkModeEnabled = !!process.env.FORK_URL
const forkUrl = process.env.FORK_URL
const forkStartingBlock =
  parseInt(process.env.FORK_STARTING_BLOCK, 10) || undefined
const gasPrice = parseInt(process.env.GAS_PRICE, 10) || 0
const chainId = parseInt(process.env.CHAIN_ID) || 1337

const config = {
  networks: {
    hardhat: {
      gasPrice,
      initialBaseFeePerGas: 0,
      chainId,
      accounts: [
        {
          privateKey: "052054ca3aa7fb2cb9c8c84a3e537c7fed4cc1173a5ac76817599256f6d7d54a",
          balance: "10000000000000000000000"
        },
        {
          privateKey: "7b9aa74ccc4a88528db17fb0c985507f1b2be1a46673f06ddb1b0bb569c28ae5",
          balance: "10000000000000000000000"
        }
      ]
    },
  },
  analytics: { enabled: false },
}

if (isForkModeEnabled) {
  console.log(`Running hardhat in a fork mode! URL: ${forkUrl}`)
  if (forkStartingBlock) {
    console.log(`Starting block: ${forkStartingBlock}`)
  }
  config.networks.hardhat.forking = {
    url: forkUrl,
    blockNumber: forkStartingBlock,
  }
} else {
  console.log('Running with a fresh state...')
}

module.exports = config