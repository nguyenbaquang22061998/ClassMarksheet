String.prototype.IsEmptyOrSpaces = (function() {
    return this === null || this.match(/^ *$/) !== null;
});
String.prototype.IsPoint = (function(point){
    if(this == "") {
        return "Chưa nhập điểm";
    }

    if(this < 0 || this > 10){
        return `Điểm ${point} sai!`;
    }
    return "";
});
Array.prototype.AddStudent = (function(id,name,mathScores,physicsPoints,chemistryScore,avg) {
    let student = { "Id": id, "Name": name, "MathScores": mathScores, "PhysicsPoints": physicsPoints, "ChemistryScore": chemistryScore, "Avg": avg }
    this.push(student);
    return this;
});

Array.prototype.AvgPointArray =(function(that){
    this.forEach(item => {
        item.Avg = that.AvgPoint(item.MathScores,item.PhysicsPoints,item.ChemistryScore);
    });

    return this;
});

Array.prototype.ResetAvg =(function(){
    this.forEach(item => {
        item.Avg = "?";
    });

    return this;
});