// TokenContract.mo

actor class TokenContract {

  // Define data structure for tokens
  type Token = {
    holder : Principal;
    amount : Nat;
  };

  // Map to store token balances
  var balances : [Token] = [];

  // Function to transfer tokens between users
  public shared({transfer}) func transfer(from: Principal, to: Principal, amount: Nat): async Bool {
    if (amount > 0) {
      let fromBalance = getBalance(from);
      if (fromBalance >= amount) {
        updateBalance(from, fromBalance - amount);
        updateBalance(to, getBalance(to) + amount);
        return true;
      }
    }
    return false;
  }

  // Function to get token balance of a user
  public query({getBalance}) func getBalance(user: Principal): async Nat {
    return switch (balances.find((t) => t.holder == user)) {
      | null => 0
      | Some(token) => token.amount;
    };
  }

  // Function to update token balance
  private func updateBalance(user: Principal, newAmount: Nat): async () {
    let index = balances.findIndex((t) => t.holder == user);
    if (index != null) {
      balances[index].amount := newAmount;
    } else {
      let token : Token = { holder = user; amount = newAmount; };
      balances.add(token);
    }
  }
}
