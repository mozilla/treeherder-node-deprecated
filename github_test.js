suite('github', function() {
  var nock = require('nock');
  var Github = require('github');
  var subject = require('./github');

  suiteSetup(function() {
    nock.disableNetConnect();
  });

  suiteTeardown(function() {
    nock.enableNetConnect();
  });

  suite('#pull', function() {
    setup(function() {
      // don't load the fixtures unless nock is on
      if (process.env.NOCK_OFF) return;

      // fixtures generated by running nock
      require('./test/github_nock');
    });

    // taken directly from github
    var expected = {
      "revision_hash": "https://github.com/mozilla-b2g/gaia/pull/16677",
      "push_timestamp": 1393450332,
      "type": "push",
      "revisions": [
        {
          "comment": "Bug 977278 - Fixed visible rotating thumbnails when Filmstrip is hidden by hiding overflow.",
          "revision": "7b5d85f9cd3787ca3175470a84a9ffe6f1b01872",
          "repository": "gaia",
          "author": "Justin D'Arcangelo <justindarc@gmail.com>"
        }
      ]
    };

    test('resultset', function() {
      var github = new Github({ version: '3.0.0' });
      var config = {
        github: github,
        user: 'mozilla-b2g',
        repo: 'gaia',
        number: 16677
      };

      return subject.pull('gaia', config).then(function(resultset) {
        assert.deepEqual(resultset, expected);
      });
    });
  });
});
