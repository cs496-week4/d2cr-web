
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

export default function Copyright() {
  return (
    <Box pt={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/cs496-week4/">
          조재구, 최상아 <br />
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}