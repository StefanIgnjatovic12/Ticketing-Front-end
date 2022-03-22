export const getTime = () => {
    const date = new Date()
    let months = date.toLocaleDateString('en-GB')
    let time = date.toLocaleTimeString([], {timeStyle: 'short', hour12: false})
    return months + " " + time
    // const formatdate = (dateStr) => {
    //     let date = new Date(dateStr)
    //     let months = date.toLocaleDateString('en-GB')
    //     let time = date.toLocaleTimeString([], {timeStyle: 'short', hour12: false})
    //
    //
    //     return months + " " + time
    // }
    //
    // return fetch("https://worldtimeapi.org/api/ip")
    //     .then(response => response.json())
    //     .then(data => formatdate(data.datetime))
}