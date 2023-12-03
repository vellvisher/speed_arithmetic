var json = [
    {
        "id": "10",
        "number": 17,
        "operator": "+"
    },
    {
        "id": "24",
        "number": 23,
        "operator": "+"
    },
    {
        "id": "25",
        "number": 24,
        "operator": "+"
    },
    {
        "id": "28",
        "number": 25,
        "operator": "+"
    },
    {
        "id": "29",
        "number": 26,
        "operator": "+"
    },
    {
        "id": "30",
        "number": 27,
        "operator": "+"
    },
    {
        "id": "52",
        "number": 6,
        "operator": "*"
    },
    {
        "id": "53",
        "number": 7,
        "operator": "*"
    },
    {
        "id": "56",
        "number": 8,
        "operator": "*"
    },
    {
        "id": "60",
        "number": 9,
        "operator": "*"
    },
    {
        "id": "61",
        "number": 11,
        "operator": "*"
    },
    {
        "id": "77",
        "number": 12,
        "operator": "*"
    }
];


$(function() {
    CURRENT_INDEX = 0;
    $("#start-button").hide();
    $("#exercise-details").hide();
    $("#exercise-screen").hide();
    EXERCISES = {};
    var DATA_URL = "https://dl.dropboxusercontent.com/u/33075650/exercises.json";
    // $.getJSON(DATA_URL, function(json) {
        temp = json;
        $.each(json, function(index, exercise) {
            EXERCISES["Exercise " + exercise.id] = exercise;
            $('#exercise').append($('<option>', {
                value: "Exercise " + exercise.id,
                text: "Exercise " + exercise.id
            }));
            $("#exercise-title").text("Exercise " + exercise.id)
        });
        $("#exercise").change(function(eventData) {
            SELECTED_EXERCISE = EXERCISES[$(this).val()];
            $(".operator").text(SELECTED_EXERCISE.operator);
            $(".number").text(SELECTED_EXERCISE.number);
            $("#exercise-details").show();
            $("#start-button").show();
        });
        $("#exercise").prop("selectedIndex", -1);
    // });
    $("#start-button").click(function() {
        SELECTED_EXERCISE.data = shuffle(range(1, 100));
        $("#data-number").text(SELECTED_EXERCISE.data[CURRENT_INDEX]);
        $("#done-count").text(1 + "/" + SELECTED_EXERCISE.data.length);
        $("#exercise-selection").hide();
        $("#exercise-screen").show();
    });
    $(".numkey").click(function() {
        var oldValue = $("#answer-bar").val();
        var newValue = oldValue+""+$(this).text();
        $("#answer-bar").val(newValue);
        $("#answer-bar").css('color', 'black');
    });
    $("#num-backspace").click(function() {
        var oldValue = $("#answer-bar").val();
        var newValue = oldValue.substring(0, oldValue.length-1);
        $("#answer-bar").val(newValue);
    });
    $("#num-submit").click(function() {
        if (checkAnswer()) {
            CURRENT_INDEX = CURRENT_INDEX + 1;
            if (CURRENT_INDEX == SELECTED_EXERCISE.data.length) {
                $("#exercise-selection").show();
                $("#exercise-screen").hide();
            }
            $("#data-number").text(SELECTED_EXERCISE.data[CURRENT_INDEX]);
            $("#answer-bar").val("");
            $("#done-count").text((CURRENT_INDEX+1) + "/" + SELECTED_EXERCISE.data.length)
        } else {
            $("#answer-bar").css("color", "red");
        }
    });
    function checkAnswer() {
        var enteredValue = $("#answer-bar").val();
        var currentData = $("#data-number").text();
        return (parseInt(enteredValue) == eval(currentData+SELECTED_EXERCISE.operator
                    +SELECTED_EXERCISE.number));
    };
});
