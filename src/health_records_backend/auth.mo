import Hash "mo:base/Hash";
import User "User";
import UserStorage "UserStorage";
import InternetIdentity "mo:base/InternetIdentity";

actor class Auth(userStorage : UserStorage.UserStorage) {
  public shared async func registerUser(
    username: Text,
    password: Text,
    userType: User.UserType
  ) : async () {
    let hashedPassword = Hash.sha256(password);
    let user = { username = username; hashedPassword = hashedPassword; role = userType };
    await userStorage.addUser(user);
  };

  public shared async func loginUser(
    username: Text,
    password: Text
  ) : async ?User.UserRecord {
    let user = await userStorage.findUserByUsername(username);
    if (user != null && Hash.sha256(password) == user.hashedPassword) {
      return user;
    } else {
      return null;
    };
  };
};
