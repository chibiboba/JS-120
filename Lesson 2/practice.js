const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    TESgames.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

// TESgames.listGames();

let copy = TESgames.listGames;
copy();