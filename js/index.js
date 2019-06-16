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
            tracks = [ {
                "track": 13,
                "name": "GNU glossary and philosophy of Free Software",
                "duration": "1:07:55",
                "file": "Ep13-an-overview-on-GNU-glossary-of-and-philosophy-of-Free-Software-RadioLUG"
            }, {
                "track": 12,
                "name": "Semantic Web",
                "duration": "1:02:52",
                "file": "Ep12-Semantic-Web-RadioLUG"
            }, {
                "track": 11,
                "name": "GODOT - Game Engein!",
                "duration": "56:29",
                "file": "Ep11-GODOT-Game-Engein - RadioLUG"
            }, {
                "track": 10,
                "name": "Computer Vision",
                "duration": "41:21",
                "file": "Ep10-computer-vision-RadioLUG"
            }, {
                "track": 9,
                "name": "Systemd",
                "duration": "1:23:26",
                "file": "Ep09-Systemd-RadioLUG"
            }, {
                "track": 8,
                "name": "Cloud Computing",
                "duration": "1:31:29",
                "file": "Ep08-Cloud-Computing-RadioLUG"
            }, {
                "track": 7,
                "name": "TOR Browser",
                "duration": "52:05",
                "file": "Ep07-TOR-Browser-RadioLUG"
            }, {
                "track": 6,
                "name": "Cryptography",
                "duration": "1:06:36",
                "file": "Ep06-Cryptography-RadioLUG"
            }, {
                "track": 5,
                "name": "Web Scarping with Python",
                "duration": "57:27",
                "file": "Ep05-Web-Scarping-with-Python-RadioLUG"
            }, {
                "track": 4,
                "name": "C Programming Language",
                "duration": "1:02:56",
                "file": "Ep04-RadioLUG-C-Programming-Language"
            }, {
                "track": 3,
                "name": "Embedded Linux",
                "duration": "1:01:36",
                "file": "Ep03-Embedded-Linux"
            }, {
                "track": 2,
                "name": "git",
                "duration": "1:02:11",
                "file": "Ep02-git"
            }, {
                "track": 1,
                "name": "Natural Language Processing",
                "duration": "1:16:30",
                "file": "Ep01-NLP"
            }, {
                "track": 0,
                "name": "Shiraze ShirazLUG!",
                "duration": "05:31",
                "file": "Ep00-Shiraze-ShirazLUG"
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
