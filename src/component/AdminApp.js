import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { getContributeFile, getContributeList, rejectCard, acceptCard } from "../api";
import { token } from "../util";
import FileSaver from "file-saver";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { List, ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },

  accepted: {},

  rejected: {
    opacity: 0.5,
  },

  appBarSpacer: theme.mixins.toolbar,
}));

export default function AdminApp({ match }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("pending");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        try {
          const rawData = await getContributeList();
          setData(rawData);
        } catch (e) {
          setError(e);
          console.error(e);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [loading]);

  useEffect(() => {
    console.log(filter);
    setFiltered(data.filter((item) => item.status === filter));
  }, [data, filter]);

  const getComponent = () => {
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!filtered || filtered.length == 0) return <div> 해당 조건에 맞는 요청이 없습니다 </div>;
    return filtered.map((card) => (
      <Grid item key={card._id} xs={12} sm={6} md={4}>
        {getCard(card)}
      </Grid>
    ));
  };

  const getCard = (card) => {
    if (card.status === "pending") return <PendingCard card={card} setLoading={setLoading} />;
    else if (card.status === "accepted") return <AcceptedCard card={card} />;
    else return <RejectedCard card={card} />;
  };

  const handleFilter = (breadcrumb) => {
    setFilter(breadcrumb);
  };

  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color={filter === "pending" ? "textPrimary" : "inherit"} onClick={() => handleFilter("pending")}>
            승인 대기 중
          </Typography>
          <Typography color={filter === "accepted" ? "textPrimary" : "inherit"} onClick={() => handleFilter("accepted")}>
            승인 완료
          </Typography>
          <Typography color={filter === "rejected" ? "textPrimary" : "inherit"} onClick={() => handleFilter("rejected")}>
            거절됨
          </Typography>
        </Breadcrumbs>
        <div className={classes.appBarSpacer} />

        <Grid container spacing={4}>
          {getComponent()}
        </Grid>
      </Container>
    </main>
  );
}

function PendingCard({ card, setLoading }) {
  const classes = useStyles();

  const onDownload = async () => {
    const cardData = await getContributeFile(token, card._id);
    const blob = new Blob([cardData]);
    FileSaver.saveAs(blob, card.file);
  };

  const onReject = async () => {
    await rejectCard(token, card._id);
    setLoading(true);
  };

  const onAccept = async () => {
    await acceptCard(token, card._id);
    setLoading(true);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} disableSpacing>
        <Email email={card.email} />
        <Desc desc={card.desc} />
        <MallList malls={card.malls} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onAccept}>
          승인
        </Button>
        <Button size="small" color="secondary" onClick={onReject}>
          거절
        </Button>
        <Button size="small" color="inherit" onClick={onDownload}>
          다운로드
        </Button>
      </CardActions>
    </Card>
  );
}

function AcceptedCard({ card }) {
  const classes = useStyles();
  return (
    <Card className={classes.accepted}>
      <CardContent className={classes.cardContent}>
        <Email email={card.email} />
        <Desc desc={card.desc} />
        <MallList malls={card.malls} />
      </CardContent>
      <CardActions>
        <Typography> 승인됨 </Typography>
      </CardActions>
    </Card>
  );
}

function RejectedCard({ card }) {
  const classes = useStyles();
  return (
    <Card className={classes.rejected}>
      <CardContent className={classes.cardContent}>
        <Email email={card.email} />
        <Desc desc={card.desc} />
        <MallList malls={card.malls} />
      </CardContent>
      <CardActions>
        <Typography> 거절됨 </Typography>
      </CardActions>
    </Card>
  );
}

function MallList({ malls }) {
  if (!malls) {
    console.warn("no malls");
    return null;
  }

  return (
    <List>
      {malls.map((mall) => (
        <ListItem key={mall}>{mall}</ListItem>
      ))}
    </List>
  );
}

function Desc({ desc }) {
  if (!desc) {
    console.warn("no desc");
    return null;
  }
  return <Typography>{desc}</Typography>;
}

function Email({ email }) {
  if (!email) {
    console.warn("no email");
    return null;
  }
  return (
    <Typography gutterBottom component="h5">
      {email}
    </Typography>
  );
}
