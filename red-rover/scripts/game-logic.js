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

    let currentQuestions = [];
    let currentIndex = 0;

    // Function to start a game with a specific set of questions
    function startGame(questions) {
        currentQuestions = questions;
        currentIndex = 0;

        if (questions.length === 0) {
            alert("You need questions to play!")
        }

        document.getElementById('questionOverlay').classList.remove('hidden');
        updateQuestionDisplay();
    }

    function updateQuestionDisplay() {
        pickCompetitors();

        const q = currentQuestions[currentIndex];
        document.getElementById('questionText').innerText = q.Question;
        document.getElementById('answerText').innerText = q.Answer;
        document.getElementById('noteText').innerText = q.Note || "";

        const remaining = currentQuestions.length - (currentIndex + 1);
        document.getElementById('questionCounter').innerText = `Questions left: ${remaining}`;

        document.getElementById('answerArea').classList.add('hidden');
    }

    function revealAnswer() {
        document.getElementById('answerArea').classList.remove('hidden');
    }

    function nextQuestion() {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            updateQuestionDisplay();
            checkWinConditions();
        } else {
            showResults();
        }
    }

    function closeGame() {
        document.getElementById('questionOverlay').classList.add('hidden');
    }

    const beginGameBtn = document.getElementById("begin-game-btn");


    beginGameBtn.addEventListener("click", () => {
        const rawData = JSON.parse(localStorage.getItem("activeGameData")) || [];

        const gameDeck = rawData.map(item => {
            const parts = item.split(" | ");
            return {
                Question: parts[0] ? parts[0].replace("Q: ", "") : "Missing Question",
                Answer: parts[1] ? parts[1].replace("A: ", "") : "Missing Answer"
            };
        });

        if (gameDeck.length > 0) {
            startGame(gameDeck);
        } else {
            alert("No questions found! Please go back and select a study buddy!")
        }
    });

    document.getElementById("reveal-btn").addEventListener("click", revealAnswer);
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    document.getElementById("close-btn").addEventListener("click", closeGame);
    document.getElementById("player1Display").addEventListener("click", () => transferPlayer(0));
    document.getElementById("player2Display").addEventListener("click", () => transferPlayer(1));

    let currentCompetitors = { team1Player: "", team2Player: "" };

    function pickCompetitors() {
        if (allTeams.length < 2) {
            alert("Please select atleast two teams!")
            return;
        }

        const team1 = allTeams[0];
        const team2 = allTeams[1];
        
        if (team1.players.length > 0 && team2.players.length > 0) {
            const p1Index = Math.floor(Math.random() * team1.players.length);
            currentCompetitors.team1Player = team1.players[p1Index];


            const p2Index = Math.floor(Math.random() * team2.players.length);
            currentCompetitors.team2Player = team2.players[p2Index];

            document.getElementById("player1Display").innerText = `${team1.name}: ${currentCompetitors.team1Player}`;
            document.getElementById("player2Display").innerText = `${team2.name}: ${currentCompetitors.team2Player}`;
        }
        else {

            document.getElementById("player1Display").innerText = "Team empty!";
            document.getElementById("player2Display").innerText = "Team empty!";
        }
    }

    function checkWinConditions() {
        const team1 = allTeams[0];
        const team2 = allTeams[1];

        const team1Out = team1.players.length === 0;
        const team2Out = team2.players.length === 0;

        if (team1Out || team2Out) {
            showResults();
        }
    }

    function transferPlayer(winnerTeamIndex) {
        const loserTeamIndex = winnerTeamIndex === 0 ? 1 : 0;
        const winningTeam = allTeams[winnerTeamIndex];
        const losingTeam = allTeams[loserTeamIndex];

        const loserName = loserTeamIndex === 0 ? currentCompetitors.team1Player : currentCompetitors.team2Player;
        if (!losingTeam.players.includes(loserName)) return;

        losingTeam.players = losingTeam.players.filter(p => p !== loserName);
        winningTeam.players.push(loserName);

        setTeamList();

        const isGameOver = losingTeam.players.length === 0;

        if (isGameOver) {
            showResults();
            return
        } else {
        
            alert(`${loserName} has been captured be ${winningTeam.name}!`);
            checkWinConditions();

            listElement.innerHTML = "";
            allTeams.forEach(team => displayList(team));

            nextQuestion();
        }
    }

    function showResults() {
        const team1 = allTeams[0];
        const team2 = allTeams[1];
        let winnerText = "";

        document.getElementById("questionOverlay").classList.add("hidden");
        document.getElementById("resultsOverlay").classList.remove("hidden");

        if (team1.players.length > team2.players.length) {
            winnerText = `${team1.name} Wins!`;
        } else if (team2.players.length > team1.players.length) {
            winnerText = `${team2.name} Wins!`;
        } else {
            winnerText = "It's a Draw!";

        }

        document.getElementById("winMessage").innerText = winnerText;
        document.getElementById("finalScore").innerText = `${team1.name}: ${team1.players.length} | ${team2.name}: ${team2.players.length}`;

    }

});
    
/*Get Dates*/
const currentyear = document.querySelector("#currentyear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

lastmodified = document.getElementById("lastModified").innerHTML = document.lastModified;

/*hamburger button*/

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation")

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});