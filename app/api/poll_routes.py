from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Poll, Comment
from app.forms import PollForm, CommentForm




poll_routes = Blueprint('polls', __name__)


#  /api/polls
@poll_routes.route('', methods=['GET'])
@login_required
def get_all_polls():
  their_polls = current_user.get_users_polls()
  normalized = { each["id"]: each   for each in their_polls["polls"] }
  return { "polls": normalized }


# /api/polls/all
@poll_routes.route('/all', methods=['GET'])
@login_required
def get_all_other_polls():
  all_polls = Poll.query.order_by(Poll.created_at).all()
  normalized = { each.to_dict()["id"]: each.to_dict()   for each in all_polls }
  return { "polls" : normalized }




# /api/polls/:pollId/comments
@poll_routes.route("/<int:pollId>/comments", methods=['GET'])
@login_required
def get_all_comments(pollId):
  the_comments = Comment.query.filter_by(poll_id=pollId).all()
  normalized = { each.to_dict()["id"]: each.to_dict() for each in the_comments }
  if len(normalized) == 0:
    return { "comments": None }

  return {"comments": normalized }





# /api/polls/:pollId/comment
@poll_routes.route("/<int:pollId>/comment", methods=['POST'])
@login_required
def new_comment(pollId):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_comment = Comment(answer_text=form.data['answer_text'], poll_id=int(pollId), user_id=current_user.get_id())
    db.session.add(new_comment)
    db.session.commit()
    return { new_comment.get_id(): new_comment.to_dict() }

  # if there are errors
  return { "errors": ["errors", "Please try again."] }




# /api/polls/:pollId/comments/:commentId
@poll_routes.route("/<int:pollId>/comments/<int:commentId>", methods=['DELETE'])
@login_required
def delete_comment(pollId, commentId):
  the_comment = Comment.query.get(commentId)

  if the_comment.check_creator_id(current_user.get_id()):
    db.session.delete(the_comment)
    db.session.commit()
    return { "message": "comment successfully deleted" }

  return { "errors": ["Error, cannot remove a comment that does not belong to the current user.", "Please try again."] }


# /api/polls/:pollId/comments/:commentId
@poll_routes.route("/<int:pollId>/comments/<int:commentId>", methods=['PUT'])
@login_required
def update_comment(pollId, commentId):
  the_comment = Comment.query.get(commentId)
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    the_comment.update_comment(form.data['answer_text'])
    db.session.add(the_comment)
    db.session.commit()
    return { the_comment.get_id(): the_comment.to_dict() }

  return { "errors": ["error", "Please try again."] }










# /api/polls
@poll_routes.route('', methods=['POST'])
@login_required
def create_new_poll():
  form = PollForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_poll = Poll(title=form.data['title'], question_text=form.data["question_text"], user_id=current_user.get_id())
    db.session.add(new_poll)
    db.session.commit()
    return { new_poll.get_id(): new_poll.to_dict() }


  # if there are errors
  return { "errors": ["errors", "Please try again."] }





# /api/polls/:pollId
@poll_routes.route('/<int:pollId>', methods=['DELETE'])
@login_required
def delete_poll(pollId):
  the_poll = Poll.query.get(pollId)
  if the_poll.check_creator_id(current_user.get_id()):
    db.session.delete(the_poll)
    db.session.commit()
    return { "message": "book successfully deleted" }

  return { "errors": ["Error, cannot remove a book that does not belong to the current user.", "Please try again."] }





# /api/polls/:pollId
@poll_routes.route('/<int:pollId>', methods=['PUT'])
@login_required
def update_poll(pollId):
  the_poll = Poll.query.get(pollId)

  form = PollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    the_poll.update_poll_data(form.data['title'], form.data["question_text"])
    db.session.add(the_poll)
    db.session.commit()
    return { "poll": the_poll.to_dict() }

  return { "errors": ["error", "Please try again."] }
