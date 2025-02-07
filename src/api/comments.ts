import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";

const recurso: string = conexion.url + "comment/";

export interface CommentI {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  comment: string;
  timestamp: string;
}

interface ParamsComment {
  comment: string;
  commentId?: string;
}

const addComment = async (
  id: string,
  params: ParamsComment
): Promise<CommentI | null> => {
  try {
    const response: AxiosResponse<CommentI | null> = await axios.post(
      recurso + id,
      params,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const getComments = async (idTask: string): Promise<CommentI[] | null> => {
  try {
    const response: AxiosResponse<CommentI[] | null> = await axios.get(
      recurso + idTask
    );

    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const deleteComment = async (
    id: string,
    commentId: string 
  ): Promise<CommentI | null> => {
    try {
      const response: AxiosResponse<CommentI | null> = await axios.put(
        recurso +"delete/"+ id,
        {commentId: commentId},
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    } catch (error) {
      catchError(error);
      return null;
    }
  };

  const EditComment = async (
    id: string,
    params: ParamsComment
  ): Promise<CommentI | null> => {
    try {
      const response: AxiosResponse<CommentI | null> = await axios.put(
        recurso +"update/"+ id,
        params,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    } catch (error) {
      catchError(error);
      return null;
    }
  };

export default { addComment, getComments, deleteComment, EditComment };
