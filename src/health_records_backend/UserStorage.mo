import HashMap "mo:base/HashMap";
import User "./User";
import Text "mo:base/Text";

actor class UserStorageImpl() {
  var users : HashMap.HashMap<Text, User.UserRecord> = HashMap.HashMap<Text, User.UserRecord>(10, Text.equal, Text.hash);

  public shared func addUser(user : User.UserRecord) : Bool {
    switch (users.get(user.username)) {
      case null {
        users.put(user.username, user);
        return true;
      };
      case _ {
        return false; // User with the same username already exists
      };
    };
  };

  public shared func findUserByUsername(username : Text) : ?User.UserRecord {
    return users.get(username);
  };
};