import React from "react";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Card from "@mui/material/Card";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import { checkRole } from "../../middleware/checkRole";
import { useSelector } from "react-redux";

const CourseCard = ({ course }) => {
  return (
    <>
      <div>
        {checkRole("user") ? (
          <Link
            href={{
              pathname: "/dashboard/courses/view/[slug]",
              query: { courseId: course?._id },
            }}
            as={`/dashboard/courses/view/${course?.slug}`}
            passHref
            key={course?._id.toString()}
          >
            <Card sx={{ maxWidth: 345 }} elevation={0} className="shadow-md">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${course?.thumbnail?.secure_url}`}
                  alt={course?.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "1rem" }}
                  >
                    {course?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course?.description?.slice(0, 70)} ...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ) : (
          <Card sx={{ maxWidth: 345 }} elevation={0} className="shadow-md">
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`${course?.thumbnail?.secure_url}`}
                alt={course?.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "1rem" }}
                >
                  {course?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course?.description?.slice(0, 70)} ...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="flex justify-between">
              <Link
                href={{
                  pathname: "/dashboard/courses/view/[slug]",
                  query: { courseId: course?._id },
                }}
                as={`/dashboard/courses/view/${course?.slug}`}
                passHref
                key={course?._id.toString()}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  startIcon={<PreviewIcon />}
                >
                  View
                </Button>
              </Link>
              <Link
                href={`/dashboard/courses/update/${course?._id}`}
                key={course?._id.toString()}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Link>
            </CardActions>
          </Card>
        )}
      </div>
    </>
  );
};

export default CourseCard;
