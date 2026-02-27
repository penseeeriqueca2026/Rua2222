import { App } from '@capacitor/app';

export const initializeApp = async () => {
  try {
    // Configure app lifecycle
    App.addListener('appStateChange', (state) => {
      if (!state.isActive) {
        console.log('App paused');
      } else {
        console.log('App resumed');
      }
    });

    App.addListener('backButton', () => {
      console.log('Back button pressed');
    });

    console.log('Capacitor initialized successfully');
  } catch (error) {
    console.error('Error initializing Capacitor:', error);
  }
};

export const getDeviceInfo = async () => {
  try {
    const info = await App.getInfo();
    return info;
  } catch (error) {
    console.error('Error getting device info:', error);
    return null;
  }
};
