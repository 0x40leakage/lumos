// TODO: move this to a separate package which also allows loading
// from a user provided file. We will also need to do deep-freeze on the objects.

const LINA = {
  PREFIX: "ckb",
  SCRIPTS: {
    SECP256K1_BLAKE160: {
      SCRIPT: {
        code_hash:
          "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        hash_type: "type",
      },
      OUT_POINT: {
        tx_hash:
          "0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c",
        index: "0x0",
      },
      DEP_TYPE: "dep_group",
      SHORT_ID: 0,
    },
    SECP256K1_BLAKE160_MULTISIG: {
      SCRIPT: {
        code_hash:
          "0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8",
        hash_type: "type",
      },
      OUT_POINT: {
        tx_hash:
          "0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c",
        index: "0x1",
      },
      DEP_TYPE: "dep_group",
      SHORT_ID: 1,
    },
  },
};

const AGGRON4 = {
  PREFIX: "ckt",
  SCRIPTS: {
    SECP256K1_BLAKE160: {
      SCRIPT: {
        code_hash:
          "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        hash_type: "type",
      },
      OUT_POINT: {
        tx_hash:
          "0xf8de3bb47d055cdf460d93a2a6e1b05f7432f9777c8c474abf4eec1d4aee5d37",
        index: "0x0",
      },
      DEP_TYPE: "dep_group",
      SHORT_ID: 0,
    },
    SECP256K1_BLAKE160_MULTISIG: {
      SCRIPT: {
        code_hash:
          "0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8",
        hash_type: "type",
      },
      OUT_POINT: {
        tx_hash:
          "0x6495cede8d500e4309218ae50bbcadb8f722f24cc7572dd2274f5876cb603e4e",
        index: "0x1",
      },
      DEP_TYPE: "dep_group",
      SHORT_ID: 1,
    },
  },
};

module.exports = {
  LINA,
  AGGRON4,
};
