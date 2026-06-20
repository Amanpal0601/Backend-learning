const fs = require('fs');
// require is there to import the fs module of Node js
const filePath = "./tasks.json";
// this is the sample file path which currently does not exist 

const loadTasks=()=>{
    // task laoad karne ke liye hamko file ko read karna padega soo its not alawys optimals so wee need to use try catch 
    // read , write karvan ke liye ham fs module ka use karenge
    try{
        
        const dataBuffer =fs.readFileSync(filePath) // this will read but comes not as string it is databuffer as it is coming from the data 
        const dataJSON =dataBuffer.toString() // not fully JSON it is in string but not is FULL JSON 
        // to convert dataJSON into full JSON 
        return JSON.parse(dataJSON)

    }catch(error){
        return []
    }
}

const saveTasks = (tasks)=>{
    const dataJSON = JSON.stringify(tasks) // this will convert the tasks array into JSON string
    fs.writeFileSync(filePath, dataJSON) // this will write the JSON string to the file
}


// now we need to create the functions for add, list and remove tasks
const addTask = (task)=>{
    const tasks = loadTasks() // this will load the tasks from the file and return it as an array of tasks
    tasks.push({task});

    saveTasks(tasks) // this will save the tasks in the file and overwrite the old data with the new data
    console.log("Task added " , task)
}
// add task karne se phele hamko load iss liye karne padte hai taaki joh file meh phele padi task hai usko vapas aaray meh load kara jaa ske taaki ham naya task correct order meh daale and yeh also verify kare meh kaam aayega ki kahi yeh task already exist karta hai arrr meh ki nahi 
// and ham laod kar bina naya task add kar denge toh purana task karoge toh file ke purane tasks gayab ho jayenge aur sirf naya task bachega.
// beacuse ham add tsak karne ke liye empty array use karte hai and ussi ka data overwrite karte hai file meh toh load nahi kiya toh puaran data aaya hi nahi and naya data keval ak task hai tih bass yahi hoga ki puarane task gaye keval naya task aaya 

// fubction to list out all the task 
const listTasks =()=>{
    const tasks = loadTasks() // this will load the tasks from the file and return it as an array of tasks
    // ab joh tasks aaye hai voh hao toh array object 
    // loop laga ke list kara deh 
    tasks.forEach((task,index)=> console.log(`${index+1}  - ${task.task}`)) // this will print the task with its index number
}

// function to remove a task
const removeTask = (argument)=>{
    const tasks = loadTasks()
    if(argument > 0 && argument <= tasks.length){ 
        tasks.splice(argument-1,1)
        saveTasks(tasks)
    }

    // we can also use filter method 
    // const updateTask = tasks.filter((taks,index)=>{
        // return index != argumnet-1
    // })
    // saveTasks(updateTask)
}
const command =  process.argv[2]; // this is the command which we will give in terminal like add, list or remove
const argument = process.argv[3]; // this is the argument which we will give in terminal like task name or task number


if(command === 'add'){
    addTask(argument)
}
else if(command === 'list'){
    listTasks()
}
else if(command === 'remove'){
    removeTask(parseInt(argument)) // task is stored as array so argumnet will be its number of index then remove function  will remove that task in the array  
}else{
    console.log("Command not found!!")
}