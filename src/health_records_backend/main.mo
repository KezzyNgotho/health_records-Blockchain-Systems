import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";

actor usermanagement {

  type UserPayload = {
    userName : Text;
    userNationalIdNo : Text;
    userTelNo : Text;
    yearOfBirth : Nat;
    password : Text;  // New field for password
  };

  type User = {
    userId : Text;  // Changed to Text
    userName : Text;
    userNationalIdNo : Text;
    userTelNo : Text;
    yearOfBirth : Nat;
    password : Text;  // New field for password
  };

  stable var usersEntries : [User] = [];

  var users : TrieMap.TrieMap<Text, User> = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash); // Changed to TrieMap<Text, User>
public func addUser(caller : Text, userPayload: UserPayload) : async Result.Result<(), Text> {
  let existingUser = await getUser(userPayload.userName);
  if (existingUser != null) {
    return #err("User already exists");
  } else {
    let userId = caller;
    let user : User = {
      userId = userId;
      userName = userPayload.userName;
      userNationalIdNo = userPayload.userNationalIdNo;
      userTelNo = userPayload.userTelNo;
      yearOfBirth = userPayload.yearOfBirth;
      password = userPayload.password;  // Set the password
    };
    users.put(userId, user);
    return #ok();
  }
};

  public query func getUser(username : Text) : async ?User {  // Changed parameter type to Text
    return users.get(username);
  };


  public func updateUser(caller : Text, userPayload : UserPayload) : async Result.Result<(), Text> {  // Changed parameter type to Text
    switch (users.get(caller)) {
      case (?Null) {
        let updatedUser : User = {
          userId = caller;
          userName = userPayload.userName;
          userNationalIdNo = userPayload.userNationalIdNo;
          userTelNo = userPayload.userTelNo;
          yearOfBirth = userPayload.yearOfBirth;
          password = userPayload.password;  // Set the password
        };
        users.put(caller, updatedUser);
        return #ok();
      };
      case (null) {
        return #err("The user account has not been found. Kindly add a user account");
      };
    };
  };

  public shared ({ caller }) func deleteUser(caller : Text) : async () {  // Changed parameter type to Text
    users.delete(caller);
  };

 
 public func loginUser(username: Text, password: Text) : async Result.Result<User, Text> {
  switch (users.get(username)) {
    case (?user) {
      if (user.password == password) {
        return #ok(user);
      } else {
        return #err("Invalid password");
      }
    };
    case (null) {
      return #err("User not found. Please sign up to create an account.");
    };
  };
};
};