import Parse from "parse";
import { timeString } from "./GeneralAPICalls";
import {
  getPointerObjectFromId,
  getObjectFromDBWithFirst,
} from "./GeneralAPICalls";
import getCurrentUser, { getUserObject } from "./UserAPICalls";

//############## CALL RELATED TO GROUP REGISTRATION ##############

export async function registerGroup(
  name,
  language,
  location,
  currentUser,
  picture,
  navigateToChat
) {
  let group = new Parse.Object("Chat");

  const parseFile = new Parse.File("Group-picture.jpg", picture);
  await parseFile.save().then(
    function () {},
    function (error) {}
  );

  group.set("Name", name);
  group.set("Language", language);
  group.set("Location", location);
  group.set("Picture", parseFile);
  let userRelation = group.relation("Users");
  userRelation.add(currentUser);
  try {
    const newChat = await group.save();
    await addWelcomeMessage(
      "Welcome to your new chat, best regards the Talk! team",
      "BgX457yHVK",
      newChat.id
    );
    addChatToUsersChatsRelation(currentUser, newChat);
    navigateToChat(`/chats/${newChat.id}`);
  } catch (e) {
    console.log(`Could not save group called ${name}: ${e}`);
  }
}

//############## CALLS RELATED TO TANDEM CHAT CREATION ##############

export async function createTandemChat(
  userId,
  chosenProfileId,
  navigateToChat
) {
  let tandemChatObject = await addUsersToTandemChatsUserRelation(
    userId,
    chosenProfileId
  );
  await addTandemChatToBothUsersChatRelation(
    userId,
    chosenProfileId,
    tandemChatObject
  );
  await addWelcomeMessage(
    "Welcome to your new chat! Don't know how to start the conversation? Take a look at the topic of the day on the homepage and get inspired! Best regards, the Talk! team",
    "BgX457yHVK",
    tandemChatObject.id
  );
  navigateToChat(`/chats/${tandemChatObject.id}`);
}

export async function addGroupChatToUserChatRelation(currentUser, chatId) {
  let chatRelation = currentUser.relation("Chats");
  var Chat = Parse.Object.extend("Chat");
  const query = new Parse.Query(Chat);
  query.equalTo("objectId", chatId);
  try {
    let result = await query.find();
    try {
      chatRelation.add(result[0]);
      try {
        currentUser.save();
      } catch (error) {
        console.log(`Could not get chat with id ${chatId}: ${error}`);
      }
    } catch (error) {
      console.log(`Could not save chat with id ${chatId}: ${error}`);
    }
  } catch (error) {
    console.log(`Could not get chat with id ${chatId}: ${error}`);
  }
}

export async function addUserToChatUserRelation(currentUser, chatId) {
  const query = new Parse.Query("Chat");
  query.equalTo("objectId", chatId);
  try {
    let chatObjectArray = await query.find();
    let chatObject = chatObjectArray[0];
    try {
      let userRelation = chatObject.relation("Users");
      userRelation.add(currentUser);
      try {
        chatObject.save();
      } catch (error) {
        console.log(`Could not save chat with id ${chatId}: ${error}`);
      }
    } catch (error) {
      console.log(`Could not save chat with id ${chatId}: ${error}`);
    }
  } catch (error) {
    console.log(`Could not retrieve chat with id ${chatId}: ${error}`);
  }
}

export async function addUsersToTandemChatsUserRelation(
  userId,
  chosenProfileId
) {
  let tandemChat = new Parse.Object("Chat");
  tandemChat.set("Name", "");

  let userRelation = tandemChat.relation("Users");

  var User = Parse.Object.extend("User");
  var pointerToUser = new User();

  pointerToUser.id = userId;

  var ChosenProfile = Parse.Object.extend("User");
  var pointerToChosenProfile = new ChosenProfile();
  pointerToChosenProfile.id = chosenProfileId;

  userRelation.add(pointerToUser);
  userRelation.add(pointerToChosenProfile);

  try {
    await tandemChat.save();
    return tandemChat;
  } catch (error) {
    console.log(`Could not create chat: ${error}`);
  }
}

export async function addTandemChatToBothUsersChatRelation(
  userId,
  chosenProfileId,
  tandemChat
) {
  let currentUserObject = await getUserObject(userId);
  await getUserObject(chosenProfileId);
  addChatToLoggedInUserChatRelation(currentUserObject, tandemChat);
  addChatToUserChatRelation(chosenProfileId, tandemChat.id);
}

export async function addChatToUserChatRelation(userObjectId, chatObjectId) {
  const params = { user: userObjectId, chat: chatObjectId };
  await Parse.Cloud.run("editUsersChats", params);
}

export async function addChatToLoggedInUserChatRelation(
  userObject,
  chatObject
) {
  let chatRelation = userObject.relation("Chats");
  chatRelation.add(chatObject);
  try {
    await userObject.save();
  } catch (error) {
    console.log(
      `Could not add chat with id ${chatObject.id} to user with id ${userObject.id}: ${error}`
    );
  }
}

export const addWelcomeChat = async function (userId) {
  let tandemChatObject = await addUsersToTandemChatsUserRelation(
    userId,
    "BgX457yHVK"
  );
  await addTandemChatToBothUsersChatRelation(
    userId,
    "BgX457yHVK",
    tandemChatObject
  );
  await addWelcomeMessage(
    "Welcome to Talk! - a language learning platform. Here you can meet and chat with your new best friends from all over the world. Best regards, the Talk! team",
    "BgX457yHVK",
    tandemChatObject.id
  );
};

//############## CALLS RELATED TO SEARCH PAGE ##############

export const getAllGroups = async function () {
  const parseQuery = new Parse.Query("Chat");
  parseQuery.descending("createdAt");
  try {
    let chats = await parseQuery.find();
    const chatArray = [];

    for (const chat of chats) {
      if (chat.attributes.Name !== "") {
        chatArray.push({
          id: chat.id,
          name: chat.attributes.Name,
          img: chat.attributes.Picture,
          badge: chat.attributes.Language,
        });
      }
    }
    return chatArray;
  } catch (error) {
    console.log(`Could not get groups: ${error.message}`);
  }
};

export const getAllProfiles = async function () {
  const parseQuery = new Parse.Query("User");

  try {
    let profiles = await parseQuery.find();
    const profileArray = [];

    for (const profile of profiles) {
      if(profile.id !== getCurrentUser().id){
      profileArray.push({
        id: profile.id,
        name: profile.attributes.Name,
        img: profile.attributes.ProfilePicture,
        badge: profile.attributes.NativeLanguage,
        flag: profile.attributes.LearningLanguage,
      });
    }}
    return profileArray;
  } catch (error) {
    console.log(`Could not get user profiles: ${error.message}`);
  }
};

//############## CALLS RELATED TO RECOMMENDATIONS ##############

export const getGroupRecommendations = async function (
  currentUser,
  setRecommendationChats
) {
  const parseQuery = new Parse.Query("Chat");
  parseQuery.descending("createdAt");
  parseQuery.limit(4);
  parseQuery.equalTo("Language", currentUser.attributes.LearningLanguage);

  try {
    let chats = await parseQuery.find();
    const chatArray = [];

    for (const chat of chats) {
      if (chat.attributes.Name !== "") {
        const userRelation = chat.relation("Users");

        const relationQuery = userRelation.query();

        const userObjects = await relationQuery.find();

        const userArray = [];
        userObjects.map((user) => userArray.push(user));
        if (!userArray.map((user) => user.id).includes(currentUser.id)) {
          chatArray.push({
            id: chat.id,
            name: chat.attributes.Name,
            img: chat.attributes.Picture,
            badge: chat.attributes.Language,
          });
        }
      }
    }
    setRecommendationChats(chatArray);
    return chatArray;
  } catch (error) {
    console.log(`Could not get recommended groups: ${error.message}`);
    return false;
  }
};

export const getProfileRecommendations = async function (
  currentUser,
  setRecommendationProfiles
) {
  const parseQuery = new Parse.Query("User");
  parseQuery.limit(4);
  parseQuery.equalTo("NativeLanguage", currentUser.attributes.LearningLanguage);

  try {
    let profiles = await parseQuery.find();

    const profileArray = [];

    for (const profile of profiles) {
      const chatRelation = profile.relation("Chats");

      const relationChatQuery = chatRelation.query();

      let chatObjects = await relationChatQuery.find();

      let connected = false;
      for (const chat of chatObjects) {
        const userRelation = chat.relation("Users");
        const relationUserQuery = userRelation.query();
        const userObjects = await relationUserQuery.find();

        const userArray = [];
        userObjects.map((user) => userArray.push(user));

        if (
          userArray.length === 2 &&
          userArray.map((user) => user.id).includes(currentUser.id)
        ) {
          connected = true;
          break;
        }
      }
      if (!connected) {
        profileArray.push({
          id: profile.id,
          name: profile.attributes.Name,
          img: profile.attributes.ProfilePicture,
          badge: profile.attributes.NativeLanguage,
          flag: profile.attributes.LearningLanguage,
        });
      }
    }
    setRecommendationProfiles(profileArray);
    return profileArray;
  } catch (error) {
    console.log(`Could not get recommended user profiles: ${error.message}`);
    return false;
  }
};

//############## CALLS RELATED TO MESSAGES ##############

export async function addWelcomeMessage(text, senderId, chatId) {
  addNewMessageObjectToChat(text, senderId, chatId);
}

export async function addNewMessageObjectToChat(
  text,
  senderId,
  chatId,
  setMessageInput
) {
  // 1. creates the message
  let messageObject = new Parse.Object("Message");
  let senderObject = getPointerObjectFromId(senderId, "User");
  let receiverObject = getPointerObjectFromId(chatId, "Chat");

  messageObject.set("Text", text);
  messageObject.set("SenderId", senderObject);
  messageObject.set("ReceiverChatId", receiverObject);

  try {
    await messageObject.save();
    // 2. adds the new message to the receiver chat's Messages relation
    const chatObject = await getObjectFromDBWithFirst(chatId, "Chat");
    let messageRelation = chatObject.relation("Messages");
    messageRelation.add(messageObject);
    try {
      await chatObject.save();
      if (setMessageInput) {
        setMessageInput("");
      }
    } catch (error) {
      console.log(
        `Could not add message with id ${messageObject.id} to chat with id ${chatObject.id}: ${error}`
      );
    }
  } catch (error) {
    console.log(`Could not send message: ${error}`);
  }
}

//############## CALLS RELATED TO CHATS ##############

export async function addChatToUsersChatsRelation(currentUser, newChat) {
  let userQuery = new Parse.Query("User");
  userQuery.equalTo("objectId", currentUser.id);

  const userObject = await userQuery.first();
  let chatsRelation = userObject.relation("Chats");
  chatsRelation.add(newChat);
  try {
    await userObject.save();
  } catch (error) {
    console.log(`Could not add user to chat: ${error}`);
  }
}

export const getIdOfMostRecentMessageInChat = async function (chatId) {
  const query = new Parse.Query("Message");
  query.equalTo("ReceiverChatId", {
    __type: "Pointer",
    className: "Chat",
    objectId: chatId,
  });
  //most recent message is the first message in the array
  query.descending("createdAt");
  query.includeAll();
  try {
    let messages = await query.find();
    return messages[0];
  } catch (error) {
    console.log(
      `Could not retrive most recent message from selected chat with id ${chatId}: ${error}`,
      error
    );
  }
};

export async function getCurrentUsersChats(currentUser, setUserChats, limit) {
  //1. gets user
  const query = new Parse.Query("User");
  query.equalTo("objectId", currentUser.id);
  try {
    let result = await query.find();
    let userObject = result[0];

    // 2. queries the users chats
    let chatsRelation = userObject.relation("Chats");
    let relationQuery = chatsRelation.query();
    relationQuery.descending("updatedAt");
    if (limit !== undefined) {
      relationQuery.limit(limit);
    }
    let chatObjects = await relationQuery.find();
    const chatArray = [];

    for (const chat of chatObjects) {
      const messageRelation = chat.relation("Messages");
      const relationChatQuery = messageRelation.query();
      relationChatQuery.descending("createdAt");
      relationChatQuery.limit(1);
      const messageObjects = await relationChatQuery.find();

      let messageText;
      let messageTime;
      if (messageObjects[0] !== undefined) {
        messageText = messageObjects[0].attributes.Text;
        messageTime = timeString(messageObjects[0].attributes.createdAt);
      } else {
        messageText = "";
        messageTime = "";
      }

      const userRelation = chat.relation("Users");
      const relationUserQuery = userRelation.query();
      const userObjects = await relationUserQuery.find();

      if (chat.attributes.Name === "") {
        let profile;
        if (userObjects[0].id === currentUser.id) {
          profile = userObjects[1];
        } else {
          profile = userObjects[0];
        }
        chatArray.push({
          id: chat.id,
          name: profile.attributes.Name,
          img: profile.attributes.ProfilePicture,
          badge: profile.attributes.NativeLanguage,
          currentMessage: messageText,
          time: messageTime,
        });
      } else {
        chatArray.push({
          id: chat.id,
          name: chat.attributes.Name,
          img: chat.attributes.Picture,
          badge: chat.attributes.Language,
          currentMessage: messageText,
          time: messageTime,
        });
      }
    }

    if (limit === 1) {
      setUserChats(chatArray[0]);
      return chatArray[0];
    } else {
      setUserChats(chatArray);
    }
  } catch (error) {
    console.log(
      `Could not get chats for user with id ${currentUser.id}: ${error}`
    );
  }
}
