const Datebook = require('datebook');
const { GoogleCalendar } = Datebook;

const createEvent =  async (req, res) => {
    const options = {
        title: 'Happy Hour',
        location: 'The Bar, New York, NY',
        description: 'Let\'s blow off some steam with a tall cold one!',
        start: new Date('2023-04-07T01:00:00'),
        end: new Date('2023-04-07T01:30:00'),
        recurrence: {
          frequency: 'WEEKLY',
          interval: 2
        }
    }
      
    try{
        const googleCalendar = new GoogleCalendar(options)
        return res.status(200).json({
            'message':"success",
            "googleCalendar": googleCalendar.render()
        });

    } catch (error) {
        return res.status(500).json({
            'message':error
        });
    }

}

module.exports = {
    createEvent
}

