import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { create } from '@web3-storage/w3up-client'


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
  VITE_STORAGE_SPACE
} = import.meta.env


export const uploadToIPFS = async (files: File[]) => {
  if (!files || files.length === 0) {
    throw new Error('No files provided for upload')
  }

  const client = await create()
  client.setCurrentSpace(VITE_STORAGE_SPACE)
  return Promise.all(files.map(async file => {
    const result = await client.uploadFile(file)
    console.log({ result })
    return result.toString()
  }))
}