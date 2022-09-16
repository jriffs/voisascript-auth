import multer, { memoryStorage } from "multer";
import { promisify } from 'util';

const storage = memoryStorage()

// creating an instance
const upload = multer({ storage: storage }).single('audio')
export const preparedFileMiddleware = promisify(upload)