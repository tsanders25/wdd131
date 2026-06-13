document.addEventListener("DOMContentLoaded", () => {
    const teamInput = document.getElementById("team-name");
    const createTeamBtn = document.getElementById("add-team-btn");
    const listElement = document.getElementById("list");

    let allTeams = getTeamsList() || [];
    console.log({ allTeams })

    allTeams.forEach(team => {
        if (team) {
            displayList(team);
        }
    });

    createTeamBtn.addEventListener("click", () => {
        const userTypedName = teamInput.value.trim();
        if (userTypedName === "") {
            alert("Please input team name!")
            return
        }

        const uniqueTeam = {
            id: Date.now(),
            name: userTypedName,
            players: []
        };

        allTeams.push(uniqueTeam);

        setTeamList();
        displayList(uniqueTeam);
        teamInput.value = "";
        teamInput.focus();
    });

    function displayList(teamObject) {
        let li = document.createElement("li");

        let nameText = document.createTextNode(teamObject.name);
        li.appendChild(nameText);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete");

        li.appendChild(deleteButton);
        /*---creates and appends team memembers---*/
        let playerListUI = document.createElement("ul");
        playerListUI.classList.add("player-list");

        if (teamObject.players) {
            teamObject.players.forEach(savedPlayerName => {
                let playerLi = document.createElement("li");
                playerLi.textContent = savedPlayerName;

                let playerDeleteBtn = document.createElement("button");
                playerDeleteBtn.textContent = "❌";
                playerDeleteBtn.classList.add("delete-player");

                playerDeleteBtn.addEventListener("click", function () {
                    playerListUI.removeChild(playerLi);
                    teamObject.players = teamObject.players.filter(name => name !== savedPlayerName);
                    setTeamList();

                });

                playerLi.appendChild(playerDeleteBtn);
                playerListUI.appendChild(playerLi);
            });
        }

        let playerInput = document.createElement("input");
        playerInput.type = "text";
        playerInput.placeholder = "Player name... ";

        let addPlayerBtn = document.createElement("button");
        addPlayerBtn.textContent = "Add Player";

        li.appendChild(playerInput);
        li.appendChild(addPlayerBtn);
        li.appendChild(playerListUI);

        addPlayerBtn.addEventListener("click", () => {
            const playerName = playerInput.value.trim();

            if (playerName === "") {
                alert("Please input a player name!");
                return
            }

            if (!teamObject.players) {
                teamObject.players = [];
            }

            teamObject.players.push(playerName);

            setTeamList();

            let playerLi = document.createElement("li");
            playerLi.textContent = playerName;

            let playerDeleteBtn = document.createElement("button");
            playerDeleteBtn.textContent = "❌";
            playerDeleteBtn.classList.add("delete-player");

            playerDeleteBtn.addEventListener("click", function () {
                playerListUI.removeChild(playerLi);
                teamObject.players = teamObject.players.filter(name => name !== playerName);
                setTeamList();
            });

            playerLi.appendChild(playerDeleteBtn);
            playerListUI.appendChild(playerLi);

            playerInput.value = "";
            playerInput.focus();
        });


        listElement.appendChild(li);

        deleteButton.addEventListener("click", function () {
            listElement.removeChild(li);
            deleteTeam(teamObject.id);
        });
    }

    function setTeamList() {
        localStorage.setItem("currentTeamsPlaying", JSON.stringify(allTeams));
    }

    function getTeamsList() {
        return JSON.parse(localStorage.getItem("currentTeamsPlaying"));
    }

    function deleteTeam(teamId) {
        allTeams = allTeams.filter(team => team.id !== teamId);

        setTeamList();
    }
    /* --- js / game - logic.js-- - */

    // 1. Reveal Answer Logic
    function revealAnswer() {
        const answerArea = document.getElementById('answerArea');
        answerArea.classList.remove('hidden'); // Removes the 'hidden' class to show text
    }

    // 2. Next Question Logic
    function nextQuestion() {
        // For now, this just alerts us. 
        // Soon, this will pull the next row from your spreadsheet!
        alert("Moving to the next question...");
    }

    // 3. Close Game Logic
    function closeGame() {
        document.getElementById('questionOverlay').classList.add('hidden');
    }

    // This will hold the questions for the current chapter
    let currentQuestions = [];
    let currentIndex = 0;

    // Function to start a game with a specific set of questions
    function startGame(questions) {
        currentQuestions = questions;
        currentIndex = 0;

        // Show the full-screen overlay
        document.getElementById('questionOverlay').classList.remove('hidden');
        updateQuestionDisplay();
    }

    function updateQuestionDisplay() {
        const q = currentQuestions[currentIndex];
        document.getElementById('questionText').innerText = q.Question;
        document.getElementById('answerText').innerText = q.Answer;
        document.getElementById('noteText').innerText = q.Note || "";

        // Update counter (Point 7)
        const remaining = currentQuestions.length - (currentIndex + 1);
        document.getElementById('questionCounter').innerText = `Questions left: ${remaining}`;

        // Hide answer area for the new question
        document.getElementById('answerArea').classList.add('hidden');
    }

    function revealAnswer() {
        document.getElementById('answerArea').classList.remove('hidden');
    }

    function nextQuestion() {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            updateQuestionDisplay();
        } else {
            alert("Chapter Complete!");
            closeGame();
        }
    }

    function closeGame() {
        document.getElementById('questionOverlay').classList.add('hidden');
    }
});