var ActivateButton = document.createElement("button");
ActivateButton.innerText = "Answer Question";
ActivateButton.style = "top:auto;left:50%;position:absolute;"
document.body.appendChild(ActivateButton);

ActivateButton.onclick = function() {
    var assignmentId = document.location.href.slice(0, document.location.href.lastIndexOf("/watch")).slice(document.location.href.slice(0, document.location.href.lastIndexOf("/watch")).lastIndexOf("/") + 1, document.location.href.slice(0, document.location.href.lastIndexOf("/watch")).length)

    var answersRequest = fetch("https://edpuzzle.com/api/v3/assignments/"+assignmentId).then(Response => Response.json()).then((Response) => {
        var assignmentInfo = Response.medias[0];
        assignmentInfo.questions.forEach(Question => {
            if (Question.choices) {
                Question.choices.forEach(Choice => {
                    if (document.getElementById(Choice._id) != undefined && Choice.isCorrect) {
                        var answerElement = document.getElementById(Choice._id);
                        answerElement.click();
                        setTimeout(() => {
                            var submitButton = (function() {
                                var returnElement;
                                document.getElementsByTagName("span").forEach(spanElement => {
                                    if (spanElement.innerText.indexOf("Submit") != -1) {
                                        returnElement = spanElement;
                                    }
                                })
                                return returnElement.parentElement.parentElement;
                            })()
                            submitButton.click();
                        }, 250)
                    }
                })
            }
        })
    })
}
