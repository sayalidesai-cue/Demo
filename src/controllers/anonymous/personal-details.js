
const { User, sequelize } = require('../../db/db-connection').db;

const personalDetails = async (data, t) => {
    let result = await createOrUpdate(data, t);

    return { result };

}

async function createOrUpdate(data, t) {
    if (data.id) {
        return await updatePersonalDetails(data);
    } else {
        return await createPersonalDetails(data);
    }
}

async function updatePersonalDetails(data) {
        const updatedData = {
            firstName: data.firstName,
            lastName: data.lastName
        };
        const user = await User.findOne({ where: { id: data.id } })
        const numberOfAffectedRows = await user.update(updatedData, { where: { id: data.id } });
        return await numberOfAffectedRows;
    }


    async function createPersonalDetails(data) {
        const payload = data;
        try {                 
            const result =  await User.create(
                        {
                            firstName: payload.firstName,
                            lastName: payload.lastName,
                            username: payload.username,
                            email: payload.email,
                            createdBy: 0,
                            updatedBy: 0,
                            password: payload.password
                        }
                    );                 

            if (result) {
                return { result };
            }
        } catch (error) {
            throw error;
        }
    }
   



module.exports = { personalDetails }