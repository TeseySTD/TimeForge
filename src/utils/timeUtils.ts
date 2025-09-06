export function parseTimeStringToNumber(timeString: string): number {
    const timeParts = timeString.split(':')
    const hours = Number(timeParts[0])
    const minutes = Number(timeParts[1])
    const seconds = Number(timeParts[2])
    return hours * 60 * 60 + minutes * 60 + seconds
}

export function parseSecondsToTimeString(timeInSec: number): string {
    const hours = Math.floor(timeInSec / 60 / 60)
    const minutes = Math.floor((timeInSec - hours * 60 * 60) / 60)
    const seconds = (timeInSec % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}