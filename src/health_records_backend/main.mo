import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";


actor usermanagement{

type UserPayload = {
  userName : Text;
  userNationalIdNo : Text;
  userTelNo : Text;
  yearOfBirth : Nat;
 
};

type User = {
  userId : Principal;
  userName : Text;
  userNationalIdNo : Text;
  userTelNo : Text;
  yearOfBirth : Nat;
  
};





stable var usersEntries : [(Principal, User)] = [];

var users : TrieMap.TrieMap<Principal, User> = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

public func addUser(caller : Principal, userPayload: UserPayload) : async Result.Result<(), Text> {
  let userId = caller;
  switch (users.get(userId)) {
    case (null) {
      let user : User = {
        userId = userId;
        userName = userPayload.userName;
        userNationalIdNo = userPayload.userNationalIdNo;
        userTelNo = userPayload.userTelNo;
        yearOfBirth = userPayload.yearOfBirth;
       
      };
       users.put(userId, user);
        return #ok();
      };
      case (?user) {
        return #err("The user already has a user account"); //add code to return the userId for other processing
      }
  };
};



// QUERRY a SINGLE user - Note: ({?User} refers to optional data type. i.e. null or value)
  public query func getUser(p : Principal) : async ?User {
    return users.get(p);
  };

  // UPDATE a SINGLE user account by the user (i.e using user playload)
  public shared ({ caller }) func updateUser(userPayload : UserPayload) : async Result.Result<(), Text> {
    switch (users.get(caller)) {
      case (?Null) {
        let updatedUser : User = {
          userId = caller;
          userName = userPayload.userName;
          userNationalIdNo = userPayload.userNationalIdNo;
          userTelNo = userPayload.userTelNo;
          yearOfBirth = userPayload.yearOfBirth;
         
        };
        users.put(caller, updatedUser);
        return #ok();
      };
      case (null) {
        return #err("The user account has not been found. Kindly add a user account");
      };
    };
  };

  // DELETE a user (only identified callers can delete a user)
  public shared ({ caller }) func deleteUser() : async () {
    users.delete(caller);
  };

};