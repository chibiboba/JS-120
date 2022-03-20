// ~/'My Documents'/'Launch School'/'JS 120'/'JS 129'

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();