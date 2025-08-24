import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { Edit as EditIcon, Email as EmailIcon } from "@mui/icons-material";
import { useAuth } from "../../context";
import { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("course");
  const userInfo = {
    name: `${user?.fname || "John"} ${user?.mname || "M"} ${
      user?.lname || "Doe"
    }`,
    email: user?.email || "john.doe@hcmut.edu.vn",
    avatar: user?.avatar || "/assets/default-avatar.png",
    joinDate: "2024-01-01",
    department: "Computer Science",
    studentId: "2021001234",
    posts: 15,
    followers: 234,
    following: 89,
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ px: 3, mt: 2 }}>
        Profile
      </Typography>

      {/* Bìa gradient */}
      <Box
        sx={{
          width: "100%",
          height: 220,
          background:
            "linear-gradient(135deg, #88c4f9ff, #3c51d5ff, #f06262ff)",
          position: "relative",
          boxShadow: 3,
        }}
      />

      {/* Card chứa thông tin */}
      <Card
        sx={{
          p: 3,
          mx: 1,
          mt: -12,
          boxShadow: 6,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          {/* Avatar */}
          <Avatar
            src={userInfo.avatar}
            sx={{
              width: 150,
              height: 150,
              border: "5px solid white",
              boxShadow: 3,
            }}
          >
            {userInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>

          {/* Thông tin chính */}
          <Box flexGrow={1} sx={{ mt: 10 }}>
            <Typography variant="h5" fontWeight="bold">
              {userInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {userInfo.department}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={`ID: ${userInfo.studentId}`} size="small" />
            </Box>
            <Box display="flex" gap={2}>
              <Chip
                label={`Posts: ${userInfo.posts}`}
                color="primary"
                size="small"
              />
              <Chip
                label={`Followers: ${userInfo.followers}`}
                color="secondary"
                size="small"
              />
              <Chip
                label={`Following: ${userInfo.following}`}
                color="success"
                size="small"
              />
            </Box>
          </Box>

          {/* Edit Button */}
          <Box
            display="flex"
            flexDirection={"column"}
            gap={1}
            mb={2}
            sx={{ mt: 8 }}
          >
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                borderRadius: 50, // luôn giữ oval
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Edit Profile
            </Button>

            <Chip
              label={`Joined: ${new Date(
                userInfo.joinDate
              ).toLocaleDateString()}`}
              size="small"
            />
          </Box>
        </Box>
      </Card>
      <Box sx={{ mt: 4 }}>
        {/* Tab headers */}
        <Box
          sx={{
            display: "flex",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            onClick={() => setActiveTab("course")}
            sx={{
              flex: 1,
              textAlign: "center",
              py: 2,
              cursor: "pointer",
              fontWeight: activeTab === "course" ? "bold" : "500",
              color: activeTab === "course" ? "primary.main" : "text.secondary",
              backgroundColor: activeTab === "course" ? "#e3f2fd" : "#fff",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#d0e7ff",
              },
            }}
          >
            <Typography variant="h5">Your Courses</Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "#ddd" }}
          />

          <Box
            onClick={() => setActiveTab("thread")}
            sx={{
              flex: 1,
              textAlign: "center",
              py: 2,
              cursor: "pointer",
              fontWeight: activeTab === "thread" ? "bold" : "500",
              color: activeTab === "thread" ? "primary.main" : "text.secondary",
              backgroundColor: activeTab === "thread" ? "#e3f2fd" : "#fff",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#d0e7ff",
              },
            }}
          >
            <Typography variant="h5">Your Threads</Typography>
          </Box>
        </Box>

        {/* Tab content */}
        <Box sx={{ mt: 3 }}>
          {activeTab === "course" && <Dashboard />}
          {activeTab === "thread" && (
            <Typography variant="body1">Hiển thị Threads ở đây</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
