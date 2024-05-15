const { validate } = require("../models/resource.model");
const resourceRepo = require("../repositories/resource.repository");
function getAllAndCount() {}
async function getAll() {
  let appStatus, appData, appMessage, appCode;
  try {
    let resourceList = await resourceRepo.getAll();
    appStatus = true;
    appCode = 200;
    appMessage = `Resource Fetch Successfully`;
    appData = resourceList;
  } catch (error) {
    console.log(error);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
}
async function getById(id) {
  let appStatus, appData, appMessage, appCode;
  try {
    let resource = await resourceRepo.getById(id);
    if (!resource) {
      appStatus = false;
      appCode = 404;
      appMessage = `Resource With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Resource Details With the given id ${id}.`;
      appData = resource;
    }
  } catch (err) {
    console.log(err);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
    appData = null;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
}
async function getByFields(fields) {
  let appStatus, appData, appMessage, appCode;
  try {
    let resource = await resourceRepo.getByFields(fields);
    if (!resource) {
      appStatus = false;
      appCode = 404;
      appMessage = `Resource With the given id ${fields._id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Resource Details With the given id ${fields._id}.`;
      appData = resource;
    }
  } catch (err) {
    console.log(err);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
    appData = null;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
}
async function save(data) {
  let appStatus, appData, appMessage, appCode;
  const { error } = validate(data);
  try {
    if (error) {
      appStatus = false;
      appCode = 400;
      appMessage = error.details[0].message;
      appData = null;
    } else {
      let resource = await resourceRepo.getByFields({
        name: data.name,
      });
      if (resource) {
        appStatus = true;
        appCode = 400;
        appMessage = `Resource Already Created`;
        appData = null;
      } else {
        let newResource = await resourceRepo.save(data);
        appStatus = true;
        appCode = 201;
        appMessage = `Resource Created Successfully`;
        appData = newResource;
      }
    }
  } catch (err) {
    console.log(err);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
    appData = null;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
}
function create(data) {}
async function update(id, data) {
  let appStatus, appData, appMessage, appCode;
  const { error } = validate(data);
  try {
    let resource = await resourceRepo.update(id, data);
    if (!resource) {
      appStatus = false;
      appCode = 404;
      appMessage = `Resource With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Resource Update successfully`;
      appData = resource;
    }
  } catch (err) {
    console.log(err);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
    appData = null;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
}
async function delById(id) {
  try {
    let resource = await resourceRepo.delById(id);
    if (!resource) {
      appStatus = false;
      appCode = 404;
      appMessage = `Resource With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Resource Deleted successfully`;
      appData = resource;
    }
  } catch (err) {
    console.log(err);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
    appData = null;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
}
function delByFields(fields) {}

module.exports = {
  getAllAndCount,
  getAll,
  getById,
  getByFields,
  save,
  create,
  update,
  delById,
  delByFields,
};
