const { validate, validateLoginUser } = require("../models/user.model");
const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
function getAllAndCount() {}
async function getAll() {
  let appStatus, appData, appMessage, appCode;
  try {
    let userList = await userRepo.getAll();
    appStatus = true;
    appCode = 200;
    appMessage = `Accounts Fetch Successfully`;
    appData = userList;
  } catch (error) {
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
async function getById(accounId) {
  let appStatus, appData, appMessage, appCode;
  try {
    let user = await userRepo.getById(accounId);
    if (!user) {
      appStatus = false;
      appCode = 404;
      appMessage = `Account With the given id ${accounId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Account Details With the given id ${accounId}.`;
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
}
async function getByFields(fields) {
  let appStatus, appData, appMessage, appCode;
  try {
    let user = await userRepo.getByFields(fields);
    if (!user) {
      appStatus = false;
      appCode = 404;
      appMessage = `Account With the given id ${fields._id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Account Details With the given id ${fields._id}.`;
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
      let user = await userRepo.getByFields({
        email: data.email,
      });
      if (user) {
        appStatus = true;
        appCode = 400;
        appMessage = `Account Already Registered`;
        appData = null;
      } else {
        const saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let hashedPassword = await bcrypt.hash(data.password, salt);
        let newUser = await userRepo.save({
          ...data,
          password: hashedPassword,
        });
        appStatus = true;
        appCode = 201;
        appMessage = `Account Created Successfully`;
        appData = newUser;
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
async function update(accounId, data) {
  try {
    let user = await userRepo.update(accounId, data);
    if (!user) {
      appStatus = false;
      appCode = 404;
      appMessage = `Account With the given id ${accounId} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Account Update successfully`;
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
}
async function delById(id) {
  try {
    let user = await userRepo.delById(id);
    if (!user) {
      appStatus = false;
      appCode = 404;
      appMessage = `Account With the given id ${id} is not found!`;
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = `Account Deleted successfully`;
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
}
function delByFields(fields) {}

// ========================Login Related Method
async function getAuth(data) {
  let appStatus, appData, appMessage, appCode;
  const { error } = validateLoginUser(data);
  try {
    if (error) {
      appStatus = false;
      appCode = 400;
      appMessage = error.details[0].message;
      appData = null;
    } else {
      let user = await userRepo.getByFields({
        email: data.email,
      });
      if (user) {
        let validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
          appStatus = false;
          appCode = 400;
          appMessage = "Invalid Credentials!";
          appData = null;
        } else {
          let token = user.generateAuthToken();
          appStatus = true;
          appCode = 200;
          appMessage = "Login Successful.";
          appData = token;
        }
      } else {
        appStatus = false;
        appCode = 400;
        appMessage = "You are not registered yet!";
        appData = null;
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
async function getAuthInfo(data) {
  let appStatus, appData, appMessage, appCode;
  try {
    let user = await userRepo.getByFields(data);
    if (!user) {
      appStatus = false;
      appCode = 400;
      appMessage = "You are not registered yet!";
      appData = null;
    } else {
      appStatus = true;
      appCode = 200;
      appMessage = "Auth information .";
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
}

module.exports = {
  getAllAndCount,
  getAll,
  getById,
  getByFields,
  save,
  getAuth,
  getAuthInfo,
  create,
  update,
  delById,
  delByFields,
};
