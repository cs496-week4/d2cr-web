import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { DropzoneDialog } from "material-ui-dropzone";
import Title from "./Title";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { postContribute } from "../api";
import { CONTRIBUTE_MSG, CONTRIBUTE_TOOLTIP } from "../util/states";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  appBarSpacer: theme.mixins.toolbar,
}));

export default function ContributeApp() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const [mallList, setMallList] = useState([]);

  const [mallUrl, setMallUrl] = useState("");

  const [msg, setMsg] = useState(CONTRIBUTE_MSG.default);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (e.target.mallUrl.value.length > 0) setMallList((mallList) => [...mallList, e.target.mallUrl.value]);

    if (!e.target.email.value.includes("@")) setMsg(CONTRIBUTE_MSG.no_email);
    // else if (!mallList || mallList.length < 1) setMsg(CONTRIBUTE_MSG.no_mall);
    else if (!file) setMsg(CONTRIBUTE_MSG.no_file);
    else {
      const formData = new FormData();
      console.log(e.target.email.value);
      console.log(e.target.desc.value);
      const tmpMallList = [e.target.mallUrl.value];

      formData.append("email", e.target.email.value);
      formData.append("desc", e.target.desc.value);
      formData.append("file", file);
      formData.append("malls", JSON.stringify({ list: tmpMallList }));
      
      const serverMessage = await postContribute(formData);
      console.log(serverMessage)
      setMsg(serverMessage);
    }
  };

  const onChangeMallUrl = (e) => setMallUrl(e.target.value);
  const onRemoveMall = (idx) => setMallList((mallList) => mallList.filter((mall, i) => i !== idx));
  const onAddMall = () => {
    setMallList((mallList) => [...mallList, mallUrl]);
    setMallUrl("");
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper} justify="center">
        <Title>API 등록</Title>

        <form className={classes.form} noValidate encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12} sm={9}>
              <TextField variant="outlined" required fullWidth id="email" label="이메일 주소" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="outlined" type="submit" color="primary" component="span" onClick={() => setOpen(true)} startIcon={<AttachFileIcon />}>
                파일
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="mallUrl" label="타겟 쇼핑몰 주소" name="mallUrl" autoComplete="lname" />
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth name="desc" multiline label="설명" id="desc" />
            </Grid>
          </Grid>

          <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
            등록하기
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/admin" variant="body2">
                관리자 페이지로
              </Link>
            </Grid>
          </Grid>
        </form>
        <div className={classes.appBarSpacer} />

        <Grid container justify="center">
          <Grid item>
            <Typography>{CONTRIBUTE_TOOLTIP[msg]}</Typography>
          </Grid>
        </Grid>

        <DropzoneDialog
          acceptedFiles={[".js"]}
          cancelButtonText={"취소"}
          submitButtonText={"확인"}
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={(files) => {
            setFile(files[0]);
            console.log(files[0]);
            setOpen(false);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </div>
    </Container>
  );
}
