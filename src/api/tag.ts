import axios, { AxiosResponse } from "axios";
import conexion from "./conexion";
import { catchError } from "@/utils/utils";
import { TagI, ParamsTags } from "@/types/tag";
import { CodeCath } from "@/types/codeCath";

const recurso: string = conexion.url + "tag/";

const getTags = async (): Promise<TagI[] | null> => {
  try {
    const response: AxiosResponse<TagI[] | null> = await axios.get(recurso);
    return response.data;
  } catch (error) {
    catchError(error);
    return null;
  }
};

const createTag = async (
  params: ParamsTags
): Promise<TagI | null> => {
  try {
    const response: AxiosResponse<TagI | null> = await axios.post(
      recurso,
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

const updateTag = async (id: string,
  params: ParamsTags
): Promise<TagI | null> => {
  try {
    const response: AxiosResponse<TagI | null> = await axios.put(
      recurso+id,
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

const deleteTag = async (id: string): Promise<CodeCath | null> => {
  try {
    const response: AxiosResponse<CodeCath | null> = await axios.delete(
      recurso+id,
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

export default { getTags, createTag, deleteTag, updateTag };
