import { getNotificationsSetting } from "./settingsUtils";

export function requestNotificationPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
}

export function checkNotificationPermission(): NotificationPermission {
    return Notification.permission;
}

export function checkBrowserSupport(): boolean {
    return 'Notification' in window;
}

export function showNotification(title: string, options?: NotificationOptions): Notification | null {
    console.debug('Attempting to show notification:', title, 'Permission:', Notification.permission);
    
    if (!checkBrowserSupport()) {
        console.warn('This browser does not support notifications');
        return null;
    }
    
    if (Notification.permission === 'granted' && getNotificationsSetting()) {
        try {
            const notification = new Notification(title, options);
            
            console.debug('Notification created:', notification);
            
            notification.onclick = () => {
                console.debug('Notification clicked');
                window.focus(); 
                notification.close();
            };
            
            notification.onerror = (error) => {
                console.error('Notification error:', error);
            };
            
            notification.onshow = () => {
                console.debug('Notification shown');
            };
            
            notification.onclose = () => {
                console.debug('Notification closed');
            };
            
            return notification;
        } catch (error) {
            console.error('Failed to create notification:', error);
            return null;
        }
    } else {
        console.warn('Notification permission not granted:', Notification.permission);
        return null;
    }
}