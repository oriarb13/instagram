export default function authUser (req, res, next) {
    const log = `Request Recived at ${new Date().toISOString()} \n`
    fs.appendFile("logs.txt", log, (err) => {
        if (err) throw err
        console.log("Log Saved");
    })
    next()
}