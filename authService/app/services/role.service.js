const { validate } = require("../models/role.model");
const roleRepo = require("../repositories/role.repository");
function getAllAndCount() {}
async function getAll() {
  let appStatus, appData, appMessage, appCode;
  try {
    let roleList = await roleRepo.getAll();
    appStatus = true;
    appCode = 200;
    appMessage = `Role Fetch Successfully`;
    appData = roleList;
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
    let role = await roleRepo.getById(id);
    if (!role) {
      appStatus = false;
      appCode = 404;
      appMessage = `Role With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Role Details With the given id ${id}.`;
      appData = role;
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
    let role = await roleRepo.getByFields(fields);
    if (!role) {
      appStatus = false;
      appCode = 404;
      appMessage = `Role With the given id ${fields._id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Role Details With the given id ${fields._id}.`;
      appData = role;
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
      let role = await roleRepo.getByFields({
        name: data.name,
      });
      if (role) {
        appStatus = true;
        appCode = 400;
        appMessage = `Role Already Created`;
        appData = null;
      } else {
        let newRole = await roleRepo.save(data);
        appStatus = true;
        appCode = 201;
        appMessage = `Role Created Successfully`;
        appData = newRole;
      }
    }
  } catch (err) {
    console.log(err)
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
    let role = await roleRepo.update(id, data);
    if (!role) {
      appStatus = false;
      appCode = 404;
      appMessage = `Role With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Role Update successfully`;
      appData = role;
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
    let role = await roleRepo.delById(id);
    if (!role) {
      appStatus = false;
      appCode = 404;
      appMessage = `Role With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Role Deleted successfully`;
      appData = role;
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
