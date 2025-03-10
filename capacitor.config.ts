
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.640fe081325d45ae8ced196876c2c95d',
  appName: 'cozy-mind-helper',
  webDir: 'dist',
  server: {
    url: "https://640fe081-325d-45ae-8ced-196876c2c95d.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    // Add any plugins configuration here
  }
};

export default config;
