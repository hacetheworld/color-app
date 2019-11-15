import React from 'react';
import { withStyles } from '@material-ui/styles'


const styles = {

    root: {
        height: '25%',
        width: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3px'

    }
}

function DraggableColorBox(props) {
    const { classes } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: props.color }}>
            {props.name}
        </div>
    );
}


export default withStyles(styles)(DraggableColorBox);