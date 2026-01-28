import Sidebar from "@/layouts/DashSlidebar";
//import Grid from "@mui/material/Grid2";
import { Button, Card, CardContent } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { ControlPointOutlined } from "@mui/icons-material";
import { setTags } from "@/redux/slices/tagSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import tagApi from "@/api/tag";
import TagChip from "@/components/tag/TagChip";
import NewTag from "@/components/tag/TagNew";

const Tags: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.tags.Tags);
  const [newTags, setNewTags] = useState<boolean>(false);

  const fetchTags = useCallback(async () => {
    try {
      const res = await tagApi.getTags();
      if (res) {
        dispatch(setTags(res));
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <>
      <div className="bg-slate-200 pt-12 w-full">
        <Sidebar>
          <div>
            <Card
              variant="outlined"
              className="my-3 w-full p-3"
              sx={{ borderRadius: "0.5rem" }}
            >
              <div className="flex justify-between">
                <h1 className="text-3xl font-medium">Etiquetas</h1>
                <div>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<ControlPointOutlined />}
                    onClick={() => setNewTags(true)}
                  >
                    Nueva Etiqueta
                  </Button>
                </div>
              </div>
              <CardContent className="my-4" sx={{ padding: 0 }}>
                <div className="border-2 rounded-md border p-6">
                  {tags.map((tag) => (
                    <TagChip key={tag._id} tag={tag} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* dialog new tag */}
          <NewTag
            open={newTags}
            onSave={fetchTags}
            onClose={() => setNewTags(false)}
          />
        </Sidebar>
      </div>
    </>
  );
};

export default Tags;
