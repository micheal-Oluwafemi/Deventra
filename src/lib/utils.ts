import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function toBase64(image: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as Base64.'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}
const {
  VITE_APPLION_API_KEY: APPLION_API_KEY,
  VITE_APPLION_API_SECRET: APPLION_API_SECRET,
  VITE_EVENT_IMAGES_BUCKET: EVENT_IMAGES_BUCKET
} = import.meta.env

const APPLION_IPFS_ENDPOINT = `https://api.apillon.io/storage/buckets/${EVENT_IMAGES_BUCKET}/upload`

export const uploadToIPFS = async (files: File[]) => {
  console.log({
    APPLION_API_KEY,
    APPLION_API_SECRET,
    APPLION_IPFS_ENDPOINT
  })
  const Authorization = 'Basic ' + btoa(APPLION_API_KEY + ':' + APPLION_API_SECRET)
  const formData = new FormData()

  if (!files || files.length === 0) {
    throw new Error('No files provided for upload')
  }

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i], files[i].name)
  }

  const response = await axios.post(APPLION_IPFS_ENDPOINT, formData, {
    headers: {
      Authorization,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    }
  })

  return response.data.data.items
}

export const retrieveFromIPFS = async (cid: string) => {
  const Authorization = 'Basic ' + btoa(APPLION_API_KEY + ':' + APPLION_API_SECRET)

  try {
    const response = await axios.post(`${APPLION_IPFS_ENDPOINT}/cat?arg=${cid}`, null, {
      headers: {
        Authorization,
        Accept: 'application/json'
      },
      responseType: 'text'
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to retrieve content from IPFS: ${error}`)
  }
}