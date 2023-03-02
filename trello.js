var arr = [];
var i;
window.addEventListener("load", function () {
  arr = JSON.parse(localStorage.getItem("TaskList"));
  if (arr == null) {
    arr = [];
    i = 0;
  } else {
    i = arr.length;
    Display(arr);
  }
});

var btn = document.getElementById("btn");
btn.addEventListener("click", Add);
function Add(event) {
  event.preventDefault();
  var Prog = document.getElementById("inProgress");
  var ProName = document.getElementById("textVal");

  if (ProName.value != "") {
    var item = document.createElement("p");
    item.innerHTML = ProName.value;
    item.setAttribute("id", i++);
    item.setAttribute("draggable", true);
    item.setAttribute("class", "item");
    Prog.append(item);
    ProName.value = "";
    Drag();
    var data = {
      id: item.id,
      text: item.innerHTML,
      parent: Prog.id,
    };
    arr.push(data);
    storeLocal(arr);
  }
}
var boxs = document.querySelectorAll(".tasksSection");
function Drag() {
  var items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text", item.id);
    });
    boxs.forEach((box) => {
      box.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      box.addEventListener("drop", function (e) {
        var draggerid = e.dataTransfer.getData("text");
        this.append(document.getElementById(draggerid));
        arr.forEach((element) => {
          if (element.id == draggerid) {
            element.parent = this.id;
          }
        });
        storeLocal(arr);
      });
    });
  });
}
function storeLocal(TaskList) {
  localStorage.setItem("TaskList", JSON.stringify(TaskList));
}
function Display(list) {
  boxs.forEach((box) => {
    list.forEach((it) => {
      if (box.id == it.parent) {
        var oldItem = document.createElement("p");
        oldItem.innerHTML = it.text;
        oldItem.setAttribute("id", it.id);
        oldItem.setAttribute("draggable", true);
        oldItem.setAttribute("class", "item");
        box.append(oldItem);
        Drag();
      }
    });
  });
}
