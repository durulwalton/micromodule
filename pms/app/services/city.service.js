const cityRepo = require("../repositories/city.repository");
const getAllCount = async () => {};
const getAll = async () => {
  var appStatus, appCode, appMessage, appData;
  try {
    const cityList = await cityRepo.getAll();
    appStatus = true;
    appCode = 200;
    appMessage = "All City Loaded Successfully.";
    appData = cityList;
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
const getById = async (partyId) => {
  var appStatus, appCode, appMessage, appData;
  try {
    let party = await cityRepo.getById(partyId);
    if (!party) {
      appStatus = false;
      appCode = 404;
      appMessage = `City With the given id ${partyId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 201;
      appMessage = "City Details Fetch Successfully.";
      appData = null;
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
    let city = await cityRepo.save(data);
    appStatus = true;
    appCode = 201;
    appMessage = "City Created Successfully.";
    appData = city;
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
const update = async () => {};

module.exports = {
  getAll,
  getById,
  save,
  update,
};
