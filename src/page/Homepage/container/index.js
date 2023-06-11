import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Sheet from "@mui/joy/Sheet";
import * as res from "../../../components/reponsiveBase/reposive";
const useStyle = makeStyles({

});
const Container = () => {
  const mathIB = [
    {
      color: "#3B82F6",
      color2: "#93C5FD",
      title: "IB Math",
      container: [
        { content: "AA SL" },
        { content: "AI SL" },
        { content: "AI HL" },
      ],
    },
    {
      color: "#EF4444",
      color2: "#FCA5A5",
      title: "IB Math",
      container: [
        { content: "AA SL" },
        { content: "AI SL" },
        { content: "AI HL" },
      ],
    },
    {
      color: "#22C55E",
      color2: "#86EFAC",
      title: "IB Math",
      container: [{ content: "AA SL" }, { content: "AI SL" }],
    },
    {
      color: "#F97316",
      color2: "#FDBA74",
      title: "IB Math",
      container: [
        { content: "AA SL" },
        { content: "AI SL" },
        { content: "AI HL" },
      ],
    },
    {
      color: "#F97316",
      color2: "#FDBA74",
      title: "IB Math",
      container: [
        { content: "AA SL" },
        { content: "AI SL" },
        { content: "AI HL" },
      ],
    },
    {
      color: "#F97316",
      color2: "#FDBA74",
      title: "IB Math",
      container: [
        { content: "AA SL" },
        { content: "AI SL" },
        { content: "AI HL" },
      ],
    },
    {
      color: "#F97316",
      color2: "#FDBA74",
      title: "IB Math",
      container: [
        { content: "AA SL" },
        { content: "AI SL" },
        { content: "AI HL" },
      ],
    },
  ];
  const reason = [
    {
      img: "/img/reason/reason.jpg",
      title: "Highly Experienced",
      content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur"
    },
    {
      img: "/img/reason/reason.jpg",
      title: "Question, Quiz & Course",
      content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur"
    },
    {
      img: "/img/reason/reason.jpg",
      title: "Question, Quiz & Course",
      content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur"
    },

  ]
  const course = [
    {
      img: "/img/course/course.jpg",
      title: "IB Math AA SL",
      timeLearn:"6 Months",
      contact: "CONTACT US"
    },
    {
      img: "/img/course/course.jpg",
      title: "IB Math AA SL",
      timeLearn:"6 Months",
      contact: "CONTACT US"
    },
    {
      img: "/img/course/course.jpg",
      title: "IB Math AA SL",
      timeLearn:"6 Months",
      contact: "CONTACT US"
    },  {
      img: "/img/course/course.jpg",
      title: "IB Math AA SL",
      timeLearn:"6 Months",
      contact: "CONTACT US"
    },

  ]
  const classes = useStyle();

  return (
    <div className="container">
      <div className="container_category">
        <Grid container className="container_category_title">
          {" "}
          <h1>The best resource for IB Mathematics just got better</h1>
        </Grid>
        <Grid container className="container_category_content">
          {" "}
          <span>
            Voted #1 IB Mathematics Resource in 2021 & 2022 by IB Students &
            Teachers. Revision Village has added IB Physics, Chemistry and
            Biology!
          </span>
        </Grid>

        <Grid container spacing={4} className="container_category_item">
          {mathIB.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={2}
              className="container_category_item_s"
            >
              {" "}
              <Sheet
                className="container_category_item_s_sheet"
                variant="outlined"
                color="neutral"
                sx={{ height: 250, border: `2px solid ${item.color}` }}
              >
                <Box
                  className="container_category_item_s_sheet_top"
                  style={{
                    height: "25%",
                    backgroundColor: item.color,
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      paddingLeft: "2%",
                      color: "white",
                      fontSize: "25px",
                      fontFamily: "cursive",
                    }}
                  >
                    {item.title}
                  </span>
                </Box>
                <Box
                  className="container_category_item_s_sheet_bottom"
                  style={{
                    height: "75%",
                    backgroundColor: item.color2,
                  }}
                >
                  {" "}
                  <Grid
                    container
                    className="container_category_item_s_sheet_bottom_grid"
                  >
                    {item.container.map((itemz, indexz) => (
                      <Grid key={indexz}
                        className={`container_category_item_s_sheet_bottom_grid_content ${classes.hoverMath}`}
                        item
                        xs={item.container.length === 2 ? 12 : 5}
                      >
                        <span
                          onMouseOver={(e) => {
                            e.target.setAttribute(
                              "style",
                              `background-color: ${item.color + 40};`
                            );
                          }}
                          onMouseOut={(e) => {
                            e.target.setAttribute(
                              "style",
                              "background-color: white;"
                            );
                          }}
                        >
                          {" "}
                          {itemz.content}
                        </span>
                      </Grid>
                    ))}{" "}
                  </Grid>
                </Box>
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* phần 2 */}
      <div className="container_reason">
        <Box className="container_reason_content">
          <Grid container className="container_reason_content_top">
            <span style={{ textAlign: "center", fontWeight: "600", color: "#EC4899", fontSize: "50px", fontFamily: 'Open Sans,sans-serif', letterSpacing: "-2px" }}>
              Why Choose Us
            </span>
          </Grid>

          <Grid container className="container_reason_content_between"> <span>
            A choice that makes the difference.
          </span></Grid>
          <Grid className="container_reason_content_bottom" container>
            {" "}
            <Grid container className="container_reason_content_bottom_items">
              {reason.map((item, index) => (
                <Grid xs={3} key={index} className="container_reason_content_bottom_items_s">
                  <div className="container_reason_content_bottom_items_s_content">

                    <img src={`${item.img}`} alt=""/>
                    <h1>{item.title}</h1>
                    <span>{item.content}</span>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Button className="container_reason_content_bottom_button"> Learn More</Button>
          </Grid>
        </Box>
      </div>
      {/* phần 3 */}
      <div className="container_course">
        <Box className="container_course_content">
          <Grid container className="container_course_content_top">
            <span style={{ textAlign: "center", fontWeight: "600", color: "#EC4899", fontSize: "40px", fontFamily: 'Open Sans,sans-serif', letterSpacing: "-2px" }}>
              COURSE
            </span>
          </Grid>


          <Grid className="container_course_content_bottom" container>
            {" "}
            <Grid container className="container_course_content_bottom_items">
              {course.map((item, index) => (
                <Grid xs={2.5} key={index} className="container_course_content_bottom_items_s">
                 <div className="container_course_content_bottom_items_s_content">
                 <img src={item.img} alt="" />
                 <h1>{item.title}</h1>
                 <span>{item.timeLearn} </span>
                 <Button className="container_course_content_bottom_items_s_content_button"> {item.contact}</Button>
                 </div>
                </Grid>
              ))}
            </Grid>
 
          </Grid>
        </Box>



      </div>
    </div>
  );
};

export default Container;
