var footballController = (function() {

    var Team = function(name) {
        this.name = name;
        this.position = 0;
        this.matchesPlayed = 0;
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
        this.points = 0;
    };

    var Match = function(id, date, team1, team2, score1, score2) {
        this.id = id;
        this.date = date;
        this.team1 = team1;
        this.team2 = team2;
        this.score1 = score1;
        this.score2 = score2;
    };

    var data = {
        allTeams: [],
        allMatches: []
    };

    var sortTeams = function() {
        function compare(a,b) {
            if (a.points < b.points)
                return 1;
            if (a.points > b.points)
                return -1;
            return 0;
        }

        data.allTeams.sort(compare);
    };

    var updateTeamsPosition = function() {
        data.allTeams.forEach(function(item, index) {
            item.position = index + 1;
        });
    };

    var sortMatches = function() {
        data.allMatches.sort(function(a, b) {
            if (b.date > a.date)
                return 1;
            if (b.date < a.date)
                return -1;

            if (b.id > a.id)
                return 1;
            if (b.id < a.id)
                return -1;
        });
    };

    var setWin = function(team, points, set = 1) {
        team.matchesPlayed += 1 * set;
        team.wins += 1 * set;
        team.points += points * set;
    };
    var setDraw = function(team, points, set = 1) {
        team.matchesPlayed += 1 * set;
        team.draws += 1 * set;
        team.points += points * set;
    };
    var setLoss = function(team, set = 1) {
        team.matchesPlayed += 1 * set;
        team.losses += 1 * set;
    };

    return {

        tmpGetData: function() {
            return data;
        },

        getTeamAndIndexByName: function(name) {
            var team, index;

            data.allTeams.every(function(item, i) {
                if (name === item.name) {
                    team = item;
                    index = i;
                    return false;
                }
                return true;
            });

            return {team, index};
        },

        getMatchAndIndexByID: function(id) {
            var match, index;

            data.allMatches.every(function(item, i) {
                if (parseInt(id) === item.id) {
                    match = item;
                    index = i;
                    return false;
                }
                return true;
            });

            return {match, index};
        },

        createTeam: function(name) {
            return new Team(name);
        },

        addTeam: function(team) {
                data.allTeams.push(team);
        },

        removeTeam: function(teamIndex) {

            data.allTeams.splice(teamIndex, 1);
        },

        teamExists: function(name) {
            var teamsNames = data.allTeams.map(function(team) {
                return team.name;
            });

            return teamsNames.includes(name);
        },

        createMatch: function(matchInput) {
            var mi = matchInput;

            var id;
            if (data.allMatches.length > 0) {
                id = data.allMatches[0].id + 1;
            } else {
                id = 1;
            }
            
            return new Match(id, mi.matchDate, mi.team1, mi.team2, mi.teamScore1, mi.teamScore2);
        },

        addMatch: function(match) {
            data.allMatches.push(match);
        },

        removeMatch: function(matchIndex) {
            data.allMatches.splice(matchIndex, 1);
        },

        getAllMatches: function() {
            return data.allMatches;
        },

        getAllTeams: function() {
            return data.allTeams;
        },

        updateTeamsStats: function(match, unSet) {
            var team1 = this.getTeamAndIndexByName(match.team1).team;
            var team2 = this.getTeamAndIndexByName(match.team2).team;
            if (!team1 || !team2)
                return;
            var score1 = match.score1;
            var score2 = match.score2;

            unSet = unSet ? -1 : 1;

            if (score1 > score2) {
                setWin(team1, 3, unSet);
                setLoss(team2, unSet);
            } else if ( score1 < score2) {
                setWin(team2, 3, unSet);
                setLoss(team1, unSet);
            } else {
                setDraw(team1, 1, unSet);
                setDraw(team2, 1, unSet);
            }

        },

        updateLists: function() {
            sortTeams();
            updateTeamsPosition();
            sortMatches();
        },

        saveDataToLocalStorage: function() {
            localStorage.footballAppData = JSON.stringify(data);
        },

        loadDataFromLocalStorage: function() {
            if (localStorage.footballAppData) {
                data = JSON.parse(localStorage.footballAppData);
            }
        },

        clearLocalStorage: function() {
            localStorage.removeItem("footballAppData");
            data = {
                allMatches: [],
                allTeams: []
            };
        }

    };
})();



var UIController = (function() {
    
    var DOMElements = {
        addTeamBtn: '#add-team-btn',
        addTeamInput: '#add-team-field',
        addMatchBtn: '#add-match-btn',
        table: '.table-list',
        teamSelect1: '#team-select-1',
        teamSelect2: '#team-select-2',
        teamScore1: '#score-1',
        teamScore2: '#score-2',
        matchDate: '#match-date',
        matchList: '.match-list',
        bannerTeam1: '#team-1',
        bannerTeam2: '#team-2',
        bannerResult: '.last-match-score',
        bannerTitle: '.last-match-title'
    };

    return {

        getTeamInput: function() {
            return document.querySelector(DOMElements.addTeamInput).value;
        },

        getMatchInput: function() {
            return {
                team1: document.querySelector(DOMElements.teamSelect1).value,
                team2: document.querySelector(DOMElements.teamSelect2).value,
                teamScore1: document.querySelector(DOMElements.teamScore1).value,
                teamScore2: document.querySelector(DOMElements.teamScore2).value,
                matchDate: document.querySelector(DOMElements.matchDate).value
            }
        },

        getDOMElements: function() {
            return DOMElements;
        },

        addTeamsToOptions: function(teams) {

            teams.forEach(function(team) {
                var teamHtmlSelect = '<option value="Value" >Name</option>';

                teamHtmlSelect = teamHtmlSelect.replace('Value', team.name);
                teamHtmlSelect = teamHtmlSelect.replace('Name', team.name);
                document.querySelector(DOMElements.teamSelect1).insertAdjacentHTML('beforeend', teamHtmlSelect);
                document.querySelector(DOMElements.teamSelect2).insertAdjacentHTML('beforeend', teamHtmlSelect);

            });

        },

        addTeam: function(team) {
            var teamHtmlDiv = '<div class="table-item" id="item-name"><div class="item-pos">Position</div><div>ClubName</div><div class="item-mp">MatchesPlayed</div><div class="item-win">Wins</div><div class="item-draw">Draws</div><div class="item-losses">Losses</div><div class="item-pts">Points</div><div class="table-item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div>';

            teamHtmlDiv = teamHtmlDiv.replace('Position', team.position);
            teamHtmlDiv = teamHtmlDiv.replace('item-name', team.name);
            teamHtmlDiv = teamHtmlDiv.replace('ClubName', team.name);
            teamHtmlDiv = teamHtmlDiv.replace('MatchesPlayed', team.matchesPlayed);
            teamHtmlDiv = teamHtmlDiv.replace('Wins', team.wins);
            teamHtmlDiv = teamHtmlDiv.replace('Draws', team.draws);
            teamHtmlDiv = teamHtmlDiv.replace('Losses', team.losses);
            teamHtmlDiv = teamHtmlDiv.replace('Points', team.points);

            document.querySelector(DOMElements.table).insertAdjacentHTML('beforeend', teamHtmlDiv);
        },

        addMatch: function(match) {
            var matchHtmlDiv = '<div class="table-item" id="Match-ID"><div>Date</div><div>Team1</div><div>Score1 : Score2</div><div>Team2</div><div class="table-item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div>';

            matchHtmlDiv = matchHtmlDiv.replace('Match-ID', 'match-' + match.id);
            matchHtmlDiv = matchHtmlDiv.replace('Date', match.date);
            matchHtmlDiv = matchHtmlDiv.replace('Team1', match.team1);
            matchHtmlDiv = matchHtmlDiv.replace('Score1', match.score1);
            matchHtmlDiv = matchHtmlDiv.replace('Score2', match.score2);
            matchHtmlDiv = matchHtmlDiv.replace('Team2', match.team2);

            document.querySelector(DOMElements.matchList).insertAdjacentHTML('beforeend', matchHtmlDiv);
        },

        updateBanner: function(match) {
            document.querySelector(DOMElements.bannerTeam1).innerHTML = match.team1;
            document.querySelector(DOMElements.bannerTeam2).innerHTML = match.team2;
            document.querySelector(DOMElements.bannerResult).innerHTML = match.score1 + " : " + match.score2;
        },

        clearList: function(htmlElement) {
            htmlElement = document.querySelector(htmlElement);
            while (htmlElement.childNodes.length > 2) {
                htmlElement.removeChild(htmlElement.lastChild);
            }
        },

        clearBanner: function() {
            document.querySelector(DOMElements.bannerTeam1).innerHTML = ". . .";
            document.querySelector(DOMElements.bannerTeam2).innerHTML = ". . .";
            document.querySelector(DOMElements.bannerResult).innerHTML = ". . .";
        }

    };
})();



var controller = (function(UICtrl, fbCtrl) {

    var setEvtListeners = function() {
        var doms = UICtrl.getDOMElements();

        document.querySelector(doms.addTeamBtn).addEventListener('click', addTeam);
        document.querySelector(doms.addMatchBtn).addEventListener('click', addMatch);
        document.addEventListener('keypress', function(evt) {
            if (evt.keyCode === 13 && document.querySelector(doms.addTeamInput) === document.activeElement) {
                addTeam();
            } else if (evt.keyCode === 13) {
                addMatch();
            }
        });

        document.querySelector(doms.matchList).addEventListener('click', deleteMatch);
        document.querySelector(doms.table).addEventListener('click', deleteTeam);

    };

    var deleteTeam = function(evt) {
        var teamName = evt.target.parentNode.parentNode.parentNode.id;
        if (teamName && confirm("Do you really want to delete the team?")) {

            var teamWrap = fbCtrl.getTeamAndIndexByName(teamName);
            fbCtrl.removeTeam(teamWrap.index);
            updateUI();
            fbCtrl.saveDataToLocalStorage();         
        }
    };

    var deleteMatch = function(evt) {
        var matchID = evt.target.parentNode.parentNode.parentNode.id;
        matchID = matchID.split("-")[1];

        if (matchID && confirm("Do you really want to delete the match?")) {
            var matchWrap = fbCtrl.getMatchAndIndexByID(matchID);
            fbCtrl.updateTeamsStats(matchWrap.match, true);
            fbCtrl.removeMatch(matchWrap.index);
            updateUI();
            fbCtrl.saveDataToLocalStorage();
        }
        
    };

    var addTeam = function() {

        var teamName = UICtrl.getTeamInput();

        if (teamName === "clear") {
            if (confirm("This operation will remove all data. Do you want to continue?")) {
                fbCtrl.clearLocalStorage();
            }
        } else if (teamName === "") {
            alert("Name can't be blank.");
        } else if (fbCtrl.teamExists(teamName)) {
            alert("That team already exists.");
        } else {
            var newTeam = fbCtrl.createTeam(teamName);
            fbCtrl.addTeam(newTeam);
            fbCtrl.saveDataToLocalStorage();
        }

        updateUI();
    };

    var addMatch = function() {
        var mInput = UICtrl.getMatchInput();

        for (var key in mInput) {
            if (mInput[key] === "") {
                alert("Enter data.");
                return;
            }
        }
        if (mInput.team1 === mInput.team2) {
            alert("Choose another team.");
            return;
        }

        var newMatch = fbCtrl.createMatch(mInput);
        fbCtrl.addMatch(newMatch);
        fbCtrl.updateTeamsStats(newMatch);

        fbCtrl.saveDataToLocalStorage();
        updateUI();
    };

    var updateUI = function() {
        var doms = UICtrl.getDOMElements();

        fbCtrl.updateLists();
        UICtrl.clearList(doms.table);
        UICtrl.clearList(doms.matchList);

        var teams = fbCtrl.getAllTeams();
        var matches = fbCtrl.getAllMatches();

        if (matches.length > 0) {
            UICtrl.updateBanner(matches[0]);
        }

        teams.forEach(function(team) {
            UICtrl.addTeam(team);
        });
        UICtrl.clearList(UICtrl.getDOMElements().teamSelect1);
        UICtrl.clearList(UICtrl.getDOMElements().teamSelect2);
        UICtrl.addTeamsToOptions(fbCtrl.getAllTeams());
        
        matches.forEach(function(match) {
            UICtrl.addMatch(match);
        });

        document.querySelector(doms.addTeamInput).value = "";
    }

    return {

        initialize: function() {
            setEvtListeners();
            UICtrl.clearBanner();
            fbCtrl.loadDataFromLocalStorage();
            updateUI();
        }

    };
})(UIController, footballController);

controller.initialize();