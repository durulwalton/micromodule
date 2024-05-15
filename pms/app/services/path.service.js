const pathPath = require("../repositories/path.repository");
const { validatePath } = require("../models/partyModule/path.model");
const getAllAndCount = async () => {};
const getAll = async () => {
  var appStatus, appCode, appMessage, appData;
  try {
    const parthList = await pathPath.getAll();
    appStatus = true;
    appCode = 200;
    appMessage = "All Path Loaded Successfully.";
    appData = parthList;
  } catch (error) {
    console.log(error);
    appStatus = false;
    appCode = 500;
    appMessage = `Can't process your request now! Please Try again later.`;
    appData = error;
  } finally {
    return {
      appStatus: appStatus,
      appCode: appCode,
      appMessage: appMessage,
      appData: appData,
    };
  }
};
async function getByFields(fields) {}
const getById = async (pathId) => {
  var appStatus, appCode, appMessage, appData;
  try {
    let path = await pathPath.getById(pathId);
    if (!path) {
      appStatus = false;
      appCode = 404;
      appMessage = `Path With the given id ${pathId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 201;
      appMessage = "Path Details Fetch Successfully.";
      appData = path;
    }
  } catch (error) {
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
};
const save = async (data) => {
  const { error } = validatePath(data);
  try {
    if (error) {
      appStatus = false;
      appCode = 400;
      appMessage = error.details[0].message;
      appData = null;
    } else {
      let path = await pathPath.getByFields({
        userId: data.userId,
        // prevId: data.prevId,
        // nextId: data.nextId,
      });
      if (path) {
        appStatus = false;
        appCode = 400;
        appMessage = data.userId + " already exists";
        appData = null;
      } else {
        let path = await pathPath.save(data);
        appStatus = true;
        appCode = 201;
        appMessage = "Path Created Successfully.";
        appData = path;
      }
    }
  } catch (error) {
    console.log(error);
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
};
function create(data) {}
const update = async (pathId, data) => {
  try {
    let user = await pathPath.update(pathId, data);
    if (!user) {
      appStatus = false;
      appCode = 404;
      appMessage = `Path With the given id ${pathId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Path Update successfully`;
      appData = user;
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
};
async function remove(id) {
  var appStatus, appCode, appMessage, appData;
  try {
    let path = await pathPath.delById(id);
    if (!path) {
      appStatus = false;
      appCode = 404;
      appMessage = `Path With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 201;
      appMessage = "Path Deleted Successfully.";
      appData = path;
    }
  } catch (error) {
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
  remove,
  delByFields,
};
