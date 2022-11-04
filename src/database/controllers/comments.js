import Comments from "../../models/commentSchema";

export async function createComment(req, res) {
  const formData = req.body;
  if (!formData.questionId && !formData.userId && !formData.comment)
    return res.status(405).json({ success: false, error: "Form data not provided..." });

  try {
    const { questionId, userId, comment } = formData;
    const data = await Comments.create({ questionId, userId, comment });
    res.status(200).json({ success: true, msg: "Comment created successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function updateComment(req, res) {
  if (!req.body.comment && !req.query.id)
    return res.status(405).json({ success: false, error: "Comment not selected" });

  try {
    const data = await Comments.findByIdAndUpdate(req.query.id, { comment: req.body.comment })
    res.status(200).json({ success: true, msg: "Comment updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function deleteComment(req, res) {
  if (!req.query.id) return res.status(405).json({ success: false, error: "Comment not selected" });

  try {
    const { id } = req.query;
    const data = await Comments.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}