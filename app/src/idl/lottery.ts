export type Lottery = {
  "version": "0.1.0",
  "name": "lottery",
  "instructions": [
    {
      "name": "initialiseLottery",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ticketPrice",
          "type": "u64"
        },
        {
          "name": "oraclePubkey",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "buyTicket",
      "accounts": [
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pickWinner",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "winner",
          "type": "u32"
        }
      ]
    },
    {
      "name": "payOutWinner",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "adminPayout",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "winnerIndex",
            "type": "u32"
          },
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "ticketPrice",
            "type": "u64"
          },
          {
            "name": "idxs",
            "type": {
              "array": [
                "u32",
                256
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ticket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "submitter",
            "type": "publicKey"
          },
          {
            "name": "idx",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "lotteries",
            "type": {
              "array": [
                {
                  "defined": "Lottery"
                },
                100
              ]
            }
          },
          {
            "name": "lotteryCount",
            "type": {
              "defined": "usize"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "LotteryMaxLimit",
      "msg": "Lottery limit has been reached"
    },
    {
      "code": 6001,
      "name": "LotteryAlreadyExists",
      "msg": "Lottery already exists in the pool"
    },
    {
      "code": 6002,
      "name": "TicketSubmitterNotAllowed",
      "msg": "Ticket Submitter not allowed"
    },
    {
      "code": 6003,
      "name": "LotteryNotFound",
      "msg": "Lottery Not Found"
    },
    {
      "code": 6004,
      "name": "RestakeDenied",
      "msg": "Ticket already staked"
    },
    {
      "code": 6005,
      "name": "LotteryClosed",
      "msg": "Lottery Closed"
    }
  ]
};

export const IDL: Lottery = {
  "version": "0.1.0",
  "name": "lottery",
  "instructions": [
    {
      "name": "initialiseLottery",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ticketPrice",
          "type": "u64"
        },
        {
          "name": "oraclePubkey",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "buyTicket",
      "accounts": [
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pickWinner",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "winner",
          "type": "u32"
        }
      ]
    },
    {
      "name": "payOutWinner",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "adminPayout",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ticket",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "winnerIndex",
            "type": "u32"
          },
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "ticketPrice",
            "type": "u64"
          },
          {
            "name": "idxs",
            "type": {
              "array": [
                "u32",
                256
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ticket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "submitter",
            "type": "publicKey"
          },
          {
            "name": "idx",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "lotteries",
            "type": {
              "array": [
                {
                  "defined": "Lottery"
                },
                100
              ]
            }
          },
          {
            "name": "lotteryCount",
            "type": {
              "defined": "usize"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "LotteryMaxLimit",
      "msg": "Lottery limit has been reached"
    },
    {
      "code": 6001,
      "name": "LotteryAlreadyExists",
      "msg": "Lottery already exists in the pool"
    },
    {
      "code": 6002,
      "name": "TicketSubmitterNotAllowed",
      "msg": "Ticket Submitter not allowed"
    },
    {
      "code": 6003,
      "name": "LotteryNotFound",
      "msg": "Lottery Not Found"
    },
    {
      "code": 6004,
      "name": "RestakeDenied",
      "msg": "Ticket already staked"
    },
    {
      "code": 6005,
      "name": "LotteryClosed",
      "msg": "Lottery Closed"
    }
  ]
};
