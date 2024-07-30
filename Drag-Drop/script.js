const uploadInputEl = document.getElementById("uploadInput");
const dropAreaEl = document.getElementById("dropArea");
const uploadedFileContEl = document.getElementById("uploadedFileCont");
const uploadBtnContEl = document.getElementById("uploadBtnCont");
const browseBtnEl = document.getElementById("browseBtn");
const dropTextEl = document.getElementById("dropText");

dropAreaEl.addEventListener("dragover", dragOver);
dropAreaEl.addEventListener("dragleave", dragLeave);
dropAreaEl.addEventListener("drop", dropItem);
browseBtnEl.addEventListener("click", browseFile);
uploadInputEl.addEventListener("change", uploadFile);

let files = [];

function dragOver(e) {
  e.preventDefault();
  this.classList.add("content-over");
  dropTextEl.innerHTML = `Release to Upload files`;
}

function dragLeave(e) {
  e.preventDefault();
  this.classList.remove("content-over");
  dropTextEl.innerHTML = `Drag & Drop your files`;
}

function browseFile() {
  uploadInputEl.click();
}

function uploadFile() {
  let file = [...this.files];
  file.forEach((fl) => (fl.fileId = getRandomFileId()));
  dropFile(file);
}

function dropItem(e, currentFile) {
  e.preventDefault();
  currentFile = [...e.dataTransfer.files];
  currentFile.forEach((file) => (file.fileId = getRandomFileId()));
  dropFile(currentFile);
}
