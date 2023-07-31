
// điều kiện filter,search, sort, phân trang
var condition = {
    keyWord: "",
    sort: {
        field: "",
        type: ""
    },
    perPage: 4,
    currentPage: 1,
}
console.log(condition)

var worker = [
    { id: 1, name: "an", email: "an23@gmail.com", day: 22, salary: 40000, bonus: 300 },
    { id: 2, name: "sơn", email: "son@gmail.com", day: 28, salary: 50000, bonus: 400 },
    { id: 3, name: "phú", email: "phu12@gmail.com", day: 17, salary: 30000, bonus: 170 },
    { id: 4, name: "hải", email: "kgs@gmail.com", day: 21, salary: 34000, bonus: 340 },
    { id: 5, name: "nam", email: "nam23we@gmail.com", day: 20, salary: 33000, bonus: 100 },
    { id: 6, name: "huy", email: "23huy@gmail.com", day: 24, salary: 41000, bonus: 700 },
    { id: 7, name: "kiên", email: "jhdgs@gmail.com", day: 25, salary: 42000, bonus: 250 },
    { id: 8, name: "dũng", email: "dung124@gmail.com", day: 23, salary: 4000, bonus: 400 },
    { id: 9, name: "dương", email: "vanduong@gmail.com", day: 28, salary: 49900, bonus: 590 },
    { id: 10, name: "lung", email: "huulung@gmail.com", day: 16, salary: 24000, bonus: 190 },
    { id: 11, name: "tiến", email: "tientien@gmail.com", day: 23, salary: 28700, bonus: 340 },
    { id: 12, name: "xuân", email: "xun@gmail.com", day: 17, salary: 23030, bonus: 570 },
    { id: 13, name: "cường", email: "namcuong@gmail.com", day: 20, salary: 34890, bonus: 560 },
    { id: 14, name: "chinh", email: "23ching@gmail.com", day: 22, salary: 27700, bonus: 340 },
    { id: 15, name: "tu", email: "xutu@gmail.com", day: 27, salary: 43030, bonus: 570 },
    { id: 16, name: "cưong", email: "nacuong@gmail.com", day: 19, salary: 30890, bonus: 500 },

];
document.getElementById("updatebtn").style.display = "none"
renderListWorker()


function conditionCheck() {
    var lastWorker = JSON.parse(JSON.stringify(worker))
    if (condition.keyWord) {
        lastWorker = lastWorker.filter(item => item.name.includes(condition.keyWord))
    }
    if (condition.sort.field) {
        let listNumber = ["day", "salary", "bonus"]
        let listText = ["name", "email"]
        if (listNumber.includes(condition.sort.field)) {
            lastWorker = lastWorker.sort((a, b) => {
                if (condition.sort.type === "ASC") {
                    return a[condition.sort.field] - b[condition.sort.field]
                }
                if (condition.sort.type === "DESC") {
                    return b[condition.sort.field] - a[condition.sort.field]
                }

            })
        }
        if (listText.includes(condition.sort.field)) {
            lastWorker = lastWorker.sort((a, b) => {
                if (condition.sort.type === "ASC") {
                    return a[condition.sort.field].localeCompare(b[condition.sort.field])
                }
                if (condition.sort.type === "DESC") {
                    return b[condition.sort.field].localeCompare(a[condition.sort.field])
                }
            })
        }
    }
    const totalItem = lastWorker.length
    renderNumberPage(totalItem)
    document.getElementById("totalitem").innerHTML = `${totalItem} worker`
    lastWorker = lastWorker.slice(
        (condition.currentPage - 1) * condition.perPage, (condition.currentPage - 1) * condition.perPage + condition.perPage
    )
    return lastWorker
}

function addWorker() {
    var id = Date.now()
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var day = document.getElementById("day").value;
    var salary = document.getElementById("salary").value;
    var bonus = document.getElementById("bonus").value;

    var data = { id: id, name: name, email: email, day: day ? Number(day) : day, salary: salary ? Number(salary) : salary, bonus: bonus ? Number(bonus) : bonus, }
    var isValid = validate(data)
    if (!isValid) return;
    worker.unshift(data)
    renderListWorker()
    clear()

}

function validateEmail(email) {
    return !!String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
var isValidEmail = validateEmail(email)

function validate({ name, email, day, salary, bonus }) {
    if (name !== "") {
        if (name.trim().length > 20) {
            window.alert("tên không được lớn hơn 20 ký tự")
            return false
        }
    } else {
        window.alert("chưa nhập tên")
        return false
    }
    if (email !== "") {
        if (!validateEmail(email)) {
            window.alert("email không hợp lệ")
            return false
        }
    } else {
        window.alert("chưa nhập email")
        return false
    }
    if (day !== "") {
        if (day > 31 || day < 0) {
            window.alert("day từ 0 đến 31")
            return false
        }
    } else {
        window.alert("chưa nhập day")
        return false
    }
    if (salary !== "") {
        if (salary > 50000 || salary < 0) {
            window.alert("salary từ 0 đến 50000")
            return false
        }
    } else {
        window.alert("chưa nhập salary")
        return false
    }
    if (bonus !== "") {
        if (bonus > 1000 || bonus < 0) {
            window.alert("bonus từ 0 đến 1000")
            return false
        }
    } else {
        window.alert("chưa nhập bonus")
        return false
    }
    return true
}

function renderListWorker() {
    var arr = conditionCheck()
    var data = arr.map((item) => {
        data = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.day}</td>
                    <td>${item.salary}</td>
                    <td>${item.bonus}</td>
                    <td>
                    <button class="btn btn-warning" onclick="editWorker(${item.id})">
                        Edit
                    </button>
                    </td>
                    <td>
                    <button class="btn btn-danger" onclick="deleteWorker(${item.id})">
                        Delete
                    </button>
                    </td>
                </tr>`
        return data
    })
    document.getElementById("tableWorker").innerHTML = data.join("")
}

function deleteWorker(id) {
    var deleteWorker = worker.find(item => item.id === id)
    worker.splice(worker.indexOf(deleteWorker), 1)
    renderListWorker()
}
var idUpdate;
function editWorker(id) {
    idUpdate = id;
    var editWorker = worker.find(item => item.id === id)
    document.getElementById("name").value = editWorker.name;
    document.getElementById("email").value = editWorker.email;
    document.getElementById("day").value = editWorker.day;
    document.getElementById("salary").value = editWorker.salary;
    document.getElementById("bonus").value = editWorker.bonus;
    document.getElementById("updatebtn").style.display = "block"
    document.getElementById("addbtn").style.display = "none"

}


function updateWorker() {
    var workerUpdate = worker.find(item => item.id === idUpdate);

    workerUpdate.id = workerUpdate.id;
    workerUpdate.name = document.getElementById("name").value;
    workerUpdate.email = document.getElementById("email").value;
    workerUpdate.day = document.getElementById("day").value;
    workerUpdate.salary = document.getElementById("salary").value;
    workerUpdate.bonus = document.getElementById("bonus").value;

    var para = { name: workerUpdate.name, email: workerUpdate.email, day: workerUpdate.day, salary: workerUpdate.salary, bonus: workerUpdate.bonus, }
    var isValid = validate(para);
    if (!isValid) return;
    renderListWorker();
    clear();
    document.getElementById("updatebtn").style.display = "none"
    document.getElementById("addbtn").style.display = "block"
}

function clear() {
    id = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("day").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("bonus").value = "";
}

function searchWorker() {
    condition.keyWord = document.getElementById("search").value
    console.log(condition.keyWord)
    renderListWorker()
    getElementPage(1)
}

function sort(field, type) {
    condition.sort.field = field
    condition.sort.type = type
    renderListWorker()
    var id = field + type
    var listFilter = ["nameASC", "nameDESC", "emailASC", "emailDESC", "dayASC", "dayDESC", "salaryASC", "salaryDESC", "bonusASC", "bonusDESC",]
    for (i = 0; i < listFilter.length; i++) {
        if (id === listFilter[i]) {
            document.getElementById(`${listFilter[i]}`).style.color = "red"
        } else {
            document.getElementById(`${listFilter[i]}`).style.color = ""
        }
    }
}

function renderNumberPage(arrLength) {
    var totalPage = Math.ceil(arrLength / condition.perPage)
    var list = ""
    for (let i = 1; i <= totalPage; i++) {
        list += `<li ${i === condition.currentPage ? 'style="color:red"' : ""} onclick="getElementPage(${i})">${i}</li>`
    }
    document.getElementById("numberPage").innerHTML = list
}

function getElementPage(i) {
    condition.currentPage = i
    renderListWorker()
}