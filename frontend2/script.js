async function getJournalPrompt() {

    const mood = document.getElementById("mood").value;

    const result = document.getElementById("result");

    if (!mood) {
        result.innerText = "Please select your mood.";
        return;
    }

    result.innerText = "Generating your journal prompt...";

    try {

        const response = await fetch(
            "http://localhost:5000/journal-prompt",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    mood: mood
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            result.innerText = data.error;
            return;
        }

        result.innerHTML = `
            <h3>Your Journal Prompt ✨</h3>
            <p>${data.journalPrompt}</p>
        `;

    } catch (error) {

        console.error(error);

        result.innerText =
            "Could not connect to the server.";

    }
}