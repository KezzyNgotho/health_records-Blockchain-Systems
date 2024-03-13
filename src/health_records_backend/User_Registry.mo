import Candid;
import InternetIdentity;

// Define a data structure for users
type User = {
  username: Text;
  passwordHash: Text; // Store password hash for security
  internetIdentity: Text; // Store Internet Identity for each user
};

// Define the user registry canister
actor UserRegistry {
  // Define the service interface using Candid
  public type Service = {
    registerUser: (username: Text, password: Text, internetIdentity: Text) -> async Text;
    loginUser: (username: Text, password: Text, internetIdentity: Text) -> async Text;
  };

  // Function to register a new user
  public shared({ username: Text, password: Text, internetIdentity: Text }) func registerUser(username: Text, password: Text, internetIdentity: Text) : async Text {
    let passwordHash = hash(password); // Hash the password

    if (await isTaken(username)) {
      return "Username is already taken";
    }

    let user = User { username = username; passwordHash = passwordHash; internetIdentity = internetIdentity };

    // Store the user
    let () = await storeUser(user);

    return "User registered successfully";
  };

  // Function to log in a user
  public shared({ username: Text, password: Text, internetIdentity: Text }) func loginUser(username: Text, password: Text, internetIdentity: Text) : async Text {
    let user = await getUser(username);

    switch (user) {
      case null {
        return "User not found";
      }
      case _ {
        if (user.passwordHash != hash(password)) {
          return "Invalid password";
        }

        // Verify Internet Identity
        if (user.internetIdentity != internetIdentity) {
          return "Internet Identity verification failed";
        }

        return "Login successful";
      }
    }
  };

  // Internal function to check if a username is taken
  private func isTaken(username: Text) : async Bool {
    return switch (await getUser(username)) {
      case null { false };
      case _ { true };
    }
  };

  // Internal function to store a user in the registry
  private func storeUser(user: User) : async () {
    let userRegistry : [User] = shared query { userRegistry };
    let newUserRegistry = Array.append(userRegistry, [user]);
    shared store { userRegistry = newUserRegistry };
  };

  // Internal function to retrieve a user from the registry
  private func getUser(username: Text) : async ?User {
    let userRegistry : [User] = shared query { userRegistry };
    return Array.findOpt(userRegistry, func(u) { u.username == username });
  };
};