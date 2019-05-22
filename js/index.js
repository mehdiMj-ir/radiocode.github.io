// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://dashty.ir/podcast/',
            extension = '',
            tracks = [{
                "track": 12,
                "name": "Semantic Web",
                "duration": "1:02:52",
                "file": "Ep12-Semantic-Web-RadioLUG"
            }, {
                "track": 11,
                "name": "GODOT - Game Engein!",
                "duration": "56:29",
                "file": "ep02"
            }, {
                "track": 10,
                "name": "Computer Vision",
                "duration": "41:21",
                "file": "BS_ATKM"
            }, {
                "track": 9,
                "name": "Systemd",
                "duration": "1:23:26",
                "file": "BSFM_TF"
            }, {
                "track": 8,
                "name": "Cloud Computing",
                "duration": "1:31:29",
                "file": "BSFM_ATKM"
            }, {
                "track": 7,
                "name": "TOR Browser",
                "duration": "52:05",
                "file": "AC_ATI"
            }, {
                "track": 6,
                "name": "Cryptography",
                "duration": "1:06:36",
                "file": "AC_ATKMTake_1"
            }, {
                "track": 5,
                "name": "Web Scarping with Python",
                "duration": "57:27",
                "file": "AC_ATKMTake_2"
            }, {
                "track": 4,
                "name": "C Programming Language",
                "duration": "1:02:56",
                "file": "AC_M"
            }, {
                "track": 3,
                "name": "Embedded Linux",
                "duration": "1:01:36",
                "file": "AC_TSOWAfucked_up"
            }, {
                "track": 2,
                "name": "git",
                "duration": "1:02:11",
                "file": "PNY04-05_M"
            }, {
                "track": 1,
                "name": "Natural Language Processing",
                "duration": "1:16:30",
                "file": "PNY04-05_OTW"
            }, {
                "track": 0,
                "name": "Shiraze ShirazLUG!",
                "duration": "05:31",
                "file": "PNY04-05_T"
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
