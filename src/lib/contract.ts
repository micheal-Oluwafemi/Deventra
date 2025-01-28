import { BrowserProvider, Contract, Signer } from "ethers"
import { Event, Global, User } from "@/types/event"

export const {
  VITE_EVENT_CONTRACT_ADDRESS,
  VITE_USERS_CONTRACT_ADDRESS,
  VITE_CHAIN_ID,
  VITE_CHAIN_NAME,
  VITE_RPC_URL,
  VITE_BLOCK_EXPLORER_URL,
} = import.meta.env;

//TODO: Remove the type declaration since it will be infered when we put the ABI
const usersABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "email", "type": "string" },
      { "internalType": "string", "name": "phone", "type": "string" }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "email", "type": "string" },
      { "internalType": "string", "name": "phone", "type": "string" }
    ],
    "name": "update",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" }
    ],
    "name": "getUser",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_address", "type": "address" }
    ],
    "name": "getByAddress",
    "outputs": [
      { "internalType": "string[]", "name": "", "type": "string[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]



const eventsABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadata",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      }
    ],
    "name": "addEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "event_id",
        "type": "uint256"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "event_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "metadata",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      }
    ],
    "name": "editEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "event_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "registerEvent",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "listEvents",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "internalType": "struct IEventsStorage.Event[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export let browserProvider: BrowserProvider | null = null;
export let signer: Signer | null = null;
export let eventsContract: Contract | null = null;
export let usersContract: Contract | null = null;


export async function connectWallet() {
  try {
    const global: Global = window as never;
    console.log(VITE_EVENT_CONTRACT_ADDRESS)
    if (global.ethereum) {
      browserProvider = new BrowserProvider(global.ethereum);
      signer = await browserProvider.getSigner()
      eventsContract = new Contract(VITE_EVENT_CONTRACT_ADDRESS, eventsABI, signer);
      usersContract = new Contract(VITE_USERS_CONTRACT_ADDRESS, usersABI, signer);
      return { err: null };
    } else {
      return { err: "No Web3 wallet was detected, Kindly Install a wallet extension like metamask" }
    }
  } catch (error) {
    console.log(error)
    return { err: "Unable to connect wallet at this time. please try again" }
  }
}

export async function getEvents(pool_limit: number = 200) {
  try {
    if (!eventsContract) return { err: "Wallet has not been connected yet kindly connect and try again", data: null }
    console.log("Starting to fetch contracts")
    const raw_response = await eventsContract.listEvents(pool_limit) as [[number, string, string, string]];
    const data: Event[] = raw_response.map(r => {
      return {
        id: r[0],
        title: r[1],
        data: JSON.parse(r[2]),
        date: new Date(r[3])
      } as Event
    }).filter(d => d.data.public)
    return { data, err: null }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch latest events at this moment", data: null }
  }
}

export async function getEvent(event_id: number) {
  try {
    if (!eventsContract) return { err: "Wallet has not been connected yet kindly connect and try again", data: null }
    console.log("Starting to fetch contracts")
    const raw_response = await eventsContract.get(event_id) as [number, string, string, string[]];
    const data: Event = {
      id: event_id,
      title: raw_response[1],
      data: JSON.parse(raw_response[1]),
      date: new Date(raw_response[2]),
      participantsIds: raw_response[3]
    }
    return { data, err: null }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch latest events at this moment", data: null }
  }
}

export async function getUserFromAddress(address: string) {
  try {
    if (!usersContract) return { err: "Wallet has not been connected yet kindly connect and try again", data: null }
    console.log("Starting to fetch contracts")
    const raw_response = await usersContract.getByAddress(address) as [string, string, string, string];
    if (raw_response.length != 4) return { err: null, data: null }
    console.log({ raw_response })
    const data: User = {
      id: raw_response[0],
      name: raw_response[1],
      email: raw_response[2],
      phone: raw_response[3],
      address
    }
    return {
      data,
      err: null
    }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch latest events at this moment", data: null }
  }
}

export async function getUserData(id: number) {
  try {
    if (!usersContract) return { err: "Wallet has not been connected yet kindly connect and try again", data: null }
    console.log("Starting to fetch contracts")
    const raw_response = await usersContract.getUser(id) as [string, string, string, string];
    const data: User = {
      id,
      name: raw_response[0],
      email: raw_response[1],
      phone: raw_response[2],
      address: raw_response[3]
    }
    return { data, err: null }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch user data at the moment", data: null }
  }
}

export async function registerUser(name: string, email: string, phone: string) {
  try {
    if (!usersContract) return { err: "Wallet has not been connected yet kindly connect and try again", data: null }
    console.log("Starting to fetch contracts")
    const transaction = await usersContract.register(name, email, phone);
    await transaction.wait();
    return { data: true, err: null }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch latest events at this moment", data: null }
  }
}

export async function updateUser(id: bigint, name: string, email: string, phone: string) {
  try {
    if (!usersContract) return { err: "Wallet has not been connected yet kindly connect and try again", data: null }
    console.log("Starting to fetch contracts")
    const transaction = await usersContract.update(id, name, email, phone);
    await transaction.wait();
    return { data: true, err: null }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch latest events at this moment", data: null }
  }
}


