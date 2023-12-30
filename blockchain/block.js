const ChainUtil = require('../chain-util')
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, nonce, lastHash, hash, data, difficulty) {
        this.timestamp = timestamp;
        this.nonce = nonce;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Nonce     : ${this.nonce}
            Last Hash : ${this.lastHash}
            Hash      : ${this.hash}
            Data      : ${this.data}
            Difficulty: ${this.difficulty}`;
    }

    static genesis() {
        return new this('Genesis time', 0, '0000000000000000000000000000000000000000000000000000000000000000', Block.hash('Genesis time', '0000000000000000000000000000000000000000000000000000000000000000', []), [], DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp, timestamp2;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, nonce, lastHash, data, difficulty);
            timestamp2 = Date.now();
            if (timestamp !== timestamp2) {
                nonce = 0;
            }
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, nonce, lastHash, hash, data, difficulty);
    }

    static hash(timestamp, nonce, lastHash, data, difficulty) {
        return ChainUtil.hash(`${timestamp}${nonce}${lastHash}${data}${difficulty}`);
    }

    static blockHash(block) {
        const { timestamp, nonce, lastHash, data, difficulty } = block;
        return Block.hash(timestamp, nonce, lastHash, data, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = MINE_RATE > currentTime - lastBlock.timestamp ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;