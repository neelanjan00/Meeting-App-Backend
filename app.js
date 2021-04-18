const express = require('express')
const mongoose = require('mongoose')
const app = express()
const meetings = require('./models/meetings')
const cors = require('cors')

const dbURL = `mongodb+srv://neelanjanmanna:meetingappdb1234@meetingapp.awova.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(dbURL, connectionParams).then(() => {
  console.log('Connected to database ')
}).catch(err => {
  console.error(`Error connecting to the database. \n${err}`);
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/meetings', async (req, res) => {
  try {
    const allMeetings = await meetings.find()
    res.status(201).json(allMeetings)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

app.post('/create-meeting', async (req, res) => {
  const meeting = new meetings({
    meetingName: req.body.meetingName,
    numberOfPeopleAttending: req.body.numberOfPeopleAttending,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  })

  try {
    const newMeeting = await meeting.save()
    res.status(201).json(newMeeting)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

app.delete('/delete-meeting/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedMeeting = await meetings.findByIdAndDelete(_id)
    res.status(201).json(deletedMeeting)
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

app.listen(process.env.PORT || 5000, () => console.log(`Server listening at port: ${process.env.PORT || 5000}`))
