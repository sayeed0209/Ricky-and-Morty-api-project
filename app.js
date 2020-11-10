$(document).ready(function () {
  // page load with the episode panel
  showEpisodePanel('https://rickandmortyapi.com/api/episode');
});

function showEpisodePanel(urlFromRickAndMorty) {
  axios.get(urlFromRickAndMorty).then(function (response) {
    console.log(response.data);
    const arrayOfResult = response.data.results;
    showEpisodes(arrayOfResult);
    console.log(arrayOfResult);
    const info = response.data.info;
    showNavButtons(info.next, info.prev);
    // console.log(info)
  });
}

// function to create list of episode
function showEpisodes(episodeList) {
  $('#aside-list').empty();
  episodeList.forEach((episode) => {
    const textToShow = 'Episode' + episode.id;
    $('<li>')
      .attr('id', episode.id)
      .text(textToShow)
      .click(function () {
        showEpisodeDetails(episode);
      })
      .appendTo('#aside-list');
  });
  //    console.log(episodeList)
}
function showEpisodeDetails(showEpisodeDatas) {
  $('#mainContent').empty();
  const subtitle = showEpisodeDatas.air_date + ' | ' + showEpisodeDatas.episode;
  $('#mainContent')
    .append(
      $('<p>', {
        text: subtitle,
      })
    )
    .append(
      $('<h2>', {
        text: showEpisodeDatas.name,
      })
    );

  $('#mainContent').append($('<div>', { class: 'elements', id: 'elements' }));

  $.each(showEpisodeDatas.characters, function (index, characterData) {
    axios.get(characterData).then(function (result) {
      const name = result.data.name;
      const speciesAndStatus = result.data.species + ' | ' + result.data.status;
      const image = result.data.image;
      //    const status = result.data.status
      const characterGender = result.data.gender;
      const origin = result.data.origin.name;
      const episodes = result.data.episode;
      $('#elements').append(
        $('<div>', { class: 'element' })
          .append('<img src= "' + image + ' ">')
          .append('<h2>' + name + '</h2>')
          .append('<h3> ' + speciesAndStatus + '</h3>')
          .click(function () {
            $('#mainContent')
              .empty()
              .append($('<h1>').text(name))
              .append($('<h2>').text(characterGender))
              .append($('<p>').text(origin))
              .append('<img src= "' + image + ' ">');
            let div = $('<div>', { class: 'episodeContainer' });
            episodes.forEach(function (episodeURL) {
              axios.get(episodeURL).then(function (result) {
                // console.log(result)
                console.log(result.data.name);
                const espisodeName = result.data.name;

                $(div).append(
                  $('<span>', { text: espisodeName, class: 'episodeElement' })
                );
              });
            });
            $('#mainContent').append(div);
          })
      );
    });
  });
}

// function for go to next page
function showNavButtons(nextURL, prevURL) {
  $('#showBtn').empty();
  if (nextURL != null) {
    $('<button>')
      .text('Next Page')
      .click(function () {
        showEpisodePanel(nextURL);
      })
      .appendTo('#showBtn');
  }

  if (prevURL != null) {
    $('<button>')
      .text('Prev Page')
      .click(function () {
        showEpisodePanel(prevURL);
      })
      .appendTo('#showBtn');
  }
}
