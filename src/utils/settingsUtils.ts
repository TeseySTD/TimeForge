export const DEFAULT_VOLUME = 50

export const addVolumeSetting = (volume: number) => {
    localStorage.setItem('app.settings.volume', String(volume))
}

export const addNotificationsSetting = (notificationsEnabled: boolean) => {
    localStorage.setItem('app.settings.notifications', notificationsEnabled ? '1' : '0')
}

export const getVolumeSetting = () => {
    const volume = localStorage.getItem('app.settings.volume')
    return volume ? Number(volume) : DEFAULT_VOLUME
}

export const getNotificationsSetting = () => {
    const notifications = localStorage.getItem('app.settings.notifications')
    return notifications ? notifications === '1' : true
}