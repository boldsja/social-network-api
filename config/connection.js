const { connect, connection } = require('mongoose');


mongoose.connect('mongodb://localhost:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
