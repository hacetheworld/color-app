import React from 'react';
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {

    root: {
        height: '25%',
        width: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3px',
        "&:hover svg": {
            color: "#fff",
            transform: 'scale(1.5)'
        }

    }
    , boxContent: {
        display: 'flex',
        justifyContent: 'space-between',
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    }
    ,
    deleteIcon: {
        transition: 'all 0.3s',

    }
}

function DraggableColorBox(props) {
    const { classes, name, color, handleClick } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span> {name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    );
}


export default withStyles(styles)(DraggableColorBox);