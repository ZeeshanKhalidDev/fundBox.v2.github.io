var form = $(".funding__form");
var input = $(".funding__form-amount");
var sumbit = $(".funding__form-button");
var progress = $(".funding__remain-amount");
var donors = $(".funding__donors");
var progressBar = $(".funding__current-progress");
var donorAmount = $(".funding__amount");
var leftDays = $(".funding__days");

var numDonors = 0;
var amountDonated = 0;
var remainAmount;
var goal = 300;
var storedValue = localStorage.getItem('Donation Value2');

$(document).ready(function() {
    // Remaining days
    var end = new Date("2022-03-01"),
        start = new Date(),
        diff = new Date(end - start),
        days = diff / 1000 / 60 / 60 / 24;
    leftDays.text(days.toString().split(".")[0].toLocaleString())

    // Local Storage
    input.val(storedValue.toLocaleString());
    donorAmount.text(storedValue.toLocaleString());
});


form.on("submit", function(e) {
    // Stop form default behavior
    e.preventDefault();

    // Get donation amount
    var donation = parseInt(input.val());
    var percentage;

    amountDonated += donation;

    if (parseInt(amountDonated) <= parseInt(goal)) {
        // Update State
        numDonors += 1;
        percentage = (amountDonated / goal) * 100;

        // Update DOM
        donors.text(numDonors);
        remainAmount = goal - amountDonated;
        progress.text(remainAmount.toLocaleString());
        donorAmount.text(donation.toLocaleString());

        if (amountDonated >= goal) {
            progressBar.css({
                background: "#1cbc2c",
            });
        }
        progressBar.css("width", `${percentage}%`);
        localStorage.setItem("Donation Value2", donation);

    } else {
        amountDonated -= donation;
        alert("Amount should not exceed $300");
    }
});