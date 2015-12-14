function Deck() {

  // Context
  var self = this;

  /**
   * Cards array which will hold suit and values
   */
  self.cards = [];

  /**
   * Players which is empty by default
   */
  self.players = [];

  /**
   * Method to initialize a new deck of cards with the below
   * suit and value definitions
   */
  self.newDeck = function() {

      // Reset the cards in this current deck
      self.cards = [];

      // Cards variable which will hold the array of cards
      var suitDefinition = ["c", "d", "h", "s"];
      var suitDefinitionVerbose = ["clubs", "diamonds", "hearts", "spades"];
      var rankDefinition = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"];
      var rankDefinitionVerbose = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
      var value = 1;

      // Loop through suit definitions
      for (var i = 0; i < suitDefinition.length; i++) {

          // Loop through value definitions
          for (var j = 0; j < rankDefinition.length; j++) {

              // Make a new card
              var card = {
                  suit: suitDefinition[i],
                  suitVerbose: suitDefinitionVerbose[i],
                  rank: rankDefinition[j],
                  rankVerbose: rankDefinitionVerbose[j],
                  value: value,
                  valueInRank: j+1
              };

              // Insert the card into the deck
              self.cards.push(card);

              // Increment value
              value++;
          }
      }
  };

  /**
   * Pass in an array of players to initialize a list of players
   */
  self.setPlayers = function(passedPlayers) {
    for (var i = 0; i < passedPlayers.length; i++) {
      var player = {
        name: passedPlayers[i],
        cards: []
      };
      self.players.push(player);
    }
  };

  /**
   * Draws a card from the current position from the cards array
   * @param removeCard : whether or not to remove the card from the deck once drawn (default = true)
   * @param player : string of the player's name, which is optional (default = null)
   * @returns card : card at the top of the deck
   */
  self.drawCard = function(removeCard, passedPlayer) {
    var remove = removeCard || true;
    var player = player || null;

    if (self.cards.length == 0) {
      console.error("Deck is empty, so cannot draw a card.");
      return null;
    }

    if (remove === true) {
      self.cards.shift();
    }
    if (player) {
      for (var i = 0; i < self.players.length; i++) {
        if (player === self.players[i].name) {
          self.players[i].cards.push(self.cards[0]);
        }
      }
    }

    return self.cards[0];
  };

  self.getPlayersCards = function(player) {
    for (var i = 0; i < self.players.length; i++) {
      if (self.players[i].name.toLowerCase() === player.toLowerCase()) {
        return self.players[i].cards;
      }
    }
    console.error("Player not found.")
    return null;
  };

  /**
   * Distributes cards to players evenly given a number of cards
   */
  self.distributeEvenly = function(numCards, removeCards) {
    var remove = true;
    if (typeof removeCards == 'undefined') {
      remove = true;
    } else {
      remove = removeCards;
    }

    if (self.players.length < 1) {
      console.error("Cannot distribute cards to 0 players.");
      return;
    }
    if ( (numCards * self.players.length) > self.cards.length) {
      console.error("Cannot distribute this amount evenly amongst all players.");
      return;
    }
    for (var i = 0; i < numCards; i++) {
      for (var j = 0; j < self.players.length; j++) {
        self.players[j].cards.push(self.drawCard(remove, null));
      }
    }
  };

  // Initiate a new deck
  self.newDeck();

  /**
   * Method that shuffles all cards in the current deck
   */
  self.shuffleDeck = function() {
      for(var j, x, i = self.cards.length; i; j = parseInt(Math.random() * i), x = self.cards[--i], self.cards[i] = self.cards[j], self.cards[j] = x);
  };

  return {
    shuffle: self.shuffleDeck,
    cards: self.cards,
    players: self.players,
    setPlayers: self.setPlayers,
    drawCard: self.drawCard,
    distributeEvenly: self.distributeEvenly,
    getPlayersCards: self.getPlayersCards
  }

}
