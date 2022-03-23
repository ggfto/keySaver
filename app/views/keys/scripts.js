var api = "http://144.22.209.208:8081/api/"
$(document).ready(function() {
	var actionContainer = $("#items");
    actionContainer.fadeIn();
    getAll();
});

function getAll() {
    $.get(api+'keys', JSON.stringify({}), (data) => {
        for(key in data) {
            $('#itemlist').after(
                `<tr>
                    <td>${key}</td>
                    <td>${data[key]}</td>
                </tr>`
            );
        }
    });
}
