import Parse from "parse";
import { addWelcomeChat } from "./SpecificAPICalls";

export async function doUserLogIn(
  emailValue,
  passwordValue,
  user,
  setErrorMessage
) {
  try {
    const loggedInUser = await Parse.User.logIn(emailValue, passwordValue);
    user.setLoggedIn(true);
    return true;
  } catch (error) {
    setErrorMessage(
      "Wrong email or password. Please try again or click register below to make an account."
    );
    return false;
  }
}

export default function getCurrentUser() {
  let currentUser = Parse.User.current();
  return currentUser;
}

export async function getUserObject(userId) {
  const query = new Parse.Query("User");
  query.equalTo("objectId", userId);
  try {
    let userObject = await query.find();
    return userObject[0];
  } catch (error) {
    console.log(`Could not retrieve user with id ${userId}: ${error}`);
  }
}

export async function registerUser(
  firstname,
  lastname,
  email,
  password,
  nativeLanguage,
  learningLanguage,
  location,
  picture
) {
  const name = firstname + " " + lastname;
  const username = firstname + lastname + Math.random;
  let user = new Parse.User();
  const parseFile = new Parse.File("User-picture" + ".jpg", picture);
  await parseFile.save().then(
    function () {},
    function (error) {}
  );
  user.set("Name", name);
  user.set("email", email);
  user.set(
    "username",
    firstname + lastname + Math.floor(Math.random() * 100000 + 1)
  );
  user.set("password", password);
  user.set("NativeLanguage", nativeLanguage);
  user.set("LearningLanguage", learningLanguage);
  user.set("Location", location);
  user.set("ProfilePicture", parseFile);
  try {
    let createdUser = await user.signUp();
    addWelcomeChat(createdUser.id);
    return "";
  } catch (error) {
    console.log(`Could not save new user: ${error}`);
    return "This email is already in use, please use another email";
  }
}

export async function duplicateEmail(email) {
  const query = new Parse.Query("User");
  query.equalTo("email", email);
  let isDuplicate;
  try {
    return await query.find();
  } catch (error) {
    console.log(`The email already exists in the database: ${error}`);
  }
}
