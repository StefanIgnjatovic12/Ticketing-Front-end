export const getTime = () => {
    const date = new Date()
    let months = date.toLocaleDateString('en-GB')
    let time = date.toLocaleTimeString([], {timeStyle: 'short', hour12: false})
    return months + " " + time
}