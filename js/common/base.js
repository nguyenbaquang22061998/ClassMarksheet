class Base {
    constructor() {
        this.listStudent = [];
        let strListStudent = localStorage.getItem('listStudent');
        if (strListStudent != null && !strListStudent.IsEmptyOrSpaces()) {
            this.listStudent = JSON.parse(strListStudent);
        }
        this.LoadData();
    }
    LoadData(isStudentGood) {
        let property = document.querySelectorAll('th[property]');
        let tbody = document.querySelector("#main-table tbody");
        tbody.innerHTML = "";
        let strListStudent = JSON.stringify(this.listStudent);
        localStorage.setItem('listStudent', strListStudent)
        this.listStudent.forEach(function(item, index) {
            let row = tbody.insertRow();
            if (isStudentGood && item["Avg"] > 7.5) {
                row.setAttribute("class", "border-red")
            }
            property.forEach(function(element) {
                let propertyName = element.getAttribute("property");
                let newCell = row.insertCell();
                let value = document.createTextNode(item[propertyName]);
                if (propertyName == "STT") {
                    let stt = index + 1;
                    value = document.createTextNode(stt);
                }
                newCell.appendChild(value);
            });
            let cellNew = row.insertCell();
            let buttonEdit = document.createElement("button");
            buttonEdit.innerHTML = "Edit";
            buttonEdit.setAttribute("class", "btnEdit btn btn-warning");
            buttonEdit.setAttribute("selectedId", item["Id"]);
            let buttonDelete = document.createElement("button");
            buttonDelete.innerHTML = "Delete";
            buttonDelete.setAttribute("selectedId", item["Id"]);
            buttonDelete.setAttribute("class", "btnDelete btn btn-danger");
            cellNew.appendChild(buttonEdit);
            cellNew.appendChild(buttonDelete);
        });
    }
}