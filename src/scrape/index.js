const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});
const fs = require('fs');

getPlayerData();

function getPlayerData() {
  nightmare
  .goto('http://www.espn.com/fantasy/football/story/_/page/18RanksPreseason300PPR/2018-fantasy-football-ppr-rankings-top-300')
  .evaluate(() => {
    const players = [];
    const table = document.querySelectorAll('.inline-table');
    const tableRows = [...table[2].querySelectorAll('tr')];
    tableRows.shift();
    tableRows.forEach(row => {
      const tds = [...row.querySelectorAll('td')];
      const player = tds.reduce((acc, td, i) => {
        switch (i) {
          case 0:
            const nameRank = td.innerText;
            const split= nameRank.split(' ');
            const rank = split.shift();
            const splitRank = rank.split('');
            splitRank.pop();
            acc.rank = parseInt(splitRank.join(''));
            acc.name = split.join(' ');
            break;
          case 1:
            acc.position = td.innerText;
            break;
          case 2:
            acc.team = td.innerText;
            break;
          case 3:
            acc.posRank = td.innerText;
            break;
          default:
            break;
        }
        return acc;
      }, {rank: null, name: '', position: '', team: '', posRank: ''});
      players.push(player);
    })
    return players;
  })
  .end()
  .then(players => {
    console.log(players)

    fs.writeFile('./players-data.json', JSON.stringify(players), 'utf8',
      error => {
        if (error) {
          return console.log(error);
        }
      }
    );
  })
  .catch(err => console.log(err))
};

