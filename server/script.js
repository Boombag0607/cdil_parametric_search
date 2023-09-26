require("dotenv").config();
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("adminForm");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);

        try {
            const response = await fetch(`${process.env.BASE_API_PREFIX}admin/device_params`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log(response);

            if (response.ok) {
                alert("Data successfully submitted!");
                form.reset();
            } else {
                alert("Error: Unable to submit data.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting data.");
        }
    });
});
