import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import md5 from 'MD5';

export class MainController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.newComment = {};
    this.comments = [];
  }

  $onInit() {
    this.$http.get('/api/comments')
      .then(response => {
        this.comments = response.data.map(elm => {
          elm.hash = md5(elm.email.trim().toLowerCase());
          return elm;
        });
      });
  }

  addComment() {
    if(!!this.newComment) {
      this.$http.post('/api/comments', this.newComment)
      .then(response => {
          this.newComment.hash = md5(this.newComment.email.trim().toLowerCase());
          this.comments.unshift(this.newComment);

          this.newCommentForm.$setPristine();
          this.newCommentForm.$setUntouched();
          this.newComment = {};
        })
    }
  }
}

export default angular.module('bigpandaApp.main', [uiRouter])
  .config(routing)
  .directive('formShowErrors', function() {
    return {
      restrict: 'A',
      require:  '^form',
      link: function (scope, elem, attrs, formCtrl) {
        var errorMessages = {
            'required': 'This field is required',
            'url': 'This field must be a valid url',
            'email': 'This field must be a valid email',
            'integer': 'Valid integer values:<br/>1 - 2048',
            'commaSeparated': 'Please use comma separated values',
            'taMaxText': 'Text is too long',
            'max': 'Number is too high',
            'min': 'Number is too low',
            'maxlength': 'Content is too long',
            'notdecimal': 'Number should be without decimal point',
            'commaListDoubleValue': 'Identical values in the comma separated list',
            'specialChar': 'Invalid input',
            'duplicatedValue': 'Value already exists',
            'minimumSelectList': 'Not enough option selected',
            'noSpaces' : 'Please avoid spaces',
            'startWithDot' : 'Please use \'.\' before each type'
          },
        // find the text box element, which has the 'name' attribute
          inputElem = elem[0].querySelector('[name]'),
        // convert the native text box element to an angular element
          inputNgElem = angular.element(inputElem),
        // get the name on the text box so we know the property to check on the form controller
          inputName = inputNgElem.attr('name'),
        // create an error box to keep all the messages
          errorBox = angular.element('<div class="form-error-box"/>'),
        // errors should be displayed only after field was touched. default is false
          touched = false,
        // a function to update the error state and error messages
          updateErrors = function () {
            // fist toggle the element's error class
            elem.toggleClass('has-danger', formCtrl[inputName].$invalid);
            // remove all previous messages
            errorBox.children().remove();
            // iterate all errors and add corresponding messgages
            angular.forEach(formCtrl[inputName].$error, function(value, key) {
              // but only if error is true and message exists
              if (value && !!errorMessages[key] && !!formCtrl.$dirty) {
                errorBox.append('<small class="text-help">' + errorMessages[key] + ' </small>');
              }
            });
          };

        // add the error box element to the dome
        elem.append(errorBox);

        if (inputNgElem.attr('type') !== 'file') {
          // watch the 'touched' state so we'll know if it's the user's first interaction
          scope.$watch(function() {
            return formCtrl[inputName] && formCtrl[inputName].$touched;
          }, function(result) {
            if (result) { // if field was touched, change variable and update errors for the first time
              touched = true;
              updateErrors();
            }
          });
        } else {
          inputNgElem.change(function() {
            touched = true;
            updateErrors();
          });
        }

        // iterate all validators
        angular.forEach(formCtrl[inputName].$validators, function(value, key) {
          // add watch for each validator's error status
          scope.$watch(function() {
            return formCtrl[inputName].$error[key];
          }, function(result) {
            // if the user already touched the field, update the errors every time the status changes
            if (touched) {
              updateErrors();
            }
          });
        });

      }
    };
  })
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
