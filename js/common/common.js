String.prototype.IsEmptyOrSpaces = (function() {
    return this === null || this.match(/^ *$/) !== null;
});
String.prototype.IsPoint = (function(point){
    if(this == "") {
        return "Vui lòng nhập điểm";
    }

    if(this < 0 || this > 10){
        return `Điểm ${point} phải nằm trong khoảng từ 0-> 10!`;
    }
    return "";
});
Array.prototype.AddStudent = (function(id,name,mathScores,physicsPoints,chemistryScore,avg) {
    let student = { "Id": id, "Name": name, "Math": mathScores, "Physics": physicsPoints, "Chemistry": chemistryScore, "Avg": avg }
    this.push(student);
    return this;
});

Array.prototype.AvgPointArray =(function(that){
    this.forEach(item => {
        item.Avg = that.AvgPoint(item.Math,item.Physics,item.Chemistry);
    });

    return this;
});

Array.prototype.ResetAvg =(function(){
    this.forEach(item => {
        item.Avg = "?";
    });

    return this;
});