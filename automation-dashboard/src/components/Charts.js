import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { PieChart } from 'react-minimal-pie-chart';
import { listAction } from '../listOfActions'
let list = listAction

const useStyles = makeStyles(((theme) => ({
    root: {
      minWidth: 275,
      maxWidth: 500,
      display: 'flex',
      flexDirection: 'row',
      margin: 12
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
  })));

function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Average Time
            </Typography>
            <Typography variant="h5" component="h2">
            {props.Time}
            </Typography>
            <Typography variant="body2" component="p">
            Average Time Spent by users on your website till now irrespective of browser or OS Version.
            <br />
            <br />
            <br />            
            </Typography>
            {"Number of Visits to Your Site till Now" + ": " + props.Size }
        </CardContent>
        </Card>
    );
  }

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 
    const left = 50 +0
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
  
  function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(0);
  const [hovered, setHovered] = React.useState(undefined);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">ANALYTICS</h2>
        <p id="simple-modal-description">
          Analytics for the Site Usage by different type of users
        </p>
        <SimpleCard Time={props.Time} Size={props.Size}/>
        <Card className={classes.root}>
        <PieChart
            data={[
                { title: 'Windows 10', value: 4, color: '#E38627' },
                { title: 'Samsung OS', value: 1, color: '#C13C37' },
                { title: 'Mac OS', value: 1, color: '#6A2135' },
            ]}
            radius={PieChart.defaultProps.radius - 6}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      onClick={(event, index) => {
        
        console.log('CLICK', { event, index });
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
        />
        OS 
        <PieChart
            data={[
                { title: 'Chrome 87', value: 3, color: '#E38627' },
                { title: 'Edge', value: 1, color: '#C13C37' },
                { title: 'Opera', value: 2, color: '#6A2135' },
            ]}
            radius={PieChart.defaultProps.radius - 6}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      onClick={(event, index) => {
        console.log('CLICK', { event, index });
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
        /> 
        Browser
        </Card>
      </div>
    );
  
    return (
      <div>
        {/* <button type="button" >
          Open Modal
        </button> */}
        <Button variant="contained" color="primary" onClick={handleOpen}>Analytics</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  }

class Charts extends Component {
    render() {

        let sizeOfArray = list.length
        let sum = 0;

        for(let i = 0; i<sizeOfArray; i++) {
            let startTime = list[i].user_details.start_time;
            let endTime = list[i].user_details.end_time;

            startTime = (new Date(startTime)).getTime()
            endTime = (new Date(endTime)).getTime()

            sum += Math.abs(endTime - startTime);

        }
        sum /= sizeOfArray;
        let avg = secondsToHms(sum/1000)



        return (
            <div>
                <SimpleModal Time={avg} Size={sizeOfArray}/>
            </div>
        );
    }
}

export default Charts;