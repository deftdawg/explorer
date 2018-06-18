import React, { Component } from 'react';
import { connect } from 'react-redux';
import Obstruction from 'obstruction';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AnnotationTabs from './tabs';
import VideoPreview from '../video';
import Minimap from '../minimap';
import LogStream from '../logstream';

const styles = theme => {
  return {
    root: {
      margin: theme.spacing.unit * 5,
      borderRadius: theme.spacing.unit,
      background: 'linear-gradient(180deg, #1D2225 0%, #16181A 100%)'
    },
    paddedContainer: {
      padding: theme.spacing.unit * 4,
    },
    title: {
      margin: 20
    }
  };
};

class AnnotationsView extends Component {
  render() {
    let visibleSegment = (this.props.currentSegment || this.props.nextSegment);
    let routeName = visibleSegment ? visibleSegment.route : 'Nothing visible';
    let titleElement = routeName;
    if (visibleSegment) {
      let shortName = routeName.split('|')[1];
      titleElement = (
        <React.Fragment>
          { shortName } --&nbsp;
          <a href={ 'https://community.comma.ai/cabana/?route=' + routeName} target='_blank'>
            Open in Cabana!
          </a>
        </React.Fragment>
      );
    }
    return (
      <Paper className={ this.props.classes.root }>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='title' className={ this.props.classes.title } >
              { titleElement }
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Minimap zoomed colored thumbnailed />
          </Grid>
        </Grid>
        <Grid container spacing={ 32 } className={ this.props.classes.paddedContainer } >
          <Grid item xs={6}>
            { visibleSegment && <AnnotationTabs segment={ visibleSegment } /> }
          </Grid>
          <Grid item xs={6}>
            <VideoPreview />
          </Grid>
          <Grid item xs={12}>
            {/*<LogStream />*/}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const stateToProps = Obstruction({
  currentSegment: 'workerState.currentSegment',
  nextSegment: 'workerState.nextSegment',
});

export default connect(stateToProps)(withStyles(styles)(AnnotationsView));