var bookMarkName = document.getElementById("bookmarkName");
var bookMarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");

var bookMarkList = [];

if (localStorage.getItem("bookMark") == null) {
  bookMarkList = [];
} else {
  bookMarkList = JSON.parse(localStorage.getItem("bookMark"));
  displayBookmark();
}

submitBtn.onclick = function () {
  if (bmNamevalidation() == true && bmUrlValidation() == true) {
    createBookmark();
  } else {
    alert(`Site Name or Url is not valid, Please follow the rules below :

-> Site name must contain at least 3 characters
-> Site URL must be a valid one`);
  }
};

function createBookmark() {
  var bookMark = {
    name: bookMarkName.value,
    bmUrl: bookMarkURL.value,
  };
  if (bookMark.bmUrl.includes("https://")) {
    bookMark.bmUrl = bookMarkURL.value;
  } else {
    bookMark.bmUrl = "https://" + bookMarkURL.value;
  }
  bookMarkList.push(bookMark);
  localStorage.setItem("bookMark", JSON.stringify(bookMarkList));
  displayBookmark();
  reset();
  console.log(bookMarkList);
}

function reset() {
  bookMarkName.value = "";
  bookMarkURL.value = "";
}

function displayBookmark() {
  trs = ``;
  for (var i = 0, n = bookMarkList.length; i < n; i++) {
    trs += `
    <tr>
      <td>${i + 1}</td>
      <td>${bookMarkList[i].name}</td>
      <td><a href="${
        bookMarkList[i].bmUrl
      }" target="_blank" class="btn btn-outline-success"><i class="fa fa-earth me-1"></i>Visit</a></td>
      <td><button class="btn btn-outline-danger" onclick="dlete(${i})"><i class="fa fa-trash me-2"></i>Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = trs;
}

function dlete(index) {
  bookMarkList.splice(index, 1);
  localStorage.setItem("bookMark", JSON.stringify(bookMarkList));
  displayBookmark();
}

function bmNamevalidation() {
  var nameRegex = /^[A-z]{3,}$/;
  var bmName = bookMarkName.value;
  if (nameRegex.test(bmName)) {
    document.getElementById("nameValidation").innerHTML = ``;
    return true;
  } else {
    document.getElementById(
      "nameValidation"
    ).innerHTML = `<i class="fa fa-warning"></i> Name must contain at least 3 characters`;
    console.log("No match");
    return false;
  }
}

function bmUrlValidation() {
  var urlRegex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  var bmurlValu = bookMarkURL.value;
  if (urlRegex.test(bmurlValu)) {
    document.getElementById("urlValidation").innerHTML = ``;
    return true;
  } else {
    document.getElementById("urlValidation").innerHTML = `<i class="fa fa-warning"></i> Must Enter a valid url`;
    console.log("No match");
    return false;
  }
}
