function handleSubmit() {
    var listId = document.getElementById("listId").value
    getGeeklist(listId)
}

function getGeeklist(listNum) {

    url = "https://boardgamegeek.com/xmlapi/geeklist/" + listNum

    fetch(url)
    .then(resp => resp.text())
    .then(processResponse)
    .catch(error => writeMessage("fetch failed -- likely BGG is processing your request; try again momentarily"))
}

function processResponse(text) {
    var xml = (new window.DOMParser()).parseFromString(text, "text/xml")
    var errors = xml.getElementsByTagName("error")
    if (errors.length > 0) {
        writeMessage(errors[0].getAttribute("message"))
    } else {
        populateList(xml)
    }
}
    
function populateList(xml) {
    clear()
    var items = Array.from(xml.getElementsByTagName("item"))
    var list = document.getElementById("list")
    items.forEach(function (item) {
        var li = document.createElement("li")
        li.innerHTML = item.getAttribute("objectname")
        list.appendChild(li)
    })
}

function writeMessage(msg) {
    clear()
    document.getElementById("message").innerHTML = msg
}

function clear() {
    document.getElementById("list")
    Array.from(list.children).forEach(child => list.removeChild(child))
    document.getElementById("message").innerHTML=""
}
