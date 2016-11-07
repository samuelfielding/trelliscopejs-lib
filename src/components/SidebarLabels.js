import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { createSelector } from 'reselect';
import { Table, TableRow, TableRowColumn, TableBody } from 'material-ui/Table';
import { setLabels } from '../actions';
import { contentHeightSelector } from '../selectors/ui';
import { labelsSelector, displayInfoSelector } from '../selectors';
import uiConsts from '../assets/styles/uiConsts';

const SidebarLabels = ({ sheet: { classes }, height, labels, cogInfo, handleChange }) => {
  let content = <div />;
  const ciKeys = Object.keys(cogInfo);
  if (ciKeys.length > 0) {
    const tableData = ciKeys.map(d => ({
      name: cogInfo[d].name,
      desc: cogInfo[d].desc,
      selected: labels.indexOf(cogInfo[d].name) > -1
    }));

    content = (
      <Table
        height={`${height}px`}
        fixedHeader
        multiSelectable
        onRowSelection={(rows) => {
          const newLabels = [];
          for (let ii = 0; ii < rows.length; ii += 1) {
            newLabels.push(ciKeys[rows[ii]]);
          }
          handleChange(newLabels);
        }}
      >
        <TableBody
          displayRowCheckbox
          deselectOnClickaway={false}
          style={{ cursor: 'pointer' }}
        >
          {tableData.map(row => (
            <TableRow key={row.name} selected={row.selected}>
              <TableRowColumn>{row.name}<br />
                <span className={classes.rowDesc}>
                  {row.desc}
                </span>
              </TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
  return (content);
};

SidebarLabels.propTypes = {
  height: React.PropTypes.number,
  sheet: React.PropTypes.object,
  labels: React.PropTypes.array,
  cogInfo: React.PropTypes.object,
  handleChange: React.PropTypes.func
};

// ------ static styles ------

const staticStyles = {
  rowDesc: {
    color: '#888',
    fontStyle: 'italic'
  }
};

// ------ redux container ------

const stateSelector = createSelector(
  contentHeightSelector, labelsSelector, displayInfoSelector,
  (ch, labels, di) => ({
    width: uiConsts.sidebar.width,
    height: ch - uiConsts.sidebar.header.height,
    labels,
    cogInfo: di.info.cogInfo
  })
);

const mapStateToProps = state => (
  stateSelector(state)
);

const mapDispatchToProps = dispatch => ({
  handleChange: (labels) => {
    dispatch(setLabels(labels));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(staticStyles)(SidebarLabels));
