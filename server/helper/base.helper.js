const _ = require('lodash');
const { strings } = require('../utils/strings');

class BaseHelper {
    constructor(model) {
        this.model = model;
    }

    async getAllObjectCount(filters) {
        try {
            const query = filters.query ? filters.query : {};
            return await this.model.countDocuments(query);
        } catch (error) {
            throw error;
        }
    }

    async getObjectByQuery(filters) {
        try {
            return await this.model
                .findOne(filters.query)
                .select(_.isEmpty(filters.selectFrom) ? {} : filters.selectFrom)
                .lean()
                .exec();
        } catch (error) {
            throw error;
        }
    }

    async getAllObjects(filters) {
        try {
            const query = filters.query ? filters.query : {};
            const selectFrom = filters.selectFrom ? filters.selectFrom : {};
            const sortBy = filters.sortBy ? filters.sortBy : { _id: -1 };
            const pageNum = filters.pageNum ? filters.pageNum : 1;
            const pageSize = filters.pageSize ? filters.pageSize : 50;
            const populatedQuery = filters.populatedQuery ? filters.populatedQuery : null;
            if (populatedQuery) {
                return await this.model
                    .find(query)
                    .select(selectFrom)
                    .sort(sortBy)
                    .skip((pageNum - 1) * pageSize)
                    .limit(parseInt(pageSize))
                    .populate(populatedQuery)
                    .lean()
                    .exec();
            } else {
                return await this.model
                    .find(query)
                    .select(selectFrom)
                    .sort(sortBy)
                    .skip((pageNum - 1) * pageSize)
                    .limit(parseInt(pageSize))
                    .lean()
                    .exec();
            }
        } catch (error) {
            throw error;
        }
    }

    async addObject(obj) {
        try {
            const objectModel = new this.model(obj);
            return await objectModel.save();
        } catch (error) {
            throw error;
        }
    }

    async updateObject(objectId, updateObject) {
        try {
            const object = await this.model.findById(objectId);
            if (!object) {
                throw new Error(strings.not_found);
            }
            for (let prop in updateObject) {
                object[prop] = updateObject[prop];
            }
            return await object.save();
        } catch (error) {
            throw error;
        }
    }

    async deleteObjectById(objectId) {
        try {
            return await this.model.findOneAndDelete(objectId);
        } catch (error) {
            throw error;
        }
    }

    async aggregate(steps) {
        try {
            return await this.model.aggregate(steps).exec();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = BaseHelper;