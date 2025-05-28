import React, { useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Badge,
  TextField,
  DialogActions,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Grid from "@mui/material/Grid2";
import AvatarUser from "@/components/avatar/AvatarUser";
import { formatDate, getHours } from "@/utils/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import commentsApi from "@/api/comments";
import { CommentI } from "@/types/comments";

interface CommentTaskDialogProps {
  comments: CommentI[];
  taskId: string;
}

const CommentTaskDialog: React.FC<CommentTaskDialogProps> = ({
  taskId,
  comments,
}) => {
  const User = useSelector((state: RootState) => state.auth.user);
  
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [commentsR, setCommentsR] = useState<CommentI[]>(comments);
  const [comment, setComment] = useState<string>("");
  const isButtonDisabled: boolean = !comment;
  const [commentEdit, setCommentEdit] = useState<string>("");
  const [IdEdit, setIdEdit] = useState<string>("");
  const [comIdDel, setComIdDel] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmOpen = (idcom: string) => {
    setComIdDel(idcom);
    setOpenConfirm(true);
  };

  const handleConfirmClose = () => {
    setComIdDel("");
    setOpenConfirm(false);
  };

  const handleEdit = (id: string, com: string) => {
    setIdEdit(id);
    setCommentEdit(com);
  };

  const handleEditClose = () => {
    setIdEdit("");
    setCommentEdit("");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      editComment()
    }
  };

  const sortedMessages = [...commentsR].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const fecthComments = () => {
    commentsApi
      .getComments(taskId)
      .then((result) => {
        if (!result) {
          return;
        }

        setCommentsR(result);
        setComment("");
      })
      .finally(() => {});
  };

  const saveComment = () => {
    if (!comment) {
      return;
    }

    commentsApi
      .addComment(taskId, { comment: comment })
      .then((result) => {
        if (!result) {
          return;
        }
        toast.success("Comentario agregado correctamente", {
          position: "top-right",
          theme: "colored",
        });
        fecthComments();
      })
      .finally(() => {});
  };

  const deleteComment = () => {
    if (!comIdDel) {
      return;
    }

    commentsApi
      .deleteComment(taskId, comIdDel)
      .then((result) => {
        if (!result) {
          return;
        }
        toast.warning("Comentario borrado correctamente", {
          position: "top-right",
          theme: "colored",
        });
        fecthComments();
      })
      .finally(() => {
        handleConfirmClose();
      });
  };

  const editComment = () => {
    if (!IdEdit) {
      return;
    }

    commentsApi
      .EditComment(taskId, { comment: commentEdit, commentId: IdEdit })
      .then((result) => {
        if (!result) {
          return;
        }
        toast.info("Comentario actualizado correctamente", {
          position: "top-right",
          theme: "colored",
        });
        fecthComments();
      })
      .finally(() => {
        handleEditClose()
      });
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Badge badgeContent={commentsR.length} color="primary">
          {commentsR.length > 0 ? <ChatIcon /> : <ChatOutlineIcon />}
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Comentarios</DialogTitle>
        <DialogContent>
          <div>
            <Grid container>
              <Grid size={1}>
                <AvatarUser user={User} />
              </Grid>
              <Grid size={11}>
                <div>
                  <strong className="text-sm">{User.name}</strong>
                </div>
                <div className="my-4">
                  <TextField
                    id="text-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    minRows={3}
                    multiline
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="contained"
                    onClick={saveComment}
                    disabled={isButtonDisabled}
                  >
                    enviar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
          {sortedMessages.map((msg) => (
            <div className="mt-7 text-sm" key={msg._id}>
              <Grid container>
                <Grid size={1}>
                  <AvatarUser user={msg.userId} />
                </Grid>
                <Grid size={11}>
                  <div>
                    <strong>{msg.userId.name} </strong>
                    <span>{formatDate(new Date(msg.timestamp))}, </span>
                    {getHours(msg.timestamp)}
                  </div>
                  {msg._id !== IdEdit ? (
                    <div className="mt-2">{msg.comment}</div>
                  ) : (
                    <>
                    <TextField
                      value={commentEdit}
                      onChange={(e) => setCommentEdit(e.target.value)}
                      onKeyDown={handleKeyDown}
                      minRows={3}
                      multiline
                      className="w-full"
                    />
                    <Button
                        color="error"
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => handleEditClose()}
                      >
                        cancelar
                      </Button>
                      <Button
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => editComment()}
                      >
                        Guardar
                      </Button>
                    </>
                  )}

                  {msg.userId._id === User._id && !IdEdit ? (
                    <>
                      <Button
                        color="error"
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => handleConfirmOpen(msg._id)}
                      >
                        eliminar
                      </Button>
                      <Button
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => handleEdit(msg._id, msg.comment)}
                      >
                        editar
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </div>
          ))}
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onClose={handleConfirmClose}>
        <DialogContent>
          Esta accion no se puede revertir ¿continuar?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>No</Button>
          <Button onClick={deleteComment} autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentTaskDialog;
