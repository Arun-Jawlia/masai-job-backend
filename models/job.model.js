const mongoose= require('mongoose');

const jobScheme = mongoose.Schema({
    company: {type: 'string', required: true},
    position: {type: 'string', required: true},
    contract: {type: 'string', required: true},
    location: {type: 'string', required: true}
})

const JobModel = mongoose.model('masaijobs', jobScheme)
module.exports={
    JobModel
}