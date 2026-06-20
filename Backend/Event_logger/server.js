const fs = require('fs');
const os = require('os');

const EventEmitter = require('events');
// this is class which is used to create custom events and emit them 


// This is logger class which extends EventEmitter class and it will be used to create custom events and emit them
class Logger extends EventEmitter{
    log(message) {
        this.emit('message', {message});  // logger function is used to emit the message 
    }
}

const logger = new Logger(); // creating an instance/object of logger class
const logFile = './eventlog.txt'; // this is the file where we will log our events and it file ka path exisit nahi karta hai toh yeh khud bana dega 

const LogToFile = (event)=>{
    const LogMessage = `${new Date().toISOString()} - ${event.message} \n`; // this is the message that we will log in the file and it includes the current date and time and the message that we want to log
    fs.appendFileSync(logFile,LogMessage); // this is used to append the log message to the file
}

logger.on('message',LogToFile); // on method is used to listen to the message event and it listen to event continuously and whenever the message event is emitted it will call the LogToFile function and pass the event as an argument

setInterval(()=>{
    const memoryUsage = (os.freemem()/os.totalmem()) *100; // this is used to calculate the memory usage of the system and it will return the percentage of memory usage

    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`); // this is used to log the memory usage and it will call the logger.log function and pass the memory usage as a message

},3000)  // this is used to log the memory usage every 3 seconds and it will call the logger.log function every 3 seconds and pass the memory usage as a message

logger.log("Application Started"); 
logger.log("Application event occured"); 

