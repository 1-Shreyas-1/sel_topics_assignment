import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Avatar, Grid, Button } from "@material-ui/core";

const displayParams = [
  { id: "Number of terms", label: "Term" },
  { id: "State", label: "State" },
  { id: "Constituency", label: "Constituency" },
  {
    id: "Educational qualifications",
    label: "Educational qualifications"
  },
  { id: "Educational qualifications - details", label: "Educational details" },
  { id: "Age", label: "Age" },
  { id: "Gender", label: "Gender" },
  { id: "House", label: "House" },
  { id: "Political party", label: "Party" }
];

const displayMoreParams = [
  { id: "Performance_Rating", label: "Performance Rating" },
  { id: "Debates", label: "No. of debates" },
  { id: "Questions", label: "No. of Ques. asked" },
  {
    id: "Attendance",
    label: "Attendance %"
  },
  { id: "Private Member Bills", label: "Private Member Bills" },
  { id: "Criminal Case", label: "Criminal Cases" },
  { id: "Total Assets", label: "Total Assets" },
  { id: "Liabilities", label: "Liabilities" }
];

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    "& span": {
      color: "brown",
      margin: 7
    }
  }
}))(MuiDialogContent);

export default function MPInfo(props) {
  const { selectedRow, handleClose, open } = props;
  const [displayMore, setDisplayMore] = useState("more...");

  function toggleMore() {
    const value = displayMore === "more..." ? "less..." : "more...";
    setDisplayMore(value);
  }
  return (
    <div>
      {selectedRow && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar
                  alt={selectedRow["MP name"].charAt(0)}
                  src={`./images/${selectedRow["MP name"]}.jpg`}
                ></Avatar>
              </Grid>
              <Grid item xs={9}>
                {selectedRow["MP name"]}
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            {displayParams.map(param => (
              <Typography key={param.id}>
                <span>
                  <b>{param.label}</b>
                </span>
                {selectedRow[param.id]}
              </Typography>
            ))}
            <Button onClick={toggleMore} color="primary">
              {displayMore}
            </Button>
            {displayMore === "less..." &&
              displayMoreParams.map(param => (
                <Typography key={param.id}>
                  <span>
                    <b>{param.label}</b>
                  </span>
                  {selectedRow[param.id]}
                </Typography>
              ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
