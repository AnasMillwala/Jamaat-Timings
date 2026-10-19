import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jamaattimings.admin',
  appName: 'Jamaat Timings Admin',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
