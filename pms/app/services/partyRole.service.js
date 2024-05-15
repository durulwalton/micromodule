const partyRepo = require("../repositories/party.repository");
const getAllAndCount = async () => {};
const getAll = async () => {
  var appStatus, appCode, appMessage, appData;
  try {
    const partyList = await partyRepo.getAll();
    appStatus = true;
    appCode = 200;
    appMessage = "All Party Loaded Successfully.";
    appData = partyList;
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
const getById = async (partyId) => {
  var appStatus, appCode, appMessage, appData;
  try {
    let party = await partyRepo.getById(partyId);
    if (!party) {
      appStatus = false;
      appCode = 404;
      appMessage = `Party With the given id ${partyId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 201;
      appMessage = "Party Details Fetch Successfully.";
      appData = party;
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
  try {
    let party = await partyRepo.getByFields({ wiptCode: data.wiptCode });
    if (party) {
      appStatus = false;
      appCode = 400;
      appMessage = data.wiptCode + " already exists";
      appData = null;
    } else {
      let party = await partyRepo.save(data);
      appStatus = true;
      appCode = 201;
      appMessage = "Party Created Successfully.";
      appData = party;
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
function create(data) {}
const update = async (partyId, data) => {
  try {
    let user = await partyRepo.update(partyId, data);
    if (!user) {
      appStatus = false;
      appCode = 404;
      appMessage = `Party With the given id ${partyId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Party Update successfully`;
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
    let party = await partyRepo.delById(id);
    if (!party) {
      appStatus = false;
      appCode = 404;
      appMessage = `Party With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 201;
      appMessage = "Party Deleted Successfully.";
      appData = party;
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
