import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// Set the default time zone to UTC
dayjs.utc()

export default dayjs
