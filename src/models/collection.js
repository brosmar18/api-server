'use strict';

class Collection {
    constructor(model) {
        this.model = model;
    }

    async create(json) {
        try {
            const record = await this.model.create(json);
            return record;
        } catch (e) {
            console.error('error in the collection interface');
            return e;
        }
    }

    async read(id = null) {
        try {
            if (!id) {
                const records = await this.model.findAll();
                return records;
            } else {
                const singleRecord = await this.model.findByPk(id);
                return singleRecord;
            }
        } catch (e) {
            console.error('error in the collection interface');
            return e;
        }
    }

    async update(id, json) {
        try {
            const recordToUpdate = await this.model.findByPk(id);
            if (recordToUpdate) {
                await recordToUpdate.update(json);
                return recordToUpdate; // Return the updated record
            } else {
                throw new Error('Record not found');
            }
        } catch (e) {
            console.error('error in the collection interface');
            return e;
        }
    }

    async delete(id) {
        try {
            const result = await this.model.destroy({
                where: {
                    id: id
                }
            });
            if (result) {
                return { message: 'Record deleted successfully' }; 
            } else {
                throw new Error('Record not found or not deleted');
            }
        } catch (e) {
            console.error('error in the collection interface');
            return e;
        }
    }
}

module.exports = Collection;
