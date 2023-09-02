const {Publisher} = require ("../db")  

const allPublisher = async () => {
    return await Publisher.findAll()
}

export default allPublisher