function handleSubmit() {
    var listId = document.getElementById("listId").value
    getGeeklist(listId)
}

function getGeeklist(listNum) {

    url = "https://boardgamegeek.com/xmlapi/geeklist/" + listNum
    //url = "https://boardgamegeek.com/xmlapi/geeklist/273473"

    fetch(url)
        .then(response => response.text())
        .catch(error => console.log(error))
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => Array.from(data.getElementsByTagName("item"))
                        .filter(el => el.getAttribute("subtype") == "boardgame")
                        .map(el => el.getAttribute("objectname"))) 
        .then(populateList)
}

function populateList(items) {
    var list = document.getElementById("list")
    Array.from(list.children).forEach(child => list.removeChild(child))
    items.forEach(function (item) {
        var li = document.createElement("li")
        li.innerHTML = item
        list.appendChild(li)
    })
}
