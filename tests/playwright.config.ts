import { devices, PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './specs',
  timeout: 30 * 1000,
  retries: 2,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    viewport: { width: 1280, height: 1024 },
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        channel: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        channel: 'webkit',
      },
    },  
  ],
};

export default config;
