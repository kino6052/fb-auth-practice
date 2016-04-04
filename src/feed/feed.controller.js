'use strict';

angular.module('patientory')
  .controller('FeedCtrl', function (FeedModel, UserModel) {
    var ctrl = this;

    ctrl.loading = false;

    ctrl.newMessage = {
      name: UserModel.getCurrentUser(UserModel.userObject),
      text: UserModel.getEmail(UserModel.userObject),
      isPublic: false
    };

    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newBoard = {
        name: '',
        text: '',
        isPublic: false
      };
    };

    ctrl.getFeed = function () {
      FeedModel.all()
        .then(function (result) {
          ctrl.feed = (result !== 'null') ? result : {};
        }, function () {
          ctrl.resetForm();
        });
    };

    ctrl.postMessage = function (message, isValid) {
      if (isValid) {
        ctrl.loading = true;

        FeedModel.create(message)
          .then(function (result) {
            ctrl.getFeed();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.resetForm();
          });
      }
    };

    ctrl.updateBoard = function (messageId, message, isValid) {
      if (isValid) {
        ctrl.loading = true;
        FeedModel.update(messageId, message)
          .then(function (result) {
            ctrl.getFeed();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.cancelEditing();
          });
      }
    };

    ctrl.deleteBoard = function (messageId) {
      FeedModel.destroy(messageId)
        .then(function (result) {
          ctrl.getFeed();
        })
        .catch(function (reason) {
          //
        })
        .finally(function () {
          ctrl.cancelEditing();
        });
    };

    ctrl.setEditedBoard = function (messageId, message) {
      ctrl.editedBoardId = messageId;
      ctrl.editedBoard = angular.copy(message);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentBoard = function (messageId) {
      return ctrl.editedBoard !== null && ctrl.editedBoardId === messageId;
    };

    ctrl.cancelEditing = function () {
      ctrl.loading = false;
      ctrl.editedBoardId = null;
      ctrl.editedBoard = null;
      ctrl.isEditing = false;
    };

    ctrl.getFeed();
  });
