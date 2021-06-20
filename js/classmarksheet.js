var listStudent = [];
window.addEventListener('load', function() {
    let index = new Index();
})
class Index extends Base {
    constructor() {
        super();
        this.InitEvent();
    }
    InitEvent() {
        document.querySelector("#addStudent").addEventListener("click", this.SaveStudent.bind(this, { model: 1 }));
        document.querySelector("#saveStudent").addEventListener("click", this.SaveStudent.bind(this, { model: 2 }));
        document.querySelector("#studentGood").addEventListener("click", this.IsStudentGood.bind(this));
        document.querySelector("#caculatorAvgPoint").addEventListener("click", this.CaculatorAvgPoint.bind(this));
    }

    ReloadEvent() {
        let listBtnEdit = document.getElementsByClassName("btnEdit");
        Array.from(listBtnEdit).forEach(element => {
            element.addEventListener("click", this.UpdateStudent.bind(this));
        });
        let listBtnDelete = document.getElementsByClassName("btnDelete");
        Array.from(listBtnDelete).forEach(element => {
            element.addEventListener("click", this.DeleteStudent.bind(this));
        });
    }
    DeleteStudent(even) {
        let me = this;
        let id = even.currentTarget.getAttribute('selectedId');
        me.listStudent = me.listStudent.filter(x => x["Id"] !== parseInt(id));
        me.LoadData();
    }
    UpdateStudent(even) {
        let me = this;
        let id = even.currentTarget.getAttribute('selectedId');
        me.listStudent.forEach(item => {
            if (item["Id"] == id) {
                let property = document.querySelectorAll('input[property]');
                property.forEach(element => {
                    let propertyName = element.getAttribute("property");
                    if (propertyName == "Name") {
                        element.value = item["Name"];
                    } else if (propertyName == "MathScores") {
                        element.value = item["MathScores"];
                    } else if (propertyName == "PhysicsPoints") {
                        element.value = item["PhysicsPoints"];
                    } else if (propertyName == "ChemistryScore") {
                        element.value = item["ChemistryScore"];
                    }
                });
            }
        });
        let listBtnDelete = document.querySelectorAll(".btnDelete");
        listBtnDelete.forEach(item => {
            item.disabled = true;
        });
        document.getElementById("addStudent").disabled = true;
        document.getElementById("saveStudent").disabled = false;
        document.getElementById("saveStudent").setAttribute("studentid", id);
    }
    IsStudentGood() {
        let me = this;
        if (me.listStudent.length == 0) {
            alert("Không có sinh viên nào!");
            return;
        }
        me.LoadData(true);
    }

    LoadData(isStudentGood) {
        super.LoadData(isStudentGood);
        if (this.listStudent.length > 0) {
            this.ReloadEvent();
        }
    }
    SaveStudent(event) {
        var mode = event.model;
        let me = this;
        let property = document.querySelectorAll('input[property]');
        let name = "",
            mathScores, physicsPoints, chemistryScore, avg;
        property.forEach(function(element) {
            let propertyName = element.getAttribute("property");
            if (propertyName == "Name") {
                name = element.value;
            } else if (propertyName == "MathScores") {
                mathScores = element.value;
            } else if (propertyName == "PhysicsPoints") {
                physicsPoints = element.value;
            } else if (propertyName == "ChemistryScore") {
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
            avg = me.AvgPoint(mathScores, physicsPoints, chemistryScore);
            let id = 1;
            if (me.listStudent.length > 0) {
                id = parseInt(me.listStudent[me.listStudent.length - 1].Id) + 1;
            }
            me.listStudent = me.listStudent.AddStudent(id, name, mathScores, physicsPoints, chemistryScore, "?");
        } else {
            let id = document.getElementById("saveStudent").getAttribute("studentid");
            me.listStudent.forEach(item => {
                if (item["Id"] == id) {
                    item["Name"] = name;
                    item["MathScores"] = mathScores;
                    item["PhysicsPoints"] = physicsPoints;
                    item["ChemistryScore"] = chemistryScore;
                }
                item["Avg"] = "?";
            });
            document.getElementById("addStudent").disabled = false;
            document.getElementById("saveStudent").disabled = true;
        }
        me.LoadData();
        me.ResetForm();
    }

    CaculatorAvgPoint() {
        let me = this;
        if (me.listStudent.length == 0) {
            alert("Không có sinh viên nào!");
            return;
        }
        me.listStudent.AvgPointArray(me);
        me.LoadData();
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