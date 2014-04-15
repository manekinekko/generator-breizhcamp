'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BreizhcampGenerator = yeoman.generators.Base.extend({


  // these functions are invoked in this order
  greetings: function(){

    console.log(this.yeoman);

  },

  askUser: function(){
    var done = this.async();
    var permissions = [
      "storage",
      "video-capture",
      "push",
      "geolocation",
      "contacts"
    ]

    // https://github.com/SBoudrias/Inquirer.js#question
    var prompts = [{
        name: 'appName',
        message: 'Quel est le nom de votre application ?',
        validate: function(input){
          var done = this.async();
          if(input === ''){
            done('Vous devez saisir un nom valide!');
            return;
          }
          done(true);
        }
    }, {
        name: 'appDescription',
        message: "Une description peut-être..."
    }, {
        name: 'appVersion',
        message: "Quelle est la version de départ ?",
        default: "0.0.1"
    }, {
        type: 'checkbox',
        name: 'appPermissions',
        message: "Quelles sont les persmissions requises par l'application ?",
        choices: permissions
    }];

    this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.appDescription = props.appDescription;
        this.appVersion = props.appVersion;
        this.appPermissions = props.appPermissions;
        done();
    }.bind(this));

  },

  // create all required folders
  scaffoldFolders: function(){

    this.mkdir('app');
    this.mkdir('app/js');
    this.mkdir('app/shared');
    this.mkdir('app/style');

  },

  // copy files
  copyFiles: function(){

    var ctx = {
      appName: this.appName,
      appDescription: this.appDescription,
      appVersion: this.appVersion
    };

    this.copy('_editorconfig', '.editorconfig');
    this.copy('_jshintrc', '.jshintrc');

    this.template("_bower.json", "bower.json", ctx);
    this.template("_package.json", "package.json", ctx);
    this.template("app/_manifest.webapp", "app/manifest.webapp", ctx);
    this.template("app/_index.html", "app/index.html", ctx);
    this.template("app/js/_app.js", "app/js/app.js", ctx);

  }

});

module.exports = BreizhcampGenerator;
