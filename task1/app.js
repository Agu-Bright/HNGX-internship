require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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
  const formattedUtcTime = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}T${date
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}Z`;

  res.status(200).json({
    slack_name: slack_name,
    current_day: day,
    utc_time: formattedUtcTime,
    track: track,
    github_file_url:
      "https://github.com/Agu-Bright/HNGX-internship/blob/main/task1/app.js",
    github_repo_url:
      "https://github.com/Agu-Bright/HNGX-internship/tree/main/task1",
    status_code: 200,
  });
});

app.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}`);
});
