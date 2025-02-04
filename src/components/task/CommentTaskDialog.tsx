import React from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Badge,
  TextField,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Grid from "@mui/material/Grid2";
import AvatarUser from "@/components/AvatarUser";
import { formatDate, getHours } from "@/utils/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface CommentProps {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  comment: string;
  timestamp: string;
}

interface CommentTaskDialogProps {
  comments: CommentProps[];
}
const CommentTaskDialog: React.FC<CommentTaskDialogProps> = ({ comments }) => {
  const [open, setOpen] = React.useState(false);
  const User = useSelector((state: RootState) => state.auth.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ); */

  return (
    <>
      <div>
        {comments.length > 0 ? (
          <IconButton onClick={handleClickOpen}>
            <Badge badgeContent={comments.length} color="primary">
              <ChatIcon />
            </Badge>
          </IconButton>
        ) : (
          <ChatOutlineIcon />
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">{"Comentarios"}</DialogTitle>
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
                    <TextField minRows={3} multiline className="w-full" />
                  </div>
                  <div className="flex justify-end">
                    <Button variant="contained">enviar</Button>
                  </div>
                </Grid>
              </Grid>
            </div>
            {comments.map((msg) => (
              <div className="mt-7 text-sm" key={msg._id}>
                <Grid container>
                  <Grid size={1}>
                    <AvatarUser user={msg.userId} />
                  </Grid>
                  <Grid size={11}>
                    <div>
                      <strong>{msg.userId.name}</strong>{" "}
                      {formatDate(new Date(msg.timestamp))},{" "}
                      {getHours(msg.timestamp)}
                    </div>
                    <div className="mt-2">{msg.comment}</div>
                  </Grid>
                </Grid>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CommentTaskDialog;
