const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const cors = require('cors')

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});

app.get('/', (request, response) => {
  response.send('healthy');
});

app.post('/round', (req, res) => {
    const roundInfo = req.body;
  const draftList = roundInfo.picks.reduce((html, pick) => {
    return html + `<p>Owner: ${pick.owner} ${pick.position}: ${pick.name} Round: ${pick.round} Pick: ${pick.pick}</p>`
  }, '');

  const mailOptions = {
    from: 'patrickmc21@gmail.com',
    to: 'patrickmcdfw@yahoo.com',
    subject: 'Draft info',
    html: `
      <div>
        <h1>Round ${roundInfo.round}:</h1>
          ${draftList}
      </div>
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});

app.post('/team', (req, res) => {
  const team = req.body;
  const mailOptions = {
    from: 'patrickmc21@gmail.com',
    to: 'patrickmcdfw@yahoo.com',
    subject: 'Team info',
    html: `
      <div>
        <h1>My Team:</h1>
          <p>QB: ${team.QB.name} Round: ${team.QB.round} Pick: ${team.QB.pick}</p>
          <p>RB: ${team.RB1.name} Round: ${team.RB1.round} Pick: ${team.RB1.pick} </p>
          <p>RB: ${team.RB2.name} Round: ${team.RB2.round} Pick: ${team.RB2.pick}</p>
          <p>WR: ${team.WR1.name} Round: ${team.WR1.round} Pick: ${team.WR1.pick}</p>
          <p>WR: ${team.WR2.name} Round: ${team.WR2.round} Pick: ${team.WR2.pick}</p>
          <p>TE: ${team.TE.name} Round: ${team.TE.round} Pick: ${team.TE.pick}</p>
          <p>FLEX: ${team.FLEX.name} Round: ${team.FLEX.round} Pick: ${team.FLEX.pick}</p>
          <p>DST: ${team.DST.name} Round: ${team.DST.round} Pick: ${team.DST.pick}</p>
          <p>K: ${team.K.name} Round: ${team.K.round} Pick: ${team.K.pick}</p>
          <p>BE: ${team.BE1.name} Round: ${team.BE1.round} Pick: ${team.BE1.pick}</p>
          <p>BE: ${team.BE2.name} Round: ${team.BE2.round} Pick: ${team.BE2.pick}</p>
          <p>BE: ${team.BE3.name} Round: ${team.BE3.round} Pick: ${team.BE3.pick}</p>
          <p>BE: ${team.BE4.name} Round: ${team.BE4.round} Pick: ${team.BE4.pick}</p>
          <p>BE: ${team.BE5.name} Round: ${team.BE5.round} Pick: ${team.BE5.pick}</p>
          <p>BE: ${team.BE6.name} Round: ${team.BE6.round} Pick: ${team.BE6.pick}</p>
          <p>BE: ${team.BE7.name} Round: ${team.BE7.round} Pick: ${team.BE7.pick}</p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


});

app.post('/draft', (req, res) => {
  const draft = req.body;
  const draftList = draft.reduce((html, pick) => {
    return html + `<p>${pick.position}: ${pick.name} Round: ${pick.round} Pick: ${pick.pick}</p>`
  }, '');
  const draftByOwner = draft.reduce((htmlObj, pick) => {
    if (!htmlObj[pick.owner]) {
      htmlObj[pick.owner] = `<h3>${pick.owner}:</h3>`;
    }
    htmlObj[pick.owner] += `<p>${pick.position}: ${pick.name} Round: ${pick.round} Pick: ${pick.pick}</p>`;
    return htmlObj;
  }, {});

  const draftByOwnerHTML = Object.keys(draftByOwner).reduce((html, owner) => {
    return html + draftByOwner[owner];
  },'');


  const mailOptions = {
    from: 'patrickmc21@gmail.com',
    to: 'patrickmcdfw@yahoo.com',
    subject: 'Draft info',
    html: `
      <div>
        <h1>Draft By Pick:</h1>
          ${draftList}
      </div>
      <div>
        <h1>Draft By Owner:</h1>
          ${draftByOwnerHTML}
      </div>
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`);
});

