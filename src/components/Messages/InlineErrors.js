import React from 'react';
import PropTypes from 'prop-types';
import {  createMuiTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import ErrorIcon from '@material-ui/icons/Error';
const theme = createMuiTheme({
    palette: {
        secondary: {
            main: green[500],
        }
    },
});
const InlineError=({text})=>
(
<Typography  theme={theme} color="secondary" variant="button" gutterBottom>
<span><ErrorIcon/> {text}</span>
</Typography>
);

InlineError.propTypes={text: PropTypes.string.isRequired};

export default(InlineError);