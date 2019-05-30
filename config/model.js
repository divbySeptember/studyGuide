const db = require("../database/dbConfig.js");

module.exports = {
    findUsersBy,
    getStudentListFromUserId,
    getStudentUser
  };
  
  function findUsersBy(filter) {
    return db("users").where(filter);
  }
  
  function getStudentListFromUserId(id) {
    return db
      .select("s.name as Student")
      .from("student as s")
      .join("user_student as us", { "us.student_id": "s.id", "us.user_id": id });
  }
  
  async function getStudentUser(username) {
    const { id } = await findUsersBy({ username }).first();
    return getStudentListFromUserId(id);
  }

