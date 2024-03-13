module User {
  type UserRole = { canRead: Bool; canWrite: Bool };

  type UserType = { #Patient; #Admin; #HealthProvider };

  type UserRecord = {
    username: Text;
    hashedPassword: Text; 
    role: UserType;
  };
};

