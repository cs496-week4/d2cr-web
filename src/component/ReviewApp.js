import Chart from "./Chart";
import WordCloud from "./WordCloud";
import Reviews from "./Reviews";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NotFound from "./NotFound";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { getProductUrl } from "../api";
import { formatPath } from "../util/format";


export default function ReviewApp({ productUrl, setProductUrl, classes }) {
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const pageId = formatPath(window.location.pathname);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getProductUrl(pageId);
        console.log(url);
        setProductUrl(url);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUrl();
  });

  return productUrl ? (
    <Grid container spacing={3}>
      {/* chart */}
      <Grid item xs={12} md={8} lg={6}>
        <Paper className={fixedHeightPaper}>
          <Chart pageId={pageId} />
        </Paper>
      </Grid>
      {/* word cloud */}
      <Grid item xs={12} md={4} lg={6}>
        <Paper className={fixedHeightPaper}>
          <WordCloud pageId={pageId} />
        </Paper>
      </Grid>
      {/* 리뷰 */}
      <Grid item xs={12}>
        <Paper className={classes.reviews}>
          <Reviews pageId={pageId} />
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <NotFound />
  );
}
