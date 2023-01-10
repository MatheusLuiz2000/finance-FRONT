export const containerStyles = {
  height: "100%",
  backgroundColor: "#F9F9F9",
};

export const menuContainer = {
  height: "100vh",
  backgroundColor: "#ffff",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "25px",
  paddingBottom: "30px",
  position: "relative",
  "& .avatar": {
    margin: "15px 0px",
  },
  "& h2, & h4": {
    fontWeight: "700",
    fontSize: "23px",
    color: "#1E1E2D",
    marginBottom: "5px",
  },
  "& .description": {
    fontFamily: "Questrial",
    fontSize: "16px",
    color: "#C2C2C2",
  },
  "& ul": {
    paddingTop: "65px",
  },
  '& a': {
    display: "flex",
    alignItems: "center",
    textDecoration: 'none'
  },
  "& ul li": {
    padding: "15px 0px",
    display: "flex",
    alignItems: "center",
    "& p": {
      fontFamily: "Questrial",
      fontSize: "16px",
      color: "#6F7181",
      opacity: "0.8",
      lineHeight: "21px",
    },
    "& svg": {
      marginRight: "20px",
      fill: "#6F7181",
    },
  },
  "& .logout": {
    position: "absolute",
    bottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      marginRight: "10px",
      fill: "#6F7181",
    },
    "& p": {
      color: "#6F7181",
    },
  },
};
