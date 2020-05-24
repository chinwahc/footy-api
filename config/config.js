exports.PORT = process.env.PORT || 8080

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3001'

exports.DB_URL = process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : 'mongodb+srv://chinwahc:Chelsea4life@footy-db-ss1aq.mongodb.net/test?retryWrites=true&w=majority'
