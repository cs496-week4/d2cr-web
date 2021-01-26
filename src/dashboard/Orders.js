import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import SearchPanel from '../component/ReviewMoa/SearchPanel';
import { LoremIpsum } from "lorem-ipsum";

function randomRate() {  
    return Math.floor(Math.random()*4 + 1); 
}  
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
// Generate Order Data
function createData(id, date, name = lorem.generateWords(4), content = lorem.generateSentences(5), rate = randomRate()) {
  return { id, date, name, content, rate };
}

const rows = [
  createData(0, "16 Mar, 2019"), 
  createData(1, "17 Mar, 2019"),
  createData(2, "18 Mar, 2019"),
  createData(3, "19 Mar, 2019"),
  createData(4, "20 Mar, 2019"),
  createData(5, "21 Mar, 2019"),
  createData(6, "22 Mar, 2019"),
  createData(7, "23 Mar, 2019"),
  createData(8, "24 Mar, 2019"),
  createData(9, "25 Mar, 2019"),
  createData(10, "26 Mar, 2019"),
  createData(11, "27 Mar, 2019"),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));




export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>리뷰 목록</Title>
      <SearchPanel />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>내용</TableCell>
            <TableCell align="right">평점</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}