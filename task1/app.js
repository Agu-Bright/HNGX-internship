require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

function getUtcTimeWithValidation(date, range) {
  //calculate the minimum and maximum valid time
  const minimumTime = new Date();
  minimumTime.setUTCHours(minimumTime.getUTCHours() - range);

  const maximumTime = new Date();
  maximumTime.setUTCHours(maximumTime.getUTCHours() + range);

  if (range >= minimumTime && range <= maximumTime) {
    console.log(date);
    return date.toISOString();
  } else {
    return date.toISOString();
  }
}
function getDayString(num) {
  switch (num) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";

      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  return day;
}

//http://example.com/api?slack_name=example_name&track=backend.
app.get(`/api`, async (req, res) => {
  const { slack_name, track } = req.query;
  let date = new Date();

  //get day and convert to string
  const day = getDayString(Number(date.getDay()));

  //get UTC time and check if its within the valid range
  const utcTime = getUtcTimeWithValidation(date, 2);
  console.log(utcTime);

  res.status(200).json({
    slack_name: slack_name,
    current_day: day,
    utc_time: utcTime,
    track: track,
    github_file_url: "",
    github_repo_url: "",
    status_code: 200,
  });
});

app.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}`);
});
