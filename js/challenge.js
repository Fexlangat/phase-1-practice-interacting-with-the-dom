function toConsumableArray(a) {
    if (Array.isArray(a)) {
        var c = Array(a.length);
        for (var b = 0; b < a.length; b++) {
            c[b] = a[b];
        }
        return c;
    }
    return Array.from(a);
}

var playing = true;
var interval = timer();

function timer() {
    return setInterval(function() {
        var counter = document.getElementById("counter");
        var count = parseInt(counter.innerText);
        counter.innerText = count + 1;
    }, 1000);
}

var minus = document.getElementById("minus");
var plus = document.getElementById("plus");
var heart = document.getElementById("heart");
var pause = document.getElementById("pause");
var commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerText);
    counter.innerText = count - 1;
});

plus.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerText);
    counter.innerText = count + 1;
});

heart.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerText);
    var likes = document.querySelector(".likes");
    var likeItem = document.querySelector('[data-num="' + count + '"]');
    if (Array.from(likes.children).map(function(a) {
            return parseInt(a.dataset.num);
        }).includes(count)) {
        var likesCount = parseInt(likeItem.children[0].innerText);
        likeItem.innerHTML = count + " has been liked <span>" + (likesCount + 1) + "</span> times";
    } else {
        var newLikeItem = document.createElement("li");
        newLikeItem.setAttribute("data-num", count);
        newLikeItem.innerHTML = count + " has been liked <span>1</span> time";
        likes.appendChild(newLikeItem);
    }
});

pause.addEventListener("click", function() {
    if (playing) {
        playing = false;
        clearInterval(interval);
        this.innerText = "resume";
    } else {
        playing = true;
        interval = timer();
        this.innerText = "pause";
    }
    Array.from(document.getElementsByTagName("button")).forEach(function(button) {
        if (button.id !== "pause") {
            button.disabled = !playing;
        }
    });
});

commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var commentInput = this.children[0];
    var comment = commentInput.value;
    commentInput.value = "";
    var comments = document.querySelector(".comments");
    var newComment = document.createElement("p");
    newComment.innerText = comment;
    comments.appendChild(newComment);
});
