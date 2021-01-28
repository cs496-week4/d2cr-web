import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import ShopIcon from "@material-ui/icons/Shop";
import Tooltip from "@material-ui/core/Tooltip";
import NotFound from "./NotFound";
import ContributeApp from "./ContributeApp";
import { Route } from "react-router-dom";
import ReviewApp from "./ReviewApp";
import AdminApp from "./AdminApp";
import Copyright from "./Copyright";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    // overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
  },
  reviews: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: "auto",

    overscrollBehavior: "contain",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
}));

export default function App() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [productUrl, setProductUrl] = useState("/contribute");

  const onClickProductButton = (e) => {
    e.preventDefault();
    if (productUrl) window.location.href = productUrl;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Tooltip title="상품 페이지로 이동" arrow>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onClickProductButton}>
              <ShopIcon />
            </IconButton>
          </Tooltip>
          {/* <Button variant="contained">Default</Button> */}

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            리뷰
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Route exact={true} path="/contribute" render={(props) => <ContributeApp classes={classes} />} />
          <Route
            path="/page"
            render={(props) => <ReviewApp {...props} setProductUrl={setProductUrl} productUrl={productUrl} classes={classes} />}
          />
          <Route path="/admin" render={(props) => <AdminApp {...props} classes={classes} />} />
          <Copyright />
        </Container>
      </main>
    </div>
  );
}
