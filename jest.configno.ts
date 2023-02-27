import type {Config} from 'jest';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    preset: 'vite-jest',
    
      testMatch: [
        '**/tests/unit/**/*.spec.?(m)js?(x)',
        '**/__tests__/*.?(m)js?(x)'
      ],
      testEnvironment: 'jest-environment-jsdom'
  };
};