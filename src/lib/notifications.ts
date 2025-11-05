import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

async function checkNotificationPermission(): Promise<boolean> {
    return await isPermissionGranted();
}

async function requestNotificationPermission(): Promise<boolean> {
    let permission = await requestPermission();
    return permission === 'granted';
}

async function sendPushNotification(title: string, body: string) {
    await sendNotification({ title, body });
}

export { checkNotificationPermission, requestNotificationPermission, sendPushNotification }