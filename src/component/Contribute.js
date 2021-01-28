import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { DropzoneDialog } from 'material-ui-dropzone';

export default function Contribute(classes) {
    const [open, setOpen] = React.useState(false);
    return (
        <main className={classes.content}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    <Paper className={classes.paper} justify="center" >
                        <Typography component="h1" variant="h4">
                            API 등록
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="이름"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="구매 사이트 주소"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="내용 설명"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <div>
                            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                                파일 추가하기
                            </Button>
                            <DropzoneDialog
                                acceptedFiles={[".js"]}
                                cancelButtonText={"cancel"}
                                submitButtonText={"submit"}
                                maxFileSize={5000000}
                                open={open}
                                onClose={() => setOpen(false)}
                                onSave={(files) => {
                                    console.log('Files:', files);
                                    setOpen(false);
                                }}
                                showPreviews={true}
                                showFileNamesInPreview={true}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Container>
        </main>
    )
}