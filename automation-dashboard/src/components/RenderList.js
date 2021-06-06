import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import JSONPretty from 'react-json-pretty';
import axios from "axios"


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { listAction } from '../listOfActions'
let list = listAction

class RenderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_action: {}
        }
    }

    runLogger = async (event) => {
        console.log(event)
        let obj = {}
        for(let i = 0; i<list.length; i++) {
            if(event === list[i].user_details.fingerprint.hash) {
                obj = {...list[i].user_actions}
                break;
            }
        }
        console.log(obj)
        let res = await axios.post("/api", obj)
        console.log(res)
    }
    render() {
        return (
            <div>
               {
                   list.map((action) => {

                    const date =  new Date(parseInt(action.timeStamp) * 1000)
                    console.log(date)



                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{date.toString()}</Typography>
                                </AccordionSummary>
                                <Button name = {action.user_details.hash}variant="contained" color="secondary" onClick = {async () => {
                                    console.log(action.user_details)
                                    await this.runLogger(action.user_details.fingerprint.hash)
                                }}>
                                    RUN
                                </Button>
                                <AccordionDetails>
                                    <Typography>
                                        <JSONPretty id="json-pretty" data={action.user_details}  theme={{
                                            main: 'line-height:1.3;color:blue;overflow:auto;',
                                            error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;',
                                            key: 'color:red;',
                                            string: 'color:purple;',
                                            value: 'color:green;',
                                            boolean: 'color:black;',
                                        }}/>
                                    </Typography>
                                    
                                </AccordionDetails>
                                
                            </Accordion>
                        )
                   })
               } 
            </div>
        );
    }
}

export default RenderList;