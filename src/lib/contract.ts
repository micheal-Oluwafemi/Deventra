import { BrowserProvider, Contract, Signer } from "ethers"
import { Event, Global } from "@/types/event"

export const {
  VITE_EVENT_CONTRACT_ADDRESS,
  VITE_USERS_CONTRACT_ADDRESS,
  VITE_CHAIN_ID,
  VITE_CHAIN_NAME,
  VITE_RPC_URL,
  VITE_BLOCK_EXPLORER_URL,
} = import.meta.env;

//TODO: Remove the type declaration since it will be infered when we put the ABI
const usersABI: string[] = []
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
      }
    ],
    "name": "getEvent",
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
  }
]

export let browserProvider: BrowserProvider | null = null;
export let signer: Signer | null = null;
export let eventsContract: Contract | null = null;
export let usersContract: Contract | null = null;


export async function connectWallet() {
  try {
    let global: Global = window as any;
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
    let data: Event[] = raw_response.map(r => {
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
    let data: Event = {
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


