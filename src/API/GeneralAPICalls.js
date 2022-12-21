import Parse from "parse";

//############## GENERAL PARSE CALL FOR CREATING OBJECTS ##############

export function createNewEmptyObject(databaseObjectName) {
  let DatabaseObject = Parse.Object.extend(`${databaseObjectName}`);
  let object = new DatabaseObject();
  return object;
}

//############## GENERAL PARSE CALLS FOR GETTING OBJECTS AND POINTERS ##############

export function getPointerObjectFromId(id, databaseObjectName) {
  let object = createNewEmptyObject(databaseObjectName);
  object.id = id;
  return object;
}

export async function getObjectFromDBWithFirst(id, databaseObjectName) {
  let query = new Parse.Query(databaseObjectName);
  query.equalTo("objectId", id);
  try {
    const object = await query.first();
    return object;
  } catch (error) {
    console.log(
      `Could not get ${databaseObjectName} object with id ${id}: ${error}`
    );
  }
}

export async function getObjectFromDBWithFind(id, databaseObjectName) {
  const query = new Parse.Query(databaseObjectName);
  query.equalTo("objectId", id);
  try {
    const objectArray = await query.find();
    const object = objectArray[0];
    return object;
  } catch (error) {
    console.log(
      `Could not get ${databaseObjectName} object with id ${id}: ${error}`
    );
  }
}

//############## PARSE CALL FOR LIVE QUERY ##############

export const getQueryForMessagesInSelectedChat = (selectedChatId) => {
  const parseQuery = new Parse.Query("Message");
  parseQuery.equalTo("ReceiverChatId", {
    __type: "Pointer",
    className: "Chat",
    objectId: selectedChatId,
  });
  parseQuery.ascending("createdAt");
  parseQuery.includeAll();
  return parseQuery;
};

//############## UNCTION FOR GETTING DATE AND TIME FROM DATABASE DATE ##############

export function timeString(dateFromDB) {
  const date = dateFromDB.toString().substring(4, 11);
  const time = dateFromDB.toString().substring(15, 21);
  return date + "\n" + time;
}
