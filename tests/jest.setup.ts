import { TextEncoder, TextDecoder } from 'util';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

Object.assign(global, { TextDecoder, TextEncoder });

import '@testing-library/jest-dom';

// Global mocks for Next.js actions
jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

jest.mock("@/auth", () => ({
    auth: jest.fn(() => Promise.resolve({ user: { id: "3832249a-f217-4f73-ac8f-e9b0a3c5498f", email: "italo520@gmail.com" } })),
}));



