# Blockchain Node.js Application

This is a simple blockchain implementation in Node.js. It includes a basic blockchain, a peer-to-peer server for synchronization, a wallet system, a transaction pool, and a miner for adding new blocks to the blockchain.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [API Endpoints](#api-endpoints)
  - [/blocks](#blocks)
  - [/mine](#mine)
  - [/transactions](#transactions)
  - [/transact](#transact)
  - [/mine-transactions](#mine-transactions)
  - [/public-key](#public-key)

## Getting Started

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)


## API Endpoints

- **GET /blocks:** Retrieves the entire blockchain.

- **POST /mine:** Mines a new block with data provided in the request body. After mining, it syncs the chains with other nodes.

- **GET /transactions:** Retrieves the current transaction pool.

- **POST /transact:** Creates a new transaction. Requires the recipient's address and the amount in the request body. After creating the transaction, it broadcasts it to other nodes.

- **GET /mine-transactions:** Mines a new block with transactions from the transaction pool.

- **GET /public-key:** Retrieves the public key associated with the wallet.


