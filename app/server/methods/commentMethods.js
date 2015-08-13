Meteor.methods({
  createComment: function(applicationId, commentString) {
    check(applicationId, String);
    check(commentString, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('error-comments-not-signed-in', 'You must register a user first before making a comment.');
    }

    var comment = {
      userId: Meteor.userId(),
      applicationId: applicationId,
      // timestamp as unix timestamp. parse back to moment easily
      timestamp: moment().format('X'),
      comment: commentString,
    };
    var commentId = Comments.insert(comment);

    if (commentId) {
      return true;
    } else {
      throw new Meteor.Error('error-comments-insert-failed', 'Adding your comment failed.');
    }

  },

  deleteComment: function(commentId) {
    check(commentId, String);

    var comment = Comments.findOne(commentId);

    if (!comment) {
      throw new Meteor.Error('error-comments-no-comment', 'You cannot delete a comment that doesn\'t exist.');
    }

    if (Meteor.userId() !== comment.userId) {
      throw new Meteor.Error('error-comments-not-owner', 'You cannot delete a comment you didn\'t make.');
    }

    return Comments.remove(commentId);
  },
});