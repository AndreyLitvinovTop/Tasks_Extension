var date = new Date();
let addTasks = document.getElementById('addTasks'),
    tasks = document.getElementById('tasks');

let textTask = document.getElementById('taskInterfaceText');

// Добавление задачи
window.addEventListener('keydown', function(e){
    if(e.code == "Enter"){
        if(textTask.value == ""){
            alert("Введите задачу")
        }
        else{
            AddTaskItems(textTask.value, FullDate()); // Create Li
            localStorage.setItem(textTask.value, JSON.stringify({
                v: textTask.value,
                d: FullDate()
            }));
            textTask.value = "";
        }
    }
});

addTasks.addEventListener('click', function(){
    if(textTask.value == ""){
        alert("Введите задачу")
    }
    else{
        AddTaskItems(textTask.value, FullDate()); // Create Li
        localStorage.setItem(textTask.value, JSON.stringify({
            v: textTask.value,
            d: FullDate()
        }));
        textTask.value = "";
    }
});

// Создание обьекта для задачи
async function AddTaskItems(taskText, dateTask){
    var createLi = await document.createElement("li");
    createLi.classList.add("tasksItems");
    createLi.setAttribute("id", "tasksItems");

    var createText = await document.createElement("h1");  
    createText.classList.add("tasksItemsText");
    createText.setAttribute("id", "tasksItemsText");
    createText.innerHTML = taskText;

    var createDate = await document.createElement("p");
    createDate.classList.add("tasksItemsDate");
    createDate.setAttribute("id", "tasksItemsDate");
    createDate.innerHTML = dateTask;

    tasks.appendChild(createLi);
    createLi.appendChild(createText);
    createLi.appendChild(createDate);
}

// Получения даты
let getDayCreateTask = () => date.getDate(), // День
    getMonthCreateTask = () => { // Месяц
        let month = date.getMonth();
        return month+=1;
    },
    getYearCreateTask = () => date.getFullYear(), // Год
    FullDate = () => {return getDayCreateTask() + "." + getMonthCreateTask() + "." + getYearCreateTask()};

// Загрузка данных
window.addEventListener('load', function(){ 
    const localStorageKeys = Object.keys(localStorage);

    localStorageKeys.forEach(key => {
        let v = JSON.parse(localStorage.getItem(key)).v;
        let d = JSON.parse(localStorage.getItem(key)).d;
        
        if(d == FullDate()){
            AddTaskItems(v, d);
        }else{
            this.localStorage.removeItem(key);
        }
    });
});