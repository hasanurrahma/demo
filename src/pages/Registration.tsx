import React, { useState, useRef } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../helper/helper";
function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    makeAndMod: "",
    rateCardSegment: "",
    category: "",
    vehicleColor: "",
    licensePlate: "",
    image: null as File | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("makeAndMod", formData.makeAndMod);
      formDataToSend.append("rateCardSegment", formData.rateCardSegment);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("vehicleColor", formData.vehicleColor);
      formDataToSend.append("licensePlate", formData.licensePlate);
      formDataToSend.append("image", formData.image as File);

      const response = await axios.post(`${serverURL}/upload`, formDataToSend);

      console.log("Response from server:", response.data);
      setFormData({
        makeAndMod: "",
        rateCardSegment: "",
        category: "",
        vehicleColor: "",
        licensePlate: "",
        image: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: "100px",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "40%" }}
        >
          <Grid container spacing={2}>
            <div style={{ marginLeft: "32%" }}>
              <h1>VEHICLE</h1>
            </div>

            <Grid item xs={12}>
              <TextField
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "black", fontSize: "22px" },
                }}
                placeholder="e.g. Tata hariar"
                label="makeAndMod"
                name="makeAndMod"
                required
                autoFocus
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={formData.makeAndMod}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="rateCardSegment"
                variant="standard"
                label="rateCardSegment"
                placeholder="e.g. Ondemand"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={formData.rateCardSegment}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                required
                name="category"
                variant="standard"
                label="Category"
                placeholder="e.g. Honda city"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={formData.category}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="vehicleColor"
                variant="standard"
                label="vehicleColor"
                placeholder="e.g. Red"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={formData.vehicleColor}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="licensePlate"
                variant="standard"
                label="licensePlate"
                placeholder="e.g. AS15k 7484"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={formData.licensePlate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                margin="normal"
                required
                fullWidth
                ref={fileInputRef}
                name="file"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                sx={{ width: "100%" }}
                onChange={handleImageChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              "&:hover": {
                backgroundColor: "purple",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Registration;
