const { v4: uuidv4 } = require('uuid')
export const generateUniqueId = (): string => {
    return uuidv4(); // Generates a UUID (version 4)
};