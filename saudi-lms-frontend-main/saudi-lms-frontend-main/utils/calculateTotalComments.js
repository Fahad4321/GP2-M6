const calculateTotalComments = (comments = []) => {
  let totalComments = 0;

  // increase top level comments
  comments.forEach((comment) => {
    totalComments++;

    // increase reply level comments
    if (comment.replies && comment.replies.length > 0) {
      totalComments += comment.replies.length;

      comment.replies.forEach((reply) => {
        totalComments++;
        // increase nested reply level comments
        if (reply.replies && reply.replies.length > 0) {
          totalComments += reply.replies.length;
        }
      });
    }
  });

  return totalComments;
};

export default calculateTotalComments;
