// =============================================Imports===================================================================================
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Description, Title, CloudUpload, Publish } from "@mui/icons-material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import axios from "axios";
import { useAuth } from "../helper/AuthContext";
import toast from "react-hot-toast";

// =============================================Component===================================================================================
function Upload() {
  const { token } = useAuth();

  // =============================================States===================================================================================
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [tags, setTags] = useState([
    "trending",
    "learn",
    "nigga",
    "smoke",
    "learning",
    "texting",
    "travelling",
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =============================================Handlers===================================================================================
  function fileBoxChnaged(event) {
    setVideoFile(event.target.files[0]);
  }

  function changeValue(event) {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else if (name === "desc") setDesc(value);
    else if (name === "visibility") setVisibility(value);
  }

  // =============================================Form Submit===================================================================================
  async function formSubmitted() {
    try {
      setLoading(true);
      const videoUploaderUrl = "http://localhost:8989/api/youtube/upload";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("visibility", visibility);
      formData.append("file", videoFile);
      formData.append("accessToken", token);

      const response = await axios.post(videoUploaderUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Uploaded Successfully");
      toast.success("Upload success");

      // Reset
      setTitle("");
      setDesc("");
      setVisibility("");
      setVideoFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Uploading error");
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  }
  // =============================================MetaData===================================================================================

  function generateMetaData() {
    //server call krna h
  }

  // =============================================Return JSX===================================================================================
  return (
    <Container maxWidth="sm">
      {/* =============================================Alert Message=================================================================================== */}
      {message && (
        <Alert sx={{ width: "100%", marginTop: 5 }} severity="success">
          {message}
        </Alert>
      )}

      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 5,
          borderRadius: 3,
        }}
      >
        {/* =============================================Header=================================================================================== */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <YouTubeIcon sx={{ fontSize: 32, color: "#FF0000", mr: 1 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: "Roboto", color: "#FF0000" }}
          >
            YouTube
          </Typography>
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Upload Here
        </Typography>

        <Typography align="center" sx={{ color: "#ccc", mt: 1 }}>
          Please upload your video file in MP4 format with a maximum size of
          50MB.
        </Typography>

        {/* =============================================Form Fields=================================================================================== */}
        <Box display="flex" flexDirection="column" mt={3} gap={3}>
          {/* =============================================Title=================================================================================== */}
          <TextField
            name="title"
            value={title}
            onChange={changeValue}
            label="Video Title"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title color="primary" />
                </InputAdornment>
              ),
            }}
          />

          {/* =============================================Description=================================================================================== */}
          <TextField
            name="desc"
            value={desc}
            onChange={changeValue}
            label="Video Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="primary" />
                </InputAdornment>
              ),
            }}
          />

          {/* =============================================File Upload=================================================================================== */}
          <Box display="flex" alignItems="center" gap={2}>
            <input
              onChange={fileBoxChnaged}
              type="file"
              accept="video/*"
              id="video-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="video-upload">
              <Button
                variant="contained"
                component="span"
                color="secondary"
                startIcon={<CloudUpload />}
              >
                Select File
              </Button>
            </label>
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              {videoFile ? videoFile.name : ""}
            </Typography>
          </Box>

          {/* =============================================Visibility=================================================================================== */}
          <FormControl fullWidth variant="outlined">
            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select
              name="visibility"
              labelId="visibility-label"
              value={visibility}
              label="Visibility"
              onChange={changeValue}
            >
              <MenuItem value="">Select Visibility</MenuItem>
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Unlisted">Unlisted</MenuItem>
            </Select>
          </FormControl>

          {/* =============================================Tags=================================================================================== */}
          {tags.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ color: "#aaa", mb: 1 }}>
                Video Tags
              </Typography>

              <Box display="flex" gap={1} flexWrap="wrap">
                {tags.map((item, index) => (
                  <Chip
                    label={item}
                    key={index}
                    onDelete={() => {
                      setTags((prev) => prev.filter((_, i) => i !== index));
                    }}
                    sx={{
                      backgroundColor: "#444",
                      color: "#fff",
                      "& .MuiChip-deleteIcon": {
                        color: "#ccc",
                      },
                      "&:hover": {
                        backgroundColor: "#555",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          {/* =============================================Buttons=================================================================================== */}
          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="outlined"
              color="success"
              startIcon={<SmartToyIcon />}
              sx={{ fontWeight: "bold" }}
            >
              Generate Meta Data
            </Button>

            <Button
              onClick={formSubmitted}
              variant="contained"
              color="primary"
              startIcon={<Publish />}
              sx={{ fontWeight: "bold", px: 3, py: 1.5 }}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Upload;
