export const DEFAULT_VOLUME = 50
export const DEFAULT_NOTIFICATIONS = true
const PREFIX = 'app.settings'

export const addVolumeSetting = (volume: number) => {
    localStorage.setItem(PREFIX + '.volume', String(volume));
}

export const addNotificationsSetting = (notificationsEnabled: boolean) => {
    localStorage.setItem(PREFIX +'.notifications', notificationsEnabled ? '1' : '0');
}

export const addThemeSetting = (theme: boolean) => {
    localStorage.setItem(PREFIX + '.dark-theme', theme ? '1' : '0');
}

export const getVolumeSetting = () => {
    const volume = localStorage.getItem(PREFIX + '.volume');
    return volume ? Number(volume) : DEFAULT_VOLUME;
}

export const getNotificationsSetting = () => {
    const notifications = localStorage.getItem(PREFIX + '.notifications');
    return notifications ? notifications === '1' : true;
}

export const getThemeSetting = () => {
    const theme = localStorage.getItem(PREFIX + '.dark-theme');
    return theme ? theme == '1' : true;
}