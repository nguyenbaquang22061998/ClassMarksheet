var lstItems = [];
window.addEventListener('load', function() {
    let index = new Index();
})

class Fundamental {
    constructor() {
        this.lstItems = [];
        let strlstItems = localStorage.getItem('lstItems');
        if (strlstItems != null && !strlstItems.IsEmptyOrSpaces()) {
            this.lstItems = JSON.parse(strlstItems);
        }
        this.GetDataForCell();
    }
    GetDataForCell(student) {
        let property = document.querySelectorAll('th[property]');
        let tbody = document.querySelector("#main-table tbody");
        tbody.innerHTML = "";
        let strlstItems = JSON.stringify(this.lstItems);
        localStorage.setItem('lstItems', strlstItems)
        this.lstItems.forEach(function(item, index) {
            let row = tbody.insertRow();
            if (student && item["Avg"] > 7.5) {
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
class Index extends Fundamental {
    constructor() {
        // gọi ra constructor của class cha (Fundamental)
        super();
        this.Init();
    }
    Init() {
        document.querySelector("#add").addEventListener("click", this.Save.bind(this, { model: 1 }));
        document.querySelector("#save").addEventListener("click", this.Save.bind(this, { model: 2 }));
        document.querySelector("#check").addEventListener("click", this.Check.bind(this));
        document.querySelector("#math").addEventListener("click", this.Math.bind(this));
    }

    // Function delete student.
    Delete(even) {
        let me = this;
        let id = even.currentTarget.getAttribute('selectedId');
        me.lstItems = me.lstItems.filter(x => x["Id"] !== parseInt(id));
        me.GetDataForCell();
    }

    // Function Update Student.
    Update(even) {
        let me = this;
        let id = even.currentTarget.getAttribute('selectedId');
        me.lstItems.forEach(item => {
            if (item["Id"] == id) {
                let property = document.querySelectorAll('input[property]');
                property.forEach(element => {
                    let propertyName = element.getAttribute("property");
                    if (propertyName == "Name") {
                        element.value = item["Name"];
                    } else if (propertyName == "Math") {
                        element.value = item["Math"];
                    } else if (propertyName == "Physics") {
                        element.value = item["Physics"];
                    } else if (propertyName == "Chemistry") {
                        element.value = item["Chemistry"];
                    }
                });
            }
        });
        let listBtnDelete = document.querySelectorAll(".btnDelete");
        listBtnDelete.forEach(item => {
            item.disabled = true;
        });
        document.getElementById("add").disabled = true;
        document.getElementById("save").hidden = false;
        document.getElementById("save").setAttribute("studentid", id);
    }

    // Function check student.
    Check() {
        let anyStudent = this;
        if (anyStudent.lstItems.length == 0) {
            alert("Không tồn tại học sinh nào!");
            return;
        }
        anyStudent.GetDataForCell(true);
    }
    
    // Extend fuction GetDataForCall
    GetDataForCell(student) {
        super.GetDataForCell(student);
        if (this.lstItems.length > 0) {
            let listBtnEdit = document.getElementsByClassName("btnEdit");
            Array.from(listBtnEdit).forEach(element => {
                element.addEventListener("click", this.Update.bind(this));
            });
            let listBtnDelete = document.getElementsByClassName("btnDelete");
            Array.from(listBtnDelete).forEach(element => {
                element.addEventListener("click", this.Delete.bind(this));
            });
        }
    }

    // Function Save Student.
    Save(event) {
        var mode = event.model;
        let anyStudent = this;
        let property = document.querySelectorAll('input[property]');
        let name = "",
            mathScores, physicsPoints, chemistryScore, avg;
        property.forEach(function(element) {
            let propertyName = element.getAttribute("property");
            if (propertyName == "Name") {
                name = element.value;
            } else if (propertyName == "Math") {
                mathScores = element.value;
            } else if (propertyName == "Physics") {
                physicsPoints = element.value;
            } else if (propertyName == "Chemistry") {
                chemistryScore = element.value;
            }
        });
        if (name.IsEmptyOrSpaces()) {
            alert("Tên không được để trống!");
            return;
        }
        let isMathScores = mathScores.IsPoint("toán");
        if (isMathScores != "") {
            alert(isMathScores);
            return;
        }
        let isPhysicsPoints = physicsPoints.IsPoint("lý");
        if (isPhysicsPoints != "") {
            alert(isPhysicsPoints);
            return;
        }
        let isChemistryScore = chemistryScore.IsPoint("hóa");
        if (isChemistryScore != "") {
            alert(isChemistryScore);
            return;
        }

        if (mode == 1) {
            avg = anyStudent.AvgPoint(mathScores, physicsPoints, chemistryScore);
            let id = 1;
            if (anyStudent.lstItems.length > 0) {
                id = parseInt(anyStudent.lstItems[anyStudent.lstItems.length - 1].Id) + 1;
            }
            anyStudent.lstItems = anyStudent.lstItems.AddStudent(id, name, mathScores, physicsPoints, chemistryScore, "?");
        } else {
            let id = document.getElementById("save").getAttribute("studentid");
            anyStudent.lstItems.forEach(item => {
                if (item["Id"] == id) {
                    item["Name"] = name;
                    item["Math"] = mathScores;
                    item["Physics"] = physicsPoints;
                    item["Chemistry"] = chemistryScore;
                }
                item["Avg"] = "?";
            });
            document.getElementById("add").disabled = false;
            document.getElementById("save").hidden = true;
        }
        anyStudent.GetDataForCell();
        anyStudent.ResetForm();
    }

    // Function Calculator Averge Score.
    Math() {
        let anyStudent = this;
        if (anyStudent.lstItems.length == 0) {
            alert("Không có sinh viên nào!");
            return;
        }
        anyStudent.lstItems.AvgPointArray(anyStudent);
        anyStudent.GetDataForCell();
    }

    ResetForm() {
        let property = document.querySelectorAll('input[property]');
        property.forEach(function(element) {
            element.value = "";
        });
    }

    AvgPoint(mathScores, physicsPoints, chemistryScore) {
        let avg = (parseFloat(mathScores) + parseFloat(physicsPoints) + parseFloat(chemistryScore)) / 3;
        return Math.round(avg * 10) / 10;
    }

}