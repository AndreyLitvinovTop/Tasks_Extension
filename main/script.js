let addTasks = document.getElementById('addTasks'),
    tasks = document.getElementById('tasks'),
    tasksTitle = document.getElementById('tasksTitle'),
    textTask = document.getElementById('taskInterfaceText');
    let i = 0;
// Add tasks
window.addEventListener('keydown', function(e){
    
    if(e.code == "Enter"){
        if(textTask.value == ""){
            i++;     
            switch(i){
                case 3: alert("Я сказал введите задачу"); break;
                case 4: alert("Задачу введи"); break;
                case 5: alert("Я сказал введите задачу"); break;
                case 6: alert("Тебе не надоело? Введи уже задачу"); break;
                case 7: alert("Может хватит! ВВЕДИ УЖЕ ЗАДУЧУ"); break;
                case 8: alert("Все я обиделся!!!"); break;
                default: alert("Введи задачу"); break;
            }
        }
        else{
            i = 0;
            tasksTitle.style.display = "none";
            AddTaskItems(textTask.value, FullTime(), FullDate()); // Create Li
            localStorage.setItem(textTask.value, JSON.stringify({
                v: textTask.value,
                d: FullDate(),
                t: FullTime()
            }));
            textTask.value = "";
        }
    }
});

addTasks.addEventListener('click', function(){
    if(textTask.value == ""){
        i++;   
        switch(i){
            case 3: alert("Я сказал введите задачу"); break;
            case 4: alert("Задачу введи"); break;
            case 5: alert("Я сказал введите задачу"); break;
            case 6: alert("Тебе не надоело? Введи уже задачу"); break;
            case 7: alert("Может хватит! ВВЕДИ УЖЕ ЗАДУЧУ"); break;
            case 8: alert("Все я обиделся!!!"); break;
            default: alert("Введи задачу"); break;
        }
    }
    else{
        i = 0;
        tasksTitle.style.display = "none";
        AddTaskItems(textTask.value, FullTime(), FullDate()); // Create Li
        localStorage.setItem(textTask.value, JSON.stringify({
            v: textTask.value,
            d: FullDate(),
            t: FullTime()
        }));
        textTask.value = "";
    }
});

// Create object for tasks
async function AddTaskItems(taskText, timeTask, dateTask){
    let dateDate = new Date(dateTask);
    let dateText = () => { return dateDate.getDate() + "." + dateDate.getMonth() + "." + dateDate.getFullYear()};
    var createLi = await document.createElement("li");
    createLi.classList.add("tasksItems");
    createLi.setAttribute("id", "tasksItems");

    var createText = await document.createElement("h1");  
    createText.classList.add("tasksItemsText");
    createText.setAttribute("id", "tasksItemsText");
    createText.innerHTML = taskText;

    var createDate = await document.createElement("p");
    createDate.classList.add("tasksItemsTime");
    createDate.setAttribute("id", "tasksItemsTime");
    createDate.innerHTML = timeTask + " " + dateText();

    tasks.appendChild(createLi);
    createLi.appendChild(createText);
    createLi.appendChild(createDate);
}

// Get Date and Time
var date = new Date();
let FullTime = () => {return date.getHours() + ":" + date.getMinutes()}, // Time
    FullDate = () => {return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()}; // Date

// Load Data
window.addEventListener('load', function(){ 
    const localStorageKeys = Object.keys(localStorage);

    localStorageKeys.forEach(key => {
        let v = JSON.parse(localStorage.getItem(key)).v, // Value
            d = JSON.parse(localStorage.getItem(key)).d, // Date
            t = JSON.parse(localStorage.getItem(key)).t; // Time

        if(localStorageKeys.length == 0){
            tasksTitle.style.display = "block";
        }
        else{
            tasksTitle.style.display = "none";
            if(Math.floor(Math.abs(new Date(FullDate()) - new Date(d)) / (1000 * 60 * 60 * 24)) <= 5){
                AddTaskItems(v, t, d);
            }else{
                this.localStorage.removeItem(key);
            }
        }
    });
});